export interface CompressedImageResult {
  id: string;
  dataUrl: string;
  mimeType: string;
  fileName: string;
}

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Không thể đọc tệp ảnh.'));
    reader.readAsDataURL(file);
  });

const loadImageElement = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Không thể giải mã định dạng ảnh trên trình duyệt.'));
    img.src = src;
  });

function renderScaledJpeg(img: HTMLImageElement, maxDim: number, quality: number): string {
  let width = img.naturalWidth || img.width;
  let height = img.naturalHeight || img.height;
  if (!width || !height) {
    throw new Error('Kích thước ảnh không hợp lệ.');
  }
  if (width > maxDim || height > maxDim) {
    const ratio = Math.min(maxDim / width, maxDim / height);
    width = Math.max(1, Math.round(width * ratio));
    height = Math.max(1, Math.round(height * ratio));
  }
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Trình duyệt không hỗ trợ xử lý canvas.');
  }
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL('image/jpeg', quality);
}

/**
 * Compresses an uploaded prescription/clinical image so it remains crisp for OCR
 * while fitting comfortably inside Vercel's 4.5 MB serverless payload limit.
 */
export async function compressMedicalImage(
  file: File,
  options?: { maxDim?: number; quality?: number; maxTargetChars?: number }
): Promise<CompressedImageResult> {
  const uid = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const initialMaxDim = options?.maxDim ?? 1280;
  const initialQuality = options?.quality ?? 0.82;
  const maxTargetChars = options?.maxTargetChars ?? 950_000;

  const rawDataUrl = await readFileAsDataUrl(file);
  try {
    const img = await loadImageElement(rawDataUrl);
    let dim = initialMaxDim;
    let quality = initialQuality;
    let dataUrl = renderScaledJpeg(img, dim, quality);

    // Adaptively step down if an ultra-dense screenshot produces a large base64 payload
    while (dataUrl.length > maxTargetChars && quality > 0.55) {
      quality = Math.max(0.52, Number((quality - 0.12).toFixed(2)));
      dim = Math.min(dim, 1080);
      dataUrl = renderScaledJpeg(img, dim, quality);
    }

    return {
      id: uid,
      dataUrl,
      mimeType: 'image/jpeg',
      fileName: file.name,
    };
  } catch {
    const normalizedMime =
      file.type === 'image/jpg' ? 'image/jpeg' : file.type || 'image/jpeg';
    return {
      id: uid,
      dataUrl: rawDataUrl,
      mimeType: normalizedMime,
      fileName: file.name,
    };
  }
}

/**
 * Re-compresses an array of already-prepared image data URLs so total JSON body stays well under Vercel's 4.5 MB cap.
 */
export async function fitImagesWithinPayloadBudget<
  T extends { dataUrl: string; mimeType: string }
>(images: T[], maxTotalChars = 2_800_000): Promise<T[]> {
  const currentTotal = images.reduce((sum, img) => sum + img.dataUrl.length, 0);
  if (currentTotal <= maxTotalChars) {
    return images;
  }

  const perImageBudget = Math.max(300_000, Math.floor(maxTotalChars / Math.max(1, images.length)));
  const resized = await Promise.all(
    images.map(async (item) => {
      if (item.dataUrl.length <= perImageBudget) return item;
      try {
        const img = await loadImageElement(item.dataUrl);
        let dim = images.length > 2 ? 960 : 1120;
        let quality = 0.72;
        let nextUrl = renderScaledJpeg(img, dim, quality);
        while (nextUrl.length > perImageBudget && quality > 0.48) {
          quality = Math.max(0.45, Number((quality - 0.1).toFixed(2)));
          dim = Math.min(dim, 880);
          nextUrl = renderScaledJpeg(img, dim, quality);
        }
        return { ...item, dataUrl: nextUrl, mimeType: 'image/jpeg' };
      } catch {
        return item;
      }
    })
  );
  return resized;
}

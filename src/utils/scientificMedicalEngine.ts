import {
  TUNG_POINTS,
  TUNG_FORMULAS,
  WHO_EXTRA_POINTS,
  CLASSICAL_ACUPUNCTURE_PROTOCOLS,
  TUNG_APPENDICES,
  TungPoint,
  TungFormula,
  WhoExtraPoint,
  ClassicalProtocol
} from '../data/tungPoints';
import { HERBAL_MATERIA, Herb } from '../data/herbalMateria';
import { WESTERN_DRUGS_DATABASE, WesternDrug } from '../data/westernDrugs';
import { WESTERN_DISEASES, WesternDisease } from '../data/westernDiseases';
import { TCM_SYNDROMES, TcmSyndrome } from '../data/tcmSyndromes';
import { MEDICAL_BOOKS, MedicalBook } from '../data/medicalBooks';
import { PatientInfo, Vitals, Symptoms, FourExaminations, DiagnosisResult } from '../types';

export interface MatchedMedicalKnowledge {
  tungPoints: TungPoint[];
  tungFormulas: TungFormula[];
  whoPoints: WhoExtraPoint[];
  classicalProtocols: ClassicalProtocol[];
  herbs: Herb[];
  westernDrugs: WesternDrug[];
  westernDiseases: WesternDisease[];
  tcmSyndromes: TcmSyndrome[];
  books: MedicalBook[];
}

// Normalize Vietnamese string for accent-insensitive and case-insensitive matching
export function normalizeVi(str: string): string {
  let s = (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9.\-\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Normalize common clinical typos and synonyms
  return s
    .replace(/\bguot\b/g, 'gout')
    .replace(/\bgut\b/g, 'gout')
    .replace(/\bthoat vi\b/g, 'thoat vi dia dem')
    .replace(/\bkhop goi\b/g, 'thoai hoa khop goi')
    .replace(/\btrao nguoc\b/g, 'trao nguoc da day')
    .replace(/\btai bien\b/g, 'tai bien mach mau nao')
    .replace(/\bdot quy\b/g, 'tai bien mach mau nao');
}

export const SINGLE_COMMON_SYLLABLES = new Set([
  'giai', 'nhan', 'tam', 'tu', 'ngu', 'luc', 'that', 'bat', 'cuu', 'thap',
  'chinh', 'phu', 'trong', 'dia', 'thien', 'hoa', 'thuy', 'moc', 'kim', 'tho',
  'can', 'than', 'ty', 'phe', 'vi', 'dom', 'dai', 'tieu', 'bang',
  'hai', 'quang', 'minh', 'duong', 'am', 'mon', 'khuyet', 'quan', 'khong',
  'vien', 'dinh', 'ha', 'thuong', 'noi', 'ngoai', 'tien', 'hau', 'trung'
]);

const STOP_WORDS = new Set([
  'la', 'gi', 'o', 'dau', 'nhu', 'the', 'nao', 'co', 'tac', 'dung', 'tri', 'benh',
  'chua', 'cham', 'cuu', 'huyet', 'thuoc', 'vi', 'bai', 'phac', 'do', 'va', 'hoac',
  'cua', 'cho', 'nguoi', 'bi', 'khi', 'can', 'nen', 'uong', 'an', 'kieng', 'bao',
  'nhieu', 'lieu', 'luong', 'cach', 'lay', 'vi', 'tri', 'giai', 'phau', 'co', 'che',
  'tai', 'sao', 'vi', 'sao', 'phan', 'biet', 'so', 'sanh', 'voi', 'trong', 'sach',
  'theo', 'dong', 'tay', 'nam', 'y', 'hoc', 'co', 'truyen', 'hien', 'dai', 'hoi',
  'bac', 'si', 'em', 'toi', 'minh', 'anh', 'chi', 'ong', 'ba', 'hay', 'xin', 'cho',
  'biet', 've', 'van', 'de', 'trieu', 'chung', 'dau', 'moi', 'met', 'ngay', 'thang'
]);

export function extractKeywords(query: string): { rawLower: string; norm: string; tokens: string[]; bigrams: string[] } {
  const rawLower = (query || '').toLowerCase().trim();
  const norm = normalizeVi(query);
  const allWords = norm.split(' ').filter(w => w.length >= 2);
  const tokens = allWords.filter(w => !STOP_WORDS.has(w) || /\d/.test(w));

  const bigrams: string[] = [];
  for (let i = 0; i < allWords.length - 1; i++) {
    const bg = `${allWords[i]} ${allWords[i + 1]}`;
    if (!STOP_WORDS.has(allWords[i]) || !STOP_WORDS.has(allWords[i + 1])) {
      bigrams.push(bg);
    }
  }
  return { rawLower, norm, tokens: tokens.length > 0 ? tokens : allWords, bigrams };
}

/**
 * Searches all local medical databases for exact and high-relevance matches to the user's question.
 */
export function retrieveMedicalKnowledge(query: string, bookFilter?: string): MatchedMedicalKnowledge {
  const { rawLower, norm, tokens, bigrams } = extractKeywords(query);

  // 1. Score Tung Points (239 points)
  const scoredTungPoints = TUNG_POINTS.map(pt => {
    let score = 0;
    const nameNorm = normalizeVi(pt.name);
    const vnNameNorm = normalizeVi(pt.vietnameseName);
    const codeLower = pt.code.toLowerCase();
    const locNorm = normalizeVi(pt.location);
    const indNorm = normalizeVi(pt.indications.join(' '));

    const isSingleCommon = SINGLE_COMMON_SYLLABLES.has(nameNorm) || nameNorm.length <= 4;
    if (isSingleCommon) {
      if (rawLower.includes(codeLower) && codeLower.length >= 4) {
        score += 80;
      } else if (norm.includes('huyet ' + nameNorm) || norm.includes(nameNorm + ' huyet')) {
        score += 60;
      } else {
        return { item: pt, score: 0 };
      }
    } else {
      if (rawLower.includes(codeLower) && codeLower.length >= 4) score += 60;
      if (nameNorm.length >= 5 && norm.includes(nameNorm)) score += 50;
      if (vnNameNorm.length >= 5 && norm.includes(vnNameNorm)) score += 50;
      for (const bg of bigrams) {
        if (bg.length >= 5 && nameNorm.includes(bg)) score += 20;
      }
    }

    for (const bg of bigrams) {
      if (bg.length >= 5 && indNorm.includes(bg)) score += 10;
    }
    for (const tk of tokens) {
      if (tk.length >= 4 && indNorm.includes(tk)) score += 3;
    }
    return { item: pt, score };
  })
    .filter(x => x.score >= 20)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(x => x.item);

  // 2. Score Tung Formulas (295 clinical protocols)
  const isEyeQueryNotInsomnia =
    (rawLower.includes('mắt') || rawLower.includes('cận thị') || rawLower.includes('lồi mắt') || rawLower.includes('mắt bị lồi') || norm.includes('mat bi loi') || norm.includes('mat loi') || norm.includes('dien thoai')) &&
    !rawLower.includes('mất ngủ') &&
    !norm.includes('mat ngu') &&
    !norm.includes('kho ngu');

  const scoredTungFormulas = TUNG_FORMULAS.map(fm => {
    let score = 0;
    const disNorm = normalizeVi(fm.diseaseName);
    const notesNorm = normalizeVi(fm.clinicalNotes);
    const ptsNorm = normalizeVi(fm.mainPoints.join(' '));

    if (isEyeQueryNotInsomnia && disNorm.includes('mat ngu')) {
      return { item: fm, score: 0 };
    }

    if (disNorm.length >= 5 && norm.includes(disNorm)) score += 60;
    for (const bg of bigrams) {
      if (bg.length >= 6) {
        if (disNorm.includes(bg)) score += 28;
        if (notesNorm.includes(bg)) score += 10;
        if (ptsNorm.includes(bg)) score += 8;
      }
    }
    for (const tk of tokens) {
      if (tk.length >= 5) {
        if (disNorm.includes(tk)) score += 8;
      }
    }
    return { item: fm, score };
  })
    .filter(x => x.score >= 28)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(x => x.item);

  // 3. Score WHO Extra Points (58 extra points + Á Thị Huyệt)
  const scoredWhoPoints = WHO_EXTRA_POINTS.map(wp => {
    let score = 0;
    const nameNorm = normalizeVi(wp.name);
    const codeNorm = normalizeVi(wp.code);
    const indNorm = normalizeVi(wp.indications.join(' '));
    const actNorm = normalizeVi(wp.actions);

    const isSingleCommon = SINGLE_COMMON_SYLLABLES.has(nameNorm) || nameNorm.length <= 4;
    if (isSingleCommon) {
      if (codeNorm.length >= 4 && norm.includes(codeNorm)) {
        score += 80;
      } else if (norm.includes('huyet ' + nameNorm) || norm.includes(nameNorm + ' huyet')) {
        score += 60;
      } else {
        return { item: wp, score: 0 };
      }
    } else {
      if (codeNorm.length >= 4 && norm.includes(codeNorm)) score += 55;
      if (nameNorm.length >= 5 && norm.includes(nameNorm)) score += 45;
      for (const bg of bigrams) {
        if (bg.length >= 5 && nameNorm.includes(bg)) score += 25;
      }
    }

    for (const bg of bigrams) {
      if (bg.length >= 5 && (indNorm.includes(bg) || actNorm.includes(bg))) score += 10;
    }
    return { item: wp, score };
  })
    .filter(x => x.score >= 20)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(x => x.item);

  // 4. Score Classical Acupuncture Protocols (GS. Nguyễn Tài Thu & Lưu Viêm)
  const scoredClassical = CLASSICAL_ACUPUNCTURE_PROTOCOLS.map(cp => {
    let score = 0;
    const titleNorm = normalizeVi(cp.title);
    const synNorm = normalizeVi(cp.syndrome);
    const ptsNorm = normalizeVi(cp.mainPoints.join(' ') + ' ' + cp.customPointsByType.join(' '));

    for (const bg of bigrams) {
      if (bg.length >= 6) {
        if (titleNorm.includes(bg)) score += 28;
        if (synNorm.includes(bg) || ptsNorm.includes(bg)) score += 12;
      }
    }
    return { item: cp, score };
  })
    .filter(x => x.score >= 25)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(x => x.item);

  // 5. Score Herbal Materia (300 Herbs)
  const scoredHerbs = HERBAL_MATERIA.map(hb => {
    let score = 0;
    const vnNorm = normalizeVi(hb.vietnameseName);
    const pyNorm = normalizeVi(hb.pinyinName);
    const botNorm = normalizeVi(hb.botanicalName);
    const actNorm = normalizeVi(hb.actions.join(' '));
    const indNorm = normalizeVi(hb.clinicalIndications.join(' '));

    if (vnNorm.length >= 3 && norm.includes(vnNorm)) score += 55;
    if (pyNorm.length >= 4 && norm.includes(pyNorm)) score += 45;
    if (botNorm.length >= 5 && norm.includes(botNorm)) score += 45;

    for (const bg of bigrams) {
      if (bg.length >= 5) {
        if (vnNorm.includes(bg)) score += 25;
        if (indNorm.includes(bg) || actNorm.includes(bg)) score += 10;
      }
    }
    for (const tk of tokens) {
      if (tk.length >= 3) {
        if (vnNorm.split(' ').includes(tk)) score += 10;
        if (indNorm.includes(tk) || actNorm.includes(tk)) score += 3;
      }
    }
    return { item: hb, score };
  })
    .filter(x => x.score >= 12)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(x => x.item);

  // 6. Score Western Drugs
  const scoredDrugs = WESTERN_DRUGS_DATABASE.map(dr => {
    let score = 0;
    const actIngNorm = normalizeVi(dr.activeIngredient);
    const brandsNorm = normalizeVi(dr.commonBrandNames.join(' '));
    const indNorm = normalizeVi(dr.indications.join(' '));
    const grpNorm = normalizeVi(dr.groupName);

    if (actIngNorm.length >= 4 && norm.includes(actIngNorm.split(' ')[0])) score += 55;
    for (const b of dr.commonBrandNames) {
      const bNorm = normalizeVi(b);
      if (bNorm.length >= 4 && norm.includes(bNorm)) score += 55;
    }
    for (const bg of bigrams) {
      if (bg.length >= 5) {
        if (indNorm.includes(bg) || grpNorm.includes(bg)) score += 14;
      }
    }
    for (const tk of tokens) {
      if (tk.length >= 3) {
        if (actIngNorm.includes(tk) || brandsNorm.includes(tk)) score += 15;
        if (indNorm.includes(tk)) score += 4;
      }
    }
    return { item: dr, score };
  })
    .filter(x => x.score >= 12)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(x => x.item);

  // 7. Score Western Diseases
  const scoredDiseases = WESTERN_DISEASES.map(ds => {
    let score = 0;
    const viNorm = normalizeVi(ds.nameVi);
    const enNorm = normalizeVi(ds.nameEn);
    const icdNorm = normalizeVi(ds.icd10);
    const mechNorm = normalizeVi(ds.guytonPhysiology.cellularHemodynamicMechanism);

    if (viNorm.length >= 4 && norm.includes(viNorm)) score += 50;
    if (enNorm.length >= 4 && norm.includes(enNorm)) score += 45;
    if (icdNorm.length >= 3 && norm.includes(icdNorm)) score += 45;

    for (const bg of bigrams) {
      if (bg.length >= 5) {
        if (viNorm.includes(bg)) score += 22;
        if (mechNorm.includes(bg)) score += 8;
      }
    }
    for (const tk of tokens) {
      if (tk.length >= 3) {
        if (viNorm.includes(tk)) score += 8;
        if (mechNorm.includes(tk)) score += 3;
      }
    }
    return { item: ds, score };
  })
    .filter(x => x.score >= 10)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(x => x.item);

  // 8. Score TCM Syndromes
  const scoredSyndromes = TCM_SYNDROMES.map(syn => {
    let score = 0;
    const nameNorm = normalizeVi(syn.name);
    const sinoNorm = normalizeVi(syn.sinoVietnamese);
    const formulaNorm = normalizeVi(syn.primaryHerbalFormula.name);
    const sympNorm = normalizeVi(
      `${syn.fourExaminations.vong} ${syn.fourExaminations.van_ask} ${syn.westernCorrelations.diseases.join(' ')}`
    );

    if (nameNorm.length >= 4 && norm.includes(nameNorm)) score += 50;
    if (sinoNorm.length >= 4 && norm.includes(sinoNorm)) score += 50;
    if (formulaNorm.length >= 4 && norm.includes(formulaNorm)) score += 45;

    for (const bg of bigrams) {
      if (bg.length >= 5) {
        if (nameNorm.includes(bg) || sinoNorm.includes(bg)) score += 22;
        if (sympNorm.includes(bg)) score += 12;
      }
    }
    for (const tk of tokens) {
      if (tk.length >= 3) {
        if (nameNorm.includes(tk) || sinoNorm.includes(tk)) score += 8;
        if (sympNorm.includes(tk)) score += 4;
      }
    }
    return { item: syn, score };
  })
    .filter(x => x.score >= 10)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(x => x.item);

  // 9. Score Medical Books
  const filterNorm = bookFilter ? normalizeVi(bookFilter) : '';
  const scoredBooks = MEDICAL_BOOKS.map(bk => {
    let score = 0;
    const titleNorm = normalizeVi(bk.title);
    const authorNorm = normalizeVi(bk.author);
    const topicsNorm = normalizeVi(bk.keyTopics.join(' ') + ' ' + bk.coreConcepts.join(' '));

    if (filterNorm && (titleNorm.includes(filterNorm) || filterNorm.includes(titleNorm))) {
      score += 100;
    }
    if (titleNorm.length >= 5 && norm.includes(titleNorm)) score += 50;
    if (authorNorm.length >= 4 && norm.includes(authorNorm)) score += 40;

    for (const bg of bigrams) {
      if (bg.length >= 5 && (titleNorm.includes(bg) || topicsNorm.includes(bg))) {
        score += 15;
      }
    }
    for (const tk of tokens) {
      if (tk.length >= 3 && (titleNorm.includes(tk) || topicsNorm.includes(tk) || authorNorm.includes(tk))) {
        score += 5;
      }
    }
    return { item: bk, score };
  })
    .filter(x => x.score >= 10)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(x => x.item);

  return {
    tungPoints: scoredTungPoints,
    tungFormulas: scoredTungFormulas,
    whoPoints: scoredWhoPoints,
    classicalProtocols: scoredClassical,
    herbs: scoredHerbs,
    westernDrugs: scoredDrugs,
    westernDiseases: scoredDiseases,
    tcmSyndromes: scoredSyndromes,
    books: scoredBooks
  };
}

/**
 * Builds a structured RAG context block to inject into Gemini API prompts
 * so the LLM answers strictly based on verified scientific and textbook data.
 */
export function buildScientificRagContext(query: string, bookFilter?: string): string {
  const matched = retrieveMedicalKnowledge(query, bookFilter);
  const sections: string[] = [];

  if (matched.books.length > 0) {
    sections.push(
      `[TÀI LIỆU SÁCH Y ĐIỂN LIÊN QUAN TRỰC TIẾP]:\n` +
        matched.books
          .map(
            b =>
              `- Sách "${b.title}" (${b.author}): ${b.summary} | Luận điểm cốt lõi: ${b.coreConcepts.join('; ')} | Giá trị lâm sàng: ${b.clinicalValue}`
          )
          .join('\n')
    );
  }

  if (matched.tungPoints.length > 0) {
    sections.push(
      `[DỮ LIỆU ĐỔNG THỊ KỲ HUYỆT TRONG CƠ SỞ DỮ LIỆU]:\n` +
        matched.tungPoints
          .map(
            p =>
              `- Huyệt ${p.name} (Mã: ${p.code}, ${p.zone}): Vị trí: ${p.location}. Giải phẫu & Quy kinh: ${p.anatomy}. Chủ trị: ${p.indications.join(', ')}. Châm pháp: ${p.needlingMethod}. Động khí & Phối huyệt: ${p.dongQiInstruction}. Cơ chế: ${p.westernMechanism}.`
          )
          .join('\n')
    );
  }

  if (matched.tungFormulas.length > 0) {
    sections.push(
      `[PHÁC ĐỒ LÂM SÀNG ĐỔNG THỊ KỲ HUYỆT]:\n` +
        matched.tungFormulas
          .map(
            f =>
              `- Bệnh danh "${f.diseaseName}" (${f.category}): Huyệt chính: ${f.mainPoints.join(', ')}. Ghi chú châm pháp: ${f.clinicalNotes}.`
          )
          .join('\n')
    );
  }

  if (matched.whoPoints.length > 0) {
    sections.push(
      `[KỲ HUYỆT NGOÀI KINH CHUẨN WHO 1991]:\n` +
        matched.whoPoints
          .map(
            w =>
              `- ${w.name} (${w.code} - ${w.region}): Vị trí: ${w.location}. Công năng: ${w.actions}. Chủ trị: ${w.indications.join(', ')}. Châm cứu: ${w.needling}.`
          )
          .join('\n')
    );
  }

  if (matched.classicalProtocols.length > 0) {
    sections.push(
      `[PHÁC ĐỒ CHÂM CỨU CHỮA BỆNH (GS. NGUYỄN TÀI THU & LƯU VIÊM)]:\n` +
        matched.classicalProtocols
          .map(
            c =>
              `- ${c.title} (${c.source}): Biện chứng: ${c.syndrome}. Huyệt chính: ${c.mainPoints.join('; ')}. Phối huyệt theo thể: ${c.customPointsByType.join(' | ')}. Kỹ thuật Mãng châm/Lưu Viêm: ${c.mangChamTechnique}.`
          )
          .join('\n')
    );
  }

  if (matched.herbs.length > 0) {
    sections.push(
      `[DƯỢC LIỆU ĐÔNG - NAM Y (DAN BENSKY & ĐỖ TẤT LỢI)]:\n` +
        matched.herbs
          .map(
            h =>
              `- Vị thuốc ${h.vietnameseName} (${h.pinyinName} / ${h.botanicalName}, Nhóm: ${h.category}): Tính vị quy kinh: ${h.properties.nature}, vị ${h.properties.flavors.join(', ')}, quy kinh ${h.properties.channels.join(', ')}. Liều dùng: ${h.dosageGram}. Công năng: ${h.actions.join('; ')}. Chủ trị: ${h.clinicalIndications.join('; ')}. Chống chỉ định: ${h.contraindications}. Ghi chú khoa học: ${h.benskyNotes}`
          )
          .join('\n')
    );
  }

  if (matched.westernDrugs.length > 0) {
    sections.push(
      `[THUỐC TÂY Y & DƯỢC LÂM SÀNG (DƯỢC THƯ QUỐC GIA VN / DIPIRO / KATZUNG)]:\n` +
        matched.westernDrugs
          .map(
            d =>
              `- Hoạt chất ${d.activeIngredient} (Biệt dược: ${d.commonBrandNames.join(', ')}, Nhóm: ${d.groupName}): Cơ chế phân tử: ${d.mechanismOfAction}. Chỉ định: ${d.indications.join('; ')}. Liều chuẩn: ${d.standardDosage} (${d.administration}). Chống chỉ định: ${d.contraindications.join('; ')}. Thận trọng: ${d.cautions.join('; ')}.`
          )
          .join('\n')
    );
  }

  if (matched.westernDiseases.length > 0) {
    sections.push(
      `[BỆNH HỌC & SINH LÝ HỌC TÂY Y (GUYTON & HALL / ICD-10)]:\n` +
        matched.westernDiseases
          .map(
            ds =>
              `- ${ds.nameVi} (${ds.nameEn}, ICD-10: ${ds.icd10}): Rối loạn nội môi: ${ds.guytonPhysiology.homeostasisDisruption}. Cơ chế tế bào/huyết động: ${ds.guytonPhysiology.cellularHemodynamicMechanism}. Tương ứng Đông y: ${ds.tcmSyndromeCorrespondence}. Cờ đỏ cấp cứu: ${ds.redFlags.join('; ')}.`
          )
          .join('\n')
    );
  }

  if (matched.tcmSyndromes.length > 0) {
    sections.push(
      `[HỘI CHỨNG BIỆN CHỨNG ĐÔNG Y (MACIOCIA)]:\n` +
        matched.tcmSyndromes
          .map(
            s =>
              `- Thể ${s.name} (${s.sinoVietnamese}): Pháp trị: ${s.treatmentPrinciple}. Cổ phương: ${s.primaryHerbalFormula.name} (${s.primaryHerbalFormula.composition.map(c => `${c.herb} ${c.grams}g`).join(', ')}). Huyệt vị: ${s.acupuncturePrescription.classicalPoints.join(', ')} | Đổng Thị: ${s.acupuncturePrescription.tungPoints.join(', ')}.`
          )
          .join('\n')
    );
  }

  if (sections.length === 0) {
    return '';
  }

  return `\n=== DỮ LIỆU KHOA HỌC TRÍCH XUẤT TRỰC TIẾP TỪ CƠ SỞ DỮ LIỆU Y ĐIỂN CỦA HỆ THỐNG ===\n${sections.join('\n\n')}\n========================================================================\n`;
}

const DISEASE_QUERY_KEYWORDS = [
  'mat bi loi', 'loi mat', 'mat loi', 'can thi', 'vien thi', 'loan thi', 'moi mat', 'kho mat', 'mo mat', 'nhin mo', 'dau mat', 'nhuc mat', 'xem dien thoai', 'anh sang xanh', 'duc thuy tinh', 'tang nhan ap', 'glocom', 'thoai hoa diem vang', 'viem ket mac', 'sup mi',
  'gout', 'thong phong', 'uric', 'podagra', 'tophi',
  'tieu duong', 'dai thao duong', 'duong huyet', 'hba1c', 'tieu khat',
  'huyet ap', 'tang huyet ap', 'tai bien', 'dot quy', 'liet nua nguoi', 'nhoi mau nao', 'xuat huyet nao',
  'than kinh toa', 'thoat vi', 'dau lung', 'cot song', 'gai cot song', 'l4', 'l5', 's1',
  'vai gay', 'co vai gay', 'lac cham', 'te tay', 'ong co tay',
  'khop goi', 'thoai hoa khop', 'luc cuc', 'viem khop',
  'da day', 'trao nguoc', 'gerd', 'o chua', 'thuong vi', 'viem loet', 'dai trang', 'ruot kich thich', 'tao bon', 'tieu chay',
  'mat ngu', 'kho ngu', 'lo au', 'suy nhuoc than kinh', 'tien dinh', 'chong mat', 'dau dau', 'dau nua dau',
  'viem xoang', 'viem mui', 'nghet mui', 'di ung', 'me day', 'cham ', 'vay nen', 'zona',
  'viem gan', 'men gan', 'gan nhiem mo', 'xo gan',
  'suy than', 'soi than', 'than hu', 'tieu dem', 'tieu buot', 'tien liet tuyen', 'yeu sinh ly',
  'dau bung kinh', 'thong kinh', 'roi loan kinh nguyet', 'buong trung', 'u xo',
  'ho ', 'viem phe quan', 'hen suyen', 'viem hong', 'viem phoi',
  'dau rang', 'nha chu', 'day v', 'liet mat', 'day vii',
  'tuyen giap', 'cuong giap', 'suy giap', 'basedow', 'buou co', 'nhan tuyen giap',
  'mo mau', 'cholesterol', 'triglyceride', 'mach vanh', 'suy tim', 'dau that nguc', 'tim dap nhanh',
  'sot xuat huyet', 'cam cum', 'sot sieu vi', 'u tai', 'diec tai', 'viem tai'
];

function isClinicalDiseaseQuery(norm: string): boolean {
  // If user is explicitly asking only for a point code (e.g., 22.05, 77.18, EX-HN5) or "huyet X nam o dau"
  if (/\b\d{2}\.\d{2}\b/.test(norm)) return false;
  if ((norm.startsWith('huyet ') || norm.includes('vi tri huyet') || norm.includes('cach cham huyet')) && !norm.includes('benh') && !norm.includes('chua')) {
    return false;
  }
  if (
    norm.includes('giai doan') ||
    norm.includes('nguyen nhan') ||
    norm.includes('la benh gi') ||
    norm.includes('benh gi') ||
    norm.includes('cach chua') ||
    norm.includes('chua duoc') ||
    norm.includes('co chua') ||
    norm.includes('co khoi') ||
    norm.includes('chua khoi') ||
    norm.includes('dieu tri') ||
    norm.includes('phac do') ||
    norm.includes('trieu chung') ||
    norm.includes('dau hieu') ||
    norm.includes('lam sao')
  ) {
    return true;
  }
  return DISEASE_QUERY_KEYWORDS.some(kw => norm.includes(kw));
}

function formatDoctorDiseaseConsultation(spec: ClinicalSpec, query: string, bookFilter?: string): string {
  const directAnswerBlock = spec.directAnswer
    ? `TRẢ LỜI TRỰC TIẾP CÂU HỎI CỦA BẠN: "${query.trim()}"\n${spec.directAnswer}\n\n---\n\n`
    : `TRẢ LỜI TRỰC TIẾP CÂU HỎI CỦA BẠN: "${query.trim()}"\n• Chẩn đoán & Kết luận chuyên môn: ${spec.summary}\n• Tiên lượng & Hướng xử trí: Bệnh lý này hoàn toàn có thể kiểm soát, cải thiện triệu chứng và ngăn ngừa biến chứng hiệu quả khi phối hợp đúng phác đồ Tây y (kiểm soát cơ chế sinh lý bệnh), Đông y (biện chứng điều hòa Tạng phủ - Khí huyết) và Châm cứu - Dưỡng sinh dưới đây.\n\n---\n\n`;

  const stagesSection =
    spec.clinicalStages && spec.clinicalStages.length > 0
      ? `\n#### 2. CÁC GIAI ĐOẠN TIẾN TRIỂN CỦA BỆNH (PHÂN ĐỘ LÂM SÀNG CHUẨN Y KHOA)\n` +
        `Bệnh tiến triển qua **${spec.clinicalStages.length} giai đoạn lâm sàng** rõ rệt:\n` +
        spec.clinicalStages.map((st, idx) => `${idx + 1}. ${st}`).join('\n') +
        `\n- **Cận lâm sàng & Xét nghiệm chẩn đoán xác định:** ${spec.investigations.join(' | ')}.\n- **Chẩn đoán phân biệt:** ${spec.differentialDiagnoses.join('; ')}.`
      : `\n#### 2. CHẨN ĐOÁN CẬN LÂM SÀNG & PHÂN BIỆT\n` +
        `- **Xét nghiệm & Chẩn đoán hình ảnh cần làm:** ${spec.investigations.join(' | ')}.\n` +
        `- **Chẩn đoán phân biệt:** ${spec.differentialDiagnoses.join('; ')}.`;

  const causesList =
    spec.causesAndRiskFactors && spec.causesAndRiskFactors.length > 0
      ? `\n- **Nguyên nhân & Yếu tố nguy cơ cốt lõi:**\n` + spec.causesAndRiskFactors.map(c => `  - ${c}`).join('\n')
      : '';

  return `${directAnswerBlock}HỘI CHẨN CHUYÊN KHOA: ${spec.westernDisease.toUpperCase()} (ICD-10: ${spec.icd10})

1. ĐỊNH NGHĨA BỆNH LÝ, NGUYÊN NHÂN & CƠ CHẾ BỆNH SINH
• Định nghĩa & Bản chất bệnh lý: ${spec.clinicalDefinition || spec.summary}${causesList}
• Cơ chế sinh lý bệnh: ${spec.pathophysiology}

---
${stagesSection}

---

#### 3. PHÁC ĐỒ ĐIỀU TRỊ TÂY Y CHUẨN LÂM SÀNG (DIPIRO, KATZUNG & DƯỢC THƯ QUỐC GIA VN)
- **Phác đồ áp dụng:** **${spec.protocolName}** (*Nguồn: ${spec.sourceGuidelines.join(', ')}*)
${spec.drugs
  .map(
    (d, idx) =>
      `${idx + 1}. **${d.name}** (*Hoạt chất: ${d.activeIngredient}* — Nhóm: ${d.group}):\n` +
      `   - **Liều dùng & Cách uống:** ${d.dosage} — *${d.usage}*\n` +
      `   - **Cơ chế tác dụng phân tử:** ${d.mechanism}\n` +
      `   - **Chống chỉ định & Thận trọng:** ${d.caution}`
  )
  .join('\n')}

---

#### 4. BIỆN CHỨNG ĐÔNG Y & BÀI THUỐC CỔ PHƯƠNG - NAM DƯỢC ĐẶC TRỊ (MACIOCIA & DAN BENSKY)
- **Định danh thể bệnh Đông Y:** **${spec.easternSyndrome}** (Tạng phủ liên đới: *${spec.tangPhu}* — Bát cương: *${spec.batCuong}*).
- **Cơ chế bệnh sinh Y Học Cổ Truyền:** ${spec.easternExplanation}
- **Tứ chẩn (Lưỡi & Mạch):** ${spec.thietChanAnalysis}
- **Pháp trị:** **${spec.phapTri}**
- **Phương thang đặc trị (${spec.formulaName}):**
${spec.herbs.map(h => `  - **${h.name}** (\`${h.amount}\` — Vai trò: **${h.role}**): ${h.purpose}`).join('\n')}
- **Cách sắc uống & Vận dụng:** ${spec.howToUse}

---

#### 5. PHÁC ĐỒ CHÂM CỨU ĐỔNG THỊ KỲ HUYỆT, KỲ HUYỆT WHO & GS. NGUYỄN TÀI THU
- **Tổ hợp Đổng Thị Kỳ Huyệt đặc hiệu (Sổ Tay Đổng Thị Kỳ Huyệt):**
${spec.tungPoints.map(tp => `  - **${tp.name}** (Mã: \`${tp.code}\`): ${tp.howToPress}`).join('\n')}
- **Huyệt Thập Tứ Chính Kinh & Kỳ Huyệt Ngoài Kinh (GS. Nguyễn Tài Thu & Lưu Viêm):**
${spec.classicPoints.map(cp => `  - **${cp.name}** (*${cp.location}*): ${cp.howToPress}`).join('\n')}

---

#### 6. PHÁC ĐỒ DINH DƯỠNG Y HỌC, CHĂM SÓC TẠI NHÀ & CẢNH BÁO CẤP CỨU
- **Thực phẩm nên ăn (Hỗ trợ điều trị):** ${spec.doEat.join('; ')}.
- **Thực phẩm kiêng kỵ (Tránh làm bệnh tái phát/nặng thêm):** ${spec.dontEat.join('; ')}.
- **Hướng dẫn chăm sóc & Dưỡng sinh tại nhà:** ${spec.homeCare}
- **Dấu hiệu Cờ đỏ cần nhập viện ngay (Red Flags):** ${spec.emergencySigns.join('; ')}.
- **Tài liệu y điển trích dẫn:** *${spec.referencedBooks.join(' • ')}*.`;
}

export function cleanMedicalText(raw: string): string {
  if (!raw) return '';
  return raw
    .replace(/https?:\/\/\S+/gi, '')
    .split('\n')
    .map(line => {
      let l = line;
      if (/^\s*([-*_]){3,}\s*$/.test(l)) {
        return '';
      }
      l = l.replace(/^\s*#{1,6}\s+/, '');
      l = l.replace(/^\s*>\s?/, '');
      l = l.replace(/^(\s*)[\*\+]\s+/, '$1• ');
      l = l.replace(/^(\s*)-\s+/, '$1• ');
      l = l.replace(/[#*`]/g, '');
      return l.trimEnd();
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const MEDICAL_ANSWER_CACHE = new Map<string, string>();

/**
 * Generates a strictly relevant, scientific, evidence-based clinical response
 * directly answering the user's exact question using matched database entries
 * and structured medical knowledge.
 */
export function generatePreciseScientificAnswer(query: string, bookFilter?: string): string {
  const norm = normalizeVi(query);
  const cacheKey = `${norm}::${bookFilter || ''}`;
  const cached = MEDICAL_ANSWER_CACHE.get(cacheKey);
  if (cached) return cached;

  const matched = retrieveMedicalKnowledge(query, bookFilter);

  // Priority 1: If the user is asking about a clinical disease, its definition, causes, stages, or treatment
  if (isClinicalDiseaseQuery(norm) && !bookFilter) {
    const spec = matchClinicalDomain(norm, query);
    const out = cleanMedicalText(formatDoctorDiseaseConsultation(spec, query, bookFilter));
    MEDICAL_ANSWER_CACHE.set(cacheKey, out);
    return out;
  }

  // Priority 2: If the user asks about holographic correspondence / palm diagnosis / appendices in Tung's acupuncture
  if (norm.includes('toan tuc') || norm.includes('long ban tay') || norm.includes('canh quang') || norm.includes('thai cuc') || norm.includes('gio kinh')) {
    return cleanMedicalText(
      TUNG_APPENDICES.map(
        app => `${app.title}\nTóm tắt: ${app.summary}\n\n${app.content.map(c => `• ${c}`).join('\n')}`
      ).join('\n\n')
    );
  }

  const hasExactMatches =
    matched.tungPoints.length > 0 ||
    matched.tungFormulas.length > 0 ||
    matched.whoPoints.length > 0 ||
    matched.classicalProtocols.length > 0 ||
    matched.herbs.length > 0 ||
    matched.westernDrugs.length > 0 ||
    matched.westernDiseases.length > 0 ||
    matched.tcmSyndromes.length > 0;

  if (hasExactMatches) {
    const blocks: string[] = [];
    blocks.push(`BÁC SĨ HỘI CHẨN & TRA CỨU Y ĐIỂN TRỰC TIẾP: "${query.trim()}"`);

    if (bookFilter && matched.books.length > 0) {
      const b = matched.books[0];
      blocks.push(
        `Tài liệu tham chiếu chính: ${b.title} — Tác giả: ${b.author} (${b.categoryLabel})\nTrọng tâm học thuật: ${b.summary}`
      );
    }

    // 1. If Tung Points or WHO Extra Points matched
    if (matched.tungPoints.length > 0 || matched.whoPoints.length > 0) {
      const ptLines: string[] = [];
      ptLines.push(`1. ĐỊNH VỊ GIẢI PHẪU, TÍNH HUYỆT & CHÂM PHÁP CHÍNH XÁC`);

      for (const pt of matched.tungPoints) {
        ptLines.push(
          `• Huyệt ${pt.name} (Mã Đổng Thị: ${pt.code} — ${pt.zone}):\n` +
            `  • Định vị & Cách lấy huyệt: ${pt.location}\n` +
            `  • Giải phẫu thần kinh - mạch máu & Lục kinh/Tạng phủ: ${pt.anatomy}\n` +
            `  • Chủ trị lâm sàng: ${pt.indications.join(', ')}.\n` +
            `  • Kỹ thuật châm & Lượng kim: ${pt.needlingMethod}\n` +
            `  • Động khí châm pháp & Phối huyệt: ${pt.dongQiInstruction}\n` +
            `  • Cơ chế sinh lý thần kinh & Toàn tức: ${pt.westernMechanism}` +
            (pt.contraindications ? `\n  • Lưu ý / Cấm kỵ: ${pt.contraindications}` : '')
        );
      }

      for (const wp of matched.whoPoints) {
        ptLines.push(
          `• Kỳ huyệt WHO: ${wp.name} (Mã quốc tế: ${wp.code} — ${wp.region}):\n` +
            `  • Vị trí giải phẫu: ${wp.location}\n` +
            `  • Công năng tác dụng: ${wp.actions}\n` +
            `  • Chủ trị: ${wp.indications.join(', ')}.\n` +
            `  • Phương pháp châm cứu: ${wp.needling}`
        );
      }
      blocks.push(ptLines.join('\n\n'));
    }

    // 2. If Tung Clinical Formulas or Classical Acupuncture Protocols matched
    if (matched.tungFormulas.length > 0 || matched.classicalProtocols.length > 0) {
      const fmLines: string[] = [];
      fmLines.push(`${blocks.length}. PHÁC ĐỒ PHỐI HUYỆT ĐIỀU TRỊ ĐẶC HIỆU TRONG Y ĐIỂN`);

      for (const fm of matched.tungFormulas) {
        fmLines.push(
          `• Phác đồ Đổng Thị trị "${fm.diseaseName}" (${fm.category}):\n` +
            `  • Tổ hợp huyệt chủ đạo: ${fm.mainPoints.join(' + ')}\n` +
            (fm.bloodlettingPoints && fm.bloodlettingPoints.length > 0
              ? `  • Vùng chích lể (Thích huyết): ${fm.bloodlettingPoints.join(', ')}\n`
              : '') +
            `  • Kỹ thuật vận dụng: ${fm.clinicalNotes}\n` +
            `  • Hướng dẫn Động khí: ${fm.dongQiMethod}`
        );
      }

      for (const cp of matched.classicalProtocols) {
        fmLines.push(
          `• Phác đồ Kinh điển: ${cp.title} (${cp.source}):\n` +
            `  • Biện chứng cơ chế: ${cp.syndrome}\n` +
            `  • Huyệt chính: ${cp.mainPoints.join(' | ')}\n` +
            `  • Gia giảm theo thể bệnh: ${cp.customPointsByType.join(' ; ')}\n` +
            `  • Kỹ thuật chuyên sâu (Mãng châm / Thấu huyệt): ${cp.mangChamTechnique}`
        );
      }
      blocks.push(fmLines.join('\n\n'));
    }

    // 3. If Herbs matched
    if (matched.herbs.length > 0) {
      const hbLines: string[] = [];
      hbLines.push(`${blocks.length}. DƯỢC LÝ HỌC THẢO DƯỢC ĐÔNG - NAM Y (DAN BENSKY & ĐỖ TẤT LỢI)`);
      for (const h of matched.herbs) {
        hbLines.push(
          `• ${h.vietnameseName} (${h.botanicalName} — Pinyin: ${h.pinyinName}, Hán tự: ${h.chineseCharacters}):\n` +
            `  • Phân nhóm: ${h.category}\n` +
            `  • Tính vị & Quy kinh: Tính ${h.properties.nature}, vị ${h.properties.flavors.join(', ')} — Quy vào kinh ${h.properties.channels.join(', ')}.\n` +
            `  • Liều lượng tiêu chuẩn: ${h.dosageGram}\n` +
            `  • Công năng: ${h.actions.join('; ')}.\n` +
            `  • Chủ trị lâm sàng: ${h.clinicalIndications.join('; ')}.\n` +
            `  • Chống chỉ định & Thận trọng: ${h.contraindications}\n` +
            `  • Phân tích Dược chất & Lâm sàng (Dan Bensky): ${h.benskyNotes}`
        );
      }
      blocks.push(hbLines.join('\n\n'));
    }

    // 4. If TCM Syndromes matched
    if (matched.tcmSyndromes.length > 0) {
      const synLines: string[] = [];
      synLines.push(`${blocks.length}. BIỆN CHỨNG TẠNG PHỦ & CỔ PHƯƠNG ĐẶC TRỊ (GIOVANNI MACIOCIA)`);
      for (const s of matched.tcmSyndromes) {
        synLines.push(
          `• Hội chứng: ${s.name} (${s.sinoVietnamese} — ${s.englishName}):\n` +
            `  • Căn nguyên & Bệnh cơ: ${s.keyEtiology}\n` +
            `  • Tứ chẩn chuẩn xác: Thiệt chẩn: ${s.tongueSigns.body}, sắc ${s.tongueSigns.color}, rêu ${s.tongueSigns.coating}. Mạch chẩn: ${s.pulseSigns.type} (${s.pulseSigns.description}).\n` +
            `  • Pháp trị: ${s.treatmentPrinciple}\n` +
            `  • Phương thang chuẩn: ${s.primaryHerbalFormula.name} (${s.primaryHerbalFormula.sourceBook}) gồm: ${s.primaryHerbalFormula.composition.map(c => `${c.herb} ${c.grams}g (${c.role} - ${c.note})`).join(', ')}.\n` +
            `  • Đối chiếu Sinh lý học Tây Y (Guyton & Hall): ${s.westernCorrelations.guytonPhysiology}`
        );
      }
      blocks.push(synLines.join('\n\n'));
    }

    // 5. If Western Diseases matched
    if (matched.westernDiseases.length > 0) {
      const dsLines: string[] = [];
      dsLines.push(`${blocks.length}. SINH LÝ BỆNH & CƠ CHẾ Y HỌC HIỆN ĐẠI (GUYTON & HALL / ICD-10)`);
      for (const ds of matched.westernDiseases) {
        dsLines.push(
          `• ${ds.nameVi} (${ds.nameEn} — Mã ICD-10: ${ds.icd10}):\n` +
            `  • Rối loạn cân bằng nội môi (Homeostasis): ${ds.guytonPhysiology.homeostasisDisruption}\n` +
            `  • Cơ chế sinh lý tế bào & Huyết động: ${ds.guytonPhysiology.cellularHemodynamicMechanism}\n` +
            `  • Thông số lâm sàng kiểm soát: ${ds.guytonPhysiology.clinicalParameters.map(p => `${p.name}: bình thường ${p.normalRange} (Cảnh báo: ${p.criticalWarning})`).join(' | ')}\n` +
            `  • Dinh dưỡng y học (Essentials of Nutrition): Ưu tiên ${ds.essentialsOfNutrition.foodsToPrioritize.join(', ')}; Kiêng ${ds.essentialsOfNutrition.foodsToAvoid.join(', ')}.\n` +
            `  • Dấu hiệu Cờ đỏ (Red Flags): ${ds.redFlags.join('; ')}.`
        );
      }
      blocks.push(dsLines.join('\n\n'));
    }

    // 6. If Western Drugs matched
    if (matched.westernDrugs.length > 0) {
      const drLines: string[] = [];
      drLines.push(`${blocks.length}. DƯỢC LÝ LÂM SÀNG TÂY Y (DƯỢC THƯ QUỐC GIA VN, DIPIRO & KATZUNG)`);
      for (const d of matched.westernDrugs) {
        drLines.push(
          `• Hoạt chất: ${d.activeIngredient} (Biệt dược phổ biến: ${d.commonBrandNames.join(', ')}):\n` +
            `  • Nhóm dược lý: ${d.groupName} (${d.categoryName})\n` +
            `  • Cơ chế tác dụng phân tử: ${d.mechanismOfAction}\n` +
            `  • Chỉ định lâm sàng: ${d.indications.join('; ')}.\n` +
            `  • Liều lượng & Cách dùng chuẩn: ${d.standardDosage} — ${d.administration}\n` +
            `  • Chống chỉ định: ${d.contraindications.join('; ')}.\n` +
            `  • Thận trọng & Tương tác thuốc: ${d.cautions.join('; ')}.`
        );
      }
      blocks.push(drLines.join('\n\n'));
    }

    return cleanMedicalText(blocks.join('\n\n'));
  }

  // Specialized clinical analysis based on specific medical domain keywords in the query
  const spec = matchClinicalDomain(norm, query);
  return cleanMedicalText(formatDoctorDiseaseConsultation(spec, query, bookFilter));
}

interface ClinicalSpec {
  directAnswer?: string;
  summary: string;
  clinicalDefinition?: string;
  causesAndRiskFactors?: string[];
  clinicalStages?: string[];
  westernDisease: string;
  icd10: string;
  pathophysiology: string;
  differentialDiagnoses: string[];
  investigations: string[];
  urgency: string;
  easternSyndrome: string;
  batCuong: string;
  khiHuyet: string;
  thietChanAnalysis: string;
  easternExplanation: string;
  tangPhu: string;
  phapTri: string;
  formulaName: string;
  herbs: { name: string; amount: string; grams: number; role: 'Quân' | 'Thần' | 'Tá' | 'Sứ'; purpose: string }[];
  howToUse: string;
  tungPoints: { name: string; code: string; howToPress: string }[];
  classicPoints: { name: string; location: string; howToPress: string }[];
  doEat: string[];
  dontEat: string[];
  homeCare: string;
  protocolName: string;
  sourceGuidelines: string[];
  drugs: {
    name: string;
    activeIngredient: string;
    group: string;
    dosage: string;
    usage: string;
    mechanism: string;
    caution: string;
  }[];
  emergencySigns: string[];
  referencedBooks: string[];
}

function matchClinicalDomain(norm: string, rawText: string): ClinicalSpec {
  // First check if any Tung Formula matches the exact symptom/disease in the user text
  const matchedKnowledge = retrieveMedicalKnowledge(rawText);
  const topTungFormula = matchedKnowledge.tungFormulas[0];
  const topTungPts = matchedKnowledge.tungPoints.slice(0, 3);
  const topHerbs = matchedKnowledge.herbs.slice(0, 4);
  const topDrugs = matchedKnowledge.westernDrugs.slice(0, 3);

  // Build dynamic Tung points list if found in database
  const dbTungPoints =
    topTungPts.length > 0
      ? topTungPts.map(p => ({
          name: `${p.name} (${p.zone})`,
          code: p.code,
          howToPress: `Vị trí: ${p.location}. Châm pháp: ${p.needlingMethod}. Chủ trị: ${p.indications.slice(0, 5).join(', ')}.`
        }))
      : topTungFormula
      ? [
          {
            name: topTungFormula.mainPoints.slice(0, 4).join(', '),
            code: topTungFormula.category,
            howToPress: `${topTungFormula.clinicalNotes} (${topTungFormula.dongQiMethod})`
          }
        ]
      : null;

  // 0. Nhãn khoa / Mắt bị lồi do xem điện thoại ban đêm / Cận thị trục tiến triển / Hội chứng thị giác màn hình (CVS) / Mỏi mắt, khô mắt, mờ mắt
  if (
    norm.includes('mat bi loi') ||
    norm.includes('loi mat') ||
    norm.includes('mat loi') ||
    norm.includes('can thi') ||
    norm.includes('moi mat') ||
    norm.includes('kho mat') ||
    norm.includes('nhuc mat') ||
    norm.includes('mo mat') ||
    norm.includes('nhin mo') ||
    (norm.includes('dien thoai') && norm.includes('mat')) ||
    (norm.includes('ban dem') && norm.includes('mat'))
  ) {
    return {
      directAnswer:
        `• CÓ CHỮA ĐƯỢC KHÔNG? — CÓ THỂ CẢI THIỆN RÕ RỆT VÀ CHẶN ĐỨNG TIẾN TRIỂN, nhưng mức độ hồi phục phụ thuộc vào nguyên nhân gây lồi mắt của bạn thuộc 1 trong 2 cơ chế sau:\n` +
        `  1. Do Co quắp điều tiết, Phù nề cơ vận nhãn & Cận thị giả do xem điện thoại ban đêm (Chiếm >75% người trẻ thức khuya dùng điện thoại): Khi nhìn gần màn hình phát ánh sáng xanh trong bóng tối, đồng tử giãn rộng đón bức xạ năng lượng cao (400–450nm), cơ thể mi (Ciliary muscle) và 6 cơ vận nhãn co thắt liên tục gây ứ trệ tuần hoàn tĩnh mạch hốc mắt, đẩy nhãn cầu nhô nhẹ ra trước kèm sưng hốc mắt, mỏi nhức, khô rát. Tình trạng này HOÀN TOÀN CÓ THỂ HỒI PHỤC sau 4–8 tuần nếu ngưng xem điện thoại trong tối, nhỏ thuốc giãn điều tiết/tái tạo cơ thể mi (Cyanocobalamin 0.02% + Sodium Hyaluronate), kết hợp Châm cứu - Bấm huyệt quanh hốc mắt (Tinh Minh, Toản Trúc, Tứ Bạch, Thái Dương, Đổng Thị Châu Viên & Thượng Tam Hoàng) để giải phóng co cơ và rút dịch ứ hốc mắt.\n` +
        `  2. Do Cận thị trục tiến triển (Axial Myopia — Trục trước-sau nhãn cầu dài > 24mm): Nếu bạn bị cận thị nặng tăng độ nhanh do nhìn gần ban đêm nhiều năm, trục nhãn cầu đã giãn dài về mặt giải phẫu (bình thường 23.5–24mm; cứ tăng 1mm trục nhãn cầu tương ứng ~2.75 Diop cận thị làm mắt nhô ra trước). Phần trục xương/củng mạc đã dài ra không thể tự ngắn lại bằng thuốc uống, nhưng CÓ THỂ CHẶN ĐỨNG 100% không cho lồi thêm và GIẢM ĐỘ LỒI THẨM MỸ RÕ RỆT bằng cách: đeo kính gọng tròng phẳng chiết suất cao (High-Index 1.67/1.74) hoặc kính áp tròng chỉnh hình giác mạc ban đêm (Ortho-K), phẫu thuật khúc xạ (SMILE/LASIK/Phakic ICL) và tập vận nhãn săn chắc cơ thẳng hốc mắt.\n` +
        `  3. Lưu ý chẩn đoán phân biệt quan trọng: Nếu mắt lồi nhanh kèm tim đập nhanh, sụt cân, tay run, đổ mồ hôi nhiều hoặc cổ to, bạn cần xét nghiệm máu FT4, TSH, TRAb để loại trừ Lồi mắt do Cường giáp Basedow (Graves' Ophthalmopathy).`,
      summary: `Hội chứng Thị giác màn hình (Computer/Smartphone Vision Syndrome) & Cận thị trục tiến triển gây lồi mắt cơ năng/cấu trúc do thức khuya xem điện thoại ban đêm; Đông y biện chứng thuộc chứng Can Thận Âm Hư kiêm Can Huyết Hư Hỏa Vượng ("Can khai khiếu ra mắt, Cửu thị thương huyết").`,
      clinicalDefinition:
        'Tình trạng mắt bị lồi, nhức mỏi và nhìn mờ sau thời gian dài xem điện thoại ban đêm là hệ quả cộng hưởng giữa Hội chứng thị giác màn hình (Digital Eye Strain / CVS) và Cận thị trục tiến triển (Axial Myopia). Trong Y Học Cổ Truyền, sách Hoàng Đế Nội Kinh (Tố Vấn) chỉ rõ: "Can khai khiếu ra mắt, Can tàng huyết, mục đắc huyết nhi năng thị" (Mắt nhờ huyết của Can nuôi dưỡng mới nhìn rõ) và "Cửu thị thương huyết" (Nhìn chằm chằm quá lâu làm hao tổn Can huyết, âm hư hỏa vượng đẩy khí hỏa nghịch lên hốc mắt làm nhãn cầu căng tức, lồi nhẹ và khô涩).',
      causesAndRiskFactors: [
        'Xem điện thoại trong phòng tối: Đồng tử giãn tối đa để thu sáng khiến lượng ánh sáng xanh tím (415–455nm) đi thẳng vào hoàng điểm gấp 3–4 lần ban ngày, gây độc quang hóa tế bào biểu mô sắc tố võng mạc (RPE).',
        'Co quắp cơ thể mi (Accommodative Spasm) & Tăng áp lực nội nhãn tạm thời: Nhìn gần ở khoảng cách <30cm kéo dài làm cơ thể mi co cứng, thủy dịch lưu thông kém và trục trước-sau nhãn cầu bị kéo giãn dài ra (Axial elongation).',
        'Giảm tần số chớp mắt từ 16–18 lần/phút xuống chỉ còn 4–6 lần/phút khi nhìn màn hình, làm vỡ màng phim nước mắt (Tear film breakup), gây viêm khô kết-giác mạc và sưng nề mô mỡ quanh hốc mắt.',
        'Đông Y: Thức khuya sau 23h00–03h00 sáng (giờ Đởm và Can làm việc) làm Can âm và Thận tinh không được phục hồi, dẫn đến Can Thận Âm Hư, Hư hỏa bốc lên vùng "Mục hệ" (hệ thống thần kinh - cơ hốc mắt).'
      ],
      clinicalStages: [
        '**Giai đoạn 1 — Co quắp điều tiết & Mỏi mắt kỹ thuật số (Cận thị giả - Pseudomyopia):** Nhức mỏi hốc mắt, nhìn xa mờ sau khi xem điện thoại nhưng nghỉ ngơi thì rõ lại, cảm giác mắt căng tức như muốn lồi ra trước. **Giai đoạn này hồi phục 100%** nếu điều trị đúng.',
        '**Giai đoạn 2 — Biến đổi màng phim nước mắt & Xung huyết cơ vận nhãn:** Mắt khô rát, cộm xốn, đỏ mắt, quầng thâm, mi mắt sưng nề và nhãn cầu bắt đầu nhô nhẹ do ứ huyết tĩnh mạch hốc mắt.',
        '**Giai đoạn 3 — Cận thị trục thực thể tiến triển (Axial Myopia > -3.0D đến -6.0D):** Trục trước-sau nhãn cầu dài từ 25.0mm – 26.5mm (bình thường 23.5–24.0mm), củng mạc mỏng dần, mắt nhìn thấy lồi rõ khi tháo kính.',
        '**Giai đoạn 4 — Cận thị thoái hóa nặng (Pathologic Myopia > -6.0D, trục > 26.5mm):** Nhãn cầu lồi rõ, giãn lồi cực sau (Posterior staphyloma), nguy cơ thoái hóa võng mạc chu biên, hiện tượng ruồi bay (vẩn đục dịch kính) hoặc bong võng mạc.'
      ],
      westernDisease: 'Cận thị trục tiến triển & Hội chứng thị giác màn hình gây lồi mắt (Axial Myopia & Digital Eye Strain / Exophthalmos)',
      icd10: 'H52.1 / H53.1 / H05.2',
      pathophysiology:
        'Theo Guyton & Hall (Textbook of Medical Physiology - The Eye: Optics of Vision): Khi mắt điều tiết nhìn gần liên tục trong điều kiện thiếu sáng, hệ thần kinh phó giao cảm (dây III) kích thích cơ thể mi co thắt kéo dài làm dây chằng Zinn chùng xuống. Đồng thời, sự mất nét chu biên trên võng mạc (Peripheral hyperopic defocus) kích hoạt tín hiệu sinh hóa từ võng mạc đến củng mạc, làm tái cấu trúc sợi Collagen củng mạc, khiến trục nhãn cầu giãn dài theo chiều trước-sau (Axial elongation) và đẩy giác mạc nhô ra trước hốc mắt.',
      differentialDiagnoses: [
        'Lồi mắt do bệnh lý tuyến giáp Basedow (Graves Ophthalmopathy - cần xét nghiệm TSH, FT4, TRAb nếu mắt lồi kèm tim nhanh, sụt cân)',
        'Cận thị giả do co quắp điều tiết (Accommodative spasm)',
        'Tăng nhãn áp góc mở / Tổn thương choán chỗ hốc mắt (nếu chỉ lồi 1 bên mắt)'
      ],
      investigations: [
        'Đo khúc xạ tự động có và không liệt điều tiết (Phân biệt cận thị giả do co quắp cơ thể mi và cận thị thật)',
        'Siêu âm mắt A-scan / IOLMaster đo chiều dài trục nhãn cầu (Axial Length - bình thường 23.5–24.0mm) và độ lồi nhãn cầu (Thước đo Hertel)',
        'Đo nhãn áp (Tonometry) và Soi đáy mắt kiểm tra võng mạc - gai thị',
        'Xét nghiệm máu TSH, FT4, TRAb (Nếu nghi ngờ lồi mắt liên quan tuyến giáp Basedow)'
      ],
      urgency: 'Cần ngưng ngay thói quen xem điện thoại trong bóng tối và khám chuyên khoa Mắt để đo trục nhãn cầu',
      easternSyndrome: 'Can Thận Âm Hư kiêm Can Huyết Hư Hỏa Vượng (Mục Hệ Thất Dưỡng)',
      batCuong: 'Lý - Hư trung hiệp Thực (Can Thận Âm Huyết Hư ở gốc, Hư hỏa & Khí huyết ứ trệ tại Mục hệ ở ngọn) - Nhiệt',
      khiHuyet: 'Can huyết hao tổn, Thận tinh suy giảm, Kinh khí vùng hốc mắt (Túc Thái Dương Bàng Quang, Túc Dương Minh Vị, Túc Thiếu Dương Đởm) ứ trệ',
      thietChanAnalysis: 'Chất lưỡi đỏ ít tân dịch, đầu và rìa lưỡi hơi đỏ, rêu lưỡi mỏng ít; Mạch Huyền Tế hoặc Tế Sác',
      easternExplanation:
        'Theo Đông y, đồng tử thuộc Thận (Thủy luân), lòng đen thuộc Can (Phong luân), hai khóe mắt thuộc Tâm (Huyết luân), mi mắt thuộc Tỳ (Nhục luân), lòng trắng thuộc Phế (Khí luân). Thức khuya xem điện thoại làm hao tổn Can huyết và Thận âm (Thủy không hàm Mộc), khiến Can dương và Hư hỏa bốc lên hốc mắt làm cơ hốc mắt căng cứng, nhãn cầu nhô tức, khô rát và nhìn mờ.',
      tangPhu: 'Can, Thận, Tỳ (Mục hệ - Ngũ luân)',
      phapTri: 'Tư Bổ Can Thận, Dưỡng Huyết Minh Mục, Thanh Can Tiềm Dương, Thông Kinh Hoạt Lạc Vùng Hốc Mắt',
      formulaName: 'Kỷ Cúc Địa Hoàng Hoàn Gia Giảm (Gia Thảo Quyết Minh, Mật Mông Hoa, Đan Sâm)',
      herbs: [
        { name: 'Kỷ tử (Lycium barbarum) & Cúc hoa (Chrysanthemum)', amount: 'Kỷ tử 16g, Cúc hoa 12g', grams: 28, role: 'Quân', purpose: 'Bổ Can Thận âm huyết, thanh Can minh mục, cung cấp Zeaxanthin tự nhiên bảo vệ hoàng điểm và giảm căng tức hốc mắt' },
        { name: 'Thục địa (Rehmannia glutinosa) & Sơn thù du (Cornus officinalis)', amount: 'Thục địa 16g, Sơn thù 12g', grams: 28, role: 'Thần', purpose: 'Tư bổ Thận tinh, điền tinh sinh tủy, nuôi dưỡng dịch kính và võng mạc' },
        { name: 'Thảo quyết minh (Sao vàng) & Mật mông hoa', amount: 'Mỗi vị 12g', grams: 24, role: 'Tá', purpose: 'Thanh Can hỏa, tán phong nhiệt ở mắt, giảm xung huyết và giảm cảm giác căng lồi nhãn cầu' },
        { name: 'Đan sâm (Salvia miltiorrhiza) & Phục linh (Poria cocos)', amount: 'Đan sâm 12g, Phục linh 10g', grams: 22, role: 'Sứ', purpose: 'Hoạt huyết thông mạch vi tuần hoàn đáy mắt, rút dịch phù nề mô quanh hốc mắt và kiện Tỳ' }
      ],
      howToUse: 'Sắc 1 thang/ngày với 1.000ml nước còn 350ml, chia 2 lần uống ấm sau bữa ăn. Có thể hãm trà Kỷ tử (15 hạt) + Cúc hoa vàng (5 bông) + Thảo quyết minh sao (10g) uống hàng ngày.',
      tungPoints: [
        { name: 'Châu Viên (11.12) & Nhị Giác Minh (11.17)', code: '11.12 / 11.17', howToPress: 'Nằm ở ngón cái và ngón giữa. Day bấm hoặc châm nông 0.1–0.2 thốn giúp đặc trị các bệnh về mắt, giảm áp lực hốc mắt, chữa cận thị, mỏi mắt và lồi nhức mắt.' },
        { name: 'Thượng Tam Hoàng (Thiên Hoàng, Minh Hoàng, Kỳ Hoàng)', code: '88.12 - 88.14', howToPress: 'Tổ hợp 3 huyệt đại bổ Can - Thận tại mặt trong đùi. Châm thẳng 1.5–2.0 thốn giúp bổ Can huyết, sáng mắt, trị mắt lồi, khô mắt và mờ mắt do thức khuya.' },
        { name: 'Quang Minh (Đổng Thị) & Mục Nhất - Mục Nhị', code: '77.28 / 66.08 - 66.09', howToPress: 'Day bấm kết hợp Động khí châm pháp: Trong lúc bấm huyệt, nhắm mở mắt chậm rãi và đảo nhãn cầu theo chiều kim đồng hồ 9 vòng rồi ngược lại 9 vòng.' }
      ],
      classicPoints: [
        { name: 'Tinh Minh (BL-1) & Toản Trúc (BL-2)', location: 'Hõm khóe mắt trong (Tinh Minh) và chỗ lõm đầu trong cung lông mày (Toản Trúc)', howToPress: 'Dùng ngón cái và ngón trỏ véo nhẹ và day ấn 2 phút mỗi tối giúp giải phóng cơ thẳng trong, giảm co quắp điều tiết và rút sưng lồi hốc mắt.' },
        { name: 'Ngư Yêu (EX-HN4) & Tứ Bạch (ST-2)', location: 'Chính giữa cung lông mày (Ngư Yêu) và dưới chính giữa mi dưới 1 thốn trong hố dưới ổ mắt (Tứ Bạch)', howToPress: 'Day nhẹ theo vòng tròn quanh hốc mắt 30 vòng giúp tăng tuần hoàn máu động mạch mắt, làm săn cơ vòng mi và giảm lồi mắt cơ năng.' },
        { name: 'Thái Dương (EX-HN5), Phong Trì (GB-20) & Quang Minh (GB-37)', location: 'Hõm thái dương, hõm dưới chẩm sau gáy và mặt ngoài cẳng chân trên mắt cá ngoài 5 thốn', howToPress: 'Day ấn Phong Trì và Quang Minh (huyệt Lạc của kinh Đởm đặc trị bệnh mắt) mỗi bên 2 phút giúp thông mạch máu não - thị giác.' }
      ],
      doEat: [
        'Thực phẩm giàu Lutein, Zeaxanthin & Astaxanthin: Cá hồi, lòng đỏ trứng gà, cải bó xôi (rau chân vịt), bông cải xanh, kỷ tử, việt quất',
        'Thực phẩm giàu Vitamin A & Beta-Carotene: Cà rốt, bí đỏ, gấc, khoai lang nghệ, đu đủ chín',
        'Trà dưỡng mắt hàng ngày: Trà Kỷ tử + Cúc hoa chi + Hạt muồng (Thảo quyết minh sao thơm)'
      ],
      dontEat: [
        'Không uống cà phê đậm, nước tăng lực hoặc trà đặc sau 18h00 gây mất ngủ và tăng áp lực nội nhãn',
        'Hạn chế đồ ăn quá mặn vào buổi tối (gây giữ nước và sưng húp mí mắt/hốc mắt sáng hôm sau)',
        'Kiêng rượu bia, thuốc lá và đồ cay nóng chiên rán làm hao tổn tân dịch gây khô mắt nặng'
      ],
      homeCare:
        '1. TUYỆT ĐỐI NGƯNG xem điện thoại trong phòng tắt đèn tối (luôn bật đèn phòng ấm và bật chế độ Night Shift/Lọc ánh sáng xanh, giữ khoảng cách màn hình >= 35–40cm, không nằm nghiêng xem điện thoại).\n' +
        '2. Áp dụng Quy tắc 20-20-20: Cứ 20 phút nhìn màn hình, nhìn xa 20 feet (6 mét) trong 20 giây để cơ thể mi giãn hoàn toàn.\n' +
        '3. Chườm ấm mắt (40–42°C) 10 phút mỗi tối trước khi ngủ kết hợp bài tập đảo nhãn cầu 4 hướng (Lên - Xuống - Trái - Phải, giữ mỗi hướng 3 giây) và massage 6 huyệt quanh hốc mắt (Tinh Minh -> Toản Trúc -> Ngư Yêu -> Ty Trúc Không -> Thái Dương -> Tứ Bạch) giúp cơ vận nhãn săn chắc và giảm độ lồi rõ rệt sau 4–6 tuần.',
      protocolName: 'Phác đồ Nhãn khoa Giải phóng Co quắp điều tiết, Bảo vệ Võng mạc & Kiểm soát Cận thị trục (AAO & Bộ Y Tế)',
      sourceGuidelines: ['American Academy of Ophthalmology (AAO)', 'Phác đồ Nhãn khoa Bộ Y Tế Việt Nam', 'Dược thư Quốc gia Việt Nam'],
      drugs: [
        {
          name: 'Sancoba 0.02% (Vitamin B12 nhỏ mắt)',
          activeIngredient: 'Cyanocobalamin 0.02%',
          group: 'Thuốc phục hồi điều tiết cơ thể mi & thần kinh thị giác',
          dosage: 'Nhỏ 1–2 giọt/mắt x 3–5 lần/ngày',
          usage: 'Nhỏ trực tiếp vào mắt khi mỏi mắt hoặc sau khi làm việc với màn hình',
          mechanism: 'Tăng cường hô hấp tế bào và tổng hợp ATP tại cơ thể mi (Ciliary muscle), giải phóng tình trạng co quắp điều tiết (Accommodative spasm) gây nhức và lồi tức nhãn cầu',
          caution: 'Thuốc có màu đỏ hồng tự nhiên của Vitamin B12; không dùng chung lọ nhỏ mắt với người khác'
        },
        {
          name: 'Nước mắt nhân tạo Sodium Hyaluronate (Sanlein 0.1% / Hylo-Comod)',
          activeIngredient: 'Sodium Hyaluronate 0.1% - 0.3%',
          group: 'Thuốc bôi trơn & Tái tạo biểu mô giác mạc (Ưu tiên loại không chất bảo quản)',
          dosage: 'Nhỏ 1 giọt/mắt x 4–6 lần/ngày',
          usage: 'Nhỏ trước và sau khi sử dụng điện thoại/máy tính',
          mechanism: 'Liên kết phân tử nước tạo màng phim sinh học bảo vệ biểu mô giác mạc, giảm viêm khô mắt do giảm tần số chớp mắt khi nhìn màn hình ban đêm',
          caution: 'Nên chọn tép đơn liều hoặc lọ không chứa Benzalkonium Chloride (BAK) nếu dùng lâu dài'
        },
        {
          name: 'Viên uống Bảo vệ Hoàng điểm Lutein + Zeaxanthin + Astaxanthin (Ocuvite Lutein / Wit)',
          activeIngredient: 'Lutein 10mg + Zeaxanthin 2mg + Astaxanthin + Vitamin C, E, Kẽm',
          group: 'Dưỡng chất chống oxy hóa võng mạc & Lọc ánh sáng xanh nội sinh',
          dosage: 'Uống 1 viên/ngày',
          usage: 'Uống ngay sau bữa ăn sáng (vì Lutein/Zeaxanthin tan trong dầu)',
          mechanism: 'Tăng mật độ sắc tố hoàng điểm (MPOD), hấp thụ trực tiếp tia sáng xanh năng lượng cao (400–450nm) từ màn hình điện thoại và ngăn ngừa thoái hóa võng mạc - củng mạc',
          caution: 'Sử dụng đều đặn đợt 2–3 tháng kết hợp thay đổi thói quen dùng điện thoại ban đêm'
        }
      ],
      emergencySigns: [
        'Thấy chớp sáng bất thường như tia chớp (Photopsia), mưa bồ hóng/ruồi bay tăng đột ngột hoặc có màn đen che trước mắt (Dấu hiệu bong võng mạc cấp - cần khám cấp cứu Nhãn khoa ngay)',
        'Đau nhức mắt dữ dội lan lên nửa đầu kèm nhìn thấy quầng xanh đỏ quanh bóng đèn và buồn nôn (Cơn tăng nhãn áp cấp - Glaucoma)',
        'Mắt lồi nhanh ở 1 bên hoặc 2 bên kèm nhìn đôi (song thị), không nhắm kín được mi mắt khi ngủ hoặc kèm tim đập nhanh, sụt cân (Lồi mắt Basedow ác tính)'
      ],
      referencedBooks: [
        'Guyton & Hall Textbook of Medical Physiology (The Eye: Optics of Vision)',
        'Sổ Tay Đổng Thị Kỳ Huyệt — Huyệt Nhị Giác Minh, Châu Viên & Thượng Tam Hoàng',
        'Châm Cứu Chữa Bệnh — GS. Nguyễn Tài Thu',
        'The Practice of Chinese Medicine — Giovanni Maciocia',
        'Dược thư Quốc gia Việt Nam & Phác đồ Nhãn khoa Bộ Y Tế'
      ]
    };
  }

  // 1. Đái tháo đường / Tiểu đường / Đường huyết cao
  if (norm.includes('tieu duong') || norm.includes('dai thao duong') || norm.includes('duong huyet') || norm.includes('hba1c') || norm.includes('khat nuoc tieu nhieu') || norm.includes('tieu khat')) {
    return {
      summary: `Bệnh lý Đái tháo đường Type 2 (Rối loạn chuyển hóa Glucose & Đề kháng Insulin), Đông y biện chứng thuộc chứng Tiêu Khát (Thượng - Trung - Hạ tiêu Âm Hư Hỏa Vượng kiêm Khí Âm Lưỡng Hư).`,
      clinicalDefinition: 'Đái tháo đường (Diabetes Mellitus) là bệnh rối loạn chuyển hóa mạn tính đặc trưng bởi tình trạng tăng Glucose huyết tương kéo dài do khiếm khuyết tiết Insulin của tế bào Beta tuyến tụy, đề kháng Insulin tại mô đích hoặc cả hai. Trong Y Học Cổ Truyền, bệnh thuộc phạm vi chứng "Tiêu Khát" (Tam Tiêu: Thượng tiêu khát nhiều, Trung tiêu ăn nhiều mau đói, Hạ tiêu tiểu nhiều).',
      causesAndRiskFactors: [
        'Đề kháng Insulin tại thụ thể màng tế bào cơ vân, mô mỡ và gan kèm suy giảm chức năng tế bào Beta đảo tụy Langerhans.',
        'Chế độ ăn dư thừa Carbohydrate tinh luyện, thực phẩm chỉ số đường huyết (GI) cao, béo phì vùng bụng (mỡ nội tạng) và ít vận động.',
        'Đông Y: Do ăn uống nhiều đồ béo ngọt, rượu bia làm Tỳ Vị tích nhiệt, hoặc tình chí uất ức hóa hỏa thiêu đốt âm dịch của Phế - Vị - Thận.'
      ],
      clinicalStages: [
        '**Giai đoạn 1 — Tiền đái tháo đường (Prediabetes):** Đường huyết lúc đói (FPG) từ 5.6 – 6.9 mmol/L (100 – 125 mg/dL) hoặc HbA1c từ 5.7% – 6.4%. Chưa có triệu chứng rầm rộ nhưng đã có đề kháng Insulin âm thầm.',
        '**Giai đoạn 2 — Đái tháo đường khởi phát / Chưa có biến chứng:** FPG ≥ 7.0 mmol/L (126 mg/dL) hoặc HbA1c ≥ 6.5%. Xuất hiện hội chứng "4 nhiều" (Ăn nhiều, uống nhiều, tiểu nhiều, gầy nhiều).',
        '**Giai đoạn 3 — Giai đoạn biến chứng vi mạch (Microvascular):** Tổn thương võng mạc mắt, bệnh thận đái tháo đường (tiểu Microalbumin) và viêm đa dây thần kinh ngoại biên (tê bì nóng rát bàn chân).',
        '**Giai đoạn 4 — Giai đoạn biến chứng mạch máu lớn & Suy tạng (Macrovascular):** Xơ vữa động mạch vành (nhồi máu cơ tim), đột quỵ não, tắc mạch chi dưới gây loét bàn chân đái tháo đường và suy thận mạn giai đoạn cuối.'
      ],
      westernDisease: 'Đái tháo đường Type 2 (Type 2 Diabetes Mellitus)',
      icd10: 'E11.9',
      pathophysiology: 'Theo Guyton & Hall: Suy giảm độ nhạy của thụ thể Insulin tại màng tế bào cơ vân, mô mỡ và gan (giảm chuyển vị kênh GLUT4), kết hợp suy giảm tiết Insulin pha đầu của tế bào Beta đảo tụy Langerhans gây tăng đường huyết mạn tính và độc tính glucose (Glucotoxicity) lên vi mạch.',
      differentialDiagnoses: ['Đái tháo đường Type 1', 'Tiền đái tháo đường (Rối loạn dung nạp glucose)', 'Đái tháo nhạt trung ương/thận'],
      investigations: ['Đường huyết lúc đói (FPG)', 'HbA1c định kỳ mỗi 3 tháng', 'Tổng phân tích nước tiểu (Tìm Glucose niệu, Microalbumin niệu)', 'Chức năng thận (eGFR, Creatinine) & Bộ mỡ máu'],
      urgency: 'Cần kiểm soát chặt chẽ',
      easternSyndrome: 'Chứng Tiêu Khát - Thể Khí Âm Lưỡng Hư kiêm Táo Nhiệt',
      batCuong: 'Lý chứng, Bản Hư Tiêu Thực (Âm hư là Bản, Táo nhiệt là Tiêu)',
      khiHuyet: 'Tân dịch hao tổn, Phế táo, Vị nhiệt, Thận âm bất túc',
      thietChanAnalysis: 'Chất lưỡi đỏ thon hoặc có vết nứt, ít tân dịch, rêu lưỡi vàng mỏng khô; Mạch Tế Sác vô lực.',
      easternExplanation: 'Phế táo sinh khát nhiều (Thượng tiêu), Vị nhiệt tiêu cốc thiện cơ gây mau đói (Trung tiêu), Thận âm hư không cố nhiếp làm tiểu nhiều đục như mỡ (Hạ tiêu).',
      tangPhu: 'Phế, Tỳ Vị và Thận',
      phapTri: 'Ích khí dưỡng âm, thanh nhiệt sinh tân, bổ thận cố sáp.',
      formulaName: 'Ngọc Dịch Thang hợp Lục Vị Địa Hoàng Hoàn (Y Học Trung Trung Tham Tây Lục & Dan Bensky)',
      herbs: [
        { name: 'Hoàng Kỳ', amount: '20g', grams: 20, role: 'Quân', purpose: 'Đại bổ tỳ phế khí, thăng thanh hóa tân dịch' },
        { name: 'Hoài Sơn (Sơn Dược)', amount: '20g', grams: 20, role: 'Quân', purpose: 'Kiện tỳ cố thận, ức chế hấp thu đường sau ăn' },
        { name: 'Thiên Hoa Phấn', amount: '16g', grams: 16, role: 'Thần', purpose: 'Thanh phế vị nhiệt, sinh tân chỉ khát đặc hiệu' },
        { name: 'Sinh Địa Hoàng', amount: '16g', grams: 16, role: 'Thần', purpose: 'Tư âm lương huyết, tăng độ nhạy insulin' },
        { name: 'Tri Mẫu', amount: '12g', grams: 12, role: 'Tá', purpose: 'Tả vị hỏa, tư thận thủy' },
        { name: 'Cát Căn', amount: '15g', grams: 15, role: 'Tá', purpose: 'Thăng đề tân dịch, cải thiện vi tuần hoàn' },
        { name: 'Ngũ Vị Tử', amount: '6g', grams: 6, role: 'Sứ', purpose: 'Liễm âm sinh tân, cố thận' }
      ],
      howToUse: 'Sắc ngày 1 thang uống ấm chia 2-3 lần sau ăn 1 giờ. Kết hợp hãm trà Dây Thìa Canh hoặc Khổ Qua rừng uống thay nước.',
      tungPoints: [
        { name: 'Hạ Tam Hoàng: Thiên Hoàng Phụ (77.18 - Thận Quan), Địa Hoàng (77.19), Nhân Hoàng (77.21)', code: '77.18 / 77.19 / 77.21', howToPress: 'Tổ hợp huyệt số 1 của Đổng Thị đặc trị chứng Tiêu Khát (Đái tháo đường): Châm thẳng sâu 1.5 - 2 thốn mặt trong xương chày giúp bổ Thận - Tỳ - Can và kích thích tuyến tụy nội tiết.' },
        { name: 'Thổ Thủy (22.11)', code: '22.11', howToPress: 'Châm sát bờ xương bàn ngón tay cái giúp kiện Tỳ Vị, giảm khát nước.' }
      ],
      classicPoints: [
        { name: 'Tụy Du (EX-B3 - Kỳ huyệt WHO)', location: 'Dưới gai đốt sống ngực T8 đo ngang ra 1.5 thốn', howToPress: 'Châm xiên hướng cột sống 0.5-0.8 thốn hoặc cứu ấm giúp điều hòa bài tiết Insulin tuyến tụy.' },
        { name: 'Tam Âm Giao (SP-6) & Thái Khê (KI-3)', location: 'Mặt trong cẳng chân và mắt cá trong', howToPress: 'Châm bổ tư dưỡng Tam Âm (Tỳ, Can, Thận), chống biến chứng tê bì thần kinh ngoại vi.' }
      ],
      doEat: ['Gạo lứt, yến mạch nguyên cám, bún nưa (chỉ số đường huyết GI thấp)', 'Khổ qua (mướp đắng), đậu bắp, bông cải xanh, rau bina', 'Cá biển sâu, ức gà, đậu phụ, hạt chia, quả óc chó'],
      dontEat: ['Cơm trắng quá nhiều, bánh mì trắng, khoai tây nghiền', 'Nước ngọt có ga, trà sữa, bánh kẹo ngọt, trái cây sấy khô', 'Nội tạng động vật, mỡ heo, rượu bia'],
      homeCare: 'Đi bộ nhanh 30 phút sau bữa ăn tối 1 giờ để cơ vân tiêu thụ glucose; kiểm tra bàn chân mỗi tối tránh vết xước nhiễm trùng.',
      protocolName: 'Phác đồ điều trị Đái tháo đường Type 2 (Hướng dẫn ADA 2024 & Bộ Y Tế Việt Nam)',
      sourceGuidelines: ['ADA Standards of Care in Diabetes', 'Hướng dẫn Bộ Y Tế Việt Nam', 'Dược thư Quốc gia VN', 'DiPiro Pharmacotherapy'],
      drugs: [
        {
          name: 'Glucophage XR 500mg - 1000mg',
          activeIngredient: 'Metformin Hydrochloride',
          group: 'Biguanide - Thuốc nền tảng đầu tay chống tăng đường huyết',
          dosage: '500mg - 1000mg x 1-2 lần/ngày',
          usage: 'Uống nguyên viên ngay sau bữa ăn tối (dạng XR) để giảm kích ứng tiêu hóa',
          mechanism: 'Hoạt hóa enzyme AMPK tại gan, ức chế quá trình tân tạo đường tại gan (Gluconeogenesis) và tăng cường thu nhận glucose ngoại vi qua GLUT4 mà không gây hạ đường huyết quá mức.',
          caution: 'Chống chỉ định khi eGFR < 30 mL/phút, suy gan nặng hoặc nhiễm toan ceton.'
        },
        {
          name: 'Forxiga 10mg (hoặc Jardiance 10mg)',
          activeIngredient: 'Dapagliflozin 10mg (hoặc Empagliflozin 10mg)',
          group: 'Thuốc ức chế kênh đồng vận chuyển Natri-Glucose ống thận (SGLT2i)',
          dosage: '10mg x 1 viên/ngày',
          usage: 'Uống vào buổi sáng, trước hoặc sau ăn kèm nhiều nước',
          mechanism: 'Ức chế chọn lọc SGLT2 tại ống lượn gần của thận, ngăn tái hấp thu glucose và tăng đào thải đường trực tiếp qua nước tiểu, đồng thời bảo vệ tim mạch và cầu thận.',
          caution: 'Vệ sinh sạch sẽ đường tiết niệu sinh dục, uống đủ nước tránh mất dịch.'
        }
      ],
      emergencySigns: ['Vã mồ hôi lạnh, run tay chân, đói cồn cào, lú lẫn (Hạ đường huyết cấp < 3.9 mmol/L)', 'Thở nhanh sâu mùi táo chín, khát nước dữ dội, lơ mơ (Nhiễm toan ceton ĐTĐ)'],
      referencedBooks: ['Guyton and Hall Textbook of Medical Physiology', 'The Practice of Chinese Medicine - Giovanni Maciocia', 'Chinese Herbal Medicine: Materia Medica - Dan Bensky', 'Sổ Tay Đổng Thị Kỳ Huyệt', 'Dược thư Quốc gia Việt Nam']
    };
  }

  // 2. Ho / Viêm phế quản / Đau họng / Hen suyễn / Phổi
  if (norm.includes('ho ') || norm.startsWith('ho') || norm.includes('viem phe quan') || norm.includes('dau hong') || norm.includes('viem hong') || norm.includes('hen suyen') || norm.includes('kho tho') || norm.includes('dom ') || norm.includes('phoi')) {
    return {
      summary: `Viêm đường hô hấp / Viêm phế quản co thắt tăng tiết đờm, Đông y biện chứng thuộc chứng Khái Thấu / Háo Suyễn do Phế Khí Nghịch kiêm Đàm Nhiệt hoặc Phong Hàn phạm Phế.`,
      westernDisease: 'Viêm phế quản cấp - mạn / Viêm họng thanh quản / Co thắt phế quản',
      icd10: 'J20.9 / J40 / J02.9',
      pathophysiology: 'Theo Guyton & Hall: Phản ứng viêm niêm mạc cây phế quản kích thích các thụ thể ho (Rapidly Adapting Receptors) dẫn truyền qua dây thần kinh phế vị (dây X) về hành não, đồng thời tăng tiết mucin từ tế bào đài và co thắt cơ trơn phế quản.',
      differentialDiagnoses: ['Viêm phổi cộng đồng', 'Hen phế quản (Asthma)', 'Ho do trào ngược dạ dày thực quản (GERD)'],
      investigations: ['X-quang ngực thẳng', 'Công thức máu (Bạch cầu, CRP)', 'Đo chức năng hô hấp (Spirometry) nếu khó thở kéo dài'],
      urgency: 'Cần điều trị sớm',
      easternSyndrome: 'Chứng Khái Thấu - Đàm Thấp Trở Phế / Phong Nhiệt Phạm Phế',
      batCuong: 'Biểu Lý đồng bệnh, Thực chứng (Phế khí bất tuyên)',
      khiHuyet: 'Phế mất công năng tuyên phát và túc giáng, tân dịch luyện thành đờm',
      thietChanAnalysis: 'Đầu lưỡi hơi đỏ, rêu lưỡi trắng dày nhớt hoặc vàng dính; Mạch Phù Hoạt hoặc Hoạt Sác.',
      easternExplanation: 'Phế chủ khí, tư hô hấp; ngoại tà hoặc đàm trọc bế tắc phế lạc làm phế khí không giáng xuống được mà nghịch lên gây ho, tức ngực và khạc đờm.',
      tangPhu: 'Phế và Tỳ ("Tỳ vi sinh đàm chi nguyên, Phế vi trữ đàm chi khí")',
      phapTri: 'Tuyên phế chỉ khái, hóa đờm bình suyễn, thanh lợi yết hầu.',
      formulaName: 'Chỉ Thấu Tán hợp Nhị Trần Thang gia giảm (Y Học Tâm Ngộ & Dan Bensky)',
      herbs: [
        { name: 'Cát Cánh', amount: '10g', grams: 10, role: 'Quân', purpose: 'Tuyên phế khứ đờm, lợi hầu họng, dẫn thuốc lên Phế' },
        { name: 'Bách Bộ', amount: '12g', grams: 12, role: 'Quân', purpose: 'Nhuận phế hạ khí, giảm phản xạ ho trung ương' },
        { name: 'Tử Uyển & Khoản Đông Hoa', amount: '10g mỗi vị', grams: 10, role: 'Thần', purpose: 'Ôn nhuận phế khí, hóa đờm chỉ khái' },
        { name: 'Trần Bì & Bán Hạ Chế', amount: '8g mỗi vị', grams: 8, role: 'Tá', purpose: 'Táo thấp hóa đờm, lý khí hòa trung' },
        { name: 'Cam Thảo Bắc', amount: '6g', grams: 6, role: 'Sứ', purpose: 'Nhuận phế, làm dịu niêm mạc họng' }
      ],
      howToUse: 'Sắc ngày 1 thang chia 3 lần uống ấm sau ăn. Có thể ngậm thêm tắc (quất) chưng đường phèn, mật ong và gừng ấm.',
      tungPoints: [
        { name: 'Trọng Tử (11.01) & Trọng Tiên (11.02)', code: 'Khu 22 Lòng bàn tay', howToPress: 'Cặp huyệt số 1 của Đổng Thị đặc trị viêm phổi, ho đờm, viêm họng và hen suyễn: Châm thẳng 1 - 1.5 thốn tại ô mô cái lòng bàn tay.' },
        { name: 'Thủy Kim (1010.20) & Thủy Thông (1010.19)', code: '1010.19 / 1010.20', howToPress: 'Châm xiên từ khóe miệng/dưới cằm giúp bổ Thận nạp khí, cắt cơn ho suyễn nghịch khí tức thì.' }
      ],
      classicPoints: [
        { name: 'Thiên Đột (CV-22) & Định Suyễn (EX-B1)', location: 'Hõm trên xương ức & ngang dưới C7 đo ra 0.5 thốn', howToPress: 'Day ấn nhẹ hoặc châm giúp giãn cơ trơn phế quản, hạ khí cắt cơn ho.' },
        { name: 'Liệt Khuyết (LU-7) & Hợp Cốc (LI-4)', location: 'Cổ tay & mu bàn tay', howToPress: 'Tuyên thông Phế khí, giải biểu thanh hầu họng.' }
      ],
      doEat: ['Lê hấp đường phèn và kỷ tử', 'Cháo ấm tía tô hành gừng', 'Mật ong ấm pha chanh đào, củ cải trắng nấu canh'],
      dontEat: ['Nước đá lạnh, kem, đồ uống ướp lạnh', 'Tôm cua vỏ cứng, đồ chiên rán nhiều dầu mỡ gây kích ứng họng', 'Thuốc lá, khói bụi'],
      homeCare: 'Súc họng nước muối ấm 0.9% ngày 3-4 lần; giữ ấm vùng cổ ngực và lòng bàn chân (huyệt Dũng Tuyền) khi ngủ.',
      protocolName: 'Phác đồ điều trị Viêm phế quản & Ho đờm (Hướng dẫn BV Bạch Mai & Dược thư Quốc gia)',
      sourceGuidelines: ['Dược thư Quốc gia Việt Nam', 'Hướng dẫn chẩn đoán và điều trị bệnh hô hấp - Bộ Y Tế', 'The Sanford Guide', 'BNF'],
      drugs: [
        {
          name: 'Acemuc 200mg (hoặc Bisolvon 8mg)',
          activeIngredient: 'Acetylcysteine 200mg (hoặc Bromhexine 8mg)',
          group: 'Thuốc tiêu nhầy, làm loãng đờm (Mucolytic)',
          dosage: '200mg x 3 lần/ngày',
          usage: 'Hòa tan trong 1/2 cốc nước uống sau bữa ăn',
          mechanism: 'Cắt đứt cầu nối disulfide (-S-S-) của chuỗi mucoprotein trong đờm nhầy, làm giảm độ quánh của đờm giúp phản xạ lông chuyển tống đờm ra ngoài dễ dàng.',
          caution: 'Thận trọng ở bệnh nhân có tiền sử co thắt phế quản hoặc loét dạ dày tiến triển.'
        },
        {
          name: 'Telfast 60mg (hoặc Aerius 5mg)',
          activeIngredient: 'Fexofenadine 60mg (hoặc Desloratadine 5mg)',
          group: 'Kháng Histamin H1 thế hệ 2 (Giảm ho kích ứng dị ứng)',
          dosage: '1 viên x 1-2 lần/ngày',
          usage: 'Uống sau ăn với nước lọc',
          mechanism: 'Phong bế chọn lọc thụ thể H1 ngoại vi, giảm phù nề niêm mạc đường hô hấp và giảm phản xạ ho ngứa cổ về đêm.',
          caution: 'Không uống chung với nước cam, bưởi.'
        }
      ],
      emergencySigns: ['Khó thở rút lõm lồng ngực, tím tái môi đầu chi, SpO2 < 92%', 'Ho ra máu tươi hoặc sốt cao rét run trên 39°C không đáp ứng thuốc hạ sốt'],
      referencedBooks: ['Guyton and Hall Textbook of Medical Physiology', 'Chinese Herbal Medicine: Materia Medica - Dan Bensky', 'Sổ Tay Đổng Thị Kỳ Huyệt', 'Châm Cứu Chữa Bệnh - GS. Nguyễn Tài Thu', 'Dược thư Quốc gia Việt Nam']
    };
  }

  // 3. Đau răng / Viêm nha chu / Đau hàm mặt / Đau dây thần kinh số V
  if (norm.includes('dau rang') || norm.includes('nhuc rang') || norm.includes('nha chu') || norm.includes('viem loi') || norm.includes('day v') || norm.includes('quai ham')) {
    return {
      summary: `Đau răng cấp / Viêm quanh chóp răng - nha chu hoặc Đau dây thần kinh sinh ba (Dây V), Đông y biện chứng thuộc chứng Nha Thống do Vị Hỏa Thượng Viêm hoặc Thận Hư Hỏa Vượng.`,
      westernDisease: 'Viêm tủy răng / Viêm nha chu cấp / Đau dây thần kinh sinh ba (Trigeminal Neuralgia)',
      icd10: 'K04.0 / K05.2 / G50.0',
      pathophysiology: 'Theo Guyton & Hall: Phản ứng viêm sung huyết trong buồng tủy kín hoặc mô nha chu giải phóng Bradykinin, Prostaglandin E2 làm tăng áp lực nội tủy, kích thích trực tiếp các sợi thần kinh cảm giác A-delta và C thuộc nhánh hàm trên (V2) hoặc hàm dưới (V3) của dây thần kinh sọ số V.',
      differentialDiagnoses: ['Viêm tủy răng không hồi phục', 'Áp xe quanh chóp răng', 'Đau dây thần kinh số V nguyên phát'],
      investigations: ['Khám nha khoa & Chụp X-quang cận chóp / Panorama răng hàm', 'Gõ răng định vị và thử nghiệm nhiệt tủy'],
      urgency: 'Cần giảm đau và xử trí ổ viêm',
      easternSyndrome: 'Nha Thống - Thể Dương Minh Vị Hỏa Thượng Công / Thận Âm Hư Hỏa Động',
      batCuong: 'Lý chứng, Nhiệt chứng, Thực hỏa hoặc Hư hỏa',
      khiHuyet: 'Kinh Thủ Dương Minh Đại Trường và Túc Dương Minh Vị tích nhiệt bốc lên chân răng',
      thietChanAnalysis: 'Chất lưỡi đỏ, rêu lưỡi vàng khô; Mạch Hồng Sác (Vị hỏa) hoặc Tế Sác (Thận âm hư).',
      easternExplanation: 'Thận chủ cốt, răng là phần thừa của cốt ("Nha vi cốt chi dư"); kinh Dương Minh Vị và Đại Trường đi vào hàm răng trên và dưới. Vị hỏa bốc lên làm sưng lợi đau nhức dữ dội.',
      tangPhu: 'Vị, Đại Trường và Thận',
      phapTri: 'Thanh vị tả hỏa, lương huyết chỉ thống (hoặc Tư âm giáng hỏa).',
      formulaName: 'Thanh Vị Tán (Lan Thất Bí Tàng & Dan Bensky)',
      herbs: [
        { name: 'Thạch Cao sống', amount: '20g', grams: 20, role: 'Quân', purpose: 'Đại thanh nhiệt tả hỏa kinh Dương Minh Vị' },
        { name: 'Hoàng Liên', amount: '8g', grams: 8, role: 'Quân', purpose: 'Tả tâm vị thực hỏa, kháng khuẩn tiêu viêm chân răng' },
        { name: 'Sinh Địa Hoàng', amount: '12g', grams: 12, role: 'Thần', purpose: 'Lương huyết tư âm' },
        { name: 'Đan Bì', amount: '10g', grams: 10, role: 'Tá', purpose: 'Thanh huyết nhiệt, hoạt huyết tiêu sưng lợi' },
        { name: 'Thăng Ma', amount: '6g', grams: 6, role: 'Sứ', purpose: 'Tán hỏa giải độc, dẫn thuốc thẳng tới vùng răng hàm' }
      ],
      howToUse: 'Sắc uống ngày 1 thang chia 2 lần sau ăn. Kết hợp ngậm nước sắc Lá Lốt, Hoa Cúc Áo hoặc Đinh Hương sát khuẩn giảm đau tại chỗ.',
      tungPoints: [
        { name: 'Trắc Tam Lý (77.22) & Trắc Hạ Tam Lý (77.23)', code: '77.22 / 77.23', howToPress: 'Tổ hợp huyệt Đổng Thị số 1 đặc trị đau răng và đau dây thần kinh mặt: Châm bên đối diện vùng răng đau, sâu 1 - 1.5 thốn kết hợp cắn nhẹ hai hàm răng.' },
        { name: 'Linh Cốt (22.05)', code: '22.05', howToPress: 'Châm đối bên để thanh tả hỏa kinh Dương Minh Đại Trường.' }
      ],
      classicPoints: [
        { name: 'Hợp Cốc (LI-4)', location: 'Kẽ xương bàn ngón tay 1 và 2 (châm bên đối diện)', howToPress: 'Day ấn mạnh hoặc châm tả ("Diện khẩu Hợp Cốc thu") giúp cắt cơn đau răng hàm dưới trong 3-5 phút.' },
        { name: 'Giáp Xa (ST-6) & Hạ Quan (ST-7) & Nội Đình (ST-44)', location: 'Góc hàm, trước tai và kẽ ngón chân 2-3', howToPress: 'Nội Đình là Vinh huyệt kinh Vị, châm tả giúp thanh Vị hỏa trị sưng lợi nhức răng hàm trên.' }
      ],
      doEat: ['Cháo đậu xanh, canh rau má, mướp đắng thanh nhiệt', 'Sữa chua, thực phẩm mềm nguội dễ nhai'],
      dontEat: ['Đồ ăn quá nóng hoặc quá lạnh buốt', 'Đồ ngọt bám dính, thịt gà, đồ nếp (khi đang sưng mủ chân răng), rượu bia, ớt cay'],
      homeCare: 'Ngậm nước muối ấm hoặc dung dịch Chlorhexidine 0.12% sau mỗi bữa ăn; chườm mát bên ngoài má vùng sưng đau.',
      protocolName: 'Phác đồ giảm đau kháng viêm Nha chu & Răng hàm mặt (Dược thư Quốc gia VN & Sanford Guide)',
      sourceGuidelines: ['Dược thư Quốc gia Việt Nam', 'The Sanford Guide to Antimicrobial Therapy', 'BNF'],
      drugs: [
        {
          name: 'Efferalgan 500mg (hoặc Ibuprofen 400mg)',
          activeIngredient: 'Paracetamol 500mg (hoặc Ibuprofen 400mg)',
          group: 'Thuốc giảm đau, kháng viêm NSAID',
          dosage: '1 viên x 3 lần/ngày cách mỗi 6 giờ',
          usage: 'Uống ngay sau bữa ăn no',
          mechanism: 'Ức chế enzyme Cyclooxygenase (COX-1/COX-2), ngăn chặn tổng hợp Prostaglandin E2 tại mô tủy và nha chu đang viêm cấp.',
          caution: 'Thận trọng ở người có tiền sử viêm loét dạ dày tá tràng.'
        },
        {
          name: 'Rodogyl (nếu có nhiễm trùng áp xe nha chu)',
          activeIngredient: 'Spiramycin 750.000 IU + Metronidazole 125mg',
          group: 'Kháng sinh phối hợp đặc hiệu vi khuẩn kỵ khí răng miệng',
          dosage: '2 viên/lần x 2-3 lần/ngày trong 5 ngày',
          usage: 'Uống trong bữa ăn',
          mechanism: 'Hiệp đồng tiêu diệt vi khuẩn Gram dương ái khí và vi khuẩn kỵ khí ổ miệng - nha chu.',
          caution: 'Tuyệt đối không uống rượu bia trong khi dùng Metronidazole (tránh hội chứng giống Disulfiram).'
        }
      ],
      emergencySigns: ['Sưng tấy lan rộng vùng sàn miệng, dưới hàm gây khó nuốt, khó thở (Viêm tấy sàn miệng Ludwig)', 'Sốt cao rét run kèm cứng khít hàm không mở miệng được'],
      referencedBooks: ['Sổ Tay Đổng Thị Kỳ Huyệt', 'Cẩm Nang Thực Hành Châm Cứu - Lưu Viêm', 'Chinese Herbal Medicine: Materia Medica - Dan Bensky', 'Dược thư Quốc gia Việt Nam']
    };
  }

  // 4. Đau bụng kinh / Rối loạn kinh nguyệt / Phụ khoa
  if (norm.includes('bung kinh') || norm.includes('kinh nguyet') || norm.includes('thong kinh') || norm.includes('phu khoa') || norm.includes('buong trung') || norm.includes('tu cung') || norm.includes('rong kinh') || norm.includes('khi hu')) {
    return {
      summary: `Đau bụng kinh (Thống kinh) / Rối loạn kinh nguyệt, Đông y biện chứng thuộc chứng Thống Kinh / Kinh Nguyệt Bất Điều do Hàn Ngưng Huyết Ứ hoặc Can Khí Uất Kết tại hai mạch Xung - Nhâm.`,
      westernDisease: 'Thống kinh nguyên phát / Rối loạn kinh nguyệt nội tiết (Dysmenorrhea / Menstrual Disorder)',
      icd10: 'N94.6 / N92.6',
      pathophysiology: 'Theo Guyton & Hall: Sự sụt giảm Progesterone cuối pha hoàng thể kích thích nội mạc tử cung giải phóng nồng độ cao Prostaglandin F2-alpha (PGF2α) và Leukotriene, gây co thắt cường tính cơ trơn tử cung và thiếu máu cục bộ cơ tử cung sinh đau quặn hạ vị.',
      differentialDiagnoses: ['Lạc nội mạc tử cung (Endometriosis)', 'U xơ tử cung (Leiomyoma)', 'Hội chứng buồng trứng đa nang (PCOS)'],
      investigations: ['Siêu âm tử cung - phần phụ', 'Xét nghiệm công thức máu (nếu cường kinh/rong kinh)', 'Nội tiết tố sinh dục (FSH, LH, Estradiol, Prolactin) nếu rối loạn chu kỳ'],
      urgency: 'Cần điều hòa chu kỳ',
      easternSyndrome: 'Thống Kinh - Thể Hàn Thấp Ngưng Trệ / Khí Trệ Huyết Ứ Bào Cung',
      batCuong: 'Lý chứng, Hàn thực hoặc Hư thực thác tạp',
      khiHuyet: 'Huyết ứ tại Bào cung, hai mạch Xung - Nhâm bất thông ("Bất thông tắc thống")',
      thietChanAnalysis: 'Chất lưỡi tím ám hoặc có điểm ứ huyết ở rìa lưỡi, rêu lưỡi trắng mỏng; Mạch Trầm Huyền hoặc Trầm Sáp.',
      easternExplanation: 'Mạch Xung là bể của huyết, mạch Nhâm chủ bào thai; khi hàn tà xâm nhập hoặc can khí uất kết làm huyết hành trệ sáp trong kỳ hành kinh, máu kinh vón cục sẫm màu gây đau quặn bụng dưới.',
      tangPhu: 'Bào Cung, Can, Tỳ và Thận (Mạch Xung - Nhâm)',
      phapTri: 'Ôn kinh tán hàn, hoạt huyết khứ ứ, lý khí điều kinh chỉ thống.',
      formulaName: 'Thiếu Phúc Trục Ứ Thang hoặc Ôn Kinh Thang (Y Lâm Cải Thác / Kim Quỹ Yếu Lược & Dan Bensky)',
      herbs: [
        { name: 'Đương Quy', amount: '12g', grams: 12, role: 'Quân', purpose: 'Bổ huyết hoạt huyết, điều kinh chỉ thống' },
        { name: 'Xuyên Khung', amount: '10g', grams: 10, role: 'Quân', purpose: 'Hành khí trong huyết, khai uất huyết hải' },
        { name: 'Hương Phụ (Chế tứ chế)', amount: '12g', grams: 12, role: 'Thần', purpose: 'Sơ can lý khí, vị thuốc đầu bảng điều kinh phụ nữ' },
        { name: 'Ích Mẫu Thảo', amount: '16g', grams: 16, role: 'Thần', purpose: 'Hoạt huyết khứ ứ, điều hòa co bóp tử cung' },
        { name: 'Ngải Cứu & Tiểu Hồi Hương', amount: '8g mỗi vị', grams: 8, role: 'Tá', purpose: 'Ôn ấm bào cung, tán hàn chỉ thống' },
        { name: 'Bạch Thược', amount: '12g', grams: 12, role: 'Tá', purpose: 'Nhu can dưỡng huyết, giảm co thắt cơ trơn tử cung' }
      ],
      howToUse: 'Sắc uống ngày 1 thang ấm trước kỳ kinh 5-7 ngày cho đến khi sạch kinh.',
      tungPoints: [
        { name: 'Phụ Khoa (11.24) phối Hoàn Sào (11.06)', code: '11.24 / 11.06', howToPress: 'Cặp huyệt "Tả Phụ Hữu Hoàn" kinh điển nhất của Đổng Thị cho mọi bệnh lý Phụ Khoa - Tử Cung - Buồng Trứng: Châm Phụ Khoa bên tay trái và Hoàn Sào bên tay phải.' },
        { name: 'Môn Kim (66.05)', code: '66.05', howToPress: 'Châm mu bàn chân kẽ xương bàn ngón 2-3 giúp cắt cơn đau quặn bụng kinh tức thì trong 3-5 phút.' }
      ],
      classicPoints: [
        { name: 'Tam Âm Giao (SP-6) & Địa Cơ (SP-8)', location: 'Mặt trong cẳng chân (Khích huyệt kinh Tỳ)', howToPress: 'Day ấn hoặc châm cứu ấm giúp điều hòa 3 kinh âm và cắt cơn đau co thắt tử cung.' },
        { name: 'Quan Nguyên (CV-4) & Khí Hải (CV-6)', location: 'Dưới rốn 3 thốn và 1.5 thốn', howToPress: 'Chườm ấm hoặc cứu ngải 15 phút làm ấm Bào cung, tan máu cục.' }
      ],
      doEat: ['Canh ngải cứu nấu trứng gà', 'Trà gừng đường nâu ấm, nghệ vàng, kỷ tử, táo đỏ', 'Thực phẩm giàu sắt và magie (rau bina, cá hồi, sô-cô-la đen)'],
      dontEat: ['Nước đá lạnh, kem, nước dừa tươi, rau má sống trong những ngày hành kinh', 'Đồ ăn chua chát làm co thắt mạch máu tử cung'],
      homeCare: 'Chườm túi ấm 45°C lên vùng bụng dưới rốn 20 phút; giữ ấm bàn chân và thắt lưng trong kỳ kinh.',
      protocolName: 'Phác đồ điều trị Thống kinh & Điều hòa co thắt tử cung (Dược thư Quốc gia VN & DiPiro)',
      sourceGuidelines: ['Dược thư Quốc gia Việt Nam', 'DiPiro Pharmacotherapy', 'BNF'],
      drugs: [
        {
          name: 'Cataflam 25mg - 50mg (hoặc Ponstan 500mg)',
          activeIngredient: 'Diclofenac Potassium (hoặc Mefenamic Acid)',
          group: 'Thuốc kháng viêm NSAID ức chế tổng hợp Prostaglandin nội mạc tử cung',
          dosage: '1 viên x 2 lần/ngày trong 1-3 ngày đầu hành kinh',
          usage: 'Uống ngay sau bữa ăn no khi bắt đầu có dấu hiệu đau bụng kinh',
          mechanism: 'Ức chế trực tiếp COX-1/COX-2 tại nội mạc tử cung, làm giảm nồng độ PGF2α gây co thắt cơ trơn tử cung và giảm lượng máu kinh mất.',
          caution: 'Chống chỉ định loét dạ dày tá tràng tiến triển.'
        },
        {
          name: 'No-Spa 40mg (hoặc Spasmaverine 40mg)',
          activeIngredient: 'Drotaverine HCl 40mg (hoặc Alverine Citrate)',
          group: 'Thuốc chống co thắt cơ trơn hướng cơ (Antispasmodic)',
          dosage: '40mg - 80mg x 2-3 lần/ngày khi đau co thắt',
          usage: 'Uống trước hoặc sau ăn',
          mechanism: 'Ức chế chọn lọc enzyme Phosphodiesterase IV (PDE4), làm tăng nồng độ cAMP nội bào và giãn cơ trơn tử cung mà không gây tác dụng phụ kháng cholinergic.',
          caution: 'Thận trọng khi huyết áp thấp.'
        }
      ],
      emergencySigns: ['Đau bụng dưới dữ dội đột ngột kèm trễ kinh, ra huyết âm đạo bất thường và choáng váng (Nghi ngờ Thai ngoài tử cung vỡ)', 'Băng huyết ồ ạt gây tụt huyết áp, hoa mắt ngất xỉu'],
      referencedBooks: ['Sổ Tay Đổng Thị Kỳ Huyệt', 'Gynecology in Chinese Medicine - Giovanni Maciocia', 'Chinese Herbal Medicine - Dan Bensky', 'Dược thư Quốc gia Việt Nam']
    };
  }

  // 5. Tiết niệu / Thận / Sỏi thận / Tiểu buốt / Tiểu đêm / Tuyến tiền liệt
  if (norm.includes('than ') || norm.includes('tiet nieu') || norm.includes('tieu buot') || norm.includes('tieu rat') || norm.includes('tieu dem') || norm.includes('soi than') || norm.includes('tien liet tuyen') || norm.includes('sinh ly')) {
    return {
      summary: `Bệnh lý Thận - Tiết niệu (Viêm đường tiết niệu / Sỏi tiết niệu / Tiểu đêm do Thận khí suy), Đông y biện chứng thuộc chứng Lâm Chứng (Thấp Nhiệt Hạ Tiêu) hoặc Thận Khí Bất Cố.`,
      westernDisease: 'Nhiễm khuẩn tiết niệu / Sỏi tiết niệu / Hội chứng đường tiểu dưới (LUTS)',
      icd10: 'N39.0 / N20.0 / N40',
      pathophysiology: 'Theo Guyton & Hall: Kích thích cơ học (sỏi) hoặc viêm niêm mạc bàng quang - niệu đạo hoạt hóa thụ thể căng cơ Detrusor và sợi hướng tâm thần kinh chậu, gây phản xạ co bóp bàng quang liên tục (tiểu gấp, tiểu buốt) hoặc giảm bài tiết ADH ban đêm gây tiểu đêm.',
      differentialDiagnoses: ['Viêm bàng quang cấp', 'Sỏi thận - niệu quản', 'Tăng sinh lành tính tuyến tiền liệt (BPH)'],
      investigations: ['Tổng phân tích nước tiểu 10 thông số & Cấy nước tiểu', 'Siêu âm hệ thận - tiết niệu - tiền liệt tuyến', 'Ure, Creatinine huyết thanh'],
      urgency: 'Cần điều trị đúng nguyên nhân',
      easternSyndrome: 'Lâm Chứng (Bàng Quang Thấp Nhiệt) / Thận Khí Hư Bất Cố',
      batCuong: 'Lý chứng (Thấp nhiệt hạ tiêu hoặc Thận dương/khí hư)',
      khiHuyet: 'Khí hóa Bàng quang rối loạn, Thận mất quyền đóng mở (Khath-Hợp)',
      thietChanAnalysis: 'Gốc lưỡi rêu vàng nhờn (Thấp nhiệt) hoặc lưỡi nhạt bệu rêu trắng (Thận hư); Mạch Hoạt Sác hoặc Trầm Tế ở bộ Xích.',
      easternExplanation: 'Thận chủ thủy, có quan hệ biểu lý với Bàng quang; thấp nhiệt dồn xuống hạ tiêu nung nấu dịch niệu kết thành sỏi hoặc gây tiểu buốt rắt; nếu Thận dương hư không khí hóa được bàng quang sẽ sinh tiểu đêm nhiều lần.',
      tangPhu: 'Thận và Bàng Quang',
      phapTri: 'Thanh nhiệt lợi thấp, thông lâm bài thạch (hoặc Ôn thận cố sáp).',
      formulaName: 'Bát Chính Tán hoặc Kim Quỹ Thận Khí Hoàn (Hòa Tễ Cục Phương / Kim Quỹ Yếu Lược)',
      herbs: [
        { name: 'Kim Tiền Thảo', amount: '24g', grams: 24, role: 'Quân', purpose: 'Thanh thấp nhiệt, lợi niệu bài thạch (bào mòn sỏi tiết niệu)' },
        { name: 'Xa Tiền Tử (Hạt mã đề)', amount: '12g', grams: 12, role: 'Quân', purpose: 'Lợi thủy thông lâm, thanh nhiệt bàng quang' },
        { name: 'Hoạt Thạch', amount: '12g', grams: 12, role: 'Thần', purpose: 'Thông lợi thủy đạo, giảm buốt rắt' },
        { name: 'Phục Linh & Trạch Tả', amount: '12g mỗi vị', grams: 12, role: 'Tá', purpose: 'Thẩm thấp lợi niệu, kiện tỳ bổ thận' },
        { name: 'Râu Ngô & Bông Mã Đề (Nam dược)', amount: '15g', grams: 15, role: 'Sứ', purpose: 'Lợi tiểu mát thận tự nhiên' }
      ],
      howToUse: 'Sắc uống ngày 1 thang chia 3 lần. Nếu có sỏi hoặc viêm tiết niệu cần uống đủ 2 - 2.5 lít nước ấm/ngày.',
      tungPoints: [
        { name: 'Hạ Tam Hoàng: Thận Quan (77.18), Địa Hoàng (77.19), Nhân Hoàng (77.21)', code: '77.18 - 77.21', howToPress: 'Tổ hợp đại bổ Thận và thông lợi đường tiết niệu số 1 của Đổng Thị: Châm mặt trong cẳng chân sâu 1.5 - 2 thốn.' },
        { name: 'Trung Bạch (22.06) & Hạ Bạch (22.07)', code: '22.06 / 22.07', howToPress: 'Châm mu bàn tay kẽ xương bàn ngón 4-5 giúp kiện Thận, trị đau mỏi lưng thận và tiểu đêm.' }
      ],
      classicPoints: [
        { name: 'Thận Du (BL-23) & Bàng Quang Du (BL-28)', location: 'Vùng thắt lưng và xương cùng', howToPress: 'Day ấn hoặc cứu ấm giúp tăng cường chức năng lọc cầu thận và điều hòa cơ vòng bàng quang.' },
        { name: 'Trung Cực (CV-3) & Âm Lăng Tuyền (SP-9)', location: 'Trên xương mu 1 thốn & mặt trong đầu gối', howToPress: 'Mộ huyệt của Bàng quang kết hợp Hợp huyệt kinh Tỳ giúp thanh thấp nhiệt hạ tiêu, hết tiểu buốt.' }
      ],
      doEat: ['Nước râu ngô, bông mã đề, bí đao luộc (nếu thấp nhiệt/tiểu buốt)', 'Hạt sen, củ mài (Hoài sơn), cật heo hầm đỗ trọng (nếu tiểu đêm do thận hư)'],
      dontEat: ['Đồ ăn quá mặn (tăng gánh nặng lọc cầu thận và giữ nước)', 'Rau muống, trà đặc, thực phẩm giàu oxalat (nếu có sỏi thận)', 'Rượu bia, ớt cay nóng'],
      homeCare: 'Không nhịn tiểu; nếu tiểu đêm thì hạn chế uống nhiều nước hoặc ăn canh sau 20h tối, ngâm chân nước ấm trước khi ngủ.',
      protocolName: 'Phác đồ điều trị Bệnh lý Tiết niệu (The Sanford Guide & Dược thư Quốc gia VN)',
      sourceGuidelines: ['The Sanford Guide to Antimicrobial Therapy', 'Dược thư Quốc gia Việt Nam', 'Hướng dẫn Bộ Y Tế'],
      drugs: [
        {
          name: 'Rowatinex (nếu có sỏi / co thắt tiết niệu)',
          activeIngredient: 'Hỗn hợp Terpene tinh khiết (Pinene, Camphene, Cineol, Borneol)',
          group: 'Thuốc chống co thắt đường tiết niệu và hỗ trợ tống sỏi',
          dosage: '1 - 2 viên x 3 lần/ngày',
          usage: 'Uống trước bữa ăn 30 phút với nhiều nước',
          mechanism: 'Giãn cơ trơn niệu quản, tăng lưu lượng máu qua thận, tăng bài tiết nước tiểu và ức chế hình thành tinh thể sỏi calci.',
          caution: 'Uống kèm nhiều nước lọc trong ngày.'
        },
        {
          name: 'No-Spa 40mg',
          activeIngredient: 'Drotaverine 40mg',
          group: 'Thuốc giãn cơ trơn giảm đau quặn thận - bàng quang',
          dosage: '1 - 2 viên x 2-3 lần/ngày khi đau buốt',
          usage: 'Uống sau ăn',
          mechanism: 'Ức chế PDE4 làm giãn cơ trơn đường tiết niệu, giảm cơn đau quặn và mót tiểu gấp.',
          caution: 'Thận trọng khi huyết áp thấp.'
        }
      ],
      emergencySigns: ['Sốt cao rét run kèm đau tức dữ dội hố thắt lưng (Viêm đài bể thận cấp / Thận ứ mủ)', 'Bí tiểu hoàn toàn hoặc tiểu ra máu tươi toàn bãi'],
      referencedBooks: ['Guyton and Hall Textbook of Medical Physiology', 'Sổ Tay Đổng Thị Kỳ Huyệt', 'Chinese Herbal Medicine - Dan Bensky', 'Dược thư Quốc gia Việt Nam']
    };
  }

  // 6. Gan mật / Men gan cao / Viêm gan / Mẩn ngứa mề đay / Dị ứng da liễu
  if (norm.includes('gan ') || norm.includes('men gan') || norm.includes('viem gan') || norm.includes('me day') || norm.includes('di ung') || norm.includes('ngua') || norm.includes('cham ') || norm.includes('vay nen') || norm.includes('mun nhot') || norm.includes('zona')) {
    return {
      summary: `Bệnh lý Gan mật / Dị ứng da liễu (Tăng men gan, Mề đay dị ứng, Viêm da cơ địa), Đông y biện chứng thuộc chứng Can Đởm Thấp Nhiệt hoặc Phong Thấp Nhiệt Huyết Nhiệt sinh Phong.`,
      westernDisease: 'Tổn thương tế bào gan / Mề đay dị ứng cấp - mạn (Urticaria / Hepatic Dysfunction)',
      icd10: 'K76.9 / L50.9',
      pathophysiology: 'Theo Guyton & Hall: Tổn thương màng tế bào gan làm phóng thích enzyme transaminase (AST, ALT) vào máu, giảm khả năng khử độc qua hệ Cytochrome P450; hoặc phản ứng quá mẫn qua trung gian IgE kích hoạt tế bào Mast giải phóng Histamine gây giãn mạch, tăng tính thấm thành mạch tạo sẩn phù ngứa.',
      differentialDiagnoses: ['Viêm gan siêu vi B/C hoặc gan nhiễm mỡ', 'Mề đay vô căn mạn tính', 'Viêm da tiếp xúc dị ứng / Zona thần kinh'],
      investigations: ['Xét nghiệm chức năng gan: AST, ALT, GGT, Bilirubin', 'HBsAg, Anti-HCV & Siêu âm gan mật', 'Công thức máu (Bạch cầu ái toan Eosinophil, IgE toàn phần)'],
      urgency: 'Cần thanh giải độc tố & kiểm soát viêm',
      easternSyndrome: 'Can Đởm Thấp Nhiệt / Huyết Nhiệt Sinh Phong (Phong chẩn khối)',
      batCuong: 'Lý nhiệt kiêm Biểu phong, Thực chứng',
      khiHuyet: 'Thấp nhiệt uất kết tại Can Đởm, hoặc huyết nhiệt gặp phong tà phát ra cơ biểu',
      thietChanAnalysis: 'Chất lưỡi đỏ, rêu lưỡi vàng dày hoặc vàng nhớt; Mạch Huyền Sác hoặc Phù Sác.',
      easternExplanation: 'Can chủ sơ tiết và tàng huyết; khi thấp nhiệt ứ đọng ở kinh Can Đởm hoặc huyết phận có nhiệt kết hợp phong tà ngoài bì phu sẽ gây ngứa ngáy, nổi mẩn đỏ, miệng đắng, sườn tức và vàng tiểu.',
      tangPhu: 'Can, Đởm, Tỳ và Phế (Phế chủ bì mao)',
      phapTri: 'Thanh can lợi đởm, lương huyết tiêu phong, giải độc trừ thấp.',
      formulaName: 'Long Đởm Tả Can Thang hoặc Tiêu Phong Tán (Y Phương Tập Giải & Dan Bensky)',
      herbs: [
        { name: 'Diệp Hạ Châu (Chó đẻ răng cưa) & Cà Gai Leo', amount: '16g mỗi vị', grams: 16, role: 'Quân', purpose: 'Bảo vệ tế bào gan, hạ men gan, giải độc kháng siêu vi (Nam dược Đỗ Tất Lợi)' },
        { name: 'Nhân Trần & Chi Tử', amount: '12g mỗi vị', grams: 12, role: 'Quân', purpose: 'Thanh can đởm thấp nhiệt, lợi mật thoái hoàng' },
        { name: 'Kim Ngân Hoa & Liên Kiều', amount: '12g mỗi vị', grams: 12, role: 'Thần', purpose: 'Thanh nhiệt giải độc, tiêu ban ngứa mề đay' },
        { name: 'Kinh Giới & Phòng Phong', amount: '10g mỗi vị', grams: 10, role: 'Tá', purpose: 'Thấu biểu khu phong chỉ ngứa' },
        { name: 'Sinh Địa & Đương Quy', amount: '12g mỗi vị', grams: 12, role: 'Sứ', purpose: 'Dưỡng huyết lương huyết ("Trị phong tiên trị huyết, huyết hành phong tự diệt")' }
      ],
      howToUse: 'Sắc uống ngày 1 thang chia 2 lần sau ăn ấm.',
      tungPoints: [
        { name: 'Thượng Tam Hoàng: Minh Hoàng (88.12), Thiên Hoàng (88.13), Kỳ Hoàng (88.14)', code: '88.12 / 88.13 / 88.14', howToPress: 'Tổ hợp huyệt số 1 của Đổng Thị đặc trị mọi bệnh lý Gan - Mật (Viêm gan, xơ gan, men gan cao, mệt mỏi): Châm mặt trong đùi sâu 1.5 - 2.5 thốn.' },
        { name: 'Tứ Mã: Tứ Mã Trung (88.17), Tứ Mã Thượng (88.18), Tứ Mã Hạ (88.19)', code: '88.17 - 88.19', howToPress: 'Tổ hợp huyệt Đổng Thị số 1 đặc trị mọi bệnh ngoài da, dị ứng, mề đay, vẩy nến, mụn nhọt: Châm mặt ngoài đùi sâu 1.5 - 2 thốn.' }
      ],
      classicPoints: [
        { name: 'Huyết Hải (SP-10) & Khúc Trì (LI-11)', location: 'Trên bờ trong xương bánh chè 2 thốn & đầu ngoài nếp gấp khuỷu tay', howToPress: 'Cặp huyệt vàng trong châm cứu trị dị ứng mề đay: Lương huyết, thanh nhiệt, giải độc cắt cơn ngứa.' },
        { name: 'Thái Xung (LR-3) & Can Du (BL-18)', location: 'Mu bàn chân & vùng lưng dưới T9', howToPress: 'Sơ can giải uất, hạ men gan và tăng cường giải độc gan.' }
      ],
      doEat: ['Nước nhân trần, atiso, trà hoa cúc, rau má, đậu xanh', 'Bưởi, cam, bơ, bông cải xanh giàu Glutathione tự nhiên giải độc gan'],
      dontEat: ['Rượu bia (độc chất trực tiếp hủy hoại tế bào gan)', 'Hải sản lạ, tôm cua, nhộng tằm, thịt bò (khi đang nổi mề đay dị ứng)', 'Đồ chiên rán ngập dầu, nội tạng động vật'],
      homeCare: 'Ngủ trước 23h đêm (khung giờ 23h - 3h sáng là giờ kinh Đởm và Can thực hiện trao đổi chất và khử độc máu mạnh nhất).',
      protocolName: 'Phác đồ Bảo vệ Tế bào Gan & Kháng Histamin Dị ứng (Dược thư Quốc gia VN & DiPiro)',
      sourceGuidelines: ['Dược thư Quốc gia Việt Nam', 'Hướng dẫn BV Bạch Mai', 'DiPiro Pharmacotherapy'],
      drugs: [
        {
          name: 'Legalon 140mg (hoặc Fortec)',
          activeIngredient: 'Silymarin chuẩn hóa chiết xuất Cúc Gai (Milk Thistle)',
          group: 'Thuốc bảo vệ tế bào gan và ổn định màng tế bào gan',
          dosage: '140mg x 2 - 3 lần/ngày',
          usage: 'Uống sau bữa ăn',
          mechanism: 'Chống peroxy hóa lipid màng tế bào gan, kích thích RNA polymerase I tăng tổng hợp protein tái tạo nhu mô gan và hạ men AST/ALT.',
          caution: 'Ngưng tuyệt đối rượu bia trong suốt quá trình điều trị.'
        },
        {
          name: 'Telfast 180mg (hoặc Xyzal 5mg - nếu có mề đay ngứa)',
          activeIngredient: 'Fexofenadine HCl 180mg (hoặc Levocetirizine 5mg)',
          group: 'Thuốc kháng Histamin H1 thế hệ 2 điều trị mề đay dị ứng',
          dosage: '1 viên x 1 lần/ngày',
          usage: 'Uống sau ăn',
          mechanism: 'Đối kháng chọn lọc thụ thể Histamin H1 ngoại vi, dập tắt nhanh sẩn phù và cơn ngứa da mà không gây ức chế thần kinh trung ương.',
          caution: 'Chỉnh liều ở người suy giảm chức năng thận.'
        }
      ],
      emergencySigns: ['Phù nề môi, mắt, khàn tiếng, khó thở rít hoặc tụt huyết áp sau khi ăn/uống thuốc (Sốc phản vệ / Phù mạch Quincke cấp cứu)', 'Vàng da, vàng mắt sậm nhanh kèm lơ mơ hoặc nôn ra máu'],
      referencedBooks: ['Sổ Tay Đổng Thị Kỳ Huyệt', 'Những Cây Thuốc Và Vị Thuốc Việt Nam - GS. Đỗ Tất Lợi', 'Chinese Herbal Medicine - Dan Bensky', 'Dược thư Quốc gia Việt Nam']
    };
  }

  // 7. Gout / Thống phong / Acid Uric
  if (norm.includes('gout') || norm.includes('gut') || norm.includes('thong phong') || norm.includes('uric') || norm.includes('podagra') || norm.includes('tophi') || (norm.includes('ngon chan') && norm.includes('sung'))) {
    return {
      summary: `Viêm khớp Gout cấp - mạn (Thống phong) do rối loạn chuyển hóa nhân Purin gây tăng Acid Uric máu và lắng đọng tinh thể Monosodium Urate nội khớp. Đông y biện chứng thuộc chứng Thống Phong (Thấp Nhiệt Trở Lạc kiêm Đàm Ứ).`,
      clinicalDefinition: 'Bệnh Gout (Thống Phong - ICD-10: M10) là bệnh lý viêm khớp vi tinh thể do rối loạn chuyển hóa nhân Purin ở người, làm tăng nồng độ Acid Uric trong máu (> 420 µmol/L ở nam và > 360 µmol/L ở nữ). Khi vượt ngưỡng bão hòa, muối Monosodium Urate kết tinh thành các tinh thể hình kim sắc nhọn lắng đọng tại màng hoạt dịch khớp, sụn khớp và nhu mô thận.',
      causesAndRiskFactors: [
        '**Nguyên nhân nguyên phát (Chiếm 90%):** Do giảm khả năng bài tiết Acid Uric qua ống thận (chiếm 85-90% qua các kênh vận chuyển URAT1/GLUT9) kết hợp yếu tố cơ địa di truyền và tăng tổng hợp Purin nội sinh tại gan.',
        '**Nguyên nhân dinh dưỡng & lối sống:** Ăn quá nhiều thực phẩm giàu nhân Purin (hải sản, nội tạng động vật, thịt đỏ, nước hầm xương), uống nhiều rượu bia (Ethanol làm tăng tạo Lactate cạnh tranh đào thải Urat tại thận) và nước ngọt chứa đường Fructose.',
        '**Nguyên nhân thứ phát:** Suy thận mạn, dùng thuốc lợi tiểu (Thiazide, Furosemide), Aspirin liều thấp, Cyclosporine hoặc bệnh lý tăng sinh tủy.',
        '**Nguyên nhân Đông Y (Đan Khê Tâm Pháp & Maciocia):** Do Tỳ Thận tiên thiên bất túc kết hợp ăn uống quá nhiều cao lương mỹ vị, tửu sắc làm Tỳ mất kiện vận sinh Thấp Nhiệt, Đàm Trọc và Huyết Ứ lắng đọng tại các khớp xương chi dưới ("Bất thông tắc thống").'
      ],
      clinicalStages: [
        '**Giai đoạn 1 — Tăng Acid Uric máu không triệu chứng (Asymptomatic Hyperuricemia):** Nồng độ Acid Uric máu tăng cao (> 420 µmol/L hay > 7.0 mg/dL) nhưng chưa từng xuất hiện cơn viêm khớp Gout cấp hay sỏi thận. Giai đoạn này có thể kéo dài nhiều năm; xử trí chủ yếu bằng điều chỉnh chế độ ăn kiêng Purin và uống nhiều nước kiềm.',
        '**Giai đoạn 2 — Viêm khớp Gout cấp tính (Acute Gouty Arthritis / Podagra):** Khởi phát đột ngột (thường vào nửa đêm về sáng sau bữa ăn giàu đạm/rượu bia) tại khớp bàn - ngón chân cái (MTP-1, chiếm 70-80%), hoặc khớp cổ chân, khớp gối. Khớp sưng to, căng bóng, nóng đỏ và đau buốt dữ dội đến mức chạm nhẹ chăn mỏng cũng đau; cơn cấp thường tự giới hạn sau 5–10 ngày nếu được cắt cơn đúng cách.',
        '**Giai đoạn 3 — Giai đoạn khoảng cách giữa các cơn cấp (Intercritical Gout):** Sau khi cơn đau cấp kết thúc, khớp hoàn toàn bình thường không đau, nhưng các tinh thể Urat vẫn tiếp tục âm thầm lắng đọng trong ổ khớp nếu không dùng thuốc hạ Acid Uric máu duy trì. Khoảng cách giữa các cơn ngày càng rút ngắn dần.',
        '**Giai đoạn 4 — Gout mạn tính có hạt Tophi & Biến chứng Thận (Chronic Tophaceous Gout):** Xuất hiện các u cục hạt Tophi (chứa tinh thể urat trắng như phấn) dưới da vùng quanh khớp ngón chân, mắt cá, khuỷu tay, vành tai; gây tiêu xương sụn, biến dạng dính khớp tàn phế, kèm sỏi thận Urat và viêm thận kẽ mạn tính dẫn đến suy thận.'
      ],
      westernDisease: 'Bệnh Gout cấp - mạn tính & Tăng Acid Uric máu (Gouty Arthritis)',
      icd10: 'M10.0',
      pathophysiology: 'Theo Guyton & Hall: Khi nồng độ Acid Uric huyết tương vượt ngưỡng bão hòa sinh lý (> 420 µmol/L hay 6.8 mg/dL), các tinh thể Monosodium Urate hình kim kết tủa tại màng hoạt dịch khớp (đặc biệt khớp bàn ngón chân cái MTP-1 nơi có nhiệt độ thấp hơn trung tâm cơ thể), kích hoạt đại thực bào qua phức hợp viêm NLRP3 inflammasome giải phóng ồ ạt Cytokine IL-1β, TNF-α và thu hút bạch cầu đa nhân trung tính vào thực bào tinh thể gây sưng nóng đỏ đau dữ dội.',
      differentialDiagnoses: ['Viêm khớp nhiễm khuẩn cấp (Septic arthritis)', 'Bệnh giả Gout (Lắng đọng tinh thể Calcium Pyrophosphate - CPPD)', 'Viêm khớp dạng thấp (Rheumatoid arthritis)', 'Viêm mô tế bào bàn chân'],
      investigations: ['Định lượng Acid Uric máu & Niệu 24h', 'Xét nghiệm phản ứng viêm CRP, Tốc độ máu lắng (ESR), Chức năng thận (Creatinine, eGFR)', 'Chọc hút dịch khớp soi kính hiển vi phân cực (Tiêu chuẩn vàng: thấy tinh thể Urat hình kim lưỡng chiết âm mạnh)', 'Siêu âm khớp tìm dấu hiệu "Bờ đôi" (Double contour sign) hoặc X-quang khớp tìm hốc khuyết xương hình hốc (Punched-out erosions)'],
      urgency: 'Cần cắt cơn viêm cấp trong 24h đầu và kiểm soát Acid Uric mục tiêu lâu dài',
      easternSyndrome: 'Thống Phong - Thể Thấp Nhiệt Trở Lạc (Giai đoạn cấp) & Đàm Ứ Khí Trệ Can Thận Hư (Giai đoạn mạn/Tophi)',
      batCuong: 'Lý chứng, Nhiệt chứng, Thực chứng (trên nền Bản Hư Tỳ Thận bất túc)',
      khiHuyet: 'Thấp nhiệt đàm trọc và huyết ứ kết tụ tại các khớp xương chi dưới, làm kinh mạch ủng trệ',
      thietChanAnalysis: 'Chất lưỡi đỏ sậm hoặc tím tối có điểm ứ huyết, rêu lưỡi vàng dày nhớt (cấp) hoặc trắng dày bẩn; Mạch Hoạt Sác hoặc Huyền Sác hữu lực.',
      easternExplanation: 'Do Tỳ hư mất vận hóa kết hợp ăn uống nhiều cao lương mỹ vị, hải sản, rượu bia làm thấp nhiệt nội sinh, chảy xuống hạ tiêu đọng lại ở các khớp xương bàn chân. Thấp nhiệt nung nấu tân dịch hóa đàm ứ kết thành hạt Tophi (Đàm hạch) làm biến dạng khớp.',
      tangPhu: 'Tỳ, Thận và Can',
      phapTri: 'Giai đoạn cấp: Thanh nhiệt táo thấp, thông lạc chỉ thống. Giai đoạn mạn: Kiện tỳ bổ thận, hóa đàm trừ ứ, lợi niệu bài độc.',
      formulaName: 'Tứ Diệu Tán hợp Bạch Hổ Quế Chi Thang gia Thổ Phục Linh, Tỳ Giải (Đan Khê Tâm Pháp & Dan Bensky)',
      herbs: [
        { name: 'Thổ Phục Linh', amount: '24g', grams: 24, role: 'Quân', purpose: 'Giải độc trừ thấp, thông lợi khớp xương, tăng cường đào thải Acid Uric qua ống thận đặc hiệu nhất' },
        { name: 'Hoàng Bá & Thương Truật', amount: '12g mỗi vị', grams: 12, role: 'Quân', purpose: 'Thanh nhiệt táo thấp hạ tiêu, tiêu sưng nóng đỏ tại khớp bàn chân' },
        { name: 'Ý Dĩ Nhân & Tỳ Giải', amount: '16g mỗi vị', grams: 16, role: 'Thần', purpose: 'Kiện tỳ thẩm thấp, phân thanh khứ trọc (tách lọc chất đục urat ra nước tiểu)' },
        { name: 'Ngưu Tất', amount: '12g', grams: 12, role: 'Tá', purpose: 'Hoạt huyết thông kinh, bổ can thận và dẫn toàn bộ bài thuốc đi thẳng xuống khớp chi dưới' },
        { name: 'Uy Linh Tiên & Đương Quy Vĩ', amount: '10g mỗi vị', grams: 10, role: 'Sứ', purpose: 'Thông kinh lạc, phá huyết ứ và làm tan dần hạt Tophi' }
      ],
      howToUse: 'Sắc uống ngày 1 thang chia 2 lần sau ăn. Uống kèm 2.5 - 3 lít nước khoáng kiềm nhẹ mỗi ngày.',
      tungPoints: [
        { name: 'Hạ Tam Hoàng: Thiên Hoàng Phụ / Thận Quan (77.18), Địa Hoàng (77.19), Nhân Hoàng (77.21)', code: '77.18 / 77.19 / 77.21', howToPress: 'Tổ hợp huyệt chủ lực của Đổng Thị đặc trị Gout tận gốc: Bổ Thận - Kiện Tỳ, tăng độ lọc cầu thận và đào thải Acid Uric máu.' },
        { name: 'Ngũ Hổ (11.27 - Đặc biệt Ngũ Hổ 3, 4, 5)', code: '11.27', howToPress: 'Nằm ở bờ ngoài đốt 1 ngón tay cái: Châm hoặc day ấn bên đối diện kết hợp cử động nhẹ ngón chân đau giúp cắt cơn đau sưng ngón chân cái (Podagra) và đau bàn chân tức thì.' }
      ],
      classicPoints: [
        { name: 'Thái Bạch (SP-3) & Tam Âm Giao (SP-6)', location: 'Bờ trong bàn chân sau khớp ngón cái & trên mắt cá trong 3 thốn', howToPress: 'Thanh tỳ thấp nhiệt, giảm sưng tấy trực tiếp tại khớp bàn ngón chân cái.' },
        { name: 'Hành Gian (LR-2) & Nội Đình (ST-44)', location: 'Kẽ ngón chân 1-2 và 2-3', howToPress: 'Châm tả hoặc chích nặn 2-3 giọt máu tĩnh mạch nông giúp hạ nhiệt giảm sưng đau tức thì.' }
      ],
      doEat: ['Nước lọc hoặc nước khoáng kiềm nhẹ 2.5 - 3 lít/ngày', 'Rau cần tây, dưa chuột, cải xanh, quả anh đào (Cherry), cam, ổi giàu Vitamin C', 'Sữa tươi tách béo, trứng, đậu phụ'],
      dontEat: ['Bia, rượu mạnh và nước ngọt có đường Fructose cao', 'Nội tạng động vật (lòng, gan, tim, cật), hải sản có vỏ, cá cơm, cá trích, thịt bò, thịt dê, nước hầm xương đặc'],
      homeCare: 'Kê cao chân khi nằm nghỉ, chườm mát nhẹ lên khớp đang sưng nóng đỏ cấp tính (Tuyệt đối không chườm nóng hoặc xoa dầu nóng khi khớp đang sưng đỏ cấp!).',
      protocolName: 'Phác đồ điều trị Gout cấp & Hạ Acid Uric máu (ACR/EULAR & Hướng dẫn BV Bạch Mai)',
      sourceGuidelines: ['ACR Guideline for the Management of Gout', 'Hướng dẫn BV Bạch Mai', 'Dược thư Quốc gia VN', 'DiPiro Pharmacotherapy'],
      drugs: [
        {
          name: 'Colchicine 1mg',
          activeIngredient: 'Colchicine 1mg',
          group: 'Thuốc kháng viêm đặc hiệu cắt cơn Gout cấp',
          dosage: 'Ngày đầu: 1mg khi khởi phát, sau 1 giờ uống thêm 0.5mg. Từ ngày 2: 0.5mg x 1-2 lần/ngày',
          usage: 'Uống sau ăn trong vòng 24-36 giờ đầu của cơn đau cấp',
          mechanism: 'Gắn vào protein Tubulin làm ngăn cản sự trùng hợp vi ống của bạch cầu đa nhân trung tính, ức chế sự di chuyển bạch cầu tới ổ khớp chứa tinh thể urat và chặn giải phóng IL-1β.',
          caution: 'Ngưng thuốc hoặc giảm liều nếu xuất hiện tiêu chảy; thận trọng suy thận.'
        },
        {
          name: 'Arcoxia 90mg (hoặc Mobic 15mg)',
          activeIngredient: 'Etoricoxib 90mg (hoặc Meloxicam 15mg)',
          group: 'Kháng viêm NSAID ức chế chọn lọc COX-2',
          dosage: '1 viên x 1 lần/ngày trong 5 - 7 ngày đợt cấp',
          usage: 'Uống ngay sau bữa ăn no',
          mechanism: 'Ức chế mạnh mẽ COX-2 tại ổ viêm khớp, cắt cơn đau rát và giảm phù nề nhanh chóng.',
          caution: 'Chống chỉ định bệnh tim mạch thiếu máu cục bộ nặng, loét dạ dày tiến triển.'
        },
        {
          name: 'Feburic 40mg (hoặc Zyloric 300mg)',
          activeIngredient: 'Febuxostat 40mg (hoặc Allopurinol)',
          group: 'Thuốc ức chế enzyme Xanthine Oxidase hạ Acid Uric mạn tính',
          dosage: '40mg x 1 viên/ngày (Chỉ khởi trị sau khi cơn đau cấp đã hết hoàn toàn 1-2 tuần)',
          usage: 'Uống vào buổi sáng sau ăn',
          mechanism: 'Ức chế chọn lọc enzyme Xanthine Oxidase, ngăn chặn quá trình chuyển hóa Hypoxanthine và Xanthine thành Acid Uric, duy trì Acid Uric mục tiêu < 360 µmol/L.',
          caution: 'Không tự ý khởi đầu thuốc hạ Acid Uric ngay giữa đỉnh cơn đau cấp nếu chưa dùng trước đó.'
        }
      ],
      emergencySigns: ['Khớp sưng mủ kèm sốt cao rét run trên 39°C (Nghi ngờ viêm khớp nhiễm khuẩn đồng mắc)', 'Tiểu ít, vô niệu hoặc cơn đau quặn thận dữ dội do sỏi urat kẹt niệu quản'],
      referencedBooks: ['DiPiro Pharmacotherapy', 'Chinese Herbal Medicine - Dan Bensky', 'Sổ Tay Đổng Thị Kỳ Huyệt', 'Dược thư Quốc gia Việt Nam']
    };
  }

  // 8. Đau cổ vai gáy / Hội chứng cổ vai cánh tay
  if (norm.includes('co vai gay') || norm.includes('vai gay') || norm.includes('dau co') || norm.includes('dau vai') || norm.includes('lac cham') || norm.includes('te tay')) {
    return {
      summary: `Hội chứng Cổ Vai Cánh Tay / Thoái hóa đốt sống cổ C4-C7 chèn ép rễ thần kinh, Đông y biện chứng thuộc chứng Kiên Tý / Lạc Chẩm thể Phong Hàn Thấp Trở Lạc kiêm Khí Huyết Trệ.`,
      westernDisease: 'Hội chứng cổ vai cánh tay / Thoái hóa cột sống cổ (Cervical Radiculopathy)',
      icd10: 'M54.2 / M50.1',
      pathophysiology: 'Theo Guyton & Hall: Thoái hóa đĩa đệm và mỏm móc đốt sống cổ C5-C6-C7 kết hợp co cứng phản xạ cơ thang (Trapezius) và cơ nâng vai làm chèn ép rễ thần kinh đám rối cánh tay và giảm lưu lượng tuần hoàn hệ động mạch đốt sống - thân nền.',
      differentialDiagnoses: ['Thoát vị đĩa đệm cột sống cổ', 'Viêm quanh khớp vai (Đông cứng khớp vai)', 'Hội chứng ống cổ tay (Carpal Tunnel Syndrome)'],
      investigations: ['X-quang cột sống cổ 4 tư thế (Thẳng, nghiêng, chếch 3/4)', 'MRI cột sống cổ (nếu có tê bì lan xuống ngón tay)', 'Siêu âm Doppler mạch máu vùng cổ'],
      urgency: 'Cần giải phóng chèn ép cơ - thần kinh',
      easternSyndrome: 'Kiên Hạng Thống / Lạc Chẩm - Thể Phong Hàn Thấp Tý kiêm Khí Huyết Ngưng Trệ',
      batCuong: 'Biểu Lý đồng bệnh, Hàn thấp thực chứng trên nền Can Thận hư',
      khiHuyet: 'Kinh Thái Dương Bàng Quang, Tiểu Trường và Thiếu Dương Đởm vùng cổ gáy bị phong hàn bế tắc',
      thietChanAnalysis: 'Chất lưỡi hồng ám, rêu lưỡi trắng mỏng; Mạch Phù Khẩn hoặc Huyền Sáp.',
      easternExplanation: 'Vùng cổ gáy là nơi hội tụ của các kinh Dương; khi ngồi làm việc sai tư thế lâu ngày hoặc nhiễm gió lạnh điều hòa làm kinh khí ngưng trệ, cơ cân co rút sinh đau cứng cổ không quay ngoái được và tê mỏi xuống bả vai cánh tay.',
      tangPhu: 'Can, Thận và Kinh Thái Dương - Thiếu Dương',
      phapTri: 'Khu phong tán hàn, thư cân hoạt lạc, hành khí hoạt huyết.',
      formulaName: 'Cát Căn Thang hợp Quyên Tý Thang gia giảm (Thương Hàn Luận & Y Học Tâm Ngộ)',
      herbs: [
        { name: 'Cát Căn', amount: '16g', grams: 16, role: 'Quân', purpose: 'Giải cơ thấu biểu, sinh tân thư cân đặc hiệu vùng cổ gáy' },
        { name: 'Khương Hoạt', amount: '12g', grams: 12, role: 'Quân', purpose: 'Trừ phong hàn thấp phần trên cơ thể (Thượng bán thân)' },
        { name: 'Quế Chi & Bạch Thược', amount: '10g mỗi vị', grams: 10, role: 'Thần', purpose: 'Điều hòa dinh vệ, thông dương giải co cứng cơ cổ' },
        { name: 'Khương Hoàng (Nghệ vàng)', amount: '10g', grams: 10, role: 'Tá', purpose: 'Phá huyết hành khí, thông kinh lạc vùng vai cánh tay' },
        { name: 'Đương Quy & Hoàng Kỳ', amount: '12g mỗi vị', grams: 12, role: 'Tá', purpose: 'Ích khí hoạt huyết trị tê bì tay' },
        { name: 'Chích Cam Thảo', amount: '6g', grams: 6, role: 'Sứ', purpose: 'Hoãn cấp chỉ thống' }
      ],
      howToUse: 'Sắc uống ngày 1 thang chia 2 lần ấm sau ăn.',
      tungPoints: [
        { name: 'Trọng Tử (11.01) & Trọng Tiên (11.02)', code: 'Khu 22 Lòng bàn tay', howToPress: 'Tổ hợp huyệt số 1 của Đổng Thị đặc trị đau cổ vai gáy và đau bả vai: Châm bên đối diện sâu 1 - 1.5 thốn kết hợp vận động xoay cổ nhẹ nhàng.' },
        { name: 'Chính Cân (77.01) & Chính Tông (77.02)', code: '77.01 / 77.02', howToPress: 'Nằm trên gân gót chân Achilles (tương ứng toàn tức với gáy và đốt sống cổ): Châm sâu 0.5 - 0.8 thốn cắt cơn cứng gáy vẹo cổ tức thì.' }
      ],
      classicPoints: [
        { name: 'Lạc Chẩm (EX-UE8 - Kỳ huyệt WHO)', location: 'Mu bàn tay, giữa xương bàn ngón 2 và 3, cách khớp bàn ngón 0.5 thốn', howToPress: 'Day bấm mạnh 2-3 phút kết hợp quay cổ chậm rãi giúp giải phóng co thắt cơ ức đòn chũm và cơ thang.' },
        { name: 'Phong Trì (GB-20), Kiên Tỉnh (GB-21) & Thiên Tông (SI-11)', location: 'Hõm sau gáy, đỉnh vai và giữa xương bả vai', howToPress: 'Châm cứu hoặc day ấn giải phóng điểm kích hoạt cơ (Trigger points) vùng cổ vai.' }
      ],
      doEat: ['Canh cá hồi, súp xương hầm, rau xanh đậm giàu Magie và Canxi', 'Trà gừng quế ấm, củ nghệ, các loại hạt giàu Vitamin nhóm B'],
      dontEat: ['Nước đá lạnh, bia lạnh', 'Thực phẩm nhiều dầu mỡ chuyển hóa gây viêm mạch máu'],
      homeCare: 'Tránh cúi đầu xem điện thoại quá lâu; mỗi 45 phút làm việc nên tập bài vươn cổ ưỡn ngực; gối ngủ cao vừa phải (8-10cm) nâng đỡ đường cong sinh lý cổ.',
      protocolName: 'Phác đồ điều trị Hội chứng Cổ Vai Gáy & Giãn cơ thần kinh (BV Bạch Mai & Dược thư QG)',
      sourceGuidelines: ['Hướng dẫn chẩn đoán và điều trị bệnh cơ xương khớp - Bộ Y Tế', 'Dược thư Quốc gia Việt Nam', 'DiPiro Pharmacotherapy'],
      drugs: [
        {
          name: 'Myonal 50mg',
          activeIngredient: 'Eperisone Hydrochloride 50mg',
          group: 'Thuốc giãn cơ vân tác dụng trung ương',
          dosage: '50mg (1 viên) x 3 lần/ngày',
          usage: 'Uống sau bữa ăn sáng - trưa - tối',
          mechanism: 'Giãn cơ vân bị co cứng thông qua ức chế phản xạ tủy sống và giãn cơ trơn mạch máu làm tăng lưu lượng tuần hoàn nuôi dưỡng khối cơ cổ vai gáy, cắt đứt vòng xoắn "Co cơ - Thiếu máu - Đau".',
          caution: 'Có thể gây cảm giác mỏi nhẹ hoặc buồn ngủ thoáng qua.'
        },
        {
          name: 'Celebrex 200mg (hoặc Mobic 7.5mg)',
          activeIngredient: 'Celecoxib 200mg (hoặc Meloxicam 7.5mg)',
          group: 'Thuốc kháng viêm giảm đau chọn lọc COX-2',
          dosage: '1 viên x 1 - 2 lần/ngày trong 5 - 7 ngày',
          usage: 'Uống ngay sau ăn no',
          mechanism: 'Ức chế tổng hợp Prostaglandin gây viêm quanh rễ thần kinh cổ và bao khớp mỏm bên.',
          caution: 'Thận trọng bệnh lý tim mạch hoặc dạ dày.'
        },
        {
          name: 'Methycobal 500mcg',
          activeIngredient: 'Methylcobalamin 500mcg',
          group: 'Coenzyme Vitamin B12 tái tạo bao Myelin thần kinh',
          dosage: '1 viên x 3 lần/ngày',
          usage: 'Uống sau ăn',
          mechanism: 'Thúc đẩy tổng hợp axit nucleic và lecithin trong tế bào Schwann, phục hồi dẫn truyền rễ thần kinh cổ bị chèn ép gây tê tay.',
          caution: 'An toàn, dung nạp tốt.'
        }
      ],
      emergencySigns: ['Yếu liệt cơ cánh tay, teo cơ mô cái hoặc đánh rơi đồ vật liên tục', 'Rối loạn dáng đi, tê cứng cả hai chân hoặc rối loạn cơ tròn (Chèn ép tủy cổ cấp)'],
      referencedBooks: ['Sổ Tay Đổng Thị Kỳ Huyệt', 'Châm Cứu Chữa Bệnh - GS. Nguyễn Tài Thu', 'Một Số Huyệt Ngoài Kinh - WHO', 'Dược thư Quốc gia Việt Nam']
    };
  }

  // 9. Khớp gối / Thoái hóa khớp gối
  if (norm.includes('goi') || norm.includes('luc cuc') || norm.includes('cau thang') || norm.includes('cung khop')) {
    return {
      summary: 'Thoái hóa khớp gối nguyên phát kèm viêm màng hoạt dịch cơ học, Đông y biện chứng thuộc chứng Tý (Hạc Tất Phong) thể Phong Hàn Thấp Tý kiêm Can Thận Hư.',
      clinicalStages: [
        '**Độ 1 (Giai đoạn sớm - Kellgren & Lawrence):** Hẹp khe khớp nghi ngờ trên X-quang, bắt đầu có gai xương nhỏ rìa khớp; đau mỏi nhẹ khi đi bộ xa hoặc lên xuống cầu thang.',
        '**Độ 2 (Giai đoạn nhẹ - trung bình):** Gai xương rõ ở lồi cầu đùi/mâm chày, khe khớp hẹp nhẹ; khớp kêu lục cục lạo xạo khi co duỗi, cứng khớp buổi sáng dưới 30 phút.',
        '**Độ 3 (Giai đoạn trung bình - nặng):** Hẹp khe khớp rõ rệt (> 50%), xơ đặc xương dưới sụn, nhiều gai xương; đau tăng khi chịu lực, có thể kèm tràn dịch khớp gối từng đợt.',
        '**Độ 4 (Giai đoạn nặng - cuối):** Hẹp khít hoàn toàn khe khớp, đầu xương cọ sát trực tiếp vào nhau gây biến dạng khớp gối (chân vòng kiềng chữ O hoặc chữ X) và hạn chế vận động nặng.'
      ],
      westernDisease: 'Thoái hóa khớp gối (Knee Osteoarthritis) Độ 1-4',
      icd10: 'M17.0',
      pathophysiology: 'Theo Guyton & Hall: Bào mòn lớp sụn khớp hyaline và sụt giảm nồng độ proteoglycan nội khớp làm tăng áp lực cơ học lên xương dưới sụn, hình thành gai xương rìa khớp cọ xát gây tiếng lạo xạo và phản ứng viêm bao hoạt dịch.',
      differentialDiagnoses: ['Rách sụn chêm khớp gối', 'Viêm khớp dạng thấp', 'Gout khớp gối'],
      investigations: ['X-quang khớp gối thẳng nghiêng đứng chịu lực', 'Siêu âm khớp gối đánh giá dịch khớp và màng hoạt dịch'],
      urgency: 'Cần theo dõi và phục hồi sụn khớp',
      easternSyndrome: 'Hạc Tất Phong - Phong Hàn Thấp Tý kiêm Can Thận Hư',
      batCuong: 'Bản Hư Tiêu Thực, Hàn thấp thắng',
      khiHuyet: 'Can Thận bất túc, phong hàn thấp tà ứ trệ tại khớp gối',
      thietChanAnalysis: 'Chất lưỡi nhạt ám, rêu trắng mỏng nhớt; Mạch Trầm Huyền hoặc Trầm Trì.',
      easternExplanation: 'Can chủ cân suy yếu, Thận chủ cốt tủy hư thoái, phong hàn thấp tà nhân cơ hội xâm nhập ứ đọng tại khớp gối làm tắc nghẽn kinh lạc.',
      tangPhu: 'Can, Thận và kinh Vị, Tỳ',
      phapTri: 'Khu phong tán hàn, trừ thấp thông lạc, bổ can thận cường cân cốt.',
      formulaName: 'Độc Hoạt Ký Sinh Thang (Thiên Kim Yếu Phương & Dan Bensky)',
      herbs: [
        { name: 'Độc Hoạt', amount: '12g', grams: 12, role: 'Quân', purpose: 'Trừ phong hàn thấp hạ tiêu, chỉ thống khớp gối' },
        { name: 'Tang Ký Sinh', amount: '16g', grams: 16, role: 'Quân', purpose: 'Bổ can thận, mạnh gân xương' },
        { name: 'Ngưu Tất', amount: '12g', grams: 12, role: 'Thần', purpose: 'Dẫn thuốc quy kinh xuống đầu gối, hoạt huyết' },
        { name: 'Đỗ Trọng & Tục Đoạn', amount: '12g mỗi vị', grams: 12, role: 'Thần', purpose: 'Bổ thận tráng cốt, liền gân xương' },
        { name: 'Bạch Thược & Đương Quy', amount: '12g mỗi vị', grams: 12, role: 'Tá', purpose: 'Dưỡng huyết nhu can chỉ thống' }
      ],
      howToUse: 'Sắc uống ngày 1 thang chia 2 lần ấm sau ăn.',
      tungPoints: [
        { name: 'Tâm Đầu (11.08 - Trung Khôi) & Đan Điền (11.07)', code: 'Khu 11 Ngón tay', howToPress: 'Huyệt đặc hiệu của Đổng Thị trị đau khớp gối: Châm hoặc day ấn mặt lưng đốt 2 ngón giữa bên đối diện kết hợp co duỗi khớp gối.' },
        { name: 'Kiên Trung (44.06)', code: '44.06', howToPress: 'Nằm chính giữa cơ delta vai (đối ứng đồng khí với khớp gối): Châm sâu 1 - 1.5 thốn trị thoái hóa đau khớp gối cực nhạy.' }
      ],
      classicPoints: [
        { name: 'Độc Tỵ (ST-35) & Nội Tất Nhãn (EX-LE4) & Hạc Đỉnh (EX-LE2)', location: 'Hai hõm dưới xương bánh chè và đỉnh trên xương bánh chè', howToPress: 'Bộ 3 huyệt tại chỗ kích thích tiết dịch nhờn Hyaluronic nội khớp và tiêu viêm.' },
        { name: 'Dương Lăng Tuyền (GB-34)', location: 'Chỗ lõm trước dưới đầu xương mác', howToPress: 'Hội huyệt của Cân, làm khỏe dây chằng khớp gối.' }
      ],
      doEat: ['Đậu bắp, rau mồng tơi giàu chất nhờn tự nhiên', 'Nước hầm sụn gà, cá hồi giàu Omega-3', 'Quả bơ, dầu oliu'],
      dontEat: ['Cà pháo, măng chua, dưa muối', 'Rượu bia, thức ăn nhiều đường gây thừa cân tăng tải trọng lên khớp gối'],
      homeCare: 'Hạn chế ngồi xổm hoặc leo cầu thang nhiều; chườm ấm đầu gối 20 phút mỗi tối; tập đạp xe tại chỗ không tải.',
      protocolName: 'Phác đồ điều trị Thoái hóa khớp gối (BV Bạch Mai & ACR/EULAR)',
      sourceGuidelines: ['Hướng dẫn BV Bạch Mai', 'Dược thư Quốc gia Việt Nam', 'DiPiro Pharmacotherapy'],
      drugs: [
        {
          name: 'Mobic 7.5mg - 15mg',
          activeIngredient: 'Meloxicam',
          group: 'Kháng viêm NSAID ức chế ưu thế COX-2',
          dosage: '7.5mg - 15mg x 1 lần/ngày',
          usage: 'Uống ngay sau bữa ăn no',
          mechanism: 'Ưu tiên ức chế COX-2, giảm tổng hợp prostaglandin gây viêm tại bao hoạt dịch khớp gối.',
          caution: 'Thận trọng tiền sử loét dạ dày tá tràng.'
        },
        {
          name: 'Viartril-S 1500mg',
          activeIngredient: 'Glucosamine Sulfate tinh thể',
          group: 'Thuốc chống thoái hóa khớp tác dụng chậm (SYSADOA)',
          dosage: '1 gói 1500mg/ngày',
          usage: 'Hòa tan nước ấm uống trong bữa ăn',
          mechanism: 'Kích thích tế bào sụn tổng hợp proteoglycan và ức chế enzyme collagenase phá hủy sụn.',
          caution: 'Duy trì tối thiểu 2-3 tháng.'
        }
      ],
      emergencySigns: ['Khớp gối sưng nóng đỏ dữ dội kèm sốt cao (Viêm khớp nhiễm khuẩn)', 'Kẹt khớp hoàn toàn không thể co duỗi'],
      referencedBooks: ['Sổ Tay Đổng Thị Kỳ Huyệt', 'Châm Cứu Chữa Bệnh - GS. Nguyễn Tài Thu', 'Chinese Herbal Medicine - Dan Bensky', 'Dược thư Quốc gia Việt Nam']
    };
  }

  // 10. Trào ngược dạ dày / Viêm loét dạ dày / Tiêu hóa / Đại tràng
  if (norm.includes('da day') || norm.includes('trao nguoc') || norm.includes('o chua') || norm.includes('o hoi') || norm.includes('thuong vi') || norm.includes('dai trang') || norm.includes('tieu chay') || norm.includes('tao bon') || norm.includes('dau bung')) {
    return {
      summary: 'Bệnh trào ngược dạ dày thực quản (GERD) / Viêm dạ dày - đại tràng co thắt, Đông y biện chứng thuộc chứng Vị Quản Thống / Phúc Thống thể Can Khí Phạm Vị kiêm Tỳ Vị Hư Hàn.',
      westernDisease: 'Trào ngược dạ dày thực quản (GERD) & Viêm niêm mạc dạ dày - đại tràng',
      icd10: 'K21.9 / K29.7 / K58.9',
      pathophysiology: 'Theo Guyton & Hall: Giảm trương lực cơ vòng thực quản dưới (LES) kết hợp tăng tiết HCl và Pepsin từ tế bào thành dạ dày (qua kích thích Histamine H2, Gastrin và Acetylcholine M3) gây tổn thương hàng rào chất nhầy Bicarbonate và kích thích đám rối thần kinh ruột Meissner - Auerbach.',
      differentialDiagnoses: ['Loét hành tá tràng (Nhiễm H. pylori)', 'Hội chứng ruột kích thích (IBS)', 'Bệnh lý đường mật - tụy'],
      investigations: ['Nội soi thực quản - dạ dày - tá tràng', 'Test thở C13/C14 hoặc CLO-test tìm vi khuẩn H. pylori', 'Siêu âm ổ bụng tổng quát'],
      urgency: 'Cần điều trị bảo vệ niêm mạc',
      easternSyndrome: 'Vị Quản Thống - Thể Can Vị Bất Hòa kiêm Tỳ Vị Hư Hàn',
      batCuong: 'Lý chứng, Hư Thực thác tạp (Tỳ hư là Bản, Khí trệ vị nghịch là Tiêu)',
      khiHuyet: 'Vị khí thượng nghịch, Can mộc khắc Tỳ thổ',
      thietChanAnalysis: 'Chất lưỡi hồng nhạt bệu có dấu răng, rêu lưỡi trắng dày hoặc hơi vàng ở giữa; Mạch Huyền Tế.',
      easternExplanation: 'Tỳ chủ thăng thanh, Vị chủ giáng trọc; khi suy nghĩ căng thẳng làm Can khí hoành nghịch phạm Vị khiến Vị khí không giáng xuống mà bốc ngược lên sinh ợ hơi, ợ chua, đau tức thượng vị và rối loạn đại tiện.',
      tangPhu: 'Vị, Tỳ và Can',
      phapTri: 'Sơ can hòa vị, ôn trung kiện tỳ, giáng nghịch chỉ thống.',
      formulaName: 'Sài Hồ Sơ Can Tán hợp Hương Sa Lục Quân Tử Thang (Cảnh Nhạc Toàn Thư & Dan Bensky)',
      herbs: [
        { name: 'Bạch Truật & Phục Linh', amount: '12g mỗi vị', grams: 12, role: 'Quân', purpose: 'Kiện tỳ ích khí, phục hồi vận hóa niêm mạc tiêu hóa' },
        { name: 'Sài Hồ & Bạch Thược', amount: '12g mỗi vị', grams: 12, role: 'Quân', purpose: 'Sơ can giải uất, nhu can giảm co thắt cơ trơn dạ dày' },
        { name: 'Bán Hạ Chế & Trần Bì', amount: '10g mỗi vị', grams: 10, role: 'Thần', purpose: 'Hòa vị giáng nghịch, cắt cơn ợ hơi buồn nôn' },
        { name: 'Mộc Hương & Sa Nhân', amount: '6g mỗi vị', grams: 6, role: 'Tá', purpose: 'Hành khí ôn trung, hết đầy trướng bụng' },
        { name: 'Ô Tắc Cốt (Mai mực) & Nghệ Vàng', amount: '12g', grams: 12, role: 'Tá', purpose: 'Chế toan trung hòa acid dịch vị, làm lành vết trợt loét' }
      ],
      howToUse: 'Sắc uống ngày 1 thang chia 2 lần ấm trước bữa ăn 45 phút.',
      tungPoints: [
        { name: 'Tứ Hoa: Tứ Hoa Thượng (77.08), Tứ Hoa Trung (77.09), Tứ Hoa Hạ (77.10)', code: '77.08 / 77.09 / 77.10', howToPress: 'Tổ hợp huyệt số 1 của Đổng Thị trên kinh Vị ở cẳng chân đặc trị mọi bệnh lý Dạ Dày - Tá Tràng - Trào Ngược - Đau Bụng: Châm sâu 1.5 - 2 thốn hoặc chích huyết tĩnh mạch nông.' },
        { name: 'Thổ Thủy (22.11)', code: '22.11', howToPress: 'Châm sát bờ xương bàn ngón tay cái giúp cắt cơn đau dạ dày cấp và ợ chua trong 5 phút.' }
      ],
      classicPoints: [
        { name: 'Trung Quản (CV-12), Nội Quan (PC-6) & Túc Tam Lý (ST-36)', location: 'Trên rốn 4 thốn, cổ tay và dưới gối 3 thốn', howToPress: 'Tam đại huyệt tiêu hóa: Điều hòa bài tiết acid dạ dày, đóng cơ vòng thực quản dưới và kiện tỳ vị.' },
        { name: 'Công Tôn (SP-4)', location: 'Bờ trong bàn chân', howToPress: 'Phối hợp Nội Quan (Bát mạch giao hội huyệt) trị đau vùng Tâm - Hung - Vị.' }
      ],
      doEat: ['Cháo hạt sen, súp bí đỏ, khoai lang luộc, bột nghệ mật ong ấm', 'Nước ép bắp cải ấm (giàu Vitamin U làm lành loét niêm mạc)'],
      dontEat: ['Đồ ăn chua cay (ớt, tiêu, chanh, giấm, dưa cà muối)', 'Cà phê đặc, rượu bia, nước ngọt có ga, ăn khuya sau 20h'],
      homeCare: 'Kê cao đầu giường 15-20cm khi ngủ; không nằm ngay trong vòng 2 giờ sau ăn; xoa bụng theo chiều kim đồng hồ 50 vòng mỗi tối.',
      protocolName: 'Phác đồ điều trị GERD & Viêm loét dạ dày - tá tràng (BV Chợ Rẫy & Dược thư Quốc gia)',
      sourceGuidelines: ['Phác đồ điều trị Nội khoa BV Chợ Rẫy', 'Dược thư Quốc gia Việt Nam', 'DiPiro Pharmacotherapy'],
      drugs: [
        {
          name: 'Nexium 40mg',
          activeIngredient: 'Esomeprazole 40mg',
          group: 'Thuốc ức chế bơm Proton (PPI)',
          dosage: '40mg x 1 viên/ngày',
          usage: 'Uống trước bữa ăn sáng 30 - 60 phút',
          mechanism: 'Ức chế đặc hiệu và không hồi phục bơm H+/K+-ATPase tại màng tiết của tế bào thành dạ dày, ngăn chặn bước cuối cùng của quá trình tiết acid dịch vị.',
          caution: 'Uống nguyên viên, không nhai hoặc nghiền.'
        },
        {
          name: 'Gaviscon Dual Action (hoặc Phosphalugel)',
          activeIngredient: 'Sodium Alginate + Calcium Carbonate + Sodium Bicarbonate',
          group: 'Thuốc trung hòa acid và tạo bè Alginate chống trào ngược',
          dosage: '1 gói x 3 lần/ngày',
          usage: 'Uống sau các bữa ăn chính 1 giờ và trước khi đi ngủ',
          mechanism: 'Tạo lớp màng gel alginic pH trung tính nổi lên trên bề mặt dịch dạ dày, ngăn cản cơ học không cho acid và pepsin trào ngược lên thực quản.',
          caution: 'Uống cách các thuốc khác tối thiểu 2 giờ.'
        }
      ],
      emergencySigns: ['Nôn ra máu tươi hoặc dịch đen như bã cà phê', 'Đi ngoài phân đen sệt mùi khắm (Xuất huyết tiêu hóa)', 'Nuốt nghẹn tiến triển kèm sụt cân nhanh'],
      referencedBooks: ['Sổ Tay Đổng Thị Kỳ Huyệt', 'The Practice of Chinese Medicine - Giovanni Maciocia', 'Chinese Herbal Medicine - Dan Bensky', 'Dược thư Quốc gia Việt Nam']
    };
  }

  // 11. Mất ngủ / Lo âu / Suy nhược thần kinh
  if (norm.includes('mat ngu') || norm.includes('kho ngu') || norm.includes('thuc trang') || norm.includes('hoi hop') || norm.includes('giat minh') || norm.includes('mong mi') || norm.includes('lo au')) {
    return {
      summary: 'Rối loạn mất ngủ mạn tính (Insomnia) kết hợp suy nhược thần kinh, Đông y biện chứng thuộc thể Tâm Tỳ Lưỡng Hư hoặc Tâm Thận Bất Giao.',
      westernDisease: 'Rối loạn mất ngủ mạn tính (Chronic Insomnia Disorder)',
      icd10: 'G47.0',
      pathophysiology: 'Theo Guyton & Hall: Suy giảm hoạt tính chất dẫn truyền ức chế GABA tại nhân bụng bên vùng trước thị (VLPO) và giảm tiết Melatonin tuyến tùng làm hệ lưới hoạt hóa truyền lên (ARAS) luôn ở trạng thái kích thích giao cảm.',
      differentialDiagnoses: ['Rối loạn lo âu lan tỏa (GAD)', 'Ngưng thở khi ngủ do tắc nghẽn (OSA)', 'Cường giáp'],
      investigations: ['Đánh giá thang điểm chất lượng giấc ngủ PSQI', 'Điện tâm đồ ECG & Hormone tuyến giáp (TSH, FT4)'],
      urgency: 'Cần tái lập nhịp sinh học',
      easternSyndrome: 'Thất Miên - Thể Tâm Tỳ Lưỡng Hư / Tâm Thận Bất Giao',
      batCuong: 'Lý chứng, Hư chứng (Âm huyết bất túc)',
      khiHuyet: 'Tâm huyết hư không dưỡng thần, Thận thủy không chế ước Tâm hỏa',
      thietChanAnalysis: 'Chất lưỡi nhạt có dấu răng (Tâm Tỳ hư) hoặc đầu lưỡi đỏ (Tâm hỏa vượng); Mạch Tế Nhược hoặc Tế Sác.',
      easternExplanation: 'Tâm tàng thần, huyết là cơ sở vật chất nuôi dưỡng Tâm thần; khi lo nghĩ quá độ làm Tỳ hư không sinh được huyết, Tâm thần thất dưỡng phiêu bạt gây trằn trọc khó vào giấc, hay mơ và dễ tỉnh giấc.',
      tangPhu: 'Tâm, Tỳ và Thận',
      phapTri: 'Kiện tỳ dưỡng tâm, bổ huyết an thần, giao thông tâm thận.',
      formulaName: 'Quy Tỳ Thang hợp Toan Táo Nhân Thang (Tế Sinh Phương / Kim Quỹ Yếu Lược & Dan Bensky)',
      herbs: [
        { name: 'Toan Táo Nhân (Sao đen)', amount: '16g', grams: 16, role: 'Quân', purpose: 'Dưỡng can đởm huyết, ninh tâm an thần đặc hiệu' },
        { name: 'Hoàng Kỳ & Bạch Truật', amount: '12g mỗi vị', grams: 12, role: 'Quân', purpose: 'Kiện tỳ ích khí, sinh hóa nguồn tâm huyết' },
        { name: 'Long Nhãn & Đương Quy', amount: '12g mỗi vị', grams: 12, role: 'Thần', purpose: 'Bổ tâm tỳ huyết' },
        { name: 'Phục Thần & Viễn Chí', amount: '10g mỗi vị', grams: 10, role: 'Tá', purpose: 'Ninh tâm định chí, giao thông tâm thận' },
        { name: 'Lạc Tiên (Nhãn lồng) & Lá Vông Nem', amount: '15g', grams: 15, role: 'Sứ', purpose: 'An thần thảo dược Nam y êm dịu' }
      ],
      howToUse: 'Sắc uống ngày 1 thang ấm vào buổi chiều và trước khi đi ngủ 1 giờ.',
      tungPoints: [
        { name: 'Trấn Tĩnh (1010.08) & Chính Hội (1010.01)', code: '1010.08 / 1010.01', howToPress: 'Châm dưới da giữa hai đầu mày trên Ấn Đường 0.3 thốn kết hợp huyệt đỉnh đầu giúp ổn định sóng não Alpha, an thần định chí tức thì.' },
        { name: 'Hạ Tam Hoàng (77.18 Thận Quan, 77.19 Địa Hoàng, 77.21 Nhân Hoàng)', code: '77.18 - 77.21', howToPress: 'Tư bổ Thận thủy để chế ước Tâm hỏa (Thủy Hỏa Ký Tế), đặc trị mất ngủ kinh niên kèm tiểu đêm.' }
      ],
      classicPoints: [
        { name: 'An Miên (EX-HN) & Thần Môn (HT-7)', location: 'Giữa Ế Phong - Phong Trì sau tai & nếp gấp cổ tay phía ngón út', howToPress: 'Day ấn nhẹ nhàng 2-3 phút mỗi bên trước khi ngủ giúp trấn tĩnh thần kinh trung ương.' },
        { name: 'Tam Âm Giao (SP-6) & Nội Quan (PC-6)', location: 'Cẳng chân trong & cổ tay', howToPress: 'Dưỡng âm huyết, làm dịu nhịp tim hồi hộp.' }
      ],
      doEat: ['Chè hạt sen long nhãn táo đỏ', 'Trà hoa cúc, tâm sen, lạc tiên ấm', 'Chuối chín, hạt óc chó, sữa ấm giàu Tryptophan'],
      dontEat: ['Cà phê, trà đặc, nước tăng lực sau 14h chiều', 'Rượu bia và bữa tối quá no nhiều dầu mỡ'],
      homeCare: 'Ngâm chân nước ấm 40°C với gừng muối 15 phút lúc 21h tối (dẫn hỏa quy nguyên về huyệt Dũng Tuyền); tắt màn hình điện thoại trước khi ngủ 45 phút.',
      protocolName: 'Phác đồ điều trị Mất ngủ & Phục hồi Nhịp sinh học (Dược thư Quốc gia VN & DiPiro)',
      sourceGuidelines: ['Dược thư Quốc gia Việt Nam', 'DiPiro Pharmacotherapy', 'MIMS Việt Nam'],
      drugs: [
        {
          name: 'Rotundin 60mg (Stilux)',
          activeIngredient: 'L-Tetrahydropalmatine chiết xuất Củ Bình Vôi',
          group: 'Thuốc an thần thảo dược chuẩn hóa',
          dosage: '30mg - 60mg x 1 lần/ngày',
          usage: 'Uống trước khi đi ngủ 30 - 45 phút',
          mechanism: 'Đối kháng thụ thể Dopamine D2 và tăng cường hoạt tính GABA-A tại hệ lưới hoạt hóa, tạo giấc ngủ sinh lý tự nhiên không gây lệ thuộc thuốc.',
          caution: 'Không dùng khi vận hành tàu xe.'
        },
        {
          name: 'Melatonin 3mg',
          activeIngredient: 'Melatonin 3mg',
          group: 'Hormone tái lập nhịp sinh học thức - ngủ',
          dosage: '3mg x 1 viên/tối',
          usage: 'Uống trước giờ ngủ cố định 45 - 60 phút',
          mechanism: 'Kích hoạt thụ thể MT1 và MT2 tại nhân trên chéo (SCN) vùng dưới đồi, rút ngắn thời gian đi vào giấc ngủ.',
          caution: 'Tắt ánh sáng xanh sau khi uống.'
        }
      ],
      emergencySigns: ['Cơn hoảng loạn kịch phát kèm đau thắt ngực trái, khó thở', 'Trầm cảm nặng hoặc có ý nghĩ tự gây hại'],
      referencedBooks: ['Sổ Tay Đổng Thị Kỳ Huyệt', 'Châm Cứu Chữa Bệnh - GS. Nguyễn Tài Thu', 'The Foundations of Chinese Medicine - Giovanni Maciocia', 'Dược thư Quốc gia Việt Nam']
    };
  }

  // 12. Viêm mũi xoang / Nghẹt mũi
  if (norm.includes('xoang') || norm.includes('mui') || norm.includes('nghet') || norm.includes('hoc mat') || norm.includes('hat hoi')) {
    return {
      summary: 'Viêm mũi xoang dị ứng / Viêm xoang trán - sàng mạn tính, Đông y xếp vào chứng Tỵ Uyên do Phế Khí Hư kiêm Phong Hàn Uất Nhiệt.',
      westernDisease: 'Viêm mũi xoang dị ứng / Viêm xoang mạn tính (Chronic Rhinosinusitis)',
      icd10: 'J32.9 / J30.4',
      pathophysiology: 'Theo Guyton & Hall: Phản ứng viêm làm phù nề niêm mạc phức hợp lỗ thông - khe (Ostiomeatal complex), gây ứ đọng dịch nhầy xoang, giảm thanh thải nhầy lông chuyển và kích thích nhánh V1-V2 thần kinh sinh ba gây nhức trán - hốc mắt.',
      differentialDiagnoses: ['Viêm mũi dị ứng theo mùa', 'Polyp mũi xoang', 'Vẹo vách ngăn mũi'],
      investigations: ['Nội soi tai mũi họng ống cứng/mềm', 'CT-Scan mũi xoang (Coronal) nếu mạn tính kéo dài'],
      urgency: 'Cần thông xoang và kháng viêm niêm mạc',
      easternSyndrome: 'Tỵ Uyên - Thể Phế Tỳ Khí Hư kiêm Phong Nhiệt Tà Thực',
      batCuong: 'Bản Hư Tiêu Thực',
      khiHuyet: 'Phế khí bất tuyên, thanh khiếu vùng mũi bị đàm trọc bế tắc',
      thietChanAnalysis: 'Chất lưỡi hồng, rêu lưỡi trắng dày hoặc vàng mỏng; Mạch Phù Hoạt.',
      easternExplanation: 'Phế khai khiếu ra mũi; khi Phế khí hư yếu làm vệ biểu bất cố, phong hàn hoặc phong nhiệt xâm nhập uất đọng tại xoang mặt hóa dịch đục và gây nghẹt mũi, đau đầu vùng ấn đường.',
      tangPhu: 'Phế, Tỳ và Kinh Dương Minh Vị - Đại Trường',
      phapTri: 'Tuyên phế thông khiếu, khu phong thanh nhiệt, kiện tỳ hóa thấp.',
      formulaName: 'Thương Nhĩ Tử Tán hợp Ngọc Bình Phong Tán (Tế Sinh Phương & Dan Bensky)',
      herbs: [
        { name: 'Tân Di Hoa & Thương Nhĩ Tử (Ké đầu ngựa)', amount: '10g mỗi vị', grams: 10, role: 'Quân', purpose: 'Tuyên thông tỵ khiếu đặc hiệu số 1, tán phong hàn, giảm phù nề cuốn mũi' },
        { name: 'Bạch Chỉ', amount: '12g', grams: 12, role: 'Thần', purpose: 'Thông khiếu bài nùng (tống dịch mủ xoang), giảm đau nhức trán và hốc mắt' },
        { name: 'Hoàng Kỳ & Bạch Truật', amount: '12g mỗi vị', grams: 12, role: 'Tá', purpose: 'Ích khí cố biểu, nâng cao miễn dịch niêm mạc hô hấp chống tái phát' },
        { name: 'Bạc Hà', amount: '6g', grams: 6, role: 'Sứ', purpose: 'Sơ phong thanh nhiệt, làm thông thoáng khoang mũi' }
      ],
      howToUse: 'Tân di hoa bọc vải gạc khi sắc. Uống ấm ngày 1 thang chia 2 lần sau ăn.',
      tungPoints: [
        { name: 'Tứ Mã: Tứ Mã Trung (88.17), Tứ Mã Thượng (88.18), Tứ Mã Hạ (88.19)', code: '88.17 - 88.19', howToPress: 'Tổ hợp huyệt số 1 của Đổng Thị đặc trị viêm mũi dị ứng và viêm xoang mạn tính: Châm mặt ngoài đùi sâu 1.5 - 2 thốn.' },
        { name: 'Mộc Huyệt (11.17)', code: '11.17', howToPress: 'Nằm ở mặt lòng đốt 1 ngón tay trỏ: Đặc hiệu cầm nước mũi chảy trong, hắt hơi sổ mũi do lạnh.' }
      ],
      classicPoints: [
        { name: 'Nghinh Hương (LI-20) & Thượng Nghinh Hương (Tỵ Thông - EX-HN8)', location: 'Cạnh cánh mũi và đầu dưới xương mũi', howToPress: 'Day ấn 2 phút làm co mạch cuốn mũi dưới, thông mũi tức thì.' },
        { name: 'Ấn Đường (EX-HN3) & Hợp Cốc (LI-4)', location: 'Giữa hai đầu lông mày & mu bàn tay', howToPress: 'Giảm đau nhức xoang trán và xoang hàm.' }
      ],
      doEat: ['Canh gà hầm gừng tươi và củ sen ấm', 'Tía tô, kinh giới, tỏi nướng, nước ấm'],
      dontEat: ['Nước đá lạnh, kem lạnh, sữa đặc có đường (làm tăng tiết đờm nhầy xoang)', 'Bia lạnh, hải sản tanh lạnh'],
      homeCare: 'Rửa mũi xoang bằng bình rửa nước muối sinh lý ấm 0.9% mỗi sáng và tối; đeo khẩu trang giữ ấm mũi khi vào phòng máy lạnh.',
      protocolName: 'Phác đồ điều trị Viêm mũi xoang (Hướng dẫn Bộ Y Tế & The Sanford Guide)',
      sourceGuidelines: ['Hướng dẫn Tai Mũi Họng - Bộ Y Tế', 'The Sanford Guide', 'Dược thư Quốc gia VN'],
      drugs: [
        {
          name: 'Flixonase 50mcg (hoặc Avamys)',
          activeIngredient: 'Fluticasone Propionate (hoặc Fluticasone Furoate)',
          group: 'Corticosteroid xịt mũi tại chỗ',
          dosage: 'Xịt mỗi bên mũi 1 - 2 nhát x 1 lần/ngày vào buổi sáng',
          usage: 'Xịt sau khi đã rửa sạch mũi bằng nước muối sinh lý, hướng đầu xịt hơi chếch ra cánh mũi ngoài',
          mechanism: 'Kháng viêm mạnh tại niêm mạc mũi xoang, giảm phù nề lỗ thông xoang và ngăn chặn phản ứng dị ứng muộn.',
          caution: 'Không xịt trực tiếp vào vách ngăn mũi giữa.'
        },
        {
          name: 'Telfast 60mg (hoặc Aerius 5mg)',
          activeIngredient: 'Fexofenadine 60mg (hoặc Desloratadine 5mg)',
          group: 'Thuốc kháng Histamin H1 thế hệ 2',
          dosage: '1 viên x 1 - 2 lần/ngày',
          usage: 'Uống sau ăn',
          mechanism: 'Phong bế thụ thể H1 ngoại vi, cắt cơn hắt hơi, ngứa mũi và chảy dịch mũi trong.',
          caution: 'Không gây buồn ngủ.'
        }
      ],
      emergencySigns: ['Sưng đỏ phù nề hốc mắt, lồi mắt hoặc nhìn đôi, giảm thị lực (Biến chứng ổ mắt do viêm xoang)', 'Sốt cao kèm đau đầu dữ dội, cứng gáy'],
      referencedBooks: ['Sổ Tay Đổng Thị Kỳ Huyệt', 'Một Số Huyệt Ngoài Kinh - WHO', 'Chinese Herbal Medicine - Dan Bensky', 'Dược thư Quốc gia Việt Nam']
    };
  }

  // 13. Đau thắt lưng / Thần kinh tọa / Thoát vị đĩa đệm
  if (norm.includes('lung') || norm.includes('toa') || norm.includes('thoat vi') || norm.includes('l4') || norm.includes('l5') || norm.includes('mong')) {
    return {
      summary: 'Chèn ép rễ thần kinh thắt lưng - cùng (Đau thần kinh tọa / Tọa Cốt Phong) do thoát vị đĩa đệm L4-L5/L5-S1, Đông y biện chứng thuộc thể Khí Trệ Huyết Ứ kiêm Hàn Thấp trên nền Can Thận Hư.',
      clinicalStages: [
        '**Giai đoạn 1 — Phồng / Lồi đĩa đệm (Disc Bulging / Protrusion):** Nhân nhầy bắt đầu biến dạng đẩy lồi vòng sợi nhưng chưa rách hoàn toàn; đau mỏi vùng thắt lưng cục bộ, tăng khi cúi hoặc ngồi lâu.',
        '**Giai đoạn 2 — Thoát vị đĩa đệm thực sự (Disc Extrusion):** Vòng sợi rách, nhân nhầy thoát ra ngoài chèn vào rễ thần kinh L5 hoặc S1; đau buốt lan từ thắt lưng xuống mông, mặt sau hoặc mặt ngoài đùi và cẳng chân.',
        '**Giai đoạn 3 — Thoát vị có mảnh rời / Chèn ép rễ nặng (Sequestration):** Mảnh đĩa đệm rời ra chèn ép nặng bao rễ và tủy sống; gây tê bì mất cảm giác bàn chân, yếu cơ gấp duỗi ngón chân, teo cơ đùi - bắp chân hoặc hội chứng chùm đuôi ngựa.'
      ],
      westernDisease: 'Thoát vị đĩa đệm cột sống thắt lưng chèn ép rễ thần kinh tọa (Lumbar Radiculopathy / Sciatica)',
      icd10: 'M51.1 / M54.3',
      pathophysiology: 'Theo Guyton & Hall: Nhân nhầy đĩa đệm thoát vị chèn ép cơ học rễ thần kinh L5 hoặc S1 và giải phóng Phospholipase A2, TNF-α, Prostaglandin E2 gây phù nề bao rễ và phóng điện ngoại vị dọc dây thần kinh hông to.',
      differentialDiagnoses: ['Hẹp ống sống thắt lưng', 'Hội chứng cơ hình lê (Piriformis syndrome)', 'Trượt đốt sống thắt lưng'],
      investigations: ['MRI cột sống thắt lưng - cùng (Tiêu chuẩn vàng đánh giá mức độ thoát vị)', 'X-quang cột sống thắt lưng thẳng nghiêng', 'Nghiệm pháp Lasègue & Valleix'],
      urgency: 'Cần giải ép rễ thần kinh và chống viêm',
      easternSyndrome: 'Yêu Cước Thống / Tọa Cốt Phong - Thể Khí Trệ Huyết Ứ kiêm Can Thận Bất Túc',
      batCuong: 'Lý chứng, Bản Hư Tiêu Thực',
      khiHuyet: 'Khí trệ huyết ứ tại hai kinh Túc Thái Dương Bàng Quang và Túc Thiếu Dương Đởm',
      thietChanAnalysis: 'Chất lưỡi tím ám hoặc có điểm ứ huyết, rêu trắng mỏng; Mạch Trầm Huyền Sáp.',
      easternExplanation: 'Thắt lưng là phủ của Thận ("Yêu vi Thận chi phủ"); khi lao lực mang vác nặng hoặc phong hàn thấp xâm nhập làm huyết ứ bế tắc đường đi của kinh Bàng Quang (dọc sau đùi) và kinh Đởm (dọc mặt ngoài đùi) gây đau buốt tê rần xuống chân.',
      tangPhu: 'Thận, Can và Kinh Bàng Quang - Đởm',
      phapTri: 'Hoạt huyết trục ứ, khu phong tán hàn, bổ can thận cường cân cốt.',
      formulaName: 'Thân Thống Trục Ứ Thang hợp Độc Hoạt Ký Sinh Thang (Y Lâm Cải Thác & Dan Bensky)',
      herbs: [
        { name: 'Đỗ Trọng, Ngưu Tất & Tang Ký Sinh', amount: '14g mỗi vị', grams: 14, role: 'Quân', purpose: 'Bổ can thận, mạnh gân cốt, dẫn thuốc xuống thắt lưng và chân' },
        { name: 'Đương Quy & Xuyên Khung', amount: '12g mỗi vị', grams: 12, role: 'Quân', purpose: 'Hoạt huyết hành khí, thông kinh chỉ thống' },
        { name: 'Đào Nhân & Hồng Hoa', amount: '8g mỗi vị', grams: 8, role: 'Thần', purpose: 'Phá huyết trục ứ quanh rễ thần kinh' },
        { name: 'Độc Hoạt & Tần Giao', amount: '10g mỗi vị', grams: 10, role: 'Tá', purpose: 'Khu phong trừ thấp, giải co cứng cơ cạnh sống' },
        { name: 'Địa Long', amount: '8g', grams: 8, role: 'Sứ', purpose: 'Thông kinh hoạt lạc cực mạnh' }
      ],
      howToUse: 'Sắc uống ngày 1 thang chia 2 lần ấm sau ăn.',
      tungPoints: [
        { name: 'Linh Cốt (22.05) & Đại Bạch (22.04)', code: '22.05 / 22.04', howToPress: 'Cặp huyệt chủ lực số 1 của Đổng Thị đặc trị đau thần kinh tọa và đau thắt lưng cấp: Châm đối bên sâu 1 - 1.5 thốn kết hợp Động khí (bệnh nhân xoay nhẹ lưng và bước đi).' },
        { name: 'Trung Bạch (22.06) & Hạ Bạch (22.07)', code: '22.06 / 22.07', howToPress: 'Phối thêm nếu đau dọc theo kinh Thiếu Dương Đởm (mặt ngoài đùi và cẳng chân) hoặc đau lưng do Thận hư.' }
      ],
      classicPoints: [
        { name: 'Giáp Tích L4-L5-S1 (EX-B2), Hoàn Khiêu (GB-30), Ủy Trung (BL-40) & Dương Lăng Tuyền (GB-34)', location: 'Thắt lưng, mông, giữa khoeo chân và cẳng chân', howToPress: 'Phác đồ Mãng châm GS. Nguyễn Tài Thu & Lưu Viêm ("Yêu bối Ủy Trung cầu") giải phóng chèn ép thần kinh tọa.' }
      ],
      doEat: ['Cá hồi, cá thu giàu Omega-3 kháng viêm bao rễ thần kinh', 'Nước hầm xương sụn, rau xanh đậm giàu Magie và Vitamin B12'],
      dontEat: ['Rượu bia, thuốc lá (làm giảm tưới máu nuôi đĩa đệm)', 'Thực phẩm nhiều đường tinh luyện và đồ lạnh'],
      homeCare: 'Nằm đệm phẳng chắc, chườm ấm muối ngải cứu vùng thắt lưng 20 phút mỗi tối; tuyệt đối tránh cúi khom lưng bê vật nặng.',
      protocolName: 'Phác đồ điều trị Đau thần kinh tọa do Thoát vị đĩa đệm (BV Chợ Rẫy & Bạch Mai)',
      sourceGuidelines: ['Phác đồ điều trị Nội khoa BV Chợ Rẫy', 'Hướng dẫn BV Bạch Mai', 'Dược thư Quốc gia VN'],
      drugs: [
        {
          name: 'Mobic 15mg (hoặc Celebrex 200mg)',
          activeIngredient: 'Meloxicam 15mg (hoặc Celecoxib 200mg)',
          group: 'Kháng viêm NSAID ức chế COX-2',
          dosage: '15mg x 1 lần/ngày',
          usage: 'Uống ngay sau bữa ăn no',
          mechanism: 'Ức chế tổng hợp Prostaglandin E2 tại rễ thần kinh bị đĩa đệm chèn ép, giảm phù nề bao rễ.',
          caution: 'Chống chỉ định loét dạ dày tá tràng tiến triển.'
        },
        {
          name: 'Lyrica 75mg (hoặc Neurontin 300mg)',
          activeIngredient: 'Pregabalin 75mg (hoặc Gabapentin 300mg)',
          group: 'Thuốc giảm đau thần kinh chuyên biệt (Neuropathic Pain)',
          dosage: '75mg x 1 - 2 viên/ngày (ưu tiên uống buổi tối)',
          usage: 'Uống trước khi đi ngủ',
          mechanism: 'Gắn vào tiểu đơn vị alpha-2-delta của kênh Calci phụ thuộc điện thế tại sừng sau tủy sống, ức chế giải phóng Glutamate và Substance P, cắt cơn đau buốt như điện giật.',
          caution: 'Có thể gây buồn ngủ nhẹ trong vài ngày đầu.'
        },
        {
          name: 'Myonal 50mg',
          activeIngredient: 'Eperisone HCl 50mg',
          group: 'Thuốc giãn cơ vân trung ương',
          dosage: '50mg x 3 lần/ngày',
          usage: 'Uống sau ăn',
          mechanism: 'Giải phóng co cứng khối cơ cạnh sống thắt lưng.',
          caution: 'Thận trọng người cao tuổi.'
        }
      ],
      emergencySigns: ['Bí tiểu hoặc tiểu tiện không tự chủ, mất cảm giác vùng yên ngựa quanh hậu môn (Hội chứng chùm đuôi ngựa - Cần phẫu thuật cấp cứu trong 24h)', 'Bàn chân rủ liệt không nhấc mũi chân hay gót chân lên được'],
      referencedBooks: ['Sổ Tay Đổng Thị Kỳ Huyệt', 'Châm Cứu Chữa Bệnh - GS. Nguyễn Tài Thu', 'Cẩm Nang Thực Hành Châm Cứu - Lưu Viêm', 'Dược thư Quốc gia Việt Nam']
    };
  }

  // 14. Bệnh lý Tuyến Giáp (Cường giáp Basedow / Suy giáp Hashimoto / Bướu cổ - Chứng Anh Lựu)
  if (norm.includes('tuyen giap') || norm.includes('cuong giap') || norm.includes('suy giap') || norm.includes('basedow') || norm.includes('buou co') || norm.includes('nhan tuyen giap')) {
    return {
      summary: `Bệnh lý Tuyến Giáp (Cường giáp Basedow / Nhân tuyến giáp / Suy giáp), Đông y biện chứng thuộc chứng Anh Lựu (Khí Uất Đàm Ngưng hóa Hỏa hoặc Can Thận Âm Hư).`,
      clinicalDefinition: 'Bệnh lý tuyến giáp bao gồm Cường giáp (Hyperthyroidism/Basedow - tăng tiết quá mức hormone T3, T4 gây tăng chuyển hóa toàn thân), Suy giáp (Hypothyroidism - thiếu hụt hormone giáp) và Bướu nhân tuyến giáp. Trong Đông Y, bệnh thuộc chứng "Anh Lựu" (Khí Anh, Nhục Anh) vùng trước cổ.',
      causesAndRiskFactors: [
        'Tự miễn dịch: Kháng thể TRAb kích thích thụ thể TSH gây Cường giáp Basedow, hoặc kháng thể Anti-TPO phá hủy mô giáp gây Suy giáp Hashimoto.',
        'Rối loạn lượng I-ốt ăn vào (thừa hoặc thiếu I-ốt), căng thẳng thần kinh kéo dài (Stress làm rối loạn trục Hạ đồi - Tuyến yên - Tuyến giáp).',
        'Đông Y: Do tình chí uất ức lâu ngày làm Can khí uất kết, Tỳ mất kiện vận sinh Đàm trọc, Khí trệ kết hợp Đàm và Huyết ứ ngưng tụ tại vùng cổ trước (mạch Nhâm và kinh Can).'
      ],
      clinicalStages: [
        'Giai đoạn 1 — Rối loạn dưới lâm sàng (Subclinical): TSH thay đổi sớm (TSH giảm thấp trong tiền cường giáp, hoặc TSH tăng > 4.5 mIU/L trong tiền suy giáp) nhưng FT3, FT4 vẫn trong giới hạn bình thường.',
        'Giai đoạn 2 — Toàn phát điển hình: Cường giáp biểu hiện tim đập nhanh (> 100 lần/phút), sụt cân dù ăn nhiều, run tay, sợ nóng, vã mồ hôi, lồi mắt; Suy giáp biểu hiện mệt mỏi, sợ lạnh, tăng cân, phù niêm.',
        'Giai đoạn 3 — Biến chứng cơ quan đích: Rung nhĩ, suy tim cung lượng cao, loãng xương hoặc Bão giáp trạng cấp tính (Thyroid Storm) đe dọa tính mạng.'
      ],
      westernDisease: 'Rối loạn chức năng Tuyến giáp (Basedow / Bướu nhân tuyến giáp / Suy giáp)',
      icd10: 'E05.0 / E03.9 / E04.1',
      pathophysiology: 'Theo Guyton & Hall: Hormone T3/T4 gắn vào thụ thể nhân tế bào làm tăng hoạt tính bơm Na+-K+-ATPase và số lượng ty thể, làm tăng tiêu thụ Oxy cơ bản (BMR), tăng mật độ thụ thể Beta-adrenergic tại cơ tim gây nhịp nhanh và tăng phân giải protein/lipid.',
      differentialDiagnoses: ['Rối loạn thần kinh tim / Cường giao cảm', 'U tủy thượng thận (Pheochromocytoma)', 'Ung thư tuyến giáp thể nhú'],
      investigations: ['Xét nghiệm TSH, FT3, FT4 huyết tương', 'Kháng thể tuyến giáp (TRAb, Anti-TPO, Anti-Tg)', 'Siêu âm đàn hồi tuyến giáp phân loại TIRADS (1 đến 5)'],
      urgency: 'Cần xét nghiệm TSH, FT4 và siêu âm kiểm soát định kỳ',
      easternSyndrome: 'Chứng Anh Lựu - Thể Can Uất Đàm Ngưng Hóa Hỏa / Âm Hư Hỏa Vượng',
      batCuong: 'Lý chứng, Bản Hư Tiêu Thực (Can Thận âm hư là Bản; Khí trệ, Đàm ngưng, Hỏa vượng là Tiêu)',
      khiHuyet: 'Khí uất hóa hỏa thiêu đốt tân dịch thành đàm kết tụ tại vùng cổ',
      thietChanAnalysis: 'Chất lưỡi đỏ hoặc có điểm ứ huyết, rêu lưỡi vàng mỏng; Mạch Huyền Sác.',
      easternExplanation: 'Kinh Quyết Âm Can và Mạch Nhâm đi qua vùng hầu họng. Khi Can uất hóa hỏa nung nấu tân dịch thành đàm, đàm khí giao trở tại cổ sinh bướu giáp, hỏa nhiễu động Tâm thần gây tim đập nhanh, mất ngủ.',
      tangPhu: 'Can, Tâm, Tỳ và Thận',
      phapTri: 'Sơ can lý khí, hóa đờm nhuyễn kiên, tư âm giáng hỏa, tiêu anh tán kết.',
      formulaName: 'Tứ Hải Thư Uất Hoàn hợp Hạ Khô Thảo Thang gia giảm (Dan Bensky)',
      herbs: [
        { name: 'Hạ Khô Thảo', amount: '16g', grams: 16, role: 'Quân', purpose: 'Thanh can hỏa, tán uất kết, thu nhỏ nhân và bướu tuyến giáp đặc hiệu' },
        { name: 'Huyền Sâm & Mẫu Lệ', amount: '15g mỗi vị', grams: 15, role: 'Quân', purpose: 'Tư âm giáng hỏa, nhuyễn kiên tán kết (làm mềm khối u nang)' },
        { name: 'Bối Mẫu (Chiết Bối Mẫu)', amount: '12g', grams: 12, role: 'Thần', purpose: 'Thanh nhiệt hóa đờm, tán kết tiêu bướu (Phối Huyền Sâm - Mẫu Lệ thành bài Tiêu Lựu Hoàn)' },
        { name: 'Sài Hồ & Hương Phụ', amount: '10g mỗi vị', grams: 10, role: 'Tá', purpose: 'Sơ can giải uất, điều đạt khí cơ vùng ngực cổ' },
        { name: 'Đan Sâm & Bạch Thược', amount: '12g mỗi vị', grams: 12, role: 'Sứ', purpose: 'Hoạt huyết dưỡng âm, ổn định nhịp tim' }
      ],
      howToUse: 'Sắc uống ngày 1 thang chia 2 lần sau ăn. Lưu ý: Nếu Cường giáp cần tránh các vị thuốc chứa nhiều I-ốt (như Hải tảo, Côn bố liều cao).',
      tungPoints: [
        { name: 'Tam Trọng: Nhất Trọng (77.05), Nhị Trọng (77.06), Tam Trọng (77.07)', code: '77.05 / 77.06 / 77.07', howToPress: 'Tổ hợp huyệt số 1 của Đổng Thị đặc trị bướu cổ (Tuyến giáp), cường giáp và lồi mắt: Châm thẳng 1 - 2 thốn mặt ngoài cẳng chân để phá khí trệ, tiêu đàm kết vùng cổ.' },
        { name: 'Tứ Mã: Tứ Mã Trung (88.17), Tứ Mã Thượng (88.18), Tứ Mã Hạ (88.19)', code: '88.17 - 88.19', howToPress: 'Phối hợp điều hòa miễn dịch tuyến giáp và trị lồi mắt do Basedow.' }
      ],
      classicPoints: [
        { name: 'Khí Xá (ST-11), Thủy Đột (ST-10) & Thiên Đột (CV-22)', location: 'Vùng bờ trước cơ ức đòn chũm quanh tuyến giáp', howToPress: 'Châm nông hoặc day nhẹ vùng lân cận giúp thông khí tán kết tại chỗ.' },
        { name: 'Nội Quan (PC-6), Thái Xung (LR-3) & Tam Âm Giao (SP-6)', location: 'Cổ tay, mu bàn chân & cẳng chân', howToPress: 'Bình can hỏa, điều hòa thần kinh tim (giảm nhịp tim nhanh và run tay).' }
      ],
      doEat: ['Thực phẩm giàu Selen, Kẽm, Vitamin D và Canxi (Cá hồi, hạt điều, nấm, rau xanh họ cải đã nấu chín)', 'Sữa hạt, ngũ cốc nguyên cám'],
      dontEat: ['Cường giáp: Kiêng muối I-ốt liều cao, rong biển, tảo biển, hải sản giàu I-ốt, cà phê, trà đặc', 'Suy giáp: Hạn chế ăn bắp cải sống, đậu nành sống ngay sát giờ uống thuốc hormone giáp'],
      homeCare: 'Giữ tâm lý thư thái, ngủ trước 22h30, kiểm tra xét nghiệm TSH và FT4 định kỳ mỗi 4 - 8 tuần.',
      protocolName: 'Phác đồ Nội tiết Tuyến giáp chuẩn hóa (ATA Guidelines & Bộ Y Tế Việt Nam)',
      sourceGuidelines: ['American Thyroid Association (ATA)', 'Hướng dẫn Chẩn đoán & Điều trị Bệnh Nội tiết - Bộ Y Tế', 'Dược thư Quốc gia VN'],
      drugs: [
        {
          name: 'Thyrozol 5mg - 10mg (Trong Cường giáp Basedow)',
          activeIngredient: 'Thiamazole (Methimazole) 5mg / 10mg',
          group: 'Thuốc kháng giáp trạng tổng hợp (Thionamide)',
          dosage: 'Liều tấn công 15mg - 30mg/ngày, liều duy trì 5mg - 10mg/ngày',
          usage: 'Uống sau bữa ăn sáng theo đúng chỉ định xét nghiệm FT4/TSH',
          mechanism: 'Ức chế enzyme Thyroid Peroxidase (TPO), ngăn cản quá trình oxy hóa I-ốt và gắn I-ốt vào Tyrosine để tổng hợp T3, T4.',
          caution: 'Theo dõi công thức máu (bạch cầu hạt) và men gan; báo bác sĩ ngay nếu sốt cao đau họng.'
        },
        {
          name: 'Levothyrox 50mcg - 100mcg (Chỉ dùng trong Suy giáp)',
          activeIngredient: 'Levothyroxine Sodium (T4 tổng hợp)',
          group: 'Hormone tuyến giáp thay thế',
          dosage: '25mcg - 100mcg x 1 lần/ngày tùy theo chỉ số TSH',
          usage: 'Uống vào buổi sáng lúc bụng đói, trước bữa ăn sáng ít nhất 30 - 60 phút',
          mechanism: 'Bổ sung hormone T4 ngoại sinh, chuyển hóa thành T3 tại mô ngoại vi giúp khôi phục chuyển hóa cơ bản.',
          caution: 'Tuyệt đối chống chỉ định trong Cường giáp chưa kiểm soát.'
        }
      ],
      emergencySigns: ['Sốt cao > 39.5°C, nhịp tim nhanh > 140 lần/phút, vật vã mê sảng, nôn mửa (Cơn bão giáp cấp tính)', 'Bướu cổ to nhanh gây chèn ép khí quản khó thở hoặc khàn tiếng'],
      referencedBooks: ['Guyton and Hall Textbook of Medical Physiology', 'Chinese Herbal Medicine: Materia Medica - Dan Bensky', 'Sổ Tay Đổng Thị Kỳ Huyệt', 'Dược thư Quốc gia Việt Nam']
    };
  }

  // 15. Bệnh lý Mạch vành / Đau thắt ngực / Rối loạn mỡ máu / Suy tim (Tâm Quý - Hung Tý)
  if (norm.includes('mo mau') || norm.includes('cholesterol') || norm.includes('triglyceride') || norm.includes('mach vanh') || norm.includes('suy tim') || norm.includes('dau that nguc') || norm.includes('tim dap nhanh')) {
    return {
      summary: `Bệnh lý Tim mạch - Mạch vành & Rối loạn Lipid máu (Xơ vữa động mạch / Thiếu máu cơ tim), Đông y biện chứng thuộc chứng Hung Tý - Tâm Thống do Tâm Huyết Ứ Trở kiêm Đàm Trọc Bế Tắc.`,
      clinicalDefinition: 'Bệnh lý mạch vành và rối loạn mỡ máu đặc trưng bởi sự tích tụ mảng xơ vữa Cholesterol (LDL-C) dưới lớp nội mạc động mạch vành gây hẹp lòng mạch, làm mất cân bằng giữa cung và cầu Oxy của cơ tim (biểu hiện đau thắt ngực, hồi hộp đánh trống ngực). Đông Y gọi là chứng "Hung Tý" hoặc "Chân Tâm Thống".',
      causesAndRiskFactors: [
        'Tăng LDL-Cholesterol, tăng Triglyceride, giảm HDL-C máu gây lắng đọng mảng xơ vữa lòng mạch.',
        'Tăng huyết áp, đái tháo đường, hút thuốc lá, béo phì nội tạng và lối sống tĩnh tại.',
        'Đông Y: Do ăn uống nhiều chất béo ngọt sinh Đàm trọc, hoặc tuổi cao Tâm Khí - Tâm Dương suy yếu làm huyết hành trì trệ sinh Huyết ứ làm tắc nghẽn Tâm mạch ("Thống tắc bất thông").'
      ],
      clinicalStages: [
        'Giai đoạn 1 — Rối loạn Lipid máu & Xơ vữa tiền lâm sàng: LDL-C ≥ 3.4 mmol/L (130 mg/dL) hoặc Triglyceride ≥ 1.7 mmol/L; hình thành vệt mỡ dưới nội mô mạch máu nhưng chưa gây đau ngực.',
        'Giai đoạn 2 — Đau thắt ngực ổn định (Bệnh mạch vành mạn - CCS độ I-II): Hẹp động mạch vành > 50-70%, xuất hiện cơn đau tức nặng sau xương ức khi gắng sức hoặc xúc động, giảm khi nghỉ ngơi.',
        'Giai đoạn 3 — Hội chứng mạch vành cấp (Đau thắt ngực không ổn định / Nhồi máu cơ tim): Nứt vỡ mảng xơ vữa tạo huyết khối bít tắc lòng mạch vành cấp tính.'
      ],
      westernDisease: 'Bệnh tim thiếu máu cục bộ mạn tính & Rối loạn Lipid máu (Dyslipidemia / CAD)',
      icd10: 'I25.9 / E78.5',
      pathophysiology: 'Theo Guyton & Hall: Khi lòng động mạch vành hẹp, lưu lượng tưới máu cơ tim giảm gây chuyển hóa yếm khí tại tế bào cơ tim, tích tụ Acid Lactic và Adenosine kích thích các đầu dây thần kinh giao cảm hướng tâm vùng ngực (T1-T5) gây đau thắt ngực lan lên vai trái.',
      differentialDiagnoses: ['Nhồi máu cơ tim cấp (STEMI / NSTEMI)', 'Trào ngược dạ dày thực quản (GERD)', 'Viêm sụn sườn / Đau thần kinh liên sườn'],
      investigations: ['Điện tâm đồ (ECG 12 chuyển đạo) & Siêu âm tim Doppler', 'Bộ mỡ máu (Cholesterol toàn phần, LDL-C, HDL-C, Triglyceride)', 'Troponin T/I siêu nhạy (nếu đau ngực cấp) & MSCT động mạch vành'],
      urgency: 'Cần kiểm soát chặt chẽ mỡ máu và bảo vệ mạch vành',
      easternSyndrome: 'Chứng Hung Tý Tâm Thống - Thể Tâm Huyết Ứ Trở kiêm Đàm Trọc',
      batCuong: 'Lý chứng, Bản Hư Tiêu Thực (Tâm Khí hư là Bản; Huyết ứ, Đàm trọc là Tiêu)',
      khiHuyet: 'Tâm khí bất túc, huyết ứ đàm trọc bế tắc tâm bào lạc',
      thietChanAnalysis: 'Chất lưỡi tím tối hoặc có điểm ứ huyết ở rìa lưỡi, tĩnh mạch dưới lưỡi phồng to tím sẫm, rêu lưỡi trắng nhớt; Mạch Sáp hoặc Kết Đại.',
      easternExplanation: 'Tâm chủ huyết mạch; khi đàm trọc và huyết ứ kết tụ trong lòng mạch làm dương khí vùng ngực (Hung dương) không thông suốt gây đau tức ngực, hồi hộp, hụt hơi.',
      tangPhu: 'Tâm, Tỳ và Can',
      phapTri: 'Hoạt huyết hóa ứ, thông dương tuyên tý, hóa đờm hạ mỡ máu, ích khí dưỡng tâm.',
      formulaName: 'Huyết Phủ Trục Ứ Thang hợp Qua Lâu薤Bạch Bán Hạ Thang (Vương Thanh Nhiệm & Trương Trọng Cảnh)',
      herbs: [
        { name: 'Đan Sâm & Tam Thất Bắc', amount: '16g Đan sâm, 6g Tam thất', grams: 16, role: 'Quân', purpose: 'Giãn động mạch vành, tăng lưu lượng tưới máu cơ tim, chống kết tập tiểu cầu và tiêu mảng xơ vữa' },
        { name: 'Đương Quy & Xuyên Khung', amount: '12g mỗi vị', grams: 12, role: 'Quân', purpose: 'Hoạt huyết hành khí, thông mạch giảm đau ngực' },
        { name: 'Đào Nhân & Hồng Hoa', amount: '10g mỗi vị', grams: 10, role: 'Thần', purpose: 'Phá huyết ứ, khơi thông vi tuần hoàn' },
        { name: 'Sơn Tra & Trạch Tả', amount: '15g mỗi vị', grams: 15, role: 'Tá', purpose: 'Tiêu thực hóa trệ, hạ Cholesterol và Triglyceride máu mạnh mẽ' },
        { name: 'Chỉ Xác & Cát Cánh', amount: '8g mỗi vị', grams: 8, role: 'Sứ', purpose: 'Khai khoan lồng ngực, dẫn thuốc đi vào vùng ngực tim' }
      ],
      howToUse: 'Sắc ngày 1 thang uống ấm sau ăn. Có thể dùng bột Tam Thất Bắc kết hợp Đan Sâm uống hằng ngày.',
      tungPoints: [
        { name: 'Tâm Thường (11.19) & Tâm Môn (33.12)', code: '11.19 / 33.12', howToPress: 'Tổ hợp huyệt Đổng Thị đặc trị bệnh mạch vành, thiếu máu cơ tim, rối loạn nhịp tim và đau thắt ngực: Châm hoặc day ấn mặt lòng ngón tay giữa và dưới mỏm khuỷu tay.' },
        { name: 'Thông Quan (88.01), Thông Sơn (88.02) & Thông Thiên (88.03)', code: '88.01 - 88.03', howToPress: 'Tổ hợp Thượng Tam Thông ở mặt trước đùi giúp cường tim, tăng tưới máu động mạch vành và hạ mỡ máu.' }
      ],
      classicPoints: [
        { name: 'Nội Quan (PC-6) & Đản Trung (CV-17)', location: 'Trên nếp cổ tay 2 thốn & chính giữa xương ức ngang liên sườn 4', howToPress: 'Cặp huyệt vàng cấp cứu và điều trị đau thắt ngực, điều hòa nhịp tim và mở rộng lồng ngực.' },
        { name: 'Phong Long (ST-40) & Túc Tam Lý (ST-36)', location: 'Mặt ngoài cẳng chân', howToPress: 'Hóa đờm trọc, giảm Cholesterol và Triglyceride huyết tương.' }
      ],
      doEat: ['Cá biển sâu giàu Omega-3 (EPA/DHA), dầu ô liu, quả bơ, yến mạch nguyên cám', 'Tỏi đen, nấm hương, mộc nhĩ đen, trà lá sen - sơn tra'],
      dontEat: ['Mỡ động vật, da gà vịt, nội tạng, lòng đỏ trứng quá nhiều', 'Thực phẩm chiên rán ngập dầu (Trans-fat), rượu bia, thuốc lá'],
      homeCare: 'Đi bộ nhẹ nhàng 30 phút/ngày, tránh tắm nước lạnh đột ngột vào ban đêm hoặc gắng sức quá mức.',
      protocolName: 'Phác đồ Kiểm soát Mỡ máu & Bảo vệ Mạch vành (ESC/ACC & Bộ Y Tế Việt Nam)',
      sourceGuidelines: ['ESC Guidelines on Chronic Coronary Syndromes', 'Dược thư Quốc gia Việt Nam', 'DiPiro Pharmacotherapy'],
      drugs: [
        {
          name: 'Crestor 10mg (hoặc Lipitor 20mg)',
          activeIngredient: 'Rosuvastatin 10mg (hoặc Atorvastatin 20mg)',
          group: 'Thuốc ức chế HMG-CoA Reductase (Statin)',
          dosage: '10mg - 20mg x 1 viên/ngày',
          usage: 'Uống vào buổi tối sau ăn hoặc trước khi ngủ',
          mechanism: 'Ức chế cạnh tranh enzyme HMG-CoA reductase tại gan, làm giảm tổng hợp Cholesterol nội sinh, tăng mật độ thụ thể LDL trên bề mặt tế bào gan để thu gom LDL-C và ổn định mảng xơ vữa động mạch vành.',
          caution: 'Theo dõi men gan (AST/ALT) và triệu chứng đau mỏi cơ (CK).'
        },
        {
          name: 'Vastarel MR 35mg (hoặc Преductal MR 35mg)',
          activeIngredient: 'Trimetazidine Dihydrochloride 35mg',
          group: 'Thuốc bảo vệ chuyển hóa tế bào cơ tim chống thiếu máu cục bộ',
          dosage: '35mg x 2 lần/ngày',
          usage: 'Uống vào bữa ăn sáng và tối',
          mechanism: 'Ức chế quá trình beta-oxy hóa acid béo chuỗi dài tại ty thể, chuyển hướng chuyển hóa năng lượng của cơ tim sang oxy hóa glucose hiệu quả hơn khi thiếu oxy, ngăn ngừa cơn đau thắt ngực mà không làm thay đổi huyết động.',
          caution: 'Chống chỉ định bệnh nhân Parkinson hoặc suy thận nặng (eGFR < 30 mL/phút).'
        }
      ],
      emergencySigns: ['Đau thắt ngực dữ dội như bóp nghẹt sau xương ức kéo dài > 15-20 phút, lan lên hàm dưới hoặc cánh tay trái, vã mồ hôi lạnh, khó thở (Dấu hiệu Nhồi máu cơ tim cấp - Gọi 115 ngay)'],
      referencedBooks: ['Guyton and Hall Textbook of Medical Physiology', 'The Practice of Chinese Medicine - Giovanni Maciocia', 'Chinese Herbal Medicine: Materia Medica - Dan Bensky', 'Sổ Tay Đổng Thị Kỳ Huyệt', 'Dược thư Quốc gia Việt Nam']
    };
  }

  // 14. Default / General Dynamic Synthesis incorporating any matched database records
  const customDiseaseTitle = topTungFormula
    ? topTungFormula.diseaseName
    : matchedKnowledge.westernDiseases[0]
    ? matchedKnowledge.westernDiseases[0].nameVi
    : `Hội chứng lâm sàng theo triệu chứng: "${rawText.slice(0, 80)}"`;

  const customIcd = matchedKnowledge.westernDiseases[0]?.icd10 || 'G43.9 / R51 / I10';
  const customPatho =
    matchedKnowledge.westernDiseases[0]?.guytonPhysiology.cellularHemodynamicMechanism ||
    'Theo Guyton & Hall: Rối loạn điều hòa vận mạch và dẫn truyền thần kinh tự chủ (Giao cảm - Phó giao cảm) kết hợp phóng thích chất trung gian hóa học gây phản ứng đau, viêm hoặc rối loạn chức năng cơ quan đích.';

  const customSyndrome = matchedKnowledge.tcmSyndromes[0]
    ? `${matchedKnowledge.tcmSyndromes[0].name} (${matchedKnowledge.tcmSyndromes[0].sinoVietnamese})`
    : 'Can Khí Uất Kết hóa Hỏa / Khí Huyết Bất Điều';

  const customHerbs =
    topHerbs.length >= 2
      ? topHerbs.map((h, idx) => ({
          name: h.vietnameseName,
          amount: h.dosageGram.split('-')[1]?.trim() || '12g',
          grams: 12,
          role: (idx === 0 ? 'Quân' : idx === 1 ? 'Thần' : 'Tá') as 'Quân' | 'Thần' | 'Tá' | 'Sứ',
          purpose: `${h.actions.join(', ')} (Trị: ${h.clinicalIndications.slice(0, 2).join(', ')})`
        }))
      : [
          { name: 'Thiên Ma & Câu Đằng', amount: '12g', grams: 12, role: 'Quân' as const, purpose: 'Bình can tức phong, thông kinh hoạt lạc, định huyễn chỉ thống' },
          { name: 'Đương Quy & Bạch Thược', amount: '12g', grams: 12, role: 'Thần' as const, purpose: 'Dưỡng huyết nhu can, điều hòa khí huyết, giảm co thắt' },
          { name: 'Xuyên Khung & Đan Sâm', amount: '10g', grams: 10, role: 'Tá' as const, purpose: 'Hoạt huyết hành khí, cải thiện tuần hoàn vi mạch' },
          { name: 'Phục Thần & Cam Thảo', amount: '8g', grams: 8, role: 'Sứ' as const, purpose: 'Kiện tỳ an thần, điều hòa các vị thuốc' }
        ];

  const customDrugs =
    topDrugs.length > 0
      ? topDrugs.map(d => ({
          name: `${d.commonBrandNames[0] || d.activeIngredient}`,
          activeIngredient: d.activeIngredient,
          group: d.groupName,
          dosage: d.standardDosage,
          usage: d.administration,
          mechanism: d.mechanismOfAction,
          caution: d.contraindications.join('; ')
        }))
      : [
          {
            name: 'Tanakan 40mg (hoặc Sibelium 5mg)',
            activeIngredient: 'Ginkgo Biloba chuẩn hóa EGb 761 (hoặc Flunarizine)',
            group: 'Thuốc điều hòa tuần hoàn vi mạch và bảo vệ tế bào thần kinh',
            dosage: '40mg x 3 lần/ngày',
            usage: 'Uống trong bữa ăn',
            mechanism: 'Chống oxy hóa tế bào nội mô, ức chế yếu tố hoạt hóa tiểu cầu PAF và điều hòa trương lực vi mạch.',
            caution: 'Thận trọng khi đang có rối loạn đông máu.'
          },
          {
            name: 'Magne-B6 Corbiere',
            activeIngredient: 'Magnesium Lactate 470mg + Pyridoxine B6 5mg',
            group: 'Khoáng chất & Coenzyme điều hòa dẫn truyền thần kinh - cơ',
            dosage: '1 viên x 2 lần/ngày',
            usage: 'Uống sau bữa ăn sáng - chiều',
            mechanism: 'Ổn định điện thế màng tế bào thần kinh và tham gia tổng hợp chất dẫn truyền thần kinh ức chế GABA nội sinh.',
            caution: 'Chống chỉ định suy thận nặng.'
          }
        ];

  return {
    summary: `Phân tích chuyên sâu theo triệu chứng "${rawText.slice(0, 90)}": Định hướng ${customDiseaseTitle}, Đông y biện chứng thuộc ${customSyndrome}.`,
    westernDisease: customDiseaseTitle,
    icd10: customIcd,
    pathophysiology: customPatho,
    differentialDiagnoses: ['Rối loạn chức năng thần kinh thực vật', 'Rối loạn tuần hoàn vi mạch cục bộ'],
    investigations: ['Xét nghiệm sinh hóa máu & Công thức máu tổng quát', 'Siêu âm hoặc Chẩn đoán hình ảnh chuyên khoa theo vùng triệu chứng'],
    urgency: 'Cần theo dõi và điều trị đúng phác đồ',
    easternSyndrome: customSyndrome,
    batCuong: 'Lý chứng, Hư Thực thác tạp',
    khiHuyet: 'Khí cơ uất trệ, âm dương khí huyết mất điều hòa tại kinh lạc và tạng phủ liên quan',
    thietChanAnalysis: 'Chất lưỡi hồng hoặc hai rìa hơi đỏ, rêu lưỡi mỏng; Mạch Huyền hoặc Huyền Tế.',
    easternExplanation: 'Khi chính khí suy giảm hoặc tình chí, ngoại tà tác động làm khí cơ tạng phủ mất sơ tiết, kinh lạc không thông suốt ("Bất thông tắc thống, bất vinh tắc thống").',
    tangPhu: 'Can, Tâm, Tỳ và Thận',
    phapTri: 'Điều hòa khí huyết, sơ thông kinh lạc, bình can kiện tỳ.',
    formulaName: matchedKnowledge.tcmSyndromes[0]?.primaryHerbalFormula.name || 'Thiên Ma Câu Đằng Ẩm hợp Tiêu Dao Tán gia giảm (Dan Bensky)',
    herbs: customHerbs,
    howToUse: 'Sắc uống ngày 1 thang chia 2 lần uống ấm sau bữa ăn 45 phút.',
    tungPoints: dbTungPoints || [
      { name: 'Linh Cốt (22.05) & Đại Bạch (22.04)', code: '22.05 / 22.04', howToPress: 'Tổ hợp huyệt thông khí hoạt huyết toàn thân mạnh nhất của Đổng Thị: Châm hoặc day ấn sâu kẽ xương bàn ngón tay 1-2 bên đối diện.' },
      { name: 'Tam Trọng: Nhất Trọng (77.05), Nhị Trọng (77.06), Tam Trọng (77.07)', code: '77.05 - 77.07', howToPress: 'Tổ hợp huyệt phá khí trệ, tiêu huyết ứ, trị đau nửa đầu, u cục và rối loạn thần kinh: Châm mặt ngoài xương mác cẳng chân.' }
    ],
    classicPoints: [
      { name: 'Hợp Cốc (LI-4) & Thái Xung (LR-3)', location: 'Kẽ xương bàn tay 1-2 & kẽ xương bàn chân 1-2', howToPress: 'Khai Tứ Quan (Bốn cửa khí huyết của cơ thể) giúp bình can, lý khí, hoạt huyết, giảm đau toàn thân.' },
      { name: 'Túc Tam Lý (ST-36) & Nội Quan (PC-6)', location: 'Dưới gối 3 thốn & trên cổ tay 2 thốn', howToPress: 'Bồi bổ chính khí, điều hòa thần kinh thực vật.' }
    ],
    doEat: ['Thực phẩm tươi ấm, rau xanh đậm, cá biển, hạt sen, táo đỏ, kỷ tử', 'Uống đủ 2 lít nước ấm mỗi ngày'],
    dontEat: ['Đồ ăn quá cay nóng, nhiều dầu mỡ chiên rán', 'Cà phê đặc, rượu bia, thức khuya sau 23h'],
    homeCare: 'Tập hít thở bụng sâu 15 phút mỗi tối, ngâm chân nước ấm trước khi đi ngủ.',
    protocolName: 'Phác đồ Điều trị Nội khoa & Điều hòa Tuần hoàn - Thần kinh (Dược thư Quốc gia VN & DiPiro)',
    sourceGuidelines: ['Dược thư Quốc gia Việt Nam', 'DiPiro Pharmacotherapy', 'Katzung Basic & Clinical Pharmacology'],
    drugs: customDrugs,
    emergencySigns: ['Đau đầu dữ dội đột ngột kèm nôn vọt, méo miệng hoặc yếu liệt nửa người (FAST)', 'Đau thắt ngực, khó thở cấp hoặc sốt cao co giật'],
    referencedBooks: [
      'Sổ Tay Đổng Thị Kỳ Huyệt',
      'Châm Cứu Chữa Bệnh - GS. Nguyễn Tài Thu',
      'Cẩm Nang Thực Hành Châm Cứu - Lưu Viêm',
      'Chinese Herbal Medicine: Materia Medica - Dan Bensky',
      'Guyton and Hall Textbook of Medical Physiology',
      'Dược thư Quốc gia Việt Nam'
    ]
  };
}

/**
 * Generates a complete, symptom-accurate SymptomResponseData object for /api/symptom-answer and SymptomCheckerModule
 */
export function generateDynamicSymptomResponse(symptomText: string) {
  const norm = normalizeVi(symptomText);
  const spec = matchClinicalDomain(norm, symptomText);

  return {
    summary: spec.summary,
    possibleWesternDiseases: [
      {
        name: spec.westernDisease,
        icd10: spec.icd10,
        explanation: spec.pathophysiology,
        pathophysiology: spec.pathophysiology,
        differentialDiagnoses: spec.differentialDiagnoses,
        investigations: spec.investigations,
        urgency: spec.urgency
      }
    ],
    easternSyndrome: {
      name: spec.easternSyndrome,
      explanation: spec.easternExplanation,
      batCuong: spec.batCuong,
      khiHuyet: spec.khiHuyet,
      thietChanAnalysis: spec.thietChanAnalysis,
      tangPhu: spec.tangPhu
    },
    herbalRemedy: {
      formulaName: spec.formulaName,
      herbs: spec.herbs.map(h => ({ name: h.name, amount: h.amount, purpose: h.purpose })),
      howToUse: spec.howToUse
    },
    acupressureAndNeedling: {
      tungPoints: spec.tungPoints,
      classicPoints: spec.classicPoints.map(c => ({ name: c.name, howToPress: c.howToPress }))
    },
    nutritionAndLifestyle: {
      doEat: spec.doEat,
      dontEat: spec.dontEat,
      homeCare: spec.homeCare
    },
    westernMedicationPlan: {
      protocolName: spec.protocolName,
      sourceGuidelines: spec.sourceGuidelines,
      drugs: spec.drugs,
      notes: spec.homeCare
    },
    emergencySigns: spec.emergencySigns,
    referencedBooks: spec.referencedBooks
  };
}

/**
 * Generates a complete, accurate DiagnosisResult for /api/diagnose and DiagnosisModule
 */
export function generateDynamicDiagnosisResult(
  patient: PatientInfo,
  vitals: Vitals,
  symptoms: Symptoms,
  exam: FourExaminations
): DiagnosisResult {
  const combined = `${symptoms.mainComplaint} ${symptoms.onset} ${symptoms.painCharacteristics} ${exam.vong} ${exam.tongue} ${exam.van_ask} ${exam.thiet}`;
  const norm = normalizeVi(combined);
  const spec = matchClinicalDomain(norm, symptoms.mainComplaint || combined);
  const pName = patient.name || 'Người bệnh';
  const pAge = patient.age || 45;

  return {
    summary: `Bệnh nhân ${pName} (${pAge} tuổi): ${spec.summary}`,
    westernAssessment: {
      provisionalDiagnosis: spec.westernDisease,
      icd10: spec.icd10,
      differentialDiagnoses: spec.differentialDiagnoses,
      guytonMechanism: spec.pathophysiology,
      investigationsNeeded: spec.investigations,
      redFlags: spec.emergencySigns
    },
    easternAssessment: {
      syndromePattern: spec.easternSyndrome,
      batCuong: spec.batCuong,
      tangPhu: spec.tangPhu,
      khiHuyet: spec.khiHuyet,
      thietChanAnalysis: exam.tongue || exam.thiet ? `Đối chiếu Tứ chẩn (${exam.tongue}; ${exam.thiet}): ${spec.thietChanAnalysis}` : spec.thietChanAnalysis
    },
    integratedTreatmentPlan: {
      phapTri: spec.phapTri,
      herbalPrescription: {
        formulaName: spec.formulaName,
        composition: spec.herbs.map(h => ({
          herb: h.name,
          grams: h.grams,
          role: h.role,
          purpose: h.purpose
        })),
        decoctionGuide: spec.howToUse,
        modifications: ['Gia giảm linh hoạt theo hàn nhiệt và thể trạng thực tế của người bệnh.']
      },
      acupuncturePrescription: {
        classicPoints: spec.classicPoints.map(c => ({
          point: c.name,
          location: c.location,
          technique: 'Châm đắc khí hoặc cứu ấm lưu kim 20 - 30 phút',
          purpose: c.howToPress
        })),
        tungPoints: spec.tungPoints.map(tp => ({
          point: tp.name,
          code: tp.code,
          dongQiInstructions: tp.howToPress,
          purpose: tp.howToPress
        })),
        nguyenTaiThuGuidance: `Theo phác đồ GS. Nguyễn Tài Thu & Lưu Viêm: Phối hợp huyệt tại chỗ, lân cận và huyệt đặc hiệu toàn thân, kết hợp điện châm hoặc cứu ngải đúng thể bệnh (${spec.easternSyndrome}).`,
        westernNeuroscience: 'Kích thích thụ thể thần kinh bản thể A-delta/C, điều hòa cổng kiểm soát đau tại sừng sau tủy sống và giải phóng Endorphin, GABA, Serotonin nội sinh.'
      },
      clinicalNutrition: {
        dietaryTherapy: `Chế độ dinh dưỡng điều trị hỗ trợ ${spec.westernDisease} theo Essentials of Nutrition.`,
        foodsToEat: spec.doEat,
        foodsToAvoid: spec.dontEat,
        drugNutrientInteractions: ['Uống thuốc Đông y và thuốc Tây y cách nhau tối thiểu 90 - 120 phút để tránh tương tác hấp thu tại dạ dày - ruột non.']
      },
      qigongAndLifestyle: spec.homeCare,
      westernPrescription: {
        protocolName: spec.protocolName,
        sourceGuidelines: spec.sourceGuidelines,
        medications: spec.drugs.map(d => ({
          drugName: d.name,
          activeIngredient: d.activeIngredient,
          group: d.group,
          dosage: d.dosage,
          timing: d.usage,
          mechanism: d.mechanism,
          contraindications: d.caution
        })),
        clinicalCautions: [
          'Tuân thủ đúng liều lượng và thời điểm dùng thuốc theo hướng dẫn.',
          'Uống cách thuốc sắc Đông Y ít nhất 1.5 - 2 giờ.'
        ],
        monitoringParameters: spec.investigations
      }
    },
    referencedBooks: spec.referencedBooks
  };
}

export interface GlobalSearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Bệnh Lý & Phác Đồ' | 'Kỳ Huyệt Đổng Thị' | 'Kỳ Huyệt WHO' | 'Thuốc Tây Y' | 'Dược Điển Đông-Nam Y' | 'Sách Y Điển';
  targetTab: 'symptom' | 'diagnose' | 'pharmacology' | 'library' | 'acupuncture' | 'herbal' | 'physiology' | 'chat';
  chatPrompt: string;
}

export function searchGlobalMedicalIndex(rawQuery: string): GlobalSearchItem[] {
  const q = normalizeVi(rawQuery);
  if (!q || q.length < 2) return [];

  const results: GlobalSearchItem[] = [];

  // 1. Search Tung Points
  for (const pt of TUNG_POINTS) {
    const codeNorm = pt.code.toLowerCase();
    const nameNorm = normalizeVi(pt.name);
    const indNorm = normalizeVi(pt.indications.join(' '));
    if (codeNorm.includes(q) || nameNorm.includes(q) || indNorm.includes(q)) {
      results.push({
        id: `tung-${pt.id}`,
        title: `Huyệt ${pt.name} (${pt.code})`,
        subtitle: `${pt.zone} · Chủ trị: ${pt.indications.slice(0, 3).join(', ')}`,
        category: 'Kỳ Huyệt Đổng Thị',
        targetTab: 'acupuncture',
        chatPrompt: `Vị trí giải phẫu, chủ trị và cách châm huyệt ${pt.name} (${pt.code})?`
      });
      if (results.length >= 4) break;
    }
  }

  // 2. Search WHO Extra Points
  for (const wp of WHO_EXTRA_POINTS) {
    if (normalizeVi(wp.name).includes(q) || wp.code.toLowerCase().includes(q) || normalizeVi(wp.indications.join(' ')).includes(q)) {
      results.push({
        id: `who-${wp.code}`,
        title: `Kỳ huyệt WHO: ${wp.name} (${wp.code})`,
        subtitle: `${wp.region} · ${wp.indications.slice(0, 3).join(', ')}`,
        category: 'Kỳ Huyệt WHO',
        targetTab: 'acupuncture',
        chatPrompt: `Vị trí giải phẫu, công năng và cách châm kỳ huyệt ${wp.name} (${wp.code})?`
      });
      if (results.length >= 6) break;
    }
  }

  // 3. Search Tung Clinical Formulas / Diseases
  for (const fm of TUNG_FORMULAS) {
    if (normalizeVi(fm.diseaseName).includes(q) || normalizeVi(fm.category).includes(q)) {
      results.push({
        id: `fm-${fm.id}`,
        title: `Phác đồ: ${fm.diseaseName}`,
        subtitle: `Chuyên khoa: ${fm.category} · Huyệt chính: ${fm.mainPoints.slice(0, 3).join(', ')}`,
        category: 'Bệnh Lý & Phác Đồ',
        targetTab: 'chat',
        chatPrompt: `Bệnh ${fm.diseaseName} là gì? Nguyên nhân, các giai đoạn và phác đồ điều trị Đông - Tây Y kết hợp Kỳ huyệt Đổng Thị?`
      });
      if (results.length >= 9) break;
    }
  }

  // 4. Search Western Drugs
  for (const d of WESTERN_DRUGS_DATABASE) {
    if (
      normalizeVi(d.activeIngredient).includes(q) ||
      normalizeVi(d.commonBrandNames.join(' ')).includes(q) ||
      normalizeVi(d.indications.join(' ')).includes(q)
    ) {
      results.push({
        id: `drug-${d.id}`,
        title: `${d.activeIngredient} (${d.commonBrandNames.slice(0, 2).join(', ')})`,
        subtitle: `${d.groupName} · Liều: ${d.standardDosage}`,
        category: 'Thuốc Tây Y',
        targetTab: 'pharmacology',
        chatPrompt: `Cơ chế dược lý, chỉ định, liều dùng chuẩn và chống chỉ định của thuốc ${d.activeIngredient} (${d.commonBrandNames[0]})?`
      });
      if (results.length >= 12) break;
    }
  }

  // 5. Search Eastern/Southern Herbs
  for (const h of HERBAL_MATERIA) {
    if (
      normalizeVi(h.vietnameseName).includes(q) ||
      normalizeVi(h.botanicalName).includes(q) ||
      normalizeVi(h.clinicalIndications.join(' ')).includes(q)
    ) {
      results.push({
        id: `herb-${h.id}`,
        title: `Vị thuốc: ${h.vietnameseName} (${h.botanicalName})`,
        subtitle: `${h.category} · Liều: ${h.dosageGram}`,
        category: 'Dược Điển Đông-Nam Y',
        targetTab: 'herbal',
        chatPrompt: `Tính vị quy kinh, công năng, chủ trị, liều lượng và hoạt chất dược lý của vị thuốc ${h.vietnameseName}?`
      });
      if (results.length >= 15) break;
    }
  }

  // 6. Search Medical Books
  for (const b of MEDICAL_BOOKS) {
    if (normalizeVi(b.title).includes(q) || normalizeVi(b.author).includes(q)) {
      results.push({
        id: `book-${b.id}`,
        title: b.title,
        subtitle: `Tác giả: ${b.author} · ${b.categoryLabel}`,
        category: 'Sách Y Điển',
        targetTab: 'library',
        chatPrompt: `Tóm tắt các học thuyết cốt lõi và giá trị ứng dụng lâm sàng của sách "${b.title}" (${b.author})?`
      });
      if (results.length >= 18) break;
    }
  }

  return results.slice(0, 12);
}

export function getSuggestedFollowUpQuestions(query: string): string[] {
  const norm = normalizeVi(query);

  if (norm.includes('gout') || norm.includes('thong phong') || norm.includes('uric')) {
    return [
      'Cách châm tổ hợp Hạ Tam Hoàng (77.17, 77.19, 77.21) để đào thải Acid Uric máu?',
      'Lưu ý tương tác khi kết hợp Colchicine, Febuxostat với bài thuốc Tứ Diệu Tán?',
      'Thực đơn 7 ngày kiềm hóa nước tiểu và ngăn tái phát hạt Tophi cho người bệnh Gout?'
    ];
  }

  if (norm.includes('tieu duong') || norm.includes('dai thao duong') || norm.includes('hba1c')) {
    return [
      'Phác đồ châm cứu huyệt Tụy Du (EX-B3) và Thận Quan (77.18) kiểm soát đường huyết?',
      'Cơ chế phối hợp thuốc Metformin với bài Ngọc Dịch Thang mà không gây hạ đường huyết?',
      'Cách phòng ngừa và điều trị biến chứng tê bì bàn chân đái tháo đường?'
    ];
  }

  if (norm.includes('than kinh toa') || norm.includes('thoat vi') || norm.includes('dau lung')) {
    return [
      'Kỹ thuật Động khí châm pháp cho cặp huyệt Linh Cốt (22.05) & Đại Bạch (22.04)?',
      'Khi nào thoát vị đĩa đệm cột sống thắt lưng cần can thiệp phẫu thuật cấp cứu?',
      'Phân tích bài thuốc Độc Hoạt Tang Ký Sinh Thang đối chiếu cơ chế giảm đau thần kinh?'
    ];
  }

  if (norm.includes('huyet ap') || norm.includes('tai bien') || norm.includes('dot quy')) {
    return [
      'Phác đồ Mãng châm GS. Nguyễn Tài Thu phục hồi liệt nửa người sau đột quỵ?',
      'Cơ chế hạ áp của huyệt Hỏa Ngạnh (66.03) và bài Thiên Ma Câu Đằng Ẩm?',
      'Cách xử trí cấp cứu ban đầu khi huyết áp tăng vọt trên 180/110 mmHg?'
    ];
  }

  if (norm.includes('da day') || norm.includes('trao nguoc') || norm.includes('gerd')) {
    return [
      'Cơ chế ức chế bơm Proton của Esomeprazole đối chiếu với bài Bán Hạ Tả Tâm Thang?',
      'Vị trí và cách bấm huyệt Túc Tam Lý (ST-36), Trung Quản (CV-12) cắt cơn đau thượng vị?',
      'Chế độ ăn trung hòa acid dịch vị và diệt khuẩn HP tự nhiên?'
    ];
  }

  return [
    'Bệnh Gout là gì? Nguyên nhân, có bao nhiêu giai đoạn và cách chữa trị?',
    'Phác đồ Đổng Thị Kỳ Huyệt điều trị đau thần kinh tọa và thoát vị đĩa đệm?',
    'Cơ chế điều trị Đái tháo đường Type 2 kết hợp Đông - Tây Y và huyệt Hạ Tam Hoàng?'
  ];
}


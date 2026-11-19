import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/**
 * Welds coincident vertices and computes area-weighted smooth normals
 * plus shrinkage-free Taubin (λ/μ) surface fairing and local mean-curvature
 * (Laplacian cavity) estimation for anatomical bone shading.
 */
function smoothAndAnalyzeBoneGeometry(
  geo: THREE.BufferGeometry,
  iterations = 1,
  computeCurvature = true
): Float32Array {
  const posAttr = geo.attributes.position;
  if (!posAttr) return new Float32Array(0);
  const vCount = posAttr.count;

  const precision = 20000; // 0.05mm weld tolerance
  const map = new Map<number, number>();
  const repOf = new Int32Array(vCount);
  const reps: number[] = [];

  for (let i = 0; i < vCount; i++) {
    const ix = Math.round(posAttr.getX(i) * precision) + 65536;
    const iy = Math.round(posAttr.getY(i) * precision) + 65536;
    const iz = Math.round(posAttr.getZ(i) * precision) + 65536;
    const key = (ix * 131072 + iy) * 131072 + iz;
    let r = map.get(key);
    if (r === undefined) {
      r = reps.length;
      map.set(key, r);
      reps.push(i);
    }
    repOf[i] = r;
  }

  const uCount = reps.length;
  const uPos = new Float32Array(uCount * 3);
  for (let r = 0; r < uCount; r++) {
    const idx = reps[r];
    uPos[r * 3] = posAttr.getX(idx);
    uPos[r * 3 + 1] = posAttr.getY(idx);
    uPos[r * 3 + 2] = posAttr.getZ(idx);
  }

  const adj: number[][] = Array.from({ length: uCount }, () => []);
  const indexAttr = geo.index;
  const triCount = indexAttr ? indexAttr.count / 3 : Math.floor(vCount / 3);
  const addEdge = (a: number, b: number) => {
    const listA = adj[a];
    for (let k = 0; k < listA.length; k++) {
      if (listA[k] === b) return;
    }
    listA.push(b);
    adj[b].push(a);
  };

  for (let t = 0; t < triCount; t++) {
    const i0 = indexAttr ? indexAttr.getX(t * 3) : t * 3;
    const i1 = indexAttr ? indexAttr.getX(t * 3 + 1) : t * 3 + 1;
    const i2 = indexAttr ? indexAttr.getX(t * 3 + 2) : t * 3 + 2;
    const r0 = repOf[i0];
    const r1 = repOf[i1];
    const r2 = repOf[i2];
    if (r0 !== r1) addEdge(r0, r1);
    if (r1 !== r2) addEdge(r1, r2);
    if (r2 !== r0) addEdge(r2, r0);
  }

  if (iterations > 0) {
    const tempPos = new Float32Array(uCount * 3);
    const applyLaplacianStep = (src: Float32Array, dst: Float32Array, weight: number) => {
      for (let r = 0; r < uCount; r++) {
        const nbs = adj[r];
        const len = nbs.length;
        const r3 = r * 3;
        if (len < 2) {
          dst[r3] = src[r3];
          dst[r3 + 1] = src[r3 + 1];
          dst[r3 + 2] = src[r3 + 2];
          continue;
        }
        let sx = 0;
        let sy = 0;
        let sz = 0;
        for (let k = 0; k < len; k++) {
          const nb3 = nbs[k] * 3;
          sx += src[nb3];
          sy += src[nb3 + 1];
          sz += src[nb3 + 2];
        }
        const inv = 1 / len;
        dst[r3] = src[r3] + weight * (sx * inv - src[r3]);
        dst[r3 + 1] = src[r3 + 1] + weight * (sy * inv - src[r3 + 1]);
        dst[r3 + 2] = src[r3 + 2] + weight * (sz * inv - src[r3 + 2]);
      }
    };

    const lambda = 0.36;
    const mu = -0.38;
    for (let iter = 0; iter < iterations; iter++) {
      applyLaplacianStep(uPos, tempPos, lambda);
      applyLaplacianStep(tempPos, uPos, mu);
    }

    for (let i = 0; i < vCount; i++) {
      const r3 = repOf[i] * 3;
      posAttr.setXYZ(i, uPos[r3], uPos[r3 + 1], uPos[r3 + 2]);
    }
    posAttr.needsUpdate = true;
  }

  // Compute area-weighted welded smooth normals
  const uNorm = new Float32Array(uCount * 3);
  const pA = new THREE.Vector3();
  const pB = new THREE.Vector3();
  const pC = new THREE.Vector3();
  const cb = new THREE.Vector3();
  const ab = new THREE.Vector3();

  for (let t = 0; t < triCount; t++) {
    const i0 = indexAttr ? indexAttr.getX(t * 3) : t * 3;
    const i1 = indexAttr ? indexAttr.getX(t * 3 + 1) : t * 3 + 1;
    const i2 = indexAttr ? indexAttr.getX(t * 3 + 2) : t * 3 + 2;
    const r0 = repOf[i0];
    const r1 = repOf[i1];
    const r2 = repOf[i2];

    pA.set(uPos[r0 * 3], uPos[r0 * 3 + 1], uPos[r0 * 3 + 2]);
    pB.set(uPos[r1 * 3], uPos[r1 * 3 + 1], uPos[r1 * 3 + 2]);
    pC.set(uPos[r2 * 3], uPos[r2 * 3 + 1], uPos[r2 * 3 + 2]);

    cb.subVectors(pC, pB);
    ab.subVectors(pA, pB);
    cb.cross(ab);

    uNorm[r0 * 3] += cb.x;
    uNorm[r0 * 3 + 1] += cb.y;
    uNorm[r0 * 3 + 2] += cb.z;

    uNorm[r1 * 3] += cb.x;
    uNorm[r1 * 3 + 1] += cb.y;
    uNorm[r1 * 3 + 2] += cb.z;

    uNorm[r2 * 3] += cb.x;
    uNorm[r2 * 3 + 1] += cb.y;
    uNorm[r2 * 3 + 2] += cb.z;
  }

  for (let r = 0; r < uCount; r++) {
    const r3 = r * 3;
    const len = Math.hypot(uNorm[r3], uNorm[r3 + 1], uNorm[r3 + 2]) || 1;
    uNorm[r3] /= len;
    uNorm[r3 + 1] /= len;
    uNorm[r3 + 2] /= len;
  }

  const normals = new Float32Array(vCount * 3);
  for (let i = 0; i < vCount; i++) {
    const r3 = repOf[i] * 3;
    normals[i * 3] = uNorm[r3];
    normals[i * 3 + 1] = uNorm[r3 + 1];
    normals[i * 3 + 2] = uNorm[r3 + 2];
  }
  geo.setAttribute('normal', new THREE.BufferAttribute(normals, 3));

  if (!geo.attributes.uv) {
    const uvs = new Float32Array(vCount * 2);
    for (let i = 0; i < vCount; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = posAttr.getZ(i);
      uvs[i * 2] = (x * 0.85 + z * 0.5) * 14.0;
      uvs[i * 2 + 1] = (y * 0.92 - z * 0.32) * 14.0;
    }
    geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  }

  const cavity = new Float32Array(vCount);
  if (computeCurvature) {
    const uCavity = new Float32Array(uCount);
    for (let r = 0; r < uCount; r++) {
      const nbs = adj[r];
      const len = nbs.length;
      if (len < 2) continue;
      const r3 = r * 3;
      let dx = 0;
      let dy = 0;
      let dz = 0;
      let avgEdge = 0;
      for (let k = 0; k < len; k++) {
        const nb3 = nbs[k] * 3;
        const ex = uPos[nb3] - uPos[r3];
        const ey = uPos[nb3 + 1] - uPos[r3 + 1];
        const ez = uPos[nb3 + 2] - uPos[r3 + 2];
        dx += ex;
        dy += ey;
        dz += ez;
        avgEdge += Math.hypot(ex, ey, ez);
      }
      const inv = 1 / len;
      dx *= inv;
      dy *= inv;
      dz *= inv;
      avgEdge = Math.max(0.0005, avgEdge * inv);
      const dot = dx * uNorm[r3] + dy * uNorm[r3 + 1] + dz * uNorm[r3 + 2];
      uCavity[r] = Math.max(-1, Math.min(1, (-dot / avgEdge) * 3.2));
    }
    for (let i = 0; i < vCount; i++) {
      cavity[i] = uCavity[repOf[i]];
    }
  }
  return cavity;
}

// Fast mesh normal & curvature analysis directly preserves high-detail medical GLB geometry without 4x CPU bloat.

/**
 * Generates an anatomically sculpted 32-tooth upper & lower human dentition
 * seated directly inside the maxillary and mandibular alveolar sockets in natural occlusion.
 * Each tooth (I1, I2, C, PM1, PM2, M1, M2, M3) is individually sculpted with:
 *  - Contiguous mesial-to-distal contact points (zero picket-fence gaps)
 *  - Anatomical crown profile (spade-shaped incisors, pointed canine cusp, bicuspid premolars, multi-cusp molars)
 *  - Cervical neck constriction & root tapering into the alveolar socket
 *  - Smooth enamel-to-cervical dentin vertex color gradient
 */
function createSculptedAnatomicalDentition(): THREE.BufferGeometry {
  const geometries: THREE.BufferGeometry[] = [];

  // Alveolar arch trajectory matching the transformed maxilla & mandible in skeleton.glb:
  // Upper alveolar margin: y = 1.6532 (front) -> 1.6552 (back), z = 0.1492 (front) -> 0.1265 (molar)
  // Lower alveolar margin: y = 1.6412 (front) -> 1.6435 (back), z = 0.1476 (front) -> 0.1250 (molar)
  // Occlusal plane: y = 1.6470 (front) -> 1.6492 (molar)
  const archSpecs = [
    // [sParam, mesiodistalWidth, labiolingualThickness, crownHeightU, crownHeightL, type]
    { t: 0.065, w: 0.0041, d: 0.0034, hU: 0.0064, hL: 0.0054, kind: 'incisor1' as const },
    { t: 0.185, w: 0.0035, d: 0.0032, hU: 0.0059, hL: 0.0052, kind: 'incisor2' as const },
    { t: 0.305, w: 0.0039, d: 0.0040, hU: 0.0066, hL: 0.0059, kind: 'canine' as const },
    { t: 0.435, w: 0.0038, d: 0.0046, hU: 0.0055, hL: 0.0051, kind: 'premolar' as const },
    { t: 0.565, w: 0.0039, d: 0.0049, hU: 0.0053, hL: 0.0049, kind: 'premolar' as const },
    { t: 0.705, w: 0.0048, d: 0.0056, hU: 0.0051, hL: 0.0048, kind: 'molar' as const },
    { t: 0.850, w: 0.0046, d: 0.0054, hU: 0.0049, hL: 0.0046, kind: 'molar' as const },
    { t: 0.975, w: 0.0042, d: 0.0050, hU: 0.0046, hL: 0.0044, kind: 'molar' as const },
  ];

  const evalArchPoint = (t: number, isUpper: boolean, side: number) => {
    // Parabolic-catenary human dental arch curve in X-Z matching the registered skull in skeleton.glb
    const archW = isUpper ? 0.0296 : 0.0282;
    const zFront = isUpper ? 0.1590 : 0.1575;
    const zBack = isUpper ? 0.1350 : 0.1335;

    const x = side * archW * Math.pow(Math.sin(t * 0.5 * Math.PI), 0.86);
    const z = zFront - (zFront - zBack) * Math.pow(t, 1.55);

    // Slight Curve of Spee (occlusal plane rises gently toward molars)
    const occlusalY = 1.6465 + 0.0020 * Math.pow(t, 1.4);
    return { x, z, occlusalY };
  };

  const buildSingleTooth = (
    spec: (typeof archSpecs)[number],
    isUpper: boolean,
    side: number
  ): THREE.BufferGeometry => {
    const { t, w, d, hU, hL, kind } = spec;
    const crownH = isUpper ? hU : hL;
    const rootEmbed = 0.0028; // Root collar embedded cleanly inside the alveolar socket

    const pt = evalArchPoint(t, isUpper, side);
    const ptNext = evalArchPoint(Math.min(1, t + 0.02), isUpper, side);

    // Local tangent (mesial -> distal) and outward labial/buccal normal
    const tx = ptNext.x - pt.x;
    const tz = ptNext.z - pt.z;
    const tLen = Math.hypot(tx, tz) || 1;
    const dirX = tx / tLen;
    const dirZ = tz / tLen;
    // Outward normal pointing toward lips/cheek (z+ and away from midline)
    const normX = -side * dirZ;
    const normZ = side * dirX;

    const uSegs = 20;
    const vSegs = 9;
    const positions: number[] = [];
    const colors: number[] = [];
    const indices: number[] = [];

    const cEnamelTip = new THREE.Color(0xf4eee0);
    const cEnamelBody = new THREE.Color(0xe6dac2);
    const cCervical = new THREE.Color(0xc2ab87);
    const cEmbrasure = new THREE.Color(0x9b825f);
    const tmpColor = new THREE.Color();

    for (let iv = 0; iv <= vSegs; iv++) {
      // v = 0 at root collar inside gum -> v = 1 at incisal/occlusal tip
      const v = iv / vSegs;

      // Vertical position from alveolar root socket to occlusal plane
      const totalLen = crownH + rootEmbed;
      // Slight overbite: upper incisors overlap +0.6mm past occlusal plane
      const overbite = isUpper && kind !== 'molar' ? 0.0005 * (1 - t) : 0;
      const yFromRoot = v * (totalLen + overbite);
      const yWorld = isUpper
        ? pt.occlusalY + crownH + rootEmbed - yFromRoot
        : pt.occlusalY - crownH - rootEmbed + yFromRoot;

      // Mesiodistal width profile: narrow at root/cervix, broad & contiguous at contact point (v ~ 0.68)
      let widthScale = 1.0;
      if (v < 0.25) {
        // Root collar tapering into socket
        widthScale = 0.68 + 0.22 * (v / 0.25);
      } else if (v < 0.78) {
        // Swells out to touch adjacent teeth at interproximal contact area
        const sv = (v - 0.25) / 0.53;
        widthScale = 0.90 + 0.16 * Math.sin(sv * Math.PI * 0.75);
      } else {
        // Incisal/occlusal rounding
        const tv = (v - 0.78) / 0.22;
        widthScale = kind === 'canine' ? 1.04 * (1 - 0.62 * tv * tv) : 1.05 * (1 - 0.22 * tv * tv);
      }

      // Labiolingual thickness profile: incisors chisel down to a thin biting edge; molars stay broad
      let depthScale = 1.0;
      if (v < 0.25) {
        depthScale = 0.72 + 0.20 * (v / 0.25);
      } else if (kind === 'incisor1' || kind === 'incisor2') {
        const cv = Math.max(0, (v - 0.25) / 0.75);
        // Cingulum bulge near base, chisel edge at v = 1
        depthScale = (0.95 + 0.12 * Math.sin(cv * Math.PI)) * (1 - 0.72 * Math.pow(cv, 1.65));
      } else if (kind === 'canine') {
        const cv = Math.max(0, (v - 0.25) / 0.75);
        depthScale = (0.96 + 0.14 * Math.sin(cv * Math.PI)) * (1 - 0.60 * Math.pow(cv, 1.55));
      } else {
        // Premolars & molars have a broad occlusal table
        const cv = Math.max(0, (v - 0.25) / 0.75);
        depthScale = 0.92 + 0.14 * Math.sin(cv * Math.PI * 0.8) - 0.16 * Math.pow(cv, 2.2);
      }

      for (let iu = 0; iu <= uSegs; iu++) {
        const theta = (iu / uSegs) * Math.PI * 2;
        const cosT = Math.cos(theta); // mesial (-1) <-> distal (+1)
        const sinT = Math.sin(theta); // lingual (-1) <-> labial/buccal (+1)

        // Superellipse cross-section (squarish anatomical tooth crown rather than round cylinder)
        const sqX = Math.sign(cosT) * Math.pow(Math.abs(cosT), 0.72);
        const sqZ = Math.sign(sinT) * Math.pow(Math.abs(sinT), 0.78);

        let localMesial = sqX * (w * 0.52) * widthScale;
        let localLabial = sqZ * (d * 0.50) * depthScale;

        // Labial convexity: labial face (sinT > 0) bows slightly outward; lingual face of incisors is slightly concave
        if ((kind === 'incisor1' || kind === 'incisor2') && v > 0.35 && sinT < 0) {
          localLabial += 0.00045 * Math.sin(((v - 0.35) / 0.65) * Math.PI) * (-sinT);
        }

        // Occlusal cusp relief at top of crown (v > 0.75)
        let cuspOffsetY = 0;
        if (v > 0.72) {
          const cuspFactor = (v - 0.72) / 0.28;
          if (kind === 'canine') {
            // Pointed central cusp
            cuspOffsetY = (isUpper ? -1 : 1) * 0.0008 * cuspFactor * Math.cos(cosT * 1.3);
          } else if (kind === 'premolar') {
            // Buccal and lingual cusps with central developmental groove
            const groove = Math.abs(sinT) * 0.8 + 0.2;
            cuspOffsetY = (isUpper ? -1 : 1) * 0.00055 * cuspFactor * (groove - 0.45);
          } else if (kind === 'molar') {
            // 4-cusp occlusal table (mesiobuccal, distobuccal, mesiolingual, distolingual)
            const fourCusp = Math.abs(cosT * sinT);
            cuspOffsetY = (isUpper ? -1 : 1) * 0.00065 * cuspFactor * (fourCusp - 0.35);
          }
        }

        // Collapse top ring (iv === vSegs) smoothly toward the occlusal center/incisal line
        const capCollapse = iv === vSegs ? 0.08 : 1.0;
        localMesial *= iv === vSegs && (kind === 'incisor1' || kind === 'incisor2') ? 0.88 : capCollapse;
        localLabial *= capCollapse;

        const wx = pt.x + dirX * localMesial + normX * localLabial;
        const wz = pt.z + dirZ * localMesial + normZ * localLabial;
        const wy = yWorld + cuspOffsetY;

        positions.push(wx, wy, wz);

        // Realistic tooth shading: warm cervical dentin near gumline & interproximal embrasures,
        // bright translucent ivory enamel toward incisal/occlusal edge
        const embrasureShadow = Math.pow(Math.abs(cosT), 2.2) * (1 - 0.5 * v);
        if (v < 0.32) {
          tmpColor.lerpColors(cCervical, cEnamelBody, v / 0.32);
        } else {
          tmpColor.lerpColors(cEnamelBody, cEnamelTip, (v - 0.32) / 0.68);
        }
        tmpColor.lerp(cEmbrasure, embrasureShadow * 0.38);
        // Subtle lingual darkening inside the mouth
        if (sinT < 0) {
          tmpColor.multiplyScalar(1 - 0.08 * (-sinT));
        }
        colors.push(tmpColor.r, tmpColor.g, tmpColor.b);
      }
    }

    const row = uSegs + 1;
    for (let iv = 0; iv < vSegs; iv++) {
      for (let iu = 0; iu < uSegs; iu++) {
        const a = iv * row + iu;
        const b = a + 1;
        const c = a + row;
        const dIdx = c + 1;
        if (isUpper) {
          indices.push(a, b, dIdx, a, dIdx, c);
        } else {
          indices.push(a, dIdx, b, a, c, dIdx);
        }
      }
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    g.setIndex(indices);
    g.computeVertexNormals();
    return g;
  };

  for (const side of [-1, 1]) {
    for (const isUpper of [true, false]) {
      for (const spec of archSpecs) {
        geometries.push(buildSingleTooth(spec, isUpper, side));
      }
    }
  }

  const merged = mergeGeometries(geometries, false);
  geometries.forEach((g) => g.dispose());
  merged.computeVertexNormals();
  return merged;
}

/**
 * Creates a deep internal sphenoidal/choanal shadow baffle far behind the nasal septum
 * so the skull's eye orbits stay 100% open & hollow (no spheres inside eye sockets!)
 * while the deep posterior nasal aperture does not leak bright sky through sutures.
 */
function createCranialFossaOcclusionLiners(): THREE.BufferGeometry {
  const geo = new THREE.SphereGeometry(0.0115, 14, 10);
  geo.scale(0.85, 1.15, 0.75);
  geo.translate(0.0, 1.690, 0.104);

  const nonIndexed = geo.index ? geo.toNonIndexed() : geo;
  if (geo !== nonIndexed) geo.dispose();

  const count = nonIndexed.attributes.position.count;
  const cols = new Float32Array(count * 3);
  const c = new THREE.Color(0x4a3d2e);
  for (let i = 0; i < count; i++) {
    cols[i * 3] = c.r;
    cols[i * 3 + 1] = c.g;
    cols[i * 3 + 2] = c.b;
  }
  nonIndexed.setAttribute('color', new THREE.BufferAttribute(cols, 3));
  nonIndexed.computeVertexNormals();
  return nonIndexed;
}

/**
 * Computes multi-scale anatomical vertex colors for each bone based on:
 *  - Local mean curvature (`cavity` from Laplacian analysis: darkens sulci, fossae, nutrient foramina, sutures)
 *  - Epiphyseal vs diaphyseal position (warmer spongy trabecular bone at joint condyles, denser ivory cortical bone along shafts)
 *  - Cranial suture proximity on skull bones
 *  - Translucent bluish-ivory chondral tint on costal cartilages and intervertebral discs
 */
function applyAnatomicalBoneVertexColors(
  geo: THREE.BufferGeometry,
  boneName: string,
  cavity: Float32Array
): void {
  const posAttr = geo.attributes.position;
  const normAttr = geo.attributes.normal;
  const vCount = posAttr.count;
  const colors = new Float32Array(vCount * 3);

  geo.computeBoundingBox();
  const bbox = geo.boundingBox!;
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  bbox.getSize(size);
  bbox.getCenter(center);
  const maxSpan = Math.max(0.005, size.x, size.y, size.z);

  const isCartilage =
    boneName.includes('cartilage') || boneName.includes('intervertebral-disc');
  const isSkull =
    boneName.includes('frontal') ||
    boneName.includes('parietal') ||
    boneName.includes('occipital') ||
    boneName.includes('temporal') ||
    boneName.includes('sphenoid') ||
    boneName.includes('ethmoid') ||
    boneName.includes('nasal') ||
    boneName.includes('lacrimal') ||
    boneName.includes('zygomatic') ||
    boneName.includes('maxilla') ||
    boneName.includes('palatine') ||
    boneName.includes('vomer') ||
    boneName.includes('mandible');

  // Realistic museum/medical osteological ivory palette (not chalky white plastic)
  const cCortical = new THREE.Color(0xe3d5ba); // Warm natural cortical bone ivory
  const cEpiphysis = new THREE.Color(0xc5ab84); // Rich trabecular epiphyseal condyle ochre
  const cSulcus = new THREE.Color(0x6d563e); // Deep anatomical fossae, sulci, sutures, foramina
  const cRidge = new THREE.Color(0xf0e5ce); // Crisp bony crests, lines, tuberosities
  const cOrbitShadow = new THREE.Color(0x4f3d2c); // Deep internal orbital / nasal bone self-shadow

  const cCartilageCore = new THREE.Color(0xaec2cc); // Translucent cool-pearl hyaline costal cartilage
  const cCartilageEdge = new THREE.Color(0x8ea6b3);

  const tmp = new THREE.Color();

  for (let i = 0; i < vCount; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    const z = posAttr.getZ(i);
    const ny = normAttr ? normAttr.getY(i) : 0;
    const nz = normAttr ? normAttr.getZ(i) : 1;
    const cav = cavity[i] || 0;

    if (isCartilage) {
      const edgeT = Math.min(
        1,
        Math.hypot(x - center.x, y - center.y, z - center.z) / (maxSpan * 0.5)
      );
      tmp.lerpColors(cCartilageCore, cCartilageEdge, edgeT * 0.72);
      if (cav < 0) {
        tmp.lerp(cSulcus, Math.min(0.45, -cav * 0.42));
      } else if (cav > 0) {
        tmp.lerp(cRidge, Math.min(0.22, cav * 0.18));
      }
    } else {
      // Distance from bone center -> 0 at diaphysis shaft center, 1 at epiphyseal ends / suture perimeter
      const distNorm = Math.min(
        1,
        Math.hypot(x - center.x, y - center.y, z - center.z) / (maxSpan * 0.52)
      );
      // Epiphyseal transition near bone ends and suture borders
      const epiphysealT = Math.pow(distNorm, 1.65) * (isSkull ? 0.48 : 0.72);
      tmp.lerpColors(cCortical, cEpiphysis, epiphysealT);

      // Multi-frequency deterministic osteon / Haversian canal micro-grain
      const grain =
        Math.sin(x * 195.0 + y * 102.0 + z * 165.0) *
        Math.cos(y * 270.0 - z * 145.0) *
        0.036;
      tmp.offsetHSL(0, 0, grain);

      // Strong curvature shading: darken concavities (fossae, nutrient grooves, intercostal channels, sutures)
      if (cav < 0) {
        const sulcusStrength = Math.min(0.84, -cav * (isSkull ? 0.85 : 0.72));
        tmp.lerp(cSulcus, sulcusStrength);
      } else if (cav > 0) {
        tmp.lerp(cRidge, Math.min(0.48, cav * 0.38));
      }

      // Deep orbital & nasal cavity internal anatomical self-shadowing on skull
      if (isSkull) {
        // Inside eye orbits: y in [1.695, 1.735], |x| in [0.012, 0.048], z < 0.140
        const inOrbitX = Math.abs(Math.abs(x) - 0.029);
        const inOrbitY = Math.abs(y - 1.714);
        if (inOrbitX < 0.021 && inOrbitY < 0.021 && z < 0.142 && z > 0.098) {
          const depthOrbit = Math.max(0, Math.min(1, (0.142 - z) / 0.024));
          const radialOrbit = Math.max(
            0,
            1 - Math.hypot(inOrbitX / 0.021, inOrbitY / 0.021)
          );
          tmp.lerp(cOrbitShadow, depthOrbit * radialOrbit * 0.78);
        }

        // Inside piriform nasal aperture: |x| < 0.015, y in [1.668, 1.705], z < 0.145
        const inNoseX = Math.abs(x);
        const inNoseY = Math.abs(y - 1.685);
        if (inNoseX < 0.016 && inNoseY < 0.021 && z < 0.146 && z > 0.100) {
          const depthNose = Math.max(0, Math.min(1, (0.146 - z) / 0.022));
          const radialNose = Math.max(
            0,
            1 - Math.hypot(inNoseX / 0.016, inNoseY / 0.021)
          );
          tmp.lerp(cOrbitShadow, depthNose * radialNose * 0.82);
        }

        // Crisp cranial suture line accentuation near perimeter of skull bones
        if (distNorm > 0.72) {
          const sutureT = (distNorm - 0.72) / 0.28;
          tmp.lerp(cSulcus, sutureT * 0.44);
        }
      }

      // Natural inferior/posterior anatomical ambient occlusion
      const ao = (ny < 0 ? -ny * 0.075 : 0) + (nz < 0 ? -nz * 0.05 : 0);
      tmp.multiplyScalar(1 - ao);
    }

    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }

  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
}

/**
 * Generates high-resolution procedural cortical bone & periosteal normal/roughness maps.
 */
function createCorticalBoneMaps(): {
  bumpMap: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
} {
  const size = 512;
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bCtx = bumpCanvas.getContext('2d')!;
  const bImg = bCtx.createImageData(size, size);

  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = size;
  roughCanvas.height = size;
  const rCtx = roughCanvas.getContext('2d')!;
  const rImg = rCtx.createImageData(size, size);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const u = (x / size) * Math.PI * 2;
      const v = (y / size) * Math.PI * 2;

      // Longitudinal Haversian canal striation + fine trabecular micro-pores
      const striation =
        Math.sin(u * 16 + Math.cos(v * 3) * 1.5) * 0.45 +
        Math.sin(u * 34 - v * 6) * 0.28 +
        Math.cos(v * 20 + u * 5) * 0.27;

      const pore =
        Math.sin(u * 48 + v * 42) * Math.cos(u * 29 - v * 51);

      const bumpVal = Math.max(
        0,
        Math.min(255, Math.round(128 + striation * 34 + pore * 24))
      );
      bImg.data[idx] = bumpVal;
      bImg.data[idx + 1] = bumpVal;
      bImg.data[idx + 2] = bumpVal;
      bImg.data[idx + 3] = 255;

      const roughVal = Math.max(
        0,
        Math.min(255, Math.round(142 - striation * 24 + pore * 26))
      );
      rImg.data[idx] = roughVal;
      rImg.data[idx + 1] = roughVal;
      rImg.data[idx + 2] = roughVal;
      rImg.data[idx + 3] = 255;
    }
  }

  bCtx.putImageData(bImg, 0, 0);
  rCtx.putImageData(rImg, 0, 0);

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(9, 9);

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.repeat.set(9, 9);

  return { bumpMap, roughnessMap };
}

let cachedSkeletonTemplate: THREE.Group | null = null;
let loadingCallbacks: Array<(template: THREE.Group) => void> | null = null;

/**
 * Loads the complete 242-bone human skeleton from `/models/skeleton.glb`,
 * performs shrinkage-free Taubin fairing + Laplacian curvature shading across all bones,
 * and adds a sculpted 32-tooth anatomical dentition in true alveolar occlusion.
 * Returns a `THREE.Group` container immediately and populates it once loaded.
 */
export function buildCompleteAnatomicalSkeleton3D(onLoaded?: () => void): THREE.Group {
  const container = new THREE.Group();
  container.name = 'anatomical-skeleton-root';

  if (cachedSkeletonTemplate) {
    container.add(cachedSkeletonTemplate.clone(true));
    onLoaded?.();
    return container;
  }

  if (loadingCallbacks) {
    loadingCallbacks.push((tpl) => {
      container.add(tpl.clone(true));
      onLoaded?.();
    });
    return container;
  }

  loadingCallbacks = [
    (tpl) => {
      container.add(tpl.clone(true));
      onLoaded?.();
    },
  ];

  const loader = new GLTFLoader();
  loader.load(
    '/models/skeleton.glb',
    (gltf) => {
      const root = gltf.scene;
      const { bumpMap, roughnessMap } = createCorticalBoneMaps();

      // 1. Cortical & Cancellous Bone Material (Natural satin ivory bone, not shiny white PVC)
      const boneMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        vertexColors: true,
        roughness: 0.62,
        roughnessMap,
        metalness: 0.0,
        clearcoat: 0.06,
        clearcoatRoughness: 0.48,
        reflectivity: 0.34,
        envMapIntensity: 0.40,
        sheen: 0.12,
        sheenRoughness: 0.72,
        sheenColor: new THREE.Color(0xe6d6bc),
        bumpMap,
        bumpScale: 0.00145,
        side: THREE.FrontSide,
        transparent: false,
        depthWrite: true,
      });

      // 2. Hyaline Costal Cartilage & Intervertebral Fibrocartilage Disc Material
      const cartilageMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        vertexColors: true,
        roughness: 0.34,
        metalness: 0.0,
        clearcoat: 0.28,
        clearcoatRoughness: 0.28,
        envMapIntensity: 0.50,
        sheen: 0.20,
        sheenRoughness: 0.48,
        sheenColor: new THREE.Color(0xc8dce6),
        side: THREE.FrontSide,
        transparent: false,
        depthWrite: true,
      });

      // 3. Dental Enamel Material
      const teethMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        vertexColors: true,
        roughness: 0.15,
        metalness: 0.01,
        clearcoat: 0.78,
        clearcoatRoughness: 0.12,
        reflectivity: 0.72,
        sheen: 0.15,
        sheenRoughness: 0.25,
        sheenColor: new THREE.Color(0xfffcf5),
        side: THREE.FrontSide,
        transparent: false,
        depthWrite: true,
      });

      // 4. Deep Cranial Fossa Liner Material
      const fossaMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        vertexColors: true,
        roughness: 0.88,
        metalness: 0.0,
        side: THREE.FrontSide,
      });

      const boneGeos: THREE.BufferGeometry[] = [];
      const cartilageGeos: THREE.BufferGeometry[] = [];
      const identityMat = new THREE.Matrix4();

      const applyAnatomicalJointAlignment = (
        geo: THREE.BufferGeometry,
        name: string
      ) => {
        const pos = geo.attributes.position;
        const count = pos.count;
        if (count === 0) return;

        // NOTE: THREE.MathUtils.smoothstep(x, min, max) strictly requires min < max!
        const rampDown = (v: number, low: number, high: number) =>
          1 - THREE.MathUtils.smoothstep(v, low, high);

        if (name === 'mandible') {
          for (let i = 0; i < count; i++) {
            const y = pos.getY(i);
            const z = pos.getZ(i);
            const anteriorT = Math.max(0, Math.min(1, (z - 0.088) / 0.032));
            pos.setY(i, y - 0.0092 * anteriorT);
            pos.setZ(i, z - 0.0006 * anteriorT);
          }
          pos.needsUpdate = true;
          return;
        }

        if (
          name === 'manubrium-of-sternum' ||
          name === 'body-of-sternum' ||
          name === 'xiphoid-process'
        ) {
          // Bring sternum forward onto the true anterior thoracic wall plane so all 7 costal cartilages articulate flush
          for (let i = 0; i < count; i++) {
            const y = pos.getY(i);
            const z = pos.getZ(i);
            const yFrac = THREE.MathUtils.clamp((1.470 - y) / (1.470 - 1.268), 0, 1);
            const dz = THREE.MathUtils.lerp(0.0056, 0.0124, yFrac);
            const dy = THREE.MathUtils.lerp(
              0.0022,
              0.0005,
              THREE.MathUtils.clamp((1.470 - y) / 0.060, 0, 1)
            );
            pos.setY(i, y + dy);
            pos.setZ(i, z + dz);
          }
          pos.needsUpdate = true;
          return;
        }

        if (
          name.includes('costal-cartilage') &&
          !name.includes('lower-costal')
        ) {
          // Lock lateral end (maxAbsX) 100% onto bony rib (tMed = 0), taper medial tip into sternal costal notch (<1.8mm)
          let minAbsX = Infinity;
          let maxAbsX = -Infinity;
          for (let i = 0; i < count; i++) {
            const ax = Math.abs(pos.getX(i));
            if (ax < minAbsX) minAbsX = ax;
            if (ax > maxAbsX) maxAbsX = ax;
          }
          const spanX = Math.max(0.008, maxAbsX - minAbsX);
          const side = name.startsWith('left') ? 1 : -1;
          let dxIn = 0.0044;
          let dyOff = -0.0018;
          let dzOff = 0.0012;
          if (name.includes('first')) {
            dxIn = 0.0046;
            dyOff = -0.0025;
            dzOff = -0.0004;
          } else if (name.includes('second')) {
            dxIn = 0.0082;
            dyOff = -0.0018;
            dzOff = 0.0018;
          } else if (name.includes('third')) {
            dxIn = 0.0068;
            dyOff = -0.0022;
            dzOff = 0.0014;
          } else if (name.includes('fourth')) {
            dxIn = 0.0060;
            dyOff = -0.0018;
            dzOff = 0.0012;
          } else if (name.includes('fifth')) {
            dxIn = 0.0054;
            dyOff = -0.0018;
            dzOff = 0.0014;
          } else if (name.includes('sixth')) {
            dxIn = 0.0054;
            dyOff = -0.0010;
            dzOff = 0.0010;
          } else if (name.includes('seventh')) {
            dxIn = 0.0018;
            dyOff = 0.0012;
            dzOff = 0.0006;
          }

          for (let i = 0; i < count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const z = pos.getZ(i);
            const tMed = rampDown(Math.abs(x), minAbsX + 0.001, minAbsX + spanX * 0.62);
            pos.setXYZ(
              i,
              x - side * dxIn * tMed,
              y + dyOff * tMed,
              z + dzOff * tMed
            );
          }
          pos.needsUpdate = true;
          return;
        }

        if (name === 'left-clavicle' || name === 'right-clavicle') {
          // Keep lateral AC joint locked; seat medial sternoclavicular head directly into manubrium notch
          const side = name.startsWith('left') ? 1 : -1;
          for (let i = 0; i < count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const z = pos.getZ(i);
            const tMed = rampDown(Math.abs(x), 0.014, 0.088);
            pos.setXYZ(
              i,
              x - side * 0.0022 * tMed,
              y - 0.0016 * tMed,
              z + 0.0055 * tMed
            );
          }
          pos.needsUpdate = true;
          return;
        }

        if (name === 'left-humerus' || name === 'right-humerus') {
          // Seat humeral head cleanly inside the glenoid cavity under the acromion and align elbow condyles
          const side = name.startsWith('left') ? 1 : -1;
          for (let i = 0; i < count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const z = pos.getZ(i);
            const tDist = THREE.MathUtils.clamp((Math.abs(x) - 0.170) / (0.361 - 0.170), 0, 1);
            pos.setXYZ(
              i,
              x - side * 0.0135 * Math.pow(1 - tDist, 1.35),
              y + THREE.MathUtils.lerp(-0.0145, -0.0120, tDist),
              z + THREE.MathUtils.lerp(-0.0085, -0.0020, tDist)
            );
          }
          pos.needsUpdate = true;
          return;
        }

        if (
          name === 'left-radius' ||
          name === 'right-radius' ||
          name === 'left-ulna' ||
          name === 'right-ulna'
        ) {
          // Align proximal elbow to humeral trochlea/capitulum while keeping distal wrist locked
          let minAbsX = Infinity;
          let maxAbsX = -Infinity;
          for (let i = 0; i < count; i++) {
            const ax = Math.abs(pos.getX(i));
            if (ax < minAbsX) minAbsX = ax;
            if (ax > maxAbsX) maxAbsX = ax;
          }
          const isRadius = name.includes('radius');
          const side = name.startsWith('left') ? 1 : -1;
          const spanX = Math.max(0.01, maxAbsX - minAbsX);
          for (let i = 0; i < count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const z = pos.getZ(i);
            const tFore = THREE.MathUtils.clamp((Math.abs(x) - minAbsX) / spanX, 0, 1);
            let nx = x;
            let ny = y + THREE.MathUtils.lerp(-0.0120, 0.0, Math.pow(tFore, 0.9));
            const nz = z + THREE.MathUtils.lerp(-0.0020, 0.0, tFore);
            if (isRadius) {
              const tProx = Math.pow(1 - tFore, 2.2);
              nx -= side * 0.0022 * tProx;
              ny += 0.0028 * tProx;
            }
            pos.setXYZ(i, nx, ny, nz);
          }
          pos.needsUpdate = true;
          return;
        }

        if (name === 'left-hip-bone' || name === 'right-hip-bone') {
          // Symmetrically close only the anterior pubic symphysis cleft from 7.6mm down to crisp ~2.5mm
          const side = name.startsWith('left') ? 1 : -1;
          for (let i = 0; i < count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const z = pos.getZ(i);
            const symT =
              rampDown(Math.abs(x), 0.005, 0.032) *
              rampDown(y, 0.892, 0.935) *
              THREE.MathUtils.smoothstep(z, 0.025, 0.058);
            pos.setX(i, x - side * 0.0026 * symT);
          }
          pos.needsUpdate = true;
          return;
        }

        if (name === 'left-femur' || name === 'right-femur') {
          // Seat bilateral femoral heads symmetrically deep inside acetabular sockets (~1.0mm joint space) while locking knee
          const side = name.startsWith('left') ? 1 : -1;
          for (let i = 0; i < count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const z = pos.getZ(i);
            const tProx = THREE.MathUtils.smoothstep(y, 0.62, 0.88);
            pos.setXYZ(
              i,
              x - side * 0.0046 * tProx,
              y + 0.0036 * tProx,
              z + 0.0034 * tProx
            );
          }
          pos.needsUpdate = true;
          return;
        }

        if (name === 'left-fibula' || name === 'right-fibula') {
          // Snug distal lateral malleolus subtly into the ankle mortise alongside the talus
          const side = name.startsWith('left') ? 1 : -1;
          for (let i = 0; i < count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const tDist = rampDown(y, 0.08, 0.22);
            pos.setX(i, x - side * 0.0018 * tDist);
          }
          pos.needsUpdate = true;
        }
      };

      root.traverse((child) => {
        if (!(child as THREE.Mesh).isMesh) return;
        const mesh = child as THREE.Mesh;
        const name = (mesh.name || mesh.parent?.name || '').toLowerCase();
        const geo = mesh.geometry;
        if (!geo || !geo.attributes.position) return;

        mesh.updateWorldMatrix(true, false);
        if (!mesh.matrixWorld.equals(identityMat)) {
          geo.applyMatrix4(mesh.matrixWorld);
        }

        applyAnatomicalJointAlignment(geo, name);

        const cavity = smoothAndAnalyzeBoneGeometry(geo, 1, true);
        applyAnatomicalBoneVertexColors(geo, name, cavity);

        // Normalize to indexed BufferGeometry with matching [position, normal, uv, color] for safe merging
        const isCartilage =
          name.includes('cartilage') || name.includes('intervertebral-disc');
        if (isCartilage) {
          cartilageGeos.push(geo.index ? geo : geo.toNonIndexed());
        } else {
          boneGeos.push(geo.index ? geo : geo.toNonIndexed());
        }
      });

      const batchedRoot = new THREE.Group();
      batchedRoot.name = 'anatomical-skeleton-batched';

      const toCommonAttributeList = (geos: THREE.BufferGeometry[]): THREE.BufferGeometry[] => {
        const allIndexed = geos.every((g) => Boolean(g.index));
        return geos.map((g) => {
          const out = allIndexed ? g : g.index ? g.toNonIndexed() : g;
          // Ensure uint32 index consistency if merging indexed geometries
          if (out.index && !(out.index.array instanceof Uint32Array)) {
            out.setIndex(new THREE.BufferAttribute(new Uint32Array(out.index.array), 1));
          }
          return out;
        });
      };

      const disposeList = (orig: THREE.BufferGeometry[], normalized: THREE.BufferGeometry[]) => {
        const unique = new Set<THREE.BufferGeometry>([...orig, ...normalized]);
        unique.forEach((g) => g.dispose());
      };

      if (boneGeos.length > 0) {
        const normalizedBones = toCommonAttributeList(boneGeos);
        const mergedBoneGeo = mergeGeometries(normalizedBones, false);
        disposeList(boneGeos, normalizedBones);
        if (mergedBoneGeo) {
          mergedBoneGeo.computeBoundingBox();
          mergedBoneGeo.computeBoundingSphere();
          const mergedBoneMesh = new THREE.Mesh(mergedBoneGeo, boneMaterial);
          mergedBoneMesh.name = 'skeleton-merged-bones';
          batchedRoot.add(mergedBoneMesh);
        }
      }

      if (cartilageGeos.length > 0) {
        const normalizedCarts = toCommonAttributeList(cartilageGeos);
        const mergedCartGeo = mergeGeometries(normalizedCarts, false);
        disposeList(cartilageGeos, normalizedCarts);
        if (mergedCartGeo) {
          mergedCartGeo.computeBoundingBox();
          mergedCartGeo.computeBoundingSphere();
          const mergedCartMesh = new THREE.Mesh(mergedCartGeo, cartilageMaterial);
          mergedCartMesh.name = 'skeleton-merged-cartilage';
          batchedRoot.add(mergedCartMesh);
        }
      }

      const dentalGeo = createSculptedAnatomicalDentition();
      const dentalMesh = new THREE.Mesh(dentalGeo, teethMaterial);
      dentalMesh.name = 'anatomical-dental-arches-32';
      batchedRoot.add(dentalMesh);

      const fossaGeo = createCranialFossaOcclusionLiners();
      const fossaMesh = new THREE.Mesh(fossaGeo, fossaMaterial);
      fossaMesh.name = 'cranial-fossa-liners';
      batchedRoot.add(fossaMesh);

      cachedSkeletonTemplate = batchedRoot;
      const cbs = loadingCallbacks || [];
      loadingCallbacks = null;
      cbs.forEach((cb) => cb(batchedRoot));
    },
    undefined,
    (err) => {
      console.error('Failed to load /models/skeleton.glb:', err);
      loadingCallbacks = null;
    }
  );

  return container;
}

export const buildAnatomicalSkeleton3D = buildCompleteAnatomicalSkeleton3D;



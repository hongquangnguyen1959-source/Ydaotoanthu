import { AcupointClinicalEntry, HAND_MERIDIANS_CLINICAL } from './handMeridiansClinical';
import { FOOT_YANG_MERIDIANS_CLINICAL } from './footYangMeridiansClinical';
import { BLADDER_MERIDIAN_CLINICAL } from './bladderMeridianClinical';
import { FOOT_YIN_MERIDIANS_CLINICAL } from './footYinMeridiansClinical';
import { VESSELS_AND_EXTRA_CLINICAL } from './vesselsAndExtraClinical';

export type { AcupointClinicalEntry };

/**
 * Toàn bộ cơ sở dữ liệu lâm sàng & giải phẫu của 420 huyệt vị:
 * - 362 huyệt trên 14 đường kinh chính (LU, LI, ST, SP, HT, SI, BL, KI, PC, TE, GB, LR, GV, CV)
 * - 58 Kinh Ngoại Kỳ Huyệt (EX)
 */
export const COMPLETE_ACUPOINT_CLINICAL_DB: Record<string, AcupointClinicalEntry> = {
  ...HAND_MERIDIANS_CLINICAL,
  ...FOOT_YANG_MERIDIANS_CLINICAL,
  ...BLADDER_MERIDIAN_CLINICAL,
  ...FOOT_YIN_MERIDIANS_CLINICAL,
  ...VESSELS_AND_EXTRA_CLINICAL,
};

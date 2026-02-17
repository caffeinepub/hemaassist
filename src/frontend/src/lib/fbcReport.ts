interface FBCData {
  patientName: string;
  patientId: string;
  hb: string;
  rbc: string;
  wbc: string;
  platelets: string;
  mcv: string;
  mchc: string;
  neutrophils: string;
  lymphocytes: string;
  monocytes: string;
  eosinophils: string;
  basophils: string;
}

type FlagResult = 'Low' | 'High' | 'Normal';

function flag(value: number, low: number, high: number): FlagResult {
  if (value < low) return 'Low';
  if (value > high) return 'High';
  return 'Normal';
}

export function generateFBCReport(data: FBCData): string {
  // Parse numeric values
  const hb = parseFloat(data.hb);
  const wbc = parseFloat(data.wbc);
  const platelets = parseFloat(data.platelets);
  const mcv = parseFloat(data.mcv);
  const mchc = parseFloat(data.mchc);
  const neutrophils = parseFloat(data.neutrophils);
  const lymphocytes = parseFloat(data.lymphocytes);

  // Flag values based on reference ranges
  const hbFlag = flag(hb, 12, 17);
  const mcvFlag = flag(mcv, 80, 100);
  const mchcFlag = flag(mchc, 29, 37);

  // RBC morphology interpretation
  const anaemia = hbFlag === 'Low' ? 'Anaemia present' : 'No anaemia';
  const size = mcvFlag === 'Low' ? 'Microcytic' : mcvFlag === 'High' ? 'Macrocytic' : 'Normocytic';
  const chroma = mchcFlag === 'Low' ? 'Hypochromic' : mchcFlag === 'High' ? 'Hyperchromic' : 'Normochromic';

  // WBC interpretation
  let wbcComment = 'Normal total WBC count';
  if (wbc < 4) {
    wbcComment = 'Leukopenia';
  } else if (wbc > 12) {
    wbcComment = 'Leukocytosis';
  }

  // WBC differential interpretation
  const diffComments: string[] = [];
  if (neutrophils > 75) {
    diffComments.push('Neutrophilia');
  } else if (neutrophils < 40) {
    diffComments.push('Neutropenia');
  }

  if (lymphocytes > 45) {
    diffComments.push('Lymphocytosis');
  } else if (lymphocytes < 20) {
    diffComments.push('Lymphopenia');
  }

  if (diffComments.length === 0) {
    diffComments.push('Normal WBC differential');
  }

  // Platelet interpretation
  let plateletComment = 'Normal platelet count';
  if (platelets < 150) {
    plateletComment = 'Thrombocytopenia';
  } else if (platelets > 450) {
    plateletComment = 'Thrombocytosis';
  }

  // Build report
  const report = `PATIENT: ${data.patientName}  |  ID: ${data.patientId}

COMMENTS:
Red Cells: ${anaemia}; ${size}, ${chroma}
White Cells: ${wbcComment}; ${diffComments.join(', ')}
Platelets: ${plateletComment}`;

  return report;
}

interface FBCInputs {
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

export function validateFBCInputs(inputs: FBCInputs): string | null {
  // Check numeric fields
  const numericFields: (keyof FBCInputs)[] = [
    'hb',
    'rbc',
    'wbc',
    'platelets',
    'mcv',
    'mchc',
    'neutrophils',
    'lymphocytes',
    'monocytes',
    'eosinophils',
    'basophils',
  ];

  for (const field of numericFields) {
    const value = inputs[field];
    if (!value || value.trim() === '') {
      return 'All fields must contain numeric values.';
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return 'All fields must contain numeric values.';
    }
  }

  return null;
}

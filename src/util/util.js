const standard_deduction = {
  Single: 14600,
  "Married Filing Separately": 14600,
  "Married Filing Jointly": 29200,
  "Qualifying Widow(er)": 29200,
  "Head of Household": 21900,
};

const brackets = {
  2024: {
    rates: [0.1, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37],
    allCaps: {
      Single: [
        0,
        11600,
        47150,
        100525,
        191950,
        243752,
        609350,
        Infinity,
      ],
      "Married Filing Separately": [
        0,
        11600,
        47150,
        100525,
        191950,
        243752,
        365600,
        Infinity,
      ],
      "Married Filing Jointly": [
        0,
        23200,
        94300,
        201050,
        383900,
        487450,
        731200,
        Infinity,
      ],
      "Qualifying Widow(er)": [
        0,
        23200,
        94300,
        201050,
        383900,
        487450,
        731200,
        Infinity,
      ],
      "Head of Household": [
        0,
        16550,
        63100,
        100500,
        191950,
        243700,
        609350,
        Infinity,
      ],
    },
  },
};

const getPairs = (a) => a.slice(0, -1).map((e, i) => [e, a[i + 1]]);
const zip = (a, b) => a.map((e, i) => [e, b[i]]);

const getTax = (tax_year, status, taxableIncome) => {
  if (!(tax_year && status && taxableIncome)) return null;
  const { rates, allCaps } = brackets[tax_year];
  if (!(rates && allCaps)) return null;
  const caps = allCaps[status];
  if (!caps) return null;
  const capPairs = getPairs(caps);
  if (!capPairs) return null;
  const rateCaps = zip(rates, capPairs);
  if (!rateCaps) return null;
  const tax = rateCaps.reduce((total, [rate, [lo, hi]]) => {
    if (taxableIncome < lo) return total;
    hi = Math.min(hi, taxableIncome);
    const bracketTax = (hi - lo) * rate;
    const newTotal = total + bracketTax;
    return newTotal;
  }, 0);
  return tax;
};

const form1040Fields = [
  {
    key: "topmostSubform[0].Page1[0].f1_04[0]",
    type: "PDFTextField2",
    label: "Your first name and middle initial",
    value: ({ humanSlice, form1040Data }) => {
      const { filer_id } = form1040Data;
      if (!(filer_id && filer_id in humanSlice)) return null;
      const filer = humanSlice[filer_id];
      if (!filer) return null;
      const { first_name, middle_initial } = filer;
      if (!(first_name || middle_initial)) return null;
      return (
        first_name +
        (middle_initial ? " " + middle_initial + "." : "")
      );
    },
  },
  {
    key: "topmostSubform[0].Page1[0].f1_05[0]",
    type: "PDFTextField2",
    label: "Last name",
    value: ({ humanSlice, form1040Data }) => {
      const { filer_id } = form1040Data;
      if (!(filer_id && filer_id in humanSlice)) return null;
      const filer = humanSlice[filer_id];
      if (!filer) return null;
      const { last_name } = filer;
      if (!last_name) return null;
      return last_name;
    },
  },
  {
    key: "topmostSubform[0].Page1[0].f1_07[0]",
    type: "PDFTextField2",
    label: "If joint return, spouse’s first name and middle initial",
    value: ({ humanSlice, form1040Data }) => {
      const { spouse_id } = form1040Data;
      if (!(spouse_id && spouse_id in humanSlice)) return null;
      const spouse = humanSlice[spouse_id];
      if (!spouse) return null;
      const { first_name, middle_initial } = spouse;
      if (!(first_name || middle_initial)) return null;
      return (
        first_name +
        (middle_initial ? " " + middle_initial + "." : "")
      );
    },
  },
  {
    key: "topmostSubform[0].Page1[0].f1_08[0]",
    type: "PDFTextField2",
    label: "Spouse last name",
    value: ({ humanSlice, form1040Data }) => {
      const { spouse_id } = form1040Data;
      if (!(spouse_id && spouse_id in humanSlice)) return null;
      const spouse = humanSlice[spouse_id];
      if (!spouse) return null;
      const { last_name } = spouse;
      if (!last_name) return null;
      return last_name;
    },
  },
  {
    key: "topmostSubform[0].Page1[0].Address_ReadOrder[0].f1_10[0]",
    type: "PDFTextField2",
    label: `Home address(number and street).
            If you have a P.O.box, see instructions.`,
    value: ({ addressSlice, form1040Data }) => {
      const { address_id } = form1040Data;
      if (!(address_id && address_id in addressSlice)) return null;
      const address = addressSlice[address_id];
      if (!address) return null;
      const { street } = address;
      if (!street) return null;
      return street;
    },
  },
  {
    key: "topmostSubform[0].Page1[0].Address_ReadOrder[0].f1_12[0]",
    type: "PDFTextField2",
    label: `City, town, or post office.
            If you have a foreign address, also complete spaces below.`,
    value: ({ addressSlice, form1040Data }) => {
      const { address_id } = form1040Data;
      if (!(address_id && address_id in addressSlice)) return null;
      const address = addressSlice[address_id];
      if (!address) return null;
      const { city } = address;
      if (!city) return null;
      return city;
    },
  },
  {
    key: "topmostSubform[0].Page1[0].Address_ReadOrder[0].f1_13[0]",
    type: "PDFTextField2",
    label: "State",
    value: ({ addressSlice, form1040Data }) => {
      const { address_id } = form1040Data;
      if (!(address_id && address_id in addressSlice)) return null;
      const address = addressSlice[address_id];
      if (!address) return null;
      const { state } = address;
      if (!state) return null;
      return state;
    },
  },
  {
    key: "topmostSubform[0].Page1[0].Address_ReadOrder[0].f1_14[0]",
    type: "PDFTextField2",
    label: "ZIP",
    value: ({ addressSlice, form1040Data }) => {
      const { address_id } = form1040Data;
      if (!(address_id && address_id in addressSlice)) return null;
      const address = addressSlice[address_id];
      if (!address) return null;
      const { zip } = address;
      if (!zip) return null;
      return zip;
    },
  },
  {
    key: "topmostSubform[0].Page1[0].FilingStatus_ReadOrder[0].c1_3[0]",
    type: "PDFCheckBox2",
    label: "Single",
  },
  {
    key: "topmostSubform[0].Page1[0].FilingStatus_ReadOrder[0].c1_3[1]",
    type: "PDFCheckBox2",
    label: "Married filing jointly (even if only one had income)",
  },
  {
    key: "topmostSubform[0].Page1[0].FilingStatus_ReadOrder[0].c1_3[2]",
    type: "PDFCheckBox2",
    label: "Married filing separately (MFS)",
  },
  {
    key: "topmostSubform[0].Page1[0].c1_3[0]",
    type: "PDFCheckBox2",
    label: "Head of household (HOH)",
  },
  {
    key: "topmostSubform[0].Page1[0].c1_3[1]",
    type: "PDFCheckBox2",
    label: "Qualifying surviving spouse (QSS)",
  },
  {
    key: "topmostSubform[0].Page1[0].c1_9[0]",
    type: "PDFCheckBox2",
    label: "You were born before January 2, 1960",
  },
  {
    key: "topmostSubform[0].Page1[0].c1_10[0]",
    type: "PDFCheckBox2",
    label: "You are blind",
  },
  {
    key: "topmostSubform[0].Page1[0].c1_11[0]",
    type: "PDFCheckBox2",
    label: "Spouse born before January 2, 1960",
  },
  {
    key: "topmostSubform[0].Page1[0].c1_12[0]",
    type: "PDFCheckBox2",
    label: "Spouse is blind",
  },
  {
    key: "topmostSubform[0].Page1[0].f1_32[0]",
    type: "PDFTextField2",
    label: "Total amount from Form(s) W-2, box 1 (see instructions)",
    value: ({ form1040Data: { wages } }) => wages || null,
  },
  {
    key: "topmostSubform[0].Page1[0].f1_41[0]",
    type: "PDFTextField2",
    label: "Add lines 1a through 1h",
    value: ({ form1040Data: { wages } }) => wages || null,
  },
  {
    line: 9,
    name: "total income",
    key: "topmostSubform[0].Page1[0].Line4a-11_ReadOrder[0].f1_54[0]",
    type: "PDFTextField2",
    label: `Add lines 1z, 2b, 3b, 4b, 5b, 6b, 7, and 8.
            This is your total income`,
    value: ({ form1040Data: { wages } }) => wages || null,
  },
  {
    line: 11,
    name: "adjusted gross income",
    key: "topmostSubform[0].Page1[0].Line4a-11_ReadOrder[0].f1_56[0]",
    type: "PDFTextField2",
    label: `Subtract line 10 from line 9.
            This is your adjusted gross income`,
    value: ({ form1040Data: { wages } }) => wages || null,
  },
  {
    line: 12,
    name: "deduction",
    key: "topmostSubform[0].Page1[0].f1_57[0]",
    type: "PDFTextField2",
    label:
      "Standard deduction or itemized deductions (from Schedule A)",
    /*
    Standard
    Deduction for—

    • Single or Married filing separately, $14,600
    • Married filing jointly or Qualifying surviving spouse, $29,200
    • Head of household, $21,900
    • If you checked any box under Standard Deduction,
    see instructions.
      */
    value: ({ form1040Data }) => {
      const { filing_status } = form1040Data;
      if (!filing_status) return null;
      const deduction = standard_deduction[filing_status];
      if (!deduction) return null;
      return deduction;
    },
  },
  {
    line: 14,
    key: "topmostSubform[0].Page1[0].f1_59[0]",
    type: "PDFTextField2",
    label: "Add lines 12 and 13",
    value: ({ form1040Data }) => {
      const { filing_status } = form1040Data;
      if (!filing_status) return null;
      const deduction = standard_deduction[filing_status];
      if (!deduction) return null;
      const line12 = deduction;
      const line13 = 0;
      const line14 = line12 + line13;
      return line14;
    },
  },
  {
    line: 15,
    name: "taxable income",
    key: "topmostSubform[0].Page1[0].f1_60[0]",
    type: "PDFTextField2",
    label: `Subtract line 14 from line 11.
            If zero or less, enter -0-.
            This is your taxable income`,
    value: ({ form1040Data }) => {
      const { wages } = form1040Data;
      if (!wages) return null;
      const line11 = wages;
      const { filing_status } = form1040Data;
      if (!filing_status) return null;
      const deduction = standard_deduction[filing_status];
      if (!deduction) return null;
      const line12 = deduction;
      const line13 = 0;
      const line14 = line12 + line13;
      const line15 = Math.max(line11 - line14, 0);
      return line15;
    },
  },
  {
    line: 16,
    name: "tax",
    key: "topmostSubform[0].Page2[0].f2_02[0]",
    type: "PDFTextField2",
    label: "tax",
    value: ({ form1040Data }) => {
      const { tax_year, filing_status, wages } = form1040Data;
      if (!(tax_year && filing_status && wages)) return null;
      const line11 = wages;
      const deduction = standard_deduction[filing_status];
      if (!deduction) return null;
      const line12 = deduction;
      const line13 = 0;
      const line14 = line12 + line13;
      const line15 = Math.max(line11 - line14, 0);
      const taxableIncome = line15;

      const tax = getTax(tax_year, filing_status, taxableIncome);
      const line16 = tax;
      return line16;
    },
  },
  {
    line: 24,
    name: "total tax",
    key: "topmostSubform[0].Page2[0].f2_10[0]",
    type: "PDFTextField2",
    label: "Add lines 22 and 23. This is your total tax",
    value: ({ form1040Data }) => {
      const { tax_year, filing_status, wages } = form1040Data;
      if (!(tax_year && filing_status && wages)) return null;
      const line11 = wages;
      const deduction = standard_deduction[filing_status];
      if (!deduction) return null;
      const line12 = deduction;
      const line13 = 0;
      const line14 = line12 + line13;
      const line15 = Math.max(line11 - line14, 0);
      const taxableIncome = line15;

      const tax = getTax(tax_year, filing_status, taxableIncome);
      if (!tax) return null;
      const line16 = tax;
      /* assuming nothing on lines 17 - 23 */
      const totalTax = line16;
      const line24 = totalTax;
      return line24;
    },
  },
  {
    line: "25a",
    name: "withholdings",
    key: "topmostSubform[0].Page2[0].f2_11[0]",
    type: "PDFTextField2",
    label: "Federal income tax withheld from:Form(s) W-2",
    value: ({ form1040Data }) => form1040Data.withholdings || null,
  },
  {
    line: "25d",
    key: "topmostSubform[0].Page2[0].f2_14[0]",
    type: "PDFTextField2",
    label: "Add lines 25a through 25c",
    value: ({ form1040Data }) => form1040Data.withholdings || null,
  },
  {
    line: "32",
    name: "total other payments and refundable credits",
    key: "topmostSubform[0].Page2[0].f2_21[0]",
    type: "PDFTextField2",
    label: `Add lines 27, 28, 29, and 31.
            These are your total other payments and refundable credits`,
    value: () => 0,
  },
  {
    line: 33,
    name: "total payments",
    key: "topmostSubform[0].Page2[0].f2_22[0]",
    type: "PDFTextField2",
    label: "Add lines 25d, 26, and 32. These are your total payments",
    value: ({ form1040Data }) => form1040Data.withholdings || null,
  },
  {
    line: 34,
    name: "overpaid",
    key: "topmostSubform[0].Page2[0].f2_23[0]",
    type: "PDFTextField2",
    label: `If line 33 is more than line 24,
            subtract line 24 from line 33.
            This is the amount you overpaid`,
    value: ({ form1040Data }) => {
      const { tax_year, filing_status, wages } = form1040Data;
      if (!(tax_year && filing_status && wages)) return null;
      const line11 = wages;
      const deduction = standard_deduction[filing_status];
      if (!deduction) return null;
      const line12 = deduction;
      const line13 = 0;
      const line14 = line12 + line13;
      const line15 = Math.max(line11 - line14, 0);
      const taxableIncome = line15;

      const tax = getTax(tax_year, filing_status, taxableIncome);
      const line16 = tax;
      /* assuming nothing on lines 17 - 23 */
      const totalTax = line16;
      const line24 = totalTax;

      const { withholdings } = form1040Data;
      if (!withholdings) return null;
      const line33 = withholdings;
      if (line33 <= line24) return null;
      const overpaid = line33 - line24;
      const line34 = overpaid;
      return line34;
    },
  },
  {
    key: "topmostSubform[0].Page2[0].f2_24[0]",
    type: "PDFTextField2",
    label: "refunded to you.",
    value: ({ form1040Data }) => {
      const { tax_year, filing_status, wages } = form1040Data;
      if (!(tax_year && filing_status && wages)) return null;
      const line11 = wages;
      const deduction = standard_deduction[filing_status];
      if (!deduction) return null;
      const line12 = deduction;
      const line13 = 0;
      const line14 = line12 + line13;
      const line15 = Math.max(line11 - line14, 0);
      const taxableIncome = line15;

      const tax = getTax(tax_year, filing_status, taxableIncome);
      const line16 = tax;
      /* assuming nothing on lines 17 - 23 */
      const totalTax = line16;
      const line24 = totalTax;

      const { withholdings } = form1040Data;
      if (!withholdings) return null;
      const line33 = withholdings;
      if (line33 <= line24) return null;
      const overpaid = line33 - line24;
      const line34 = overpaid;
      const refund = line34;
      const line35a = refund;
      return line35a;
    },
  },
  {
    key: "topmostSubform[0].Page2[0].f2_28[0]",
    type: "PDFTextField2",
    label: "amount you owe.",
    value: ({ form1040Data }) => {
      const { tax_year, filing_status, wages } = form1040Data;
      if (!(tax_year && filing_status && wages)) return null;
      const line11 = wages;
      const deduction = standard_deduction[filing_status];
      if (!deduction) return null;
      const line12 = deduction;
      const line13 = 0;
      const line14 = line12 + line13;
      const line15 = Math.max(line11 - line14, 0);
      const taxableIncome = line15;

      const tax = getTax(tax_year, filing_status, taxableIncome);
      const line16 = tax;
      /* assuming nothing on lines 17 - 23 */
      const totalTax = line16;
      const line24 = totalTax;

      const { withholdings } = form1040Data;
      if (!withholdings) return null;
      const line33 = withholdings;
      if (line24 <= line33) return null;
      const owe = line24 - line33;
      const line37 = owe;
      return line37;
    },
  },
];
export default form1040Fields;

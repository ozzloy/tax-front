const form1040Fields = [
  {
    key: "topmostSubform[0].Page1[0].f1_04[0]",
    type: "PDFTextField2",
    label: "Your first name and middle initial",
    value: ({ humanSlice, form1040Data }) => {
      const filer_id = form1040Data?.filer_id;
      if (!(filer_id && filer_id in humanSlice)) return null;
      const filer = humanSlice[filer_id.toString()];
      const first_name = filer.first_name;
      const middle_initial = filer.middle_initial;
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
      const filer_id = form1040Data?.filer_id;
      if (!(filer_id && filer_id in humanSlice)) return null;
      const filer = humanSlice[filer_id.toString()];
      return filer.last_name;
    },
  },
  {
    key: "topmostSubform[0].Page1[0].f1_07[0]",
    type: "PDFTextField2",
    label: "If joint return, spouse’s first name and middle initial",
    value: ({ humanSlice, form1040Data }) => {
      const spouse_id = form1040Data?.spouse_id;
      if (!(spouse_id && spouse_id in humanSlice)) return null;
      const spouse = humanSlice[spouse_id.toString()];
      const first_name = spouse.first_name;
      const middle_initial = spouse.middle_initial;
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
      const spouse_id = form1040Data?.spouse_id;
      if (!(spouse_id && spouse_id in humanSlice)) return null;
      const spouse = humanSlice[spouse_id.toString()];
      return spouse.last_name;
    },
  },
  {
    key: "topmostSubform[0].Page1[0].Address_ReadOrder[0].f1_10[0]",
    type: "PDFTextField2",
    label: `Home address(number and street).
            If you have a P.O.box, see instructions.`,
    value: ({ addressSlice, form1040Data }) => {
      const address_id = form1040Data?.address_id;
      if (!(address_id && address_id in addressSlice)) return null;
      const address = addressSlice[address_id];
      return address.street;
    },
  },
  {
    key: "topmostSubform[0].Page1[0].Address_ReadOrder[0].f1_11[0]",
    type: "PDFTextField2",
    label: "Apt. no.",
  },
  {
    key: "topmostSubform[0].Page1[0].Address_ReadOrder[0].f1_12[0]",
    type: "PDFTextField2",
    label: `City, town, or post office.
            If you have a foreign address, also complete spaces below.`,
    value: ({ addressSlice, form1040Data }) => {
      const address_id = form1040Data?.address_id;
      if (!(address_id && address_id in addressSlice)) return null;
      const address = addressSlice[address_id];
      return address.city;
    },
  },
  {
    key: "topmostSubform[0].Page1[0].Address_ReadOrder[0].f1_13[0]",
    type: "PDFTextField2",
    label: "State",
    value: ({ addressSlice, form1040Data }) => {
      const address_id = form1040Data?.address_id;
      if (!(address_id && address_id in addressSlice)) return null;
      const address = addressSlice[address_id];
      return address.state;
    },
  },
  {
    key: "topmostSubform[0].Page1[0].Address_ReadOrder[0].f1_14[0]",
    type: "PDFTextField2",
    label: "ZIP",
    value: ({ addressSlice, form1040Data }) => {
      const address_id = form1040Data?.address_id;
      if (!(address_id && address_id in addressSlice)) return null;
      const address = addressSlice[address_id];
      return address.zip;
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
    value: ({ form1040Data }) => form1040Data.wages,
  },
  {
    key: "topmostSubform[0].Page1[0].f1_41[0]",
    type: "PDFTextField2",
    label: "Add lines 1a through 1h",
    value: ({ form1040Data }) => form1040Data.wages,
  },
  {
    line: 9,
    name: "total income",
    key: "topmostSubform[0].Page1[0].Line4a-11_ReadOrder[0].f1_54[0]",
    type: "PDFTextField2",
    label: `Add lines 1z, 2b, 3b, 4b, 5b, 6b, 7, and 8.
            This is your total income`,
    value: ({ form1040Data }) => form1040Data.wages,
  },
  {
    line: 11,
    name: "adjusted gross income",
    key: "topmostSubform[0].Page1[0].Line4a-11_ReadOrder[0].f1_56[0]",
    type: "PDFTextField2",
    label: `Subtract line 10 from line 9.
            This is your adjusted gross income`,
    value: ({ form1040Data }) => form1040Data.wages,
  },
  {
    line: 12,
    name: "standard deduction or itemized deductions",
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
      const standard_deduction = {
        Single: 14600,
        "Married Filing Separately": 14600,
        "Married Filing Jointly": 29200,
        "Qualifying Widow(er)": 29200,
        "Head of Household": 21900,
      };
      return standard_deduction[form1040Data?.filing_status];
    },
  },
  {
    line: 14,
    key: "topmostSubform[0].Page1[0].f1_59[0]",
    type: "PDFTextField2",
    label: "Add lines 12 and 13",
    value: ({ form1040Data }) => {
      const standard_deduction = {
        Single: 14600,
        "Married Filing Separately": 14600,
        "Married Filing Jointly": 29200,
        "Qualifying Widow(er)": 29200,
        "Head of Household": 21900,
      };
      const line12 = standard_deduction[form1040Data?.filing_status];
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
      const standard_deduction = {
        Single: 14600,
        "Married Filing Separately": 14600,
        "Married Filing Jointly": 29200,
        "Qualifying Widow(er)": 29200,
        "Head of Household": 21900,
      };
      const line11 = standard_deduction[form1040Data?.filing_status];
      const line12 = standard_deduction[form1040Data?.filing_status];
      const line13 = 0;
      const line14 = line12 + line13;
      const line15 = line11 - line14;
      return Math.max(line15, 0);
    },
  },
  {
    key: "topmostSubform[0].Page2[0].f2_10[0]",
    type: "PDFTextField2",
    label: "Add lines 22 and 23. This is your total tax",
  },
  {
    key: "topmostSubform[0].Page2[0].f2_11[0]",
    type: "PDFTextField2",
    label: "Federal income tax withheld from:Form(s) W-2",
  },
  {
    key: "topmostSubform[0].Page2[0].f2_14[0]",
    type: "PDFTextField2",
    label: "Add lines 25a through 25c",
  },
  {
    key: "topmostSubform[0].Page2[0].f2_21[0]",
    type: "PDFTextField2",
    label: `Add lines 27, 28, 29, and 31.
       These are your total other payments and refundable credits`,
  },
  {
    key: "topmostSubform[0].Page2[0].f2_22[0]",
    type: "PDFTextField2",
    label: "Add lines 25d, 26, and 32. These are your total payments",
  },
  {
    key: "topmostSubform[0].Page2[0].f2_23[0]",
    type: "PDFTextField2",
    label: "overpaid",
  },
  {
    key: "topmostSubform[0].Page2[0].f2_24[0]",
    type: "PDFTextField2",
    label: "refunded to you.",
  },
  {
    key: "topmostSubform[0].Page2[0].f2_28[0]",
    type: "PDFTextField2",
    label: "amount you owe.",
  },
];
export default form1040Fields;

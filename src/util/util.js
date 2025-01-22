const form1040Fields = [
  {
    name: "topmostSubform[0].Page1[0].f1_04[0]",
    type: "PDFTextField2",
    label: "Your first name and middle initial",
    value: ({ human, form1040Data }) => {
      const filer_id = form1040Data?.filer_id;
      if (!(filer_id && filer_id in human)) return null;
      const filer = human[filer_id.toString()];
      const first_name = filer.first_name;
      const middle_initial = filer.middle_initial;
      return (
        first_name +
        (middle_initial ? " " + middle_initial + "." : "")
      );
    },
  },
  {
    name: "topmostSubform[0].Page1[0].f1_05[0]",
    type: "PDFTextField2",
    label: "Last name",
  },
  {
    name: "topmostSubform[0].Page1[0].f1_07[0]",
    type: "PDFTextField2",
    label: "If joint return, spouse’s first name and middle initial",
  },
  {
    name: "topmostSubform[0].Page1[0].f1_07[0]",
    type: "PDFTextField2",
    label: "Spouse last name",
  },
  {
    name: "topmostSubform[0].Page1[0].Address_ReadOrder[0].f1_10[0]",
    type: "PDFTextField2",
    label: `Home address(number and street).
            If you have a P.O.box, see instructions.`,
  },
  {
    name: "topmostSubform[0].Page1[0].Address_ReadOrder[0].f1_11[0]",
    type: "PDFTextField2",
    label: "Apt. no.",
  },
  {
    name: "topmostSubform[0].Page1[0].Address_ReadOrder[0].f1_12[0]",
    type: "PDFTextField2",
    label: `City, town, or post office.
            If you have a foreign address, also complete spaces below.`,
  },
  {
    name: "topmostSubform[0].Page1[0].Address_ReadOrder[0].f1_13[0]",
    type: "PDFTextField2",
    label: "State",
  },
  {
    name: "topmostSubform[0].Page1[0].Address_ReadOrder[0].f1_14[0]",
    type: "PDFTextField2",
    label: "ZIP",
  },
  {
    name: "topmostSubform[0].Page1[0].FilingStatus_ReadOrder[0].c1_3[0]",
    type: "PDFCheckBox2",
    label: "Single",
  },
  {
    name: "topmostSubform[0].Page1[0].FilingStatus_ReadOrder[0].c1_3[1]",
    type: "PDFCheckBox2",
    label: "Married filing jointly (even if only one had income)",
  },
  {
    name: "topmostSubform[0].Page1[0].FilingStatus_ReadOrder[0].c1_3[2]",
    type: "PDFCheckBox2",
    label: "Married filing separately (MFS)",
  },
  {
    name: "topmostSubform[0].Page1[0].c1_3[0]",
    type: "PDFCheckBox2",
    label: "Head of household (HOH)",
  },
  {
    name: "topmostSubform[0].Page1[0].c1_3[1]",
    type: "PDFCheckBox2",
    label: "Qualifying surviving spouse (QSS)",
  },
  {
    name: "topmostSubform[0].Page1[0].c1_9[0]",
    type: "PDFCheckBox2",
    label: "You were born before January 2, 1960",
  },
  {
    name: "topmostSubform[0].Page1[0].c1_10[0]",
    type: "PDFCheckBox2",
    label: "You are blind",
  },
  {
    name: "topmostSubform[0].Page1[0].c1_11[0]",
    type: "PDFCheckBox2",
    label: "Spouse born before January 2, 1960",
  },
  {
    name: "topmostSubform[0].Page1[0].c1_12[0]",
    type: "PDFCheckBox2",
    label: "Spouse is blind",
  },
  {
    name: "topmostSubform[0].Page1[0].f1_32[0]",
    type: "PDFTextField2",
    label: "Total amount from Form(s) W-2, box 1 (see instructions)",
  },
  {
    name: "topmostSubform[0].Page1[0].f1_41[0]",
    type: "PDFTextField2",
    label: "Add lines 1a through 1h",
  },
  {
    name: "topmostSubform[0].Page1[0].Line4a-11_ReadOrder[0].f1_54[0]",
    type: "PDFTextField2",
    label: `Add lines 1z, 2b, 3b, 4b, 5b, 6b, 7, and 8.
            This is your total income`,
  },
  {
    name: "topmostSubform[0].Page1[0].Line4a-11_ReadOrder[0].f1_56[0]",
    type: "PDFTextField2",
    label: `Subtract line 10 from line 9.
            This is your adjusted gross income`,
  },
  {
    name: "topmostSubform[0].Page1[0].f1_57[0]",
    type: "PDFTextField2",
    label:
      "Standard deduction or itemized deductions (from Schedule A)",
    /*
Standard
Deduction for—
• Single or
Married filing
separately,
$14,600
• Married filing
jointly or
Qualifying
surviving spouse,
$29,200
• Head of
household,
$21,900
• If you checked
any box under
Standard
Deduction,
see instructions.
      */
  },
  {
    name: "topmostSubform[0].Page1[0].f1_59[0]",
    type: "PDFTextField2",
    label: "Add lines 12 and 13",
  },
  {
    name: "topmostSubform[0].Page1[0].f1_60[0]",
    type: "PDFTextField2",
    label: `Subtract line 14 from line 11.
            If zero or less, enter -0-.
            This is your taxable income`,
  },
  {
    name: "topmostSubform[0].Page2[0].f2_10[0]",
    type: "PDFTextField2",
    label: "Add lines 22 and 23. This is your total tax",
  },
  {
    name: "topmostSubform[0].Page2[0].f2_11[0]",
    type: "PDFTextField2",
    label: "Federal income tax withheld from:Form(s) W-2",
  },
  {
    name: "topmostSubform[0].Page2[0].f2_14[0]",
    type: "PDFTextField2",
    label: "Add lines 25a through 25c",
  },
  {
    name: "topmostSubform[0].Page2[0].f2_21[0]",
    type: "PDFTextField2",
    label: `Add lines 27, 28, 29, and 31.
       These are your total other payments and refundable credits`,
  },
  {
    name: "topmostSubform[0].Page2[0].f2_22[0]",
    type: "PDFTextField2",
    label: "Add lines 25d, 26, and 32. These are your total payments",
  },
  {
    name: "topmostSubform[0].Page2[0].f2_23[0]",
    type: "PDFTextField2",
    label: "overpaid",
  },
  {
    name: "topmostSubform[0].Page2[0].f2_24[0]",
    type: "PDFTextField2",
    label: "refunded to you.",
  },
  {
    name: "topmostSubform[0].Page2[0].f2_28[0]",
    type: "PDFTextField2",
    label: "amount you owe.",
  },
];
export default form1040Fields;

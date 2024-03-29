const LoanRequirements = ({
  formik,
  category,
  setHlLoanTenureErr, //home loan
  setLapRequiredLoanTenureErr, //loan against porperty
  setRequiredLoanAmountErr, //education loan
}) => {
  //required loan tenure validation form home loan
  const hlRequiredLoanTenureValidation = (dob, tenure) => {
    console.log(dob, tenure);
    const currentDate = new Date();
    const selectedDate = new Date(dob.split("-").reverse().join("-"));
    const age = currentDate.getFullYear() - selectedDate.getFullYear();
    console.log("age", age);
    if (age === 67 && tenure !== 3) {
      setHlLoanTenureErr(true);
      return `for age 67, max loan tenure is 3 years`;
    }
    setHlLoanTenureErr(false);
    return "";
  };

  //required loan tenure validation for loan against porperty
  const lapRequiredLoanTenureValidation = (dob, loanTenure) => {
    if (dob && loanTenure) {
      const currentDate = new Date();
      const selectedDate = new Date(dob.split("-").reverse().join("-"));
      const age = currentDate.getFullYear() - selectedDate.getFullYear();
      if (age >= 23 && age <= 63) {
        const calculatedLoanTenure = 63 - age;
        if (calculatedLoanTenure !== loanTenure) {
          setLapRequiredLoanTenureErr(true);
          return (
            <span className="text-red-500 text-xs font-bold">
              {` For age ${age} years, max loan tenure is ${calculatedLoanTenure} years`}
            </span>
          );
        }
      }
    }
    setLapRequiredLoanTenureErr(false);
    return;
  };

  //education loan amount validation: education required loan < total education cost
  const requiredLoanAmountValidation = (loanAmount, educationCost) => {
    if (loanAmount && educationCost) {
      const calculatedLoanAmount = Math.ceil((educationCost * 90) / 100);
      if (loanAmount > calculatedLoanAmount) {
        setRequiredLoanAmountErr(true);
        return (
          <span className="text-red-500 text-xs font-bold">
            Require loan amount should be less that 90% of total education cost
          </span>
        );
      }
    }
    setRequiredLoanAmountErr(false);
    return "";
  };

  return (
    <>
      <div>
        <span className="font-semibold text-gray-500">
          {category === "odcc"
            ? "Required OD/CC Limit *"
            : "Required Loan Amount *"}
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="number"
            {...formik.getFieldProps("requiredLoanAmount")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.requiredLoanAmount &&
        formik.errors.requiredLoanAmount ? (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.requiredLoanAmount}
          </span>
        ) : (
          category &&
          category === "education-loan" &&
          requiredLoanAmountValidation(
            formik.values.requiredLoanAmount,
            formik.values.educationCost
          )
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          {category === "odcc"
            ? "Required OD/CC Tenure *"
            : " Required Loan Tenure (in years) *"}
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="number"
            {...formik.getFieldProps("requiredLoanTenure")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.requiredLoanTenure &&
        formik.errors.requiredLoanTenure ? (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.requiredLoanTenure}
          </span>
        ) : category ? (
          category === "home-loan" ? (
            hlRequiredLoanTenureValidation(
              formik.values.dateOfBirth,
              formik.values.requiredLoanTenure
            )
          ) : category === "loanAgainstProperty" ? (
            lapRequiredLoanTenureValidation(
              formik.values.dateOfBirth,
              formik.values.requiredLoanTenure
            )
          ) : null
        ) : null}
      </div>
    </>
  );
};

export default LoanRequirements;

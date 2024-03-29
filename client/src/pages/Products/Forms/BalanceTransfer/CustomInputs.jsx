const CustomInputs = ({ formik }) => {
  return (
    <>
      <div>
        <span className="font-semibold text-gray-500">
          Type of Balance Transfer
        </span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full py-2.5"
            name="typeOfBalanceTransfer"
            {...formik.getFieldProps("typeOfBalanceTransfer")}
          >
            <option value={""}>Select</option>
            <option value="HL">Home loan(HL) with ROI</option>
            <option value="LAP">Loan against property(LAP) with ROI</option>
            <option value="HL-LAP">HL-LAP with ROI</option>
          </select>
        </div>
        {formik.touched.typeOfBalanceTransfer &&
          formik.errors.typeOfBalanceTransfer && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.typeOfBalanceTransfer}
            </span>
          )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Approximate value of property *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="number"
            {...formik.getFieldProps("transferPropertyValue")}
            className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
          />
        </div>
        {formik.touched.transferPropertyValue &&
          formik.errors.transferPropertyValue && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.transferPropertyValue}
            </span>
          )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Balance Transfer Loan Amount *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder=""
            type="number"
            {...formik.getFieldProps("balanceTransferLoanAmount")}
            className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
          />
        </div>
        {formik.touched.balanceTransferLoanAmount &&
          formik.errors.balanceTransferLoanAmount && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.balanceTransferLoanAmount}
            </span>
          )}
      </div>

     
      <div>
        <span className="font-semibold text-gray-500">
          Top-up amount (if any)
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="optional"
            type="number"
            {...formik.getFieldProps("topupAmount")}
            className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
          />
        </div>
      </div>
    </>
  );
};

export default CustomInputs;

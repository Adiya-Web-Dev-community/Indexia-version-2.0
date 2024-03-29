import { useState, useEffect } from "react";
import { collateralOptionTypes } from "../../configs/selectorConfigs";

const CollatoralProperty = ({ formik, category }) => {
  //collatoral state and city
  const [states, setPropertyStates] = useState([]);
  const [selectedCollatoralState, setSelectedCollatoralState] = useState("");
  var newPropertyStateConfig = {
    url: "https://api.countrystatecity.in/v1/countries/In/states",
    key: "N00wMDJleEpjQ09wTjBhN0VSdUZxUGxWMlJKTGY1a0tRN0lpakh5Vw==",
  };
  const getStates = async () => {
    await fetch(newPropertyStateConfig.url, {
      headers: { "X-CSCAPI-KEY": newPropertyStateConfig.key },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setPropertyStates(resp);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getStates();
  }, []);
  // get cities after selecting state
  const [propertyCities, setPropertyCities] = useState([]);
  var newPropertyCityConfig = {
    url: `https://api.countrystatecity.in/v1/countries/IN/states/${selectedCollatoralState}/cities`,
    key: "N00wMDJleEpjQ09wTjBhN0VSdUZxUGxWMlJKTGY1a0tRN0lpakh5Vw==",
  };
  const getCities = async () => {
    await fetch(newPropertyCityConfig.url, {
      headers: { "X-CSCAPI-KEY": newPropertyCityConfig.key },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setPropertyCities(resp);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (selectedCollatoralState) {
      getCities();
    }
  }, [selectedCollatoralState]);

  return (
    <>
      <div>
        <span className="font-semibold text-gray-500">
          {category && category === "odcc"
            ? "Wish to take OD/CC limit Against"
            : "Wish To Take Loan Against (Collatoral property)*"}
        </span>
        <div className="border-b border-slate-400 py-1 w-full">
          <select
            className="w-full"
            {...formik.getFieldProps("collateralOption")}
          >
            <option>Select</option>
            {collateralOptionTypes.map((ele, i) => {
              return (
                <option key={i} value={ele}>
                  {ele}
                </option>
              );
            })}
          </select>
        </div>
        {formik.touched.collateralOption && formik.errors.collateralOption && (
          <span className="text-red-500 text-xs font-bold">
            {formik.errors.collateralOption}
          </span>
        )}
      </div>
      {formik.values.collateralOption === "Other" && (
        <div>
          <div>
            <span className=" font-semibold text-gray-500">
              Mention Collateral Property Type *
            </span>
            <div className="border-b border-slate-400 py-1">
              <input
                placeholder="wish to take loan against"
                type="text"
                {...formik.getFieldProps("otherCollateralOptionType")}
                required
                className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
              />
            </div>
          </div>
        </div>
      )}
      <div>
        <span className="font-semibold text-gray-500">
          Collateral Property approximate value *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="value of your collateral property"
            type="Number"
            {...formik.getFieldProps("collatoralPropertyValue")}
            className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
          />
        </div>
        {formik.touched.collatoralPropertyValue &&
          formik.errors.collatoralPropertyValue && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.collatoralPropertyValue}
            </span>
          )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Collateral Property Age *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="value of your collateral property"
            type="Number"
            {...formik.getFieldProps("collateralPropertyAge")}
            className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
          />
        </div>
        {formik.touched.collateralPropertyAge &&
          formik.errors.collateralPropertyAge && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.collateralPropertyAge}
            </span>
          )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Collateral Property State *
        </span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full py-2.5"
            value={selectedCollatoralState}
            onChange={(e) => {
              formik.handleChange(e);
              setSelectedCollatoralState(e.target.value);
            }}
            {...formik.getFieldProps("collatoralPropertyState")}
          >
            <option value={""}>Select</option>
            {states
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((obj) => {
                return (
                  <option key={obj.id} value={obj.iso2}>
                    {obj.name}
                  </option>
                );
              })}
          </select>
        </div>
        {formik.touched.collatoralPropertyState &&
          formik.errors.collatoralPropertyState && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.collatoralPropertyState}
            </span>
          )}
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Collateral Property City *
        </span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full disabled:cursor-not-allowed py-2.5"
            disabled={!selectedCollatoralState}
            {...formik.getFieldProps("newPropertyCity")}
          >
            <option value={""}>Select</option>
            {propertyCities.map((obj) => {
              return (
                <option key={obj.id} value={obj.name}>
                  {obj.name}
                </option>
              );
            })}
          </select>
        </div>
        {formik.touched.collatoralPropertyCity &&
          formik.errors.collatoralPropertyCity && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.collatoralPropertyCity}
            </span>
          )}
      </div>
      <div>
        <span className=" font-semibold text-gray-500">
          Collateral Property Pincode *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            placeholder="Enter pincode"
            type="number"
            {...formik.getFieldProps("collatoralPropertyPincode")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
        {formik.touched.collatoralPropertyPincode &&
          formik.errors.collatoralPropertyPincode && (
            <span className="text-red-500 text-xs font-bold">
              {formik.errors.collatoralPropertyPincode}
            </span>
          )}
      </div>
    </>
  );
};

export default CollatoralProperty;

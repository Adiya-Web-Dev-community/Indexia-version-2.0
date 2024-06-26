import { useState, useEffect } from "react";
import { collateralOptionTypes } from "../../../../configs/selectorConfigs";

const CollatoralProperty = ({ formik }) => {
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

  //ADD COMMA IN AMOUNT INPUTS
  const [collatoralPropertyValue, setCollatoralPropertyValue] = useState("");

  const addCommas = (field, number) => {
    const cleanedInput = number.replace(/[^\d]/g, ""); // Remove non-numeric characters
    const formatter = new Intl.NumberFormat("en-IN");
    if (field === "collatoralpropertyvalue") {
      setCollatoralPropertyValue(formatter.format(cleanedInput));
    }
  };

  return (
    <>
      <div>
        <span className="font-semibold text-gray-500">
          Wish To Take Loan Against (Collatoral property)*
        </span>
        <div className="border-b border-slate-400 py-1 w-full">
          <select
            className="w-full"
            {...formik.getFieldProps("collateralOption")}
            required
          >
            <option className="hidden-option">Select</option>
            {collateralOptionTypes.map((ele, i) => {
              return (
                <option key={i} value={ele}>
                  {ele}
                </option>
              );
            })}
          </select>
        </div>
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
          Collatoral Property Age (in years) *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            type="Number"
            required
            {...formik.getFieldProps("collateralPropertyAge")}
            className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
          />
        </div>
      </div>

      <div>
        <span className="font-semibold text-gray-500">
          Property Market Value (Approx)
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            type="text"
            // {...formik.getFieldProps("collatoralPropertyValue")}
            name="collatoralPropertyValue"
            value={collatoralPropertyValue}
            onChange={(e) => {
              addCommas("collatoralpropertyvalue", e.target.value);
              const formatedVal = e.target.value.split(",").join("");
              formik.setFieldValue("collatoralPropertyValue", formatedVal);
            }}
            required
            className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
          />
        </div>
      </div>
      <div>
        <span className="font-semibold text-gray-500">Property State *</span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            className="bg-transparent w-full py-2.5"
            value={selectedCollatoralState}
            required
            onChange={(e) => {
              formik.handleChange(e);
              setSelectedCollatoralState(e.target.value);
            }}
            {...formik.getFieldProps("collatoralPropertyState")}
          >
            <option value={""} className="hidden-option">
              Select
            </option>
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
      </div>
      <div>
        <span className="font-semibold text-gray-500">Property City *</span>
        <div className="flex gap-2 bg-gray-200/40 border-[1px] border-gray-400 rounded-md">
          <select
            required
            className="bg-transparent w-full disabled:cursor-not-allowed py-2.5"
            disabled={!selectedCollatoralState}
            {...formik.getFieldProps("newPropertyCity")}
          >
            <option value={""} className="hidden-option">
              Select
            </option>
            {propertyCities.map((obj) => {
              return (
                <option key={obj.id} value={obj.name}>
                  {obj.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div>
        <span className=" font-semibold text-gray-500">Property Pincode *</span>
        <div className="border-b border-slate-400 py-1">
          <input
            required
            placeholder="Enter pincode"
            type="number"
            {...formik.getFieldProps("collatoralPropertyPincode")}
            className="bg-transparent w-full outline-none border-none placeholder:text-slate-500"
          />
        </div>
      </div>
      <div>
        <span clwassName=" text-gray-500 font-bolder">
          Property Owner Name *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            type="text"
            required
            {...formik.getFieldProps("propertyOwnerName")}
            className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
          />
        </div>
      </div>
      <div>
        <span className="font-semibold text-gray-500">
          Relationship with the applicant *
        </span>
        <div className="border-b border-slate-400 py-1">
          <input
            type="text"
            placeholder="Name relationship"
            required
            {...formik.getFieldProps("applicantRelationship")}
            className="w-full bg-transparent border-none outline-none placeholder:text-slate-700"
          />
        </div>
      </div>
    </>
  );
};

export default CollatoralProperty;

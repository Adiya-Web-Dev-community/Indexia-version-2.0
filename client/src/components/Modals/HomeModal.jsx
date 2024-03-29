import { useDispatch } from "react-redux";
import { setInitialPopup } from "../../store/appSlice";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "../../axios";
import { setUserBasicDetails } from "../../store/user";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ImSpinner9 } from "react-icons/im";

const HomeModal = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  //validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(5, "Name should be at least 5 characters")
      .required("Name is required"),
    email: Yup.string()
  .email("Invalid email format")
  .required("Email is required")
  .transform((value) => value.toLowerCase())
  .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Invalid email format'),

    contact: Yup.number()
      .typeError("Contact must be a number")
      .positive("Contact must be a positive number")
      .integer("Contact must be an integer")
      .required("Contact is required")
      .test(
        "is-ten-digits",
        "Contact must be exactly 10 digits",
        (value) => value && value.toString().length === 10
      ),
  });

  //inputs and function
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      contact: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const resp = await axios.post("/set-basic-user-details", values);
        // console.log(values);
        // console.log(resp);
        if (resp.data.success) {
          dispatch(setUserBasicDetails({name:formik.values.name, email:formik.values.email, contact:formik.values.contact}));
          dispatch(setInitialPopup(false));
          localStorage.setItem("homePageDetails", true);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(resp.data.msg);
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
        toast.error(err.message);
      }
      setLoading(false);
    },
  });

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 100 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-xl p-5 shadow w-90 md:w-96 m-4 space-y-2.5 flex flex-col items-center"
    >
      <section>
        <h1 className="text-xl">Please fill your contact details</h1>
      </section>
      <form className="w-full space-y-3 py-3 " onSubmit={formik.handleSubmit}>
        <section className="">
          <input
            type="text"
            placeholder="Name as per pan card"
            required
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="px-1 py-1.5 border-[0.5px]  rounded-lg focus:outline-[0.5px] focus:outline-blue-300 w-full"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500">{formik.errors.name}</div>
          ) : null}
        </section>
        <section>
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="px-1 py-1.5 border-[0.5px]  rounded-lg focus:outline-[0.5px] focus:outline-blue-300 w-full"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}
        </section>
        <section>
          <input
            type="number"
            placeholder="Contact"
            required
            name="contact"
            value={formik.values.contact}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="px-1 py-1.5 border-[0.5px]  rounded-lg focus:outline-[0.5px] focus:outline-blue-300 w-full"
          />
          {formik.touched.contact && formik.errors.contact ? (
            <div className="text-red-500">{formik.errors.contact}</div>
          ) : null}
        </section>
        <section className="flex w-full space-x-2.5">
          {loading ? (
            <button className="bg-blue-400 hover:bg-blue-500 duration-200 w-full py-2 px-1 rounded-md text-white text-lg disabled:cursor-not-allowed disabled:bg-slate-400/20 flex justify-center items-center">
              <ImSpinner9 className="animate-spin text-blue-800" />
            </button>
          ) : (
            <button
              type="submit"
              // disabled={!formData.name || !formData.contact || !formData.email}
              // disabled={!formik.dirty || !formik.isValid}

              className="bg-blue-400 hover:bg-blue-500 duration-200 w-full py-1 px-1 rounded-md text-white text-lg disabled:cursor-not-allowed disabled:bg-slate-400/20"
            >
              Sumbit
            </button>
          )}
        </section>
      </form>
    </motion.div>
  );
};

export default HomeModal;

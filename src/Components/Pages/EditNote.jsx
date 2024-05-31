import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Spinner } from "../UI/Spinner";

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const schema = yup.object().shape({
    title: yup.string().required("Please enter the title"),
    description: yup.string().required("Please enter the description"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  let config = {
    headers: {
      authtoken: localStorage.getItem("authtoken"),
    },
  };

  const fetchData = () => {
    axios
      .get(`http://localhost:8000/get-note/${id}`, config)
      .then((res) => {
        if (res.data) {
          setData(true);
        }
        setValue("title", res.data.title);
        setValue("description", res.data.description);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const EditNote = (data) => {
    axios
      .put(`http://localhost:8000/edit-note/${id}`, data, config)
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.message);
        // setErrMsg(error.response.data.message);
      });
  };
  return (
    <div className="">
      <nav className="flex mt-2" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              to={"/"}
              className="inline-flex items-center text-xl font-semibold text-neutral-700 hover:text-neutral-500"
            >
              <svg
                className="w-4 h-4 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-neutral-700 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-xl font-semibold text-neutral-700 md:ms-2 hover:text-neutral-500">
                Edit Note
              </span>
            </div>
          </li>
        </ol>
      </nav>
      {Data ? (
        <div className="w-full mt-6 bg-[#dfe6e9] px-10  py-14 rounded-xl max-md:px-4 max-md:py-10">
          <div>
            <form onSubmit={handleSubmit(EditNote)}>
              <div>
                <label
                  htmlFor="title"
                  className="block text-xl font-semibold leading-6 text-neutral-700"
                >
                  Title
                </label>
                <div className="mt-3">
                  <input
                    name="title"
                    type="text"
                    {...register("title")}
                    placeholder="Enter Title"
                    className="block w-full rounded-md border-0 bg-slate-50 pl-2 py-2 text-neutral-700 shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400 focus:outline focus:outline-none focus:border-[#6c5ce7] focus:ring-[#6c5ce7] sm:text-sm sm:leading-6"
                  />
                  {errors.title && (
                    <p className="mt-1 text-[#6c5ce7] text-base">
                      {errors.title.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="description"
                    className="text-xl font-semibold leading-6 text-neutral-700"
                  >
                    Description
                  </label>
                </div>
                <div className="mt-3">
                  <textarea
                    name="description"
                    type="text"
                    rows="5"
                    {...register("description")}
                    placeholder="Enter Description"
                    className="block w-full rounded-md bg-slate-50 border-0 pl-2 py-2 text-neutral-700 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:border-[#6c5ce7] focus:ring-[#6c5ce7]"
                  />
                  {errors.description && (
                    <p className="mt-1 text-[#6c5ce7] text-base">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="w-fit flex justify-center rounded-md bg-[#6c5ce7] px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#a29bfe] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default EditNote;

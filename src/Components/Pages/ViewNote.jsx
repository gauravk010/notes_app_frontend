import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { Spinner } from "../UI/Spinner";

const ViewNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Note, setNote] = useState([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  let config = {
    headers: {
      authtoken: localStorage.getItem("authtoken"),
    },
  };

  const fetchData = () => {
    axios
      .get(`http://localhost:8000/get-note/${id}`, config)
      .then((res) => {
        setNote(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const NoteDate = (d) => {
    const formatDate = new Date(d);
    const month = formatDate.getMonth() + 1;
    const year = formatDate.getFullYear();
    const date = formatDate.getDate();

    return ` ${year}/${date > 10 ? date : "0" + date}/${
      month > 10 ? month : "0" + month
    }`;
  };

  const DeleteNote = (id) => {
    axios
      .delete(`http://localhost:8000/delete-note/${id}`, config)
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.message);
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
                View Note
              </span>
            </div>
          </li>
        </ol>
      </nav>
      {Note._id ? (
        <div className="rounded-xl bg-[#dfe6e9] p-6 mt-10 text-neutral-700 min-h-[300px] max-sm:min-h-[400px] flex flex-col justify-between">
          <div className="text-pretty w-full overflow-hidden">
            <h1 className="text-4xl font-semibold">{Note.title}</h1>
            <p className="text-xl mt-4 min-h-[60px]">{Note.description}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm">{NoteDate(Note.createdAt)}</p>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => DeleteNote(Note._id)}
                className=" p-2 rounded-full bg-[#6c5ce7] hover:bg-[#a29bfe] duration-100"
              >
                <MdDeleteOutline className="text-white  text-xl" />
              </button>
              <Link
                to={`/edit-note/${Note._id}`}
                className=" p-2 rounded-full bg-[#6c5ce7] hover:bg-[#a29bfe] duration-100"
              >
                <GoPencil className="text-white  text-xl" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ViewNote;

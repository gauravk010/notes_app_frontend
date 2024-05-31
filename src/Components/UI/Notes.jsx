import axios from "axios";
import React, { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { Spinner } from "./Spinner";

const Notes = () => {
  const [Notes, setNotes] = useState([]);
  const [Total, setTotal] = useState("");
  const [Msg, setMsg] = useState("");

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
      .get(`http://localhost:8000/get-notes`, config)
      .then((res) => {
        if (res.data.result) {
          setNotes(res.data.result);
          setTotal(res.data.length);
        } else {
          setNotes([]);
          setMsg(res.data.message);
        }
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
        fetchData();
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div className="text-neutral-700">
      <h1 className="text-xl font-semibold">
        All Notes <span className="text-gray-400 text-sm">{Total} Note</span>
      </h1>
      {Notes.length > 0 ? (
        <div className="grid grid-cols-4 mt-6 gap-6 max-xl:grid-cols-2 max-md:grid-cols-1">
          {Notes.map((item) => {
            return (
              <div
                key={item._id}
                className="rounded-xl bg-[#dfe6e9] w-full h-[300px] max-sm:h-[320px] hover:scale-105 duration-200 p-6 flex flex-col justify-between"
              >
                <div className="text-pretty w-full overflow-hidden">
                  <Link to={`/view-note/${item._id}`}>
                    <h1 className="text-3xl font-semibold hover:text-neutral-500 duration-100 line-clamp-1">
                      {item.title}
                    </h1>
                  </Link>
                  <p className="text-lg mt-2 line-clamp-5">
                    {item.description}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm">{NoteDate(item.createdAt)}</p>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => DeleteNote(item._id)}
                      className=" p-2 rounded-full bg-[#6c5ce7] hover:bg-[#a29bfe] duration-100"
                    >
                      <MdDeleteOutline className="text-white text-xl" />
                    </button>
                    <Link
                      to={`/edit-note/${item._id}`}
                      className=" p-2 rounded-full bg-[#6c5ce7] hover:bg-[#a29bfe] duration-100"
                    >
                      <GoPencil className="text-white text-xl" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : Msg ? (
        <div className="w-full flex justify-center items-center h-72 text-4xl opacity-30 max-[480px]:text-3xl">
          {Msg}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Notes;

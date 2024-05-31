import React from "react";
import Notes from "../UI/Notes";
import { FaNoteSticky } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CgAddR } from "react-icons/cg";

const Home = () => {
  return (
    <div className="">
      <div className="flex justify-between">
        <Link
          to={"/add-note"}
          className="bg-[#6c5ce7] rounded-xl w-[200px] flex items-center p-4 gap-3 hover:scale-105 duration-200 active:scale-100 max-[480px]:w-full"
        >
          <div className="rounded-full bg-white  flex justify-center text-[#6c5ce7] items-center p-3">
            <FaNoteSticky className="text-xl" />
          </div>
          <div className="">
            <div className="text-xs text-slate-50 flex items-center gap-1">
              <CgAddR />
              <span>New Note</span>
            </div>
            <p className="text-white">Take a Note</p>
          </div>
        </Link>
      </div>
      <div className="mt-10">
        <Notes />
      </div>
    </div>
  );
};

export default Home;

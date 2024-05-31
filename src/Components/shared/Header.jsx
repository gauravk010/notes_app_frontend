import React, { useEffect, useState } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../Auth/Helper";

const Header = () => {
  const navigate = useNavigate();
  const [User, setUser] = useState([]);

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const getUser = () => {
    let config = {
      headers: {
        authtoken: localStorage.getItem("authtoken"),
      },
    };
    axios
      .get(`${BASE_URL}/get-user`, config)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center text-neutral-700">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-[#6c5ce7] text-white flex justify-center items-center p-3">
          <FaUserAstronaut className="text-xl" />
        </div>
        <div className="">
          <h1 className="text-xl font-semibold">{User.fullname}</h1>
          <div className="text-xs text-gray-400">{User.email}</div>
        </div>
      </div>
      <div>
        <button
          className="rounded-full bg-[#6c5ce7] text-white flex justify-center items-center p-3 hover:bg-[#a29bfe] duration-100"
          onClick={logout}
        >
          <FiLogOut className="text-xl" />
        </button>
      </div>
    </nav>
  );
};

export default Header;

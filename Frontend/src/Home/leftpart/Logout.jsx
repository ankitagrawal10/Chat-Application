import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiLogOutCircle } from "react-icons/bi";
import Cookies from "js-cookie"

function Logout() {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logout Successfully")
      window.location.reload();
    } catch (error) {
      console.log("Error to logout" + error);
    }
  };
  return (
    <div className="h-[10vh] flex items-center justify-start px-4 md:px-6">
      <BiLogOutCircle
        className="text-3xl md:text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-1 md:p-2"
        onClick={handleLogout}
      />
    </div>
  );
}

export default Logout;

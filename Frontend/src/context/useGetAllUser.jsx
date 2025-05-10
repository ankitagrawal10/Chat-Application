import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function useGetAllUser() {
  const [allUsers, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");
        const response = await axios.get("/api/user/allusers", {
          // Credentials: "include",
          withCredentials: true, // for sending cookies
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error in alluser:", error.response?.data || error.message);
      }
    };
    getUsers();
  }, []);
  return [allUsers, loading];
}

export default useGetAllUser;

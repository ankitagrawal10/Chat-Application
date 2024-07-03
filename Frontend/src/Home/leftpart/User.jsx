import React from "react";
import Users from "./Users";
import useGetAllUser from "../../context/useGetAllUser";

function User() {
  const [allUsers, loading] = useGetAllUser();

  return (
    <div>
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
        Message
      </h1>
      <div className="py-2 flex-1 overflow-y-auto" style={{ maxHeight: "calc(84vh - 10vh)" }}>
        {allUsers.map((users, index) => (
          <Users key={index} users={users} />
        ))}
      </div>
    </div>
  );
}

export default User;

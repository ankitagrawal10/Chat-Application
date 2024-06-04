import React from "react";
import Users from "./Users";

function User() {
  return (
    <div>
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>
      <div>
        <Users/>
      </div>
    </div>
  );
}

export default User;

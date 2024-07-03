import React from "react";

function Users({ users }) {
  return (
    <div className="flex space-x-4 px-6 py-4 hover:bg-slate-700 duration-300">
      <div className="avatar online">
        <div className="w-12 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="User Avatar" />
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <h1 className="font-bold truncate mt-2">{users.fullName}</h1>
        {/* <span className="block truncate">{users.email}</span> */}
      </div>
    </div>
  );
}

export default Users;

import React from "react";

function Users() {
  return (
    <div>
      <div className="flex space-x-4 px-6 py-4 hover:bg-slate-700 duration-300">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div>
          <h1 className="font-bold">Akhil</h1>
          <span>akhil@gmail.com</span>
        </div>
      </div>
    </div>
  );
}

export default Users;

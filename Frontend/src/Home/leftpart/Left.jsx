import React, { useState, useEffect } from "react";
import Search from "./Search";
import User from "./User";

function Left() {
  const [width, setWidth] = useState(30);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newWidth = (e.clientX / window.innerWidth) * 100;
        if (newWidth >= 10 && newWidth <= 90) {
          setWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const startDragging = () => {
    setIsDragging(true);
  };

  return (
    <div
      className="bg-black text-gray-300"
      style={{
        width: `${width}%`,
        transition: isDragging ? "none" : "width 0.3s ease",
        position: "relative",
        height: "100vh",
        display: "flex",
      }}
    >
      <div style={{ padding: "10px", flexGrow: 1 }}>
        <Search />
        <User />
      </div>
      <div
        className={`absolute top-0 right-0 w-[5px] h-full cursor-ew-resize z-10 transition-colors ease-linear duration-200 
        ${isDragging ? "bg-white" : "bg-transparent hover:bg-white"}`}
        onMouseDown={startDragging}
      />
    </div>
  );
}

export default Left;

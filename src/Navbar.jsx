import React from "react";

function Navbar() {
  return (
    <div>
      <div className="p-3 bg-black h-28 flex items-center">
        <img
          src="/images/logo.jpg"
          alt=""
          className=" h-8 ml-4 md:ml-8 mt-3 md:h-10 md:mt-0"
        />
      </div>
    </div>
  );
}

export default Navbar;

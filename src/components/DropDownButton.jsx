"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import DropDownIcon from "./iconSVG/DropDownIcon";

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block  border-[1px] border-primary rounded-xl">
      <Button
        type="button"
        className="dropdown-toggle  hover:bg-gray-100  flex items-center p-2  rounded-xl bg-white  text-primary "
        onClick={toggleDropdown}>
        {props.label}
        <DropDownIcon className="w-3 ml-4" />
      </Button>
      {isOpen && (
        <div className="dropdown-menu absolute top-full left-0 w-full overflow-hidden bg-white rounded-md shadow-sm z-10">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
            {props.option1}
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
            {props.option2}
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
            {props.option3}
          </a>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

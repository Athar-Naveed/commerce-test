import React from "react";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import BellIcon from "./iconSVG/BellIcon";
import HomeIcon from "./iconSVG/HomeIcon";
import ShoppingBagIcon from "./iconSVG/ShoppingBagIcon";
import UserNavIcon from "./iconSVG/UserNavIcon";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="h-16 min-w-screen font-tec flex max-w-auto">
      <div className="flex items-center gap-x-24 m-auto">
        <Link href="/">
          <p className="text-2xl font-semibold text-primary">E-Commerce</p>
        </Link>
        <div className="flex items-center relative ">
          <Input placeholder="Input Field" className="ml-12 w-[400px]  " />
          <Button className="absolute right-0 rounded-tl-none rounded-bl-none">
            Search
          </Button>
        </div>
        <div className="">
          <div className="flex items-center justify-center ">
            <div className="flex gap-x-6">
              <Link href="#">
                <HomeIcon className="w-6 h-6 " />
              </Link>
              <Link href="#">
                <BellIcon className="w-8 h-8 " />
              </Link>
              <Link href="#">
                <ShoppingBagIcon className="w-6 h-6 " />
              </Link>
              <Link href="#">
                <UserNavIcon />
              </Link>
            </div>
            <div className="flex items-center justify-center gap-x-3 ml-12">
              <Link href="/login">
                <p className="">Login</p>
              </Link>
              {"|"}
              <Link href="/register">
                <p className="">Register</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

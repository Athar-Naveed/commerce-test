import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import Dropdown from "./DropDownButton";

const options = [
  { value: "hell", label: "hell" },
  { value: "snacker", label: "snacker" },
];

const CategoriesLinks = () => {
  return (
    <div className="flex justify-center items-center gap-x-5 flex-wrap md:flex-nowrap space-y-2">
      <Link href="">
        <Button className="rounded-xl">All</Button>
      </Link>
      <Dropdown
        label="Cloths"
        option1="Shirt"
        option2="Pant"
        option3="Trouser"
      />
      <Dropdown
        label="Shoes"
        option1="Hell"
        option2="Snackers"
        option3="Flat"
      />
      <Link href="">
        <Button
          variant="outline"
          className="border-[1px] border-primary rounded-xl text-primary hover:text-primary ">
          Electronics
        </Button>
      </Link>
      <Link href="">
        <Button
          variant="outline"
          className="border-[1px] border-primary rounded-xl text-primary hover:text-primary ">
          Mobiles
        </Button>
      </Link>
      <Link href="" className="">
        <Button
          variant="outline"
          className="border-[1px] border-primary rounded-xl text-primary hover:text-primary ">
          Grocery
        </Button>
      </Link>
      <Link href="">
        <Button
          variant="outline"
          className="border-[1px] border-primary rounded-xl text-primary hover:text-primary ">
          Beauty Toys
        </Button>
      </Link>
      <Link href="">
        <Button
          variant="outline"
          className="border-[1px] border-primary rounded-xl text-primary hover:text-primary ">
          Furniture
        </Button>
      </Link>
      <Link href="">
        <Button
          variant="outline"
          className="border-[1px] border-primary rounded-xl text-primary hover:text-primary ">
          Cosmetics
        </Button>
      </Link>
    </div>
  );
};

export default CategoriesLinks;

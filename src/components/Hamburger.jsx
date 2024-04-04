"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { CrossIcon} from "lucide-react";
import HamburgerIcon from "./iconSVG/HamburgerIcon";


export const navigations = [
  {
    name: "Female",
    link: "/category/female",
  },
  {
    name: "Male",
    link: "/category/male",
  },
  {
    name: "Kids",
    link: "/category/kids",
  },
  {
    name: "Products",
    link: "/category/products",
  },
];

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative ">
      <button onClick={toggleOpen} className="focus:outline-none">
        <Image src={HamburgerIcon} alt="Hamburger" width={25} height={25} />
      </button>

      {isOpen && (
        //Mobile Section
        <nav className={isOpen ? `${"fixed block z-20"}` : `${"hidden"}`}>
          <div className=" fixed inset-y-0 right-0 w-1/2 bg-white z-0 overflow-y-auto">
            <div className="text-black  ">
              <button onClick={() => setIsOpen(!isOpen)} className="ml-[85%] ">
                <CrossIcon className="mt-5 rotate-45" />
              </button>
              {navigations.map((item, idx) => (
                <div
                  className="p-4 "
                  key={idx}
                  onClick={() => {
                    setIsOpen(false);
                    // Add any additional logic you want for handling menu item clicks
                  }}>
                  {pathname === item.name ? (
                    <Link
                      href={item.link}
                      className="text-lg font-semibold text-primary">
                      {item.name}
                    </Link>
                  ) : (
                    <Link
                      href={item.link}
                      className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary">
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <div className="md:my-16 sm:my-12 mt-12 px-3 text-zinc-700">
              <p className=" font-bold font-serif text-xl mb-4">Dine Market</p>
              <p className="text-sm font-serif">Social Media</p>
              <div className=" flex justify-start items-center gap-x-5 my-3">
                <Link
                  href="https://www.facebook.com/profile.php?id=100017772258554"
                  target="_blank">
                </Link>
                <Link
                  href="https://twitter.com/Muhamma60041182"
                  target="_blank">
                </Link>
                <Link
                  href={"https://www.instagram.com/riz_mansha/"}
                  target="_blank">
                </Link>
              </div>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Hamburger;

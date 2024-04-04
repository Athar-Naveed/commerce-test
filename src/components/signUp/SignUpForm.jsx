"use client";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import EyeIcon from "../iconSVG/EyeIcon";

import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { validateForm } from "./ValidateSignUpForm";
import UserIcon from "../iconSVG/UserIcon";
import PhoneIcon from "../iconSVG/PhoneIcon";
import MailboxIcon from "../iconSVG/MailBoxIcon";
import CalendarIcon from "../iconSVG/CalendarIcon";
import Gender from "../iconSVG/Gender";
import LockIcon from "../iconSVG/LockIcon";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export function SignUpForm({ onSubmit }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   if (info.email.length > 0 && info.password.length > 0) {
  //     setButtonDisabled(true);
  //   } else {
  //     setButtonDisabled(false);
  //   }
  // }, [info]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errorMessages } = validateForm(info);
    setErrors(errorMessages);

    if (isValid) {
      let data = {
        firstname: info.firstName,
        lastname: info.lastName,
        email: info.email,
        password: info.password,
        phone: info.phoneNumber,
        dob: info.dateOfBirth,
        gender: info.gender,
      };
      try {
        setLoading(true);
        const response = await axios.post(`${baseUrl}register-customer`, data);
        console.log("res:", response);
        if (response.data.code === 200) {
          toast.success("Signup Successfully");

          router.push("/login");
        } else if (response.data.code === 422) {
          console.log("bhai");
          toast.error(response.data.message);
        }
      } catch (error) {
        // setErrors(error.response.data);
        // toast.error(error.message);
      }
    } else {
      console.error("Form validation failed:", errors);
    }
  };

  const handleGenderChange = (value) => {
    value.preventDefault();
    setInfo({ ...info, gender: value.target.value });
  };

  return (
    <div className="w-[85%]  sm:w-[80%]  py-4  rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 sm:gap-x-12 ">
          <div className="flex flex-col ">
            <label
              className="text-black font-normal text-sm my-1"
              htmlFor="first-name">
              First Name
            </label>
            <div className="relative mt-1">
              <UserIcon className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
           placeholder:text-gray-400 mb-1"
                id="first-name"
                placeholder="Enter your name"
                value={info.firstName}
                onChange={(e) =>
                  setInfo({ ...info, firstName: e.target.value })
                }
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs ">{errors.firstName}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label
              className="text-black font-normal text-sm my-1"
              htmlFor="last-name">
              Last Name
            </label>
            <div className="relative mt-1">
              <UserIcon className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
           placeholder:text-gray-400 mb-1"
                id="last-name"
                placeholder="Enter your last name"
                value={info.lastName}
                onChange={(e) => setInfo({ ...info, lastName: e.target.value })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs ">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label
              className="text-black font-normal text-sm my-1"
              htmlFor="phone-number">
              Phone Number
            </label>
            <div className="relative mt-1">
              <PhoneIcon className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
           placeholder:text-gray-400 mb-1"
                id="phone-number"
                placeholder="Enter your phone number"
                value={info.phoneNumber}
                onChange={(e) =>
                  setInfo({ ...info, phoneNumber: e.target.value })
                }
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs ">{errors.phoneNumber}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label
              className="text-black font-normal text-sm my-1"
              htmlFor="email">
              Email
            </label>
            <div className="relative mt-1">
              <MailboxIcon className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
           placeholder:text-gray-400 mb-1"
                id="email"
                placeholder="Enter your email"
                type="email"
                value={info.email}
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs ">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label
              className="text-black font-normal text-sm my-1"
              htmlFor="password">
              Password
            </label>
            <div className="relative mt-1">
              <LockIcon className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400" />
              {showPassword ? (
                <EyeIcon
                  onClick={togglePasswordVisibility}
                  className="absolute right-1 top-5 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                />
              ) : (
                <EyeIcon
                  onClick={togglePasswordVisibility}
                  className="absolute right-1 top-5 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                />
              )}
              <Input
                className="pl-10 border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
           placeholder:text-gray-400 mb-1"
                id="password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                value={info.password}
                onChange={(e) => setInfo({ ...info, password: e.target.value })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs ">{errors.password}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label
              className="text-black font-normal text-sm my-1"
              htmlFor="password-confirm">
              Password Confirmation
            </label>
            <div className="relative mt-1">
              <LockIcon className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400" />
              {showConfirmPassword ? (
                <EyeIcon
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-1 top-5 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                />
              ) : (
                <EyeIcon
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-1 top-5 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                />
              )}
              <Input
                className="pl-10 border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
           placeholder:text-gray-400 mb-1"
                id="password-confirm"
                placeholder="Confirm password"
                type={showConfirmPassword ? "text" : "password"}
                value={info.confirmPassword}
                onChange={(e) =>
                  setInfo({ ...info, confirmPassword: e.target.value })
                }
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <label
              className=" text-black font-normal text-sm my-1"
              htmlFor="gender">
              Gender
            </label>
            <div className="relative mt-1">
              <Gender className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400" />
              <select
                id="gender"
                value={info.gender}
                onChange={handleGenderChange}
                className="pl-10 flex h-10 w-full  bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-0 border-b-[1px] border-gray-800 rounded-none focus-visible:rounded focus-visible:border-hidden focus-visible:ring-offset-3 placeholder:text-gray-600 mb-4">
                <option value="" disabled hidden className="">
                  Select your Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <label
              className="text-black font-normal text-sm my-1"
              htmlFor="date-of-birth">
              Date of Birth
            </label>
            <div className="relative mt-1">
              <CalendarIcon className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
           placeholder:text-gray-400 mb-1"
                id="date-of-birth"
                placeholder="Enter your date of birthday"
                type="date"
                value={info.dateOfBirth}
                onChange={(e) =>
                  setInfo({ ...info, dateOfBirth: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="my-4 flex  sm:justify-center ">
          <Button className=" rounded-full px-12  w-full sm:w-40" type="submit">
            Sign Up
          </Button>
        </div>
        <div className="text-center mb-2 flex justify-center items-center ">
          <div className="w-20 h-[1px] bg-gray-800" />
          <div className="mx-2 text-base font-semibold">or</div>
          <div className="w-20 h-[1px] bg-gray-800" />
        </div>
        <div className="flex justify-center">
          <Button variant="ghost" className="">
            <Image
              src="/login/google.svg"
              alt="google"
              width={30}
              height={30}
              className="w-6 mr-2"
            />
            Signin with Google
          </Button>
        </div>
        <div className="text-center text-sm text-gray-400 ">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-semibold">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}

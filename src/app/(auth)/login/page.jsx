import Image from "next/image";
import { LoginForm } from "@/components/login/LoginForm";

const page = () => {
  return (
    <div className="min-h-screen w-100 flex justify-center font-tec ">
      <div
        style={{
          backgroundImage: "url('/login/bg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative max-sm:hidden sm:flex-1 flex justify-end ">
        <div className="absolute w-[420px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/login/100.svg"
            alt="Hundered Percent"
            width={80}
            height={80}
            className="absolute z-20 -right-10 top-44"
          />
          <Image
            src="/login/emoji.svg"
            alt="Emoji"
            width={80}
            height={80}
            className="absolute z-20 -left-10 bottom-24"
          />
          <Image
            src="/login/bg-fore.svg"
            alt="bg"
            width={500}
            height={500}
            className="relative"
          />
          <h3 className=" text-white py-12 px-12 absolute top-0 text-4xl font-bold max-w-full">
            Very good works are waiting for you <span>Login Now</span>
          </h3>
          <Image
            src="/login/shopping.svg"
            alt="logo"
            width={240}
            height={240}
            className="absolute w-64 h- top-52 right-20"
          />
        </div>
      </div>

      <div className="sm:flex-1">
        <h1 className=" text-4xl font-semibold text-orange-500  my-8 text-center">
          Ecommerce
        </h1>
        <h2 className="text-2xl  mb-5 text-center font-medium text-gray-500">
          Welcome to Ecommerce
        </h2>
        <div className="flex justify-center items-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default page;

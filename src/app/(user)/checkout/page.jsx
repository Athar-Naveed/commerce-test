import React from "react";
import CheckoutForm from "./CheckoutForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductCheckout from "./ProductCheckout";

const page = () => {

  return (
    <MaxWidthWrapper>
      <div className="flex justify-center flex-col md:flex-row  md:gap-x-12 ">
        <div className="flex-1 order-2 md:order-1">
          <CheckoutForm />
        </div>
        <div className="flex-1 order-1 md:order-2">
          <ProductCheckout />{" "}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;

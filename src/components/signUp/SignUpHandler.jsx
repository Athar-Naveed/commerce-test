import React, { useState } from "react";
import { SignUpForm } from "./SignUpForm";

export function SignUpHandler() {
  const [submitStatus, setSubmitStatus] = useState("");

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitStatus("success");
      //   Handle any further actions after successful submission
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
      // Handle error
    }
  };

  return (
    <>
      <SignUpForm onSubmit={handleSubmit} />
      {submitStatus === "success" && <p>Form submitted successfully!</p>}
      {submitStatus === "error" && (
        <p>Failed to submit form. Please try again.</p>
      )}
    </>
  );
}

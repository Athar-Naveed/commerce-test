export const validateForm = (formData, errors) => {
  let isValid = true;
  const errorMessages = { ...errors };

  //validate first name
  if (!formData.firstName.trim()) {
    isValid = false;
    errorMessages.firstName = "First name is required";
  } else {
    errorMessages.firstName = "";
  }
  //validate last name
  if (!formData.lastName.trim()) {
    isValid = false;
    errorMessages.lastName = "Last name is required";
  } else {
    errorMessages.lastName = "";
  }
  //validateEmail
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(formData.email)) {
    isValid = false;
    errorMessages.email = "Invalid email address.";
  } else {
    errorMessages.email = "";
  }
  // Validate password
  // if (!formData.password.trim()) {
  //   isValid = false;
  //   errorMessages.password = "Password is required.";
  // } else if (formData.password.length > 8) {
  //   isValid = false;
  //   errorMessages.password = "Password must be at least 8 characters long.";
  // } else {
  //   errorMessages.password = "";
  // }

  // Validate confirm password
  if (!formData.confirmPassword.trim()) {
    isValid = false;
    errorMessages.confirmPassword = "Confirm password is required.";
  } else if (formData.confirmPassword !== formData.password) {
    isValid = false;
    errorMessages.confirmPassword = "Passwords do not match.";
  } else {
    errorMessages.confirmPassword = "";
  }

  if (!formData.gender) {
    isValid = false;
    errorMessages.gender = "Gender selection is required.";
  } else {
    errorMessages.gender = "";
  }
  if (!formData.dateOfBirth.trim()) {
    isValid = false;
    errorMessages.dateOfBirth = "Date of birth is required.";
  } else {
    errorMessages.dateOfBirth = "";
  }

  if (!isValid) {
    console.error("Form validation failed:", errorMessages);
    // Implement error handling here, e.g., display error messages to the user
  }
  
 return { isValid, errorMessages };
};

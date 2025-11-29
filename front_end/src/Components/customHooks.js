// import axios from "axios";
import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export function FormProvider({ children }) {
  const [Formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
    studentID: "",
    semester : ""
  });

  const [Validation, setValidation] = useState({
    username: null,
    email: null,
    password: null,
    studentID: null,
    semester : null
  });


  return (
    <FormContext.Provider value={{ Formdata, setFormdata, Validation, setValidation}}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext);
}

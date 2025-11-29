import axios from "axios";

export const validate = (key, value) => {
  if (key === "testDate") {
    // return Date.now() >= new Date(value);
    console.log(`${Date.now()}, and ${new Date(value)}`);
    return true;
  }
};

export const handleSubmit = async (e, ctInfo) => {
  e.preventDefault();

  const URL = "http://localhost:8080/schedule-test";
  try {
    const sendCtData = await axios.post(
      URL,
      ctInfo,
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials : true
      }
    );
    console.log(sendCtData);
  } catch (error) {
    console.log("error occured while ct saveds");
    console.log(error);
  }
};

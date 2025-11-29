import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();
    const remainingTimeInSeconds =
      (24 - now.getHours() - 1) * 3600 +
      (59 - now.getMinutes()) * 60 +
      (60 - now.getSeconds());

    const initialHours = Math.floor(remainingTimeInSeconds / 3600);
    const initialMinutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
    const initialSeconds = remainingTimeInSeconds % 60;

    setHour(initialHours);
    setMinute(initialMinutes);
    setSecond(initialSeconds);
    const fetchData = async()=>{

      try{
        const response = await axios.get('http://localhost:8080/fui',
          {
            withCredentials : true
          }
        );
          //       const response = await axios.post(
          // 'http://localhost:8080/login',
          // {
          //   "username" : "janesmith",
          //   "password" : "ce23042@mbstuD"
          // },
          // {
          //   headers : {
          //     "Content-Type" : "application/json"
          //   },
          //   withCredentials : true
          // }
        // );
        console.log(response);
      } catch(err){
        navigate("/");
        console.error(err);
      }
    } 
    fetchData();
  }, [navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecond((prevSecond) => {
        if (prevSecond > 0) return prevSecond - 1;

        // Second is 0, update minute
        setMinute((prevMinute) => {
          if (prevMinute > 0) {
            setSecond(59);
            return prevMinute - 1;
          }

          // Minute is 0, update hour
          setHour((prevHour) => {
            if (prevHour > 0) {
              setMinute(59);
              setSecond(59);
              return prevHour - 1;
            }

            // Time is up
            clearInterval(timer);
            return 0;
          });

          return 0;
        });

        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h1>
        Countdown: {hour.toString().padStart(2, "0")}:
        {minute.toString().padStart(2, "0")}:
        {second.toString().padStart(2, "0")}
      </h1>
    </div>
  );
}

export default Profile;
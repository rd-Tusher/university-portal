import { useNavigate } from "react-router-dom";
// import { verifyOtp } from "./inputValidation";
import { useEffect, useState } from "react";
import axios from "axios";



export default function EmailVerificaion() {

  const [Formdata,setFormdata] = useState(null);
  const [otp, setOtp] = useState(''); 
  const navigate = useNavigate();

useEffect(() => {
  const storedData = localStorage.getItem('formdata');
  if (storedData) {
    const data = JSON.parse(storedData);
    setFormdata(data);
    localStorage.removeItem('formdata');
  }
}, []);



  const  verifyOtp  = async (e)=>{
    e.preventDefault();
    console.log(Formdata.email);
    try {
        const URL = 'http://localhost:8080/verify-otp';
        const verify_otp_response = await axios.post(URL,
            {
                otp : otp,
                email : Formdata.email
            },
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }
        );
        console.log(verify_otp_response);
      if(verify_otp_response.status === 200){
            const URL2 = 'http://localhost:8080/save-student-info';
            console.log("entered registered part");
            try {
                const data_store_response = await axios.post(URL2,
                    Formdata,
                    {
                        headers : {
                            'Content-Type' : 'application/json'
                        }
                    }
                );
                if(data_store_response.status === 200){
                    navigate('/');
                }
            } catch(err){
                console.log('Error occured while saving information!');
            }
        }
        else{
            document.getElementById('otp_error').innerText = 'Wrong or expired otp!';
        }
        
    } catch(err){
        document.getElementById('otp_error').innerHTML = '<strong>Wrong or expired otp!</strong>';
        console.log('otp verificaion falied!');
    }
  }


  return (
    <div className="min-vh-100">
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-7 col-sm-10 ">
            <div className="shadow rounded-4 mt-5 p-4">


              <h1 className="text-center">Email Verification</h1>
              <p>We have sent an otp to your registered email to verify </p>


              <form onSubmit={(e)=>verifyOtp(e)}>
                
                <div className="mb-3">
                  {/* <label htmlFor="password" className="form-label"></label> */}
                  <input
                    type="code"
                    name="otp"
                    className="form-control"
                    required
                    placeholder="Enter code..."
                    value={otp}
                    onChange={(e)=>setOtp(e.target.value)}
                  />
                </div>


                <div className="mb-3 d-grid">
                    <button type="submit" className="btn btn-outline-primary">Submit</button>
                </div>
                <small id="otp_error"  className="text-center text-warning"> </small>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
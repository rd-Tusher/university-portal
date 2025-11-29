import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({
    userID : '',
    password : ''
  });
  const setInput = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value,}));
    if(!e.target.value){
      document.getElementById('duplicate-cred').innerText = ' ';
    }
  };
  // const studentRoles = ['student','teacher'];

  const navigate = useNavigate();
  const handleLogin = async(e)=>{
    e.preventDefault();
    
    const URL = 'http://localhost:8080/login';
    let response;
      try {
            response =  await axios.post(URL,
                loginInfo,
                {
                    headers : {
                       'Content-Type' : 'application/json'
                    },
                    withCredentials : true
                }
            );
            document.getElementById('duplicate-cred').innerHTML = `<strong class = "text-success">${response.data.message}</strong>`;
            
            if(response.data.role.includes("student")) navigate('student/dashboard');
            if(response.data.role === 'teacher') navigate('/teacher/classroom');
            if(response.data.role === 'admin') navigate('/profile');
            
          } catch(err){
                document.getElementById('duplicate-cred').innerHTML = `<strong class = "text-warning">${err?.response?.data}</strong>`;
            }
  }
  return (
    <div className="min-vh-100">
      {/* <div className="container"> */}
        <div className="row justify-content-center ">
          <div className="col-md-6 col-lg-4 gradient">
            <div className="card-body p-4 mt-5 shadow rounded-3">
              <h3 className="text-center">LogIn</h3>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  {/* <label htmlFor="username" className="form-label">Username</label> */}
                  <input
                    type="text"
                    name="userID"
                    className="form-control"
                    required
                    placeholder="Enter id..."
                    value={loginInfo.userID}
                    onChange={setInput}
                  />
                </div>

                <div className="mb-3">
                  {/* <label htmlFor="password" className="form-label">Password</label> */}
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    required
                    placeholder="Enter password..."
                    value={loginInfo.password}
                    onChange={setInput}
                  />
                </div>

                <small id="duplicate-cred" ></small>
                <div className="w-100"></div>

                <div className="d-grid mt-3">
                  <button type="submit" className="btn btn-outline-primary">Submit</button>
                </div>

                <p className="text-center mt-3">
                  Don't have an account? <Link to="/register">Create account</Link>
                </p>
              </form>
            </div>
          </div>
        {/* </div> */}
      </div>
    </div>
  );
}
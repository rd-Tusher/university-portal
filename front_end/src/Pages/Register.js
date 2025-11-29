import {  Link, useNavigate } from "react-router-dom";
import { handleChange, otpSender } from "./inputValidation";
import { useEffect, useState } from "react";
import Select from 'react-select'
import { department, semester } from "../Components/KeyValueObject";

function Register() {
  const navigate = useNavigate();

  const inputRules = {
    fullName: 'Characters and underscores (_) are allowed!',
    email: 'Enter your versity mail!',
    password: `Include :  <strong>A-Z,</strong> <strong>a-z,</strong> <strong>0-9,</strong> <strong>@ $ ! % * ? &</strong>`,
    studentID: 'Enter your versity ID!',
  };

  const [isTeacher, setIsTeacher] = useState("");

  const [Formdata, setFormdata] = useState({
    fullName: "" ,
    email: "",
    password: "",
    semester : "",
    department : '',
    re_add  : null,
    teacher : "false"
  });


  const [Validation, setValidation] = useState({
    fullName: null,
    email: null,
    password: null,
    department : null
  });


  useEffect(()=>{
    if(Formdata.email.endsWith('@teacher.edu') && Validation.email){
      setIsTeacher(true);
      setFormdata(prev => ({...prev, teacher : "true"}))
    }
    else {
      setIsTeacher(false);
      setFormdata(prev => ({...prev, teacher : "false"}))
    }
  },[Formdata.email,Validation.email]);



  const reAdd = [
    {label : "Yes", value : "true"},
    {label : "No", value : "false"}
  ]
  

  return (
    <div className="min-vh-100 crd-len">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className=" p-4 mt-5 m-auto shadow rounded-3 ">
              <h3 className="text-center mb-4 text-info fw-bold">Register</h3>

              <form onSubmit={(e) => otpSender(e, Formdata, navigate)}>


                {/* fullName */}
                <input 
                  type="text"
                  name="fullName"
                  className={`form-control ${Validation.fullName === true  ? 'is-valid'  : Validation.fullName === false  ? 'is-invalid'  : ''  } mt-4`}
                  placeholder="e.g. Tusher Debnath"
                  required
                  value={Formdata.fullName}
                  onChange={(e) => handleChange(e, setFormdata, setValidation, inputRules)}
                />
                

                {/* email */}
                <input 
                  type="text"
                  name="email"
                  className={`form-control ${Validation.email === true  ? 'is-valid'  : Validation.email === false  ? 'is-invalid'  : ''  } mt-4`}
                  placeholder="e.g. *****@mbstu.ac.bd"
                  required
                  value={Formdata.email}
                  onChange={(e) => handleChange(e, setFormdata, setValidation, inputRules)}
                  />


                  {/* passsword */}
                  <input 
                  type="password"
                  name="password"
                  className={`form-control ${Validation.password === true  ? 'is-valid'  : Validation.password === false  ? 'is-invalid'  : ''  } mt-4`}
                  placeholder="e.g. R;ajd09al$a;d"
                  required
                  value={Formdata.password}
                  onChange={(e) => handleChange(e, setFormdata, setValidation, inputRules)}
                  />


                  {/* department */}
                  <Select
                    options={department}
                    onChange={(selectedOption)=> {setFormdata(prev =>({...prev,department: selectedOption.value})); setValidation(prev => ({...prev,department : true}))} }
                    value={department.find(s => s.value === Formdata.department)}
                    placeholder="Select department..."
                    className='mt-4'
                    >
                  </Select>


                  {/* semester */}
                  {
                    !isTeacher && (
                      <>
                      <Select 
                      options={semester}
                      onChange={(selectedOption)=> {setFormdata(prev =>({...prev,semester : selectedOption.value})); setValidation(prev => ({...prev,semester : true}))} }
                      value={semester.find(s => s.value === Formdata.semester)}
                      placeholder="Select semester..."
                      className='mt-4'
                      >
                  </Select>



                  {/* re_add */}
                  <Select 
                    options={reAdd} 
                    onChange={(selectedOption)=> setFormdata(prev => ({...prev, re_add :  selectedOption.value}))}
                    value={reAdd.find(s => s.value === Formdata.re_add)}
                    placeholder="Are you re added ..."
                    className='mt-4'
                    >
                  </Select>
                      </>
                    )}

 
                <div className="d-grid mt-4">
                  <button disabled={!Object.values(Validation).every(v => v === true)} type="submit" className="btn btn-outline-primary" >
                    Register
                  </button>
                </div>
              </form>

              <p className="text-center mt-3 text-info ">
                Already have an account? <Link to="/">Login here</Link>
              </p>

            </div> 
          </div>
        </div>
      </div>
  );
}

export default Register;
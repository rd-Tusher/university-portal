import { Link, useNavigate } from "react-router-dom";
import { handleChange, otpSender } from "./inputValidation";
import { useFormContext } from "../Components/customHooks.js";

function Register() {
  const navigate = useNavigate();
  const { Formdata, setFormdata, Validation, setValidation } = useFormContext();

  const inputRules = {
    username: 'Characters and underscores (_) are allowed!',
    email: 'Enter your versity mail!',
    password: `Include :  <strong>A-Z,</strong> <strong>a-z,</strong> <strong>0-9,</strong> <strong>@ $ ! % * ? &</strong>`,
    studentID: 'Enter your versity ID!',
    semester: 'Enter your current semester'
  };

  const formFields = [
    { name: "username", label: "Username", type: "text", placeholder: "Enter username..." },
    { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email" },
    { name: "semester", label: "Semester", type: "text", placeholder: "Enter your semester" },
    { name: "password", label: "Password", type: "password", placeholder: "Password..." },
    { name: "studentID", label: "Student ID", type: "text", placeholder: "Ex : ce-23042" },
  ];

  return (
    <div className="min-vh-100 mt-0">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card-body p-4 mt-5 shadow rounded-3">
              <h3 className="text-center mb-4">Register</h3>

              <form onSubmit={(e) => otpSender(e, Formdata, navigate)}>

                {formFields.map(({ name, label, type, placeholder }) => (
                  <div className="mb-3" key={name}>
                    <label htmlFor={name} className="form-label">
                      <small>{label}</small><sup>*</sup>
                    </label>

                    <input
                      name={name}
                      type={type}
                      className={`form-control ${Validation[name] === true
                        ? 'is-valid'
                        : Validation[name] === false
                          ? 'is-invalid'
                          : ''
                        }`}
                      value={Formdata[name]}
                      placeholder={placeholder}
                      required
                      onChange={(e) => handleChange(e, setFormdata, setValidation, inputRules)}
                    />

                    <small id={`${name}-error`} className={`${Validation[name] ? 'd-none' : ''}`}></small>
                  </div>
                ))}

                <div className="d-grid">
                  <button disabled={!Object.values(Validation).every(v => v === true)} type="submit" className="btn btn-outline-light">
                    Register
                  </button>
                </div>
              </form>

              <p className="text-center mt-3">
                Already have an account? <Link to="/">Login here</Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
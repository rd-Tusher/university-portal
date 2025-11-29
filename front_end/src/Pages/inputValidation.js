import axios from "axios";
import fetchData from "./axios_api";

const allowedDept = ['ce','eee','ict','cps','chm','ftns'];

export function validateValue(key,value){
    switch(key){
        case "fullName":
            return /^[a-zA-Z][a-zA-Z ]{3,30}$/.test(value);
        case "email":
            const regex_em = new RegExp(`^.+@(mbstu\\.ac\\.bd|teacher\\.edu)$`);
            return regex_em.test(value.toLowerCase());
        case "password":
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@*$!?%&])[a-zA-Z0-9@*$!?%&]{8,}$/.test(value);
        case "studentID":
            const regex_id = new RegExp (`^(${allowedDept.join('|')})-\\d{5}$`);
            return regex_id.test(value);
        default : 
    }
}


export async function handleChange(e,setFormdata,setValidation,inputRules){
    const {name , value} = e.target;
    console.log(name);
    const trimmedValue = value;

    setFormdata(prev =>({...prev,[name] : trimmedValue}));

    let ValidationResult = null;
    if(trimmedValue.length > 0){
        ValidationResult = validateValue(name,trimmedValue);
    }
    if(ValidationResult === true){
        const response = await fetchData(name,trimmedValue);
        if(response === true){
            ValidationResult = false
                document.getElementById(`${name}-error`).innerHTML = '<strong class = "text-danger">Already registered!</strong>';
        }
    }
    // else {
        // document.getElementById(`${name}-error`).innerHTML = `<strong class = "text-success">${inputRules[name]}</strong>`;
    // }
    setValidation(prev =>({...prev,[name] : ValidationResult}));
}


export async function otpSender(e,Formdata,navigate) {
    e.preventDefault();
    console.log(Formdata.email);
    localStorage.setItem('formdata',JSON.stringify(Formdata));
    try {
        const URL = 'http://localhost:8080/send-otp';
        const response = await axios.post(URL, 
           { email : Formdata.email},
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }
        )
        console.log(response);
        if(response.status === 200){
            console.log("Email send successfully!");
            console.log(response);
            navigate('/EmailVerificaion',{state : {Formdata}});
        }
    } catch(err){
        console.log("Error occured while trying to send otp");
    }
}



export async function verifyOtp (e,navigate,otp){
    e.preventDefault();
    console.log(otp);
    const Formdata = (sessionStorage.getItem('formdata'));
    try {
        const URL = 'http://localhost:8080/verify_otp';
        const verify_otp_response = await axios.post(URL,
            {
                otp : otp,
                email : Formdata['email']
            },
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }
        );
        if(verify_otp_response.status === 200){
            const URL2 = 'http://localhost:8080/save-student-info';
            console.log("entered registered part");
            console.log(Formdata);
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
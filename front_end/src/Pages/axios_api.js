import axios from "axios";

export default async function fetchData(key,value){
  const URL = 'http://localhost:3001/api/versity/check/duplicate';
    try {
        const response = await axios.post(URL,{key,value});
        return response.status === 200 ? true : false;
    } catch(err) {
        console.error(err);
    }
}




export async function newAccessToken(navigate) {

  const URL2 = 'http://localhost:3001/api/verify/refresh';
    try {
        const refreshRes = await axios.post (URL2,
          {
            refreshToken : localStorage.getItem('refreshToken')
          },
          {
            headers : {
              'Content-Type' : "application/json"
            }
          }
        );
        localStorage.setItem('accessToken',refreshRes.data.accessToken);
        console.log(refreshRes);
    } catch(err){
      localStorage.clear();
      navigate('/')
        console.log(err);
    }
}


export async function fetchStudentData(props) {
  const {department, semester} = props.data;
  try {
    const URL = 'http://localhost:3001/api/versity/auth/fetch-student-data';
    const response = await axios.get(URL,
      {
        department : department,
        semester : semester
      },
      {
        headers : {
          'Content-Type' : "application/json"
        }
      }
    );
    return response.data.data;
  } catch(error){
    console.log(error);
    console.log('Errror occured while fetching data from student db!');
  }
}

export async function getProfile(username) {
  console.log(username);
  try {
    const URL = `http://localhost:3001/api/versity/auth/fetch-user-data?username=${username}`;
    const response = await axios.get(URL,
      {
        username : username
      },
      {
        headers : {
          'Content-Type' : "application/json"
        }
      }
    );
    return response.data.data[0];
    // console.log(response);
  } catch(error){
    console.log(error);
    console.log('Errror occured while fetching data from student db!');
  }
}
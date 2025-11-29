import axios from "axios";


export const getCourse = async()=>{
    try {
        const URL = 'http://localhost:8080/get-teacher-course';
        const response  = await axios.get(URL,{withCredentials:true});
        console.log(response?.data);
        
        const dst = [...new Map(
        response?.data?.map(c => [
            `${c.department}-${c.semester}`, { dept: c.department, sem: c.semester }])
        ).values()];



        sessionStorage.setItem("dept-sem",JSON.stringify(dst));
        sessionStorage.setItem("teacher-course",JSON.stringify(response?.data));
        
    } catch (error) {
        console.log(error);
    }
}
import axios from 'axios';
import React, { useState } from 'react'

function SubmitAssign({roomData}) {
    const [files,setFiles] = useState([]);
    const [file,setFile] = useState([null]);

    const handleClick = ()=>{
        setFile(prev => [...prev, null]);
    }

    const handleChange = (e)=>{
        const fileArray = Array.from(e.target.files);
        fileArray?.map((file,i)=> setFiles(prev => [...prev, file]));
    }

    const handleRemove = (index)=>{
        setFiles(prev => prev.filter((f,i)=> i !== index));
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(roomData)

        const taskInfo = JSON.parse(sessionStorage.getItem("taskInfo"));

        const formData = new FormData();
        formData.append("department",taskInfo.dt);
        formData.append("semester",taskInfo.sm);
        formData.append("courseID",taskInfo.cd);
        formData.append("assgId",roomData._id);

        files.forEach((file) => {
        formData.append("files", file);
        });


        const URL  = 'http://localhost:8080/submit-assg';
         try {
            const response =  await axios.post(URL,formData,{
                headers: {'Content-Type' : "multipart/form-data"},
                withCredentials : true
            });
            console.log(response);
         } catch (error) {
            console.log(error);
         }
    }


  return (
    <>
        <h2 className='text-center text-primary fw-bold'>Submit Assingment</h2>
        <hr />
        {file && (
            file?.map((file,index)=>(
                
                <input type="file" 
                    onChange={(e)=> handleChange(e)}
                    multiple
                    className='form-control'
                />
            ))

        )}
        <p className="button" onClick={()=>handleClick()}>+ Upload File</p>
        <hr />

        <p className='text-primary fw-bold fs-4'>Selected files <sub>{files?.length}</sub> : </p>
        {
            files && (
                files.map((file,index)=>(
                    <div className='d-flex align-items-center gap-1 border border-info rounded-3 p-2 justify-content-between mb-1'>
                        <p className='  wrap mb-0'>{file.name}</p>
                        <p className='mb-0 pointer' onClick={()=>handleRemove(index)}> &times;</p>
                    </div>
                ))
            )
        }
        <hr />
        <p className="button" onClick={(e)=>handleSubmit(e)}>Submit</p>
    </>
  )
}

export default SubmitAssign;


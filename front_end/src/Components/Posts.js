

function Posts({classRoom,setPreviewID}) {
return (
    <div className="row mt-2 justify-content-evenly align-items-start">

    <div className="col-4">
        <p className='text-center fw-600'>  Assignment  </p>
        <div className="assignment">
            {classRoom?.assignments?.length > 0 ? (
                classRoom?.assignments.map((asgn, index)=>{
                    return (
                    <div
                        onClick={()=>setPreviewID({ tag : "assignments", id : asgn?._id})}
                        key={asgn?._id} 
                        className="border border-info rounded-3 p-2 fw-500 bg-bluish mt-2">
                            A new assignment been added :  <strong>{asgn.title}</strong> 
                            <p className='fs-9'> {asgn.date} </p>
                    </div>
                )}) 
            ) : ( <div className='n-to-show'> Nothing to show </div> )
        } 
        
      </div> 
    </div> 

    <div className="col-4">
        <p className='text-center fw-600'> Announcements  </p>
          <div className="announcement">

            {classRoom?.announcements?.length > 0 ? (
                classRoom?.announcements.map((anc, index)=>{
                    return (
                    <div
                        onClick={()=>setPreviewID({ tag : "announcements", id : anc._id})}
                        key={anc?._id} className="border border-info rounded-3 p-2 fw-500 bg-bluish mt-2">
                            An announcement has announced :  <strong>{anc.title}</strong> 

                        <p  key={index + " " + index} className='fs-9'>   {anc.date}</p>
                    </div>
                )}) 
            ): ( <div key={"nothing"} className='n-to-show'>     Nothing to show</div> )
            }
          </div>
      </div>

    <div className="col-4">
        <p className='text-center fw-600'> Materials  </p>
        <div className="material">
            {classRoom?.materials?.length > 0 ? (
                classRoom?.materials.map((mtr, index)=>{
                    return (
                    <div
                        onClick={()=>setPreviewID({ tag : "materials", id : mtr._id})}
                        key={mtr?._id} className="border border-info rounded-3 p-2 fw-500 bg-bluish mt-2">
                            Study materials have  added :  <strong>{mtr.title}</strong> 

                        <p  className='fs-9'>  {mtr.date}</p>
                    </div>
                )})
            ) : (
                <div className="n-to-show">  Nothing to show </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default Posts;
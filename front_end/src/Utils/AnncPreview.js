import { dateFormatter } from './ClassRoomUtils';

function AnncPreview({roomData}) {
  return (
    <>
      {roomData && (
        <>
          <h1 className="text-primary">Announcement Review Console</h1>
          <div className="row">
            <div className="col-12 col-md-8 col-lg-6 box-shadow p-3 rounded-3">
              <h2 className="text-primary mb-0">{roomData?.title}</h2>
              {roomData?.date && (
              <p className="">Announced at : {dateFormatter(roomData?.date)}</p>
              )}
              <hr />
              {roomData?.description && (
                <>
                  <h3 className="text-primary">Message : </h3>
                  <p className='shadow-sm p-2 rounded-3 border border-info'>{roomData?.description}</p>
                </>
              )}
            </div>
          </div>


          {roomData?.fileUrl.length > 0 && (
            <div className="row">
            <div className="col-12 col-md-8 col-lg-6 mt-3 box-shadow rounded-3 p-3">
              <h2 className="text-primary">Attached Files</h2>
              {
                Array.isArray(roomData?.fileUrl) ? (
                  roomData?.fileUrl?.map((url,index)=>(
                    <a href={url} key={index} target="_blank" rel="noopener noreferrer" className="wrap border border-info p-2 rounded-3 pointer mb-3 d-block text-decoration-none bg-indigo">{url.split("/").pop()}</a>
                  ))
                ) : (
                  <a href={url} key={index} target="_blank" rel="noopener noreferrer" className="wrap border border-info p-3 rounded-3 pointer mb-3 d-block text-decoration-none bg-indigo">{roomData?.fileUrl.split("/").pop()}</a>
                )
              }
            </div>
          </div>
          )}

        </>
      )}
    </>
  );
}

export default AnncPreview;
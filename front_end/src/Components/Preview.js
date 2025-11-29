import AssgPreview from '../Utils/AssgPreview';
import AnncPreview from '../Utils/AnncPreview';
import MtlPreview from '../Utils/MtlPreview';

function Preview({roomData,cntType}) {

  

  return (
    <>
      {
        cntType === "assignments" ? (
          <AssgPreview roomData={roomData}/>
        ):(
          cntType === "materials" ? (
            <MtlPreview roomData={roomData}/>
          ) : (
            <AnncPreview roomData={roomData}/>
          )
        )
      }

    </>
  )
}
  
export default Preview;    
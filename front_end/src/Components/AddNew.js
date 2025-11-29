import { teaacherPostType } from "./KeyValueObject";
import Select from "react-select";
import AsgForm from "../Utils/AsgForm";
import AncForm from "../Utils/AncForm";
import MtlForm from "../Utils/MtlForm";
import CreateRoomForm from "../Utils/CreateRoomForm";


function AddNew({postType,setPostType,postData,setPostData,courseID,showPost}) {


  return (
    <div className="col-12 col-md-8 col-lg-5">
      {showPost && (
        <Select
          options={teaacherPostType}
          onChange={(seelctedOptions) => setPostType(seelctedOptions.value)}
          value={teaacherPostType.find((p) => p.value === postType)}
          placeholder="Select action type...">

        </Select>
      )}

      <h2 className="text-center mt-4 mb-3">
        {postType === "assignment"
          ? "Create an Assignment"
          : postType === "announcement"
          ? "Post an Announcement"
          : postType === "study materials"
          ? "Upload Study Materials"
          : postType === "create"
          ? "Create a New Virtual Class Room"
          : ""}
      </h2>

      {postType === "assignment" && (
        <AsgForm  />
      )}

      {/* for announcement */}
      {postType === "announcement" && (
        <AncForm/>
      )}

      {/* materials */}
      {postType === "study materials" && (
        <MtlForm/>
      )}

      {postType === "create" && (
        <CreateRoomForm/>
      )}
    </div>
  );
}

export default AddNew;
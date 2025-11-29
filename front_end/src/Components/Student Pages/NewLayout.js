import { Outlet } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";

// function NewLayout() {
//   return (
//       <div className="row">
//         <div className="col-2 col-lg-2">
//           <StudentNavbar />
//         </div>
//         <div className="col-10 col-md-10 col-lg-10 min-vh-100">
//           <Outlet />
//         </div>
//       </div>
//   );
// }

function NewLayout() {
  return (
      <div className="layout">
        <div className="new-sidebar">
          <StudentNavbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
  );
}

export default NewLayout;

export const departmentMap = {
  cse: "Computer Science and Engineering",
  eee: "Electrical and Electronic Engineering",
  bba: "Bachelor of Business Administration",
  law: "Law and Justice",
  ftns: "Food and Nutrional Science",
  ict: "Information and Communication",
  me: "Mechanical Engineer",
};

export const ctSchedule = [
  { title: "All scheduled class test!" },
  { course: "ct-1", date: "2025-08-15" },
  { course: "ct-2", date: "2025-08-15" },
  { course: "ct-3", date: "2025-08-15" },
  { course: "ct-4", date: "2025-08-15" },
];

export const classSchedule = [
  { title: "Today's Full class schedule!" },
  { course: "Software Engineering", date: "2025-08-15" },
  { course: "Algorithm Design", date: "2025-08-15" },
  { course: "Numerical Method", date: "2025-08-15" },
  { course: "Electricity", date: "2025-08-15" },
];

export const scheduleData = [
  {
    name: "day",
    label: "Class Day",
    placeholder: "e.g. Saturday",
    type: "String",
  },
  { name: "room", label: "Room", placeholder: "e.g. 339", type: "String" },
  {
    name: "start",
    label: "Start time",
    placeholder: "e.g. cse3201",
    type: "time",
  },
  {
    name: "end",
    label: "End time",
    placeholder: "e.g. Sazzad khan",
    type: "time",
  },
];

export const gte = ">";

export const subjectMap  = {
  SWE : "Software Engineering",
  CBNM : "Computer Based Numerical Method",
  'SWE Lab' : "Software Engineering Lab",
  MWE : "Multimedia and Web Engineering",
  OS : "Operating System",
  'OS Lab' : "Operating System Lab",
  'RDBMS Lab' : "Relational Database Management System Lab",
  'MWE Lab' : "Multimedia and Web Engineering Lab",
  'RDBMS' : "Relational Database Management System"
  
};



 export const ctPlaceholder = {
    courseID : {
      title : 'Course ID',
      field : 'courseID',
      placeholder : 'e.g.  cse3101',
      type : 'text'
    },
    courseName : {
      title : 'Course Name',
      field : 'courseName',
      placeholder : 'e.g. Software Engineering',
      type : 'text'
    },
    testDate : {
      title : 'CT date',
      field : 'testDate',
      placeholder : 'Enter exam date...',
      type : 'date'
    },
    ctTitle : {
      title : 'CT Title',
      field : 'ctTitle',
      placeholder : 'e.g.  cse swe 01',
      type : 'text'
    }
};


export const department = [
  {value : "cse", label : "Computer Science and Engineering"},
  {value : "eee", label : "Electronic and Electrical Engineering"},
  {value : "ict", label : "Information and Communication Technology"},
  {value : "mech", label : "Mechanical Engineering"},
  {value : "ftns", label : "Food Technology and Nutrional Science"}
];

export const semester = [
  {value : "1", label : "First"},
  {value : "2", label : "Second"},
  {value : "3", label : "Third"},
  {value : "4", label : "Fourth"},
  {value : "5", label : "Fifth"},
  {value : "6", label : "Sixth"},
  {value : "7", label : "Seventh"},
  {value : "8", label : "Eighth"}
];



export const teaacherPostType = [
  {value : "assignment", label : "Assignment"},
  {value : "announcement", label : "Announcement"},
  {value : "study materials", label : "Strudy Materials"},
  {value : "create",label : "Create a new Virtual ClassRoom"}
];
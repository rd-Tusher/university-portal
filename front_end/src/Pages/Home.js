// export default function home(){
//     return(
//         <div className="min-vh-100">
//             <h1 className="text-danger">Welcome to the home page</h1>
//         </div>
//     )
// }


// import React, { useState } from 'react';

// // Sample data to populate the dashboard
// const courses = [
//   { id: 1, name: 'Advanced Algorithms', instructor: 'Dr. Jane Doe', progress: 85, color: 'primary', grade: 'A' },
//   { id: 2, name: 'Database Systems', instructor: 'Prof. John Smith', progress: 75, color: 'success', grade: 'B+' },
//   { id: 3, name: 'Web Development', instructor: 'Ms. Emily White', progress: 90, color: 'warning', grade: 'A-' },
// ];

// const upcomingEvents = [
//   { id: 1, title: 'Algorithms Midterm', date: 'Oct 28', time: '10:00 AM', location: 'Room 301' },
//   { id: 2, title: 'Web Dev Project Due', date: 'Nov 1', time: '11:59 PM', location: 'Online Submission' },
//   { id: 3, title: 'Database Lecture', date: 'Oct 26', time: '2:00 PM', location: 'Zoom' },
// ];

// const quickStats = [
//   { id: 1, label: 'Active Courses', value: '3', color: 'text-primary' },
//   { id: 2, label: 'Average Grade', value: 'A-', color: 'text-success' },
//   { id: 3, label: 'Assignments Due', value: '2', color: 'text-warning' },
// ];

// const announcements = [
//   { id: 1, title: 'Campus Wi-Fi Maintenance', date: 'Oct 25', content: 'Scheduled maintenance from 1 AM to 4 AM.' },
//   { id: 2, title: 'Lecture Hall Change', date: 'Oct 24', content: 'CS101 lecture will be in room 205 this week.' },
// ];

// const weeklySchedule = [
//   { day: 'Monday', time: '9:00 AM', course: 'Database Systems' },
//   { day: 'Wednesday', time: '10:30 AM', course: 'Web Development' },
//   { day: 'Thursday', time: '1:00 PM', course: 'Advanced Algorithms' },
//   { day: 'Friday', time: '9:00 AM', course: 'Web Development' },
// ];

// // Helper components for inline SVG icons
// const BookOpenIcon = ({ className = '' }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 01-9-9V6.75a3.75 3.75 0 017.5 0v1.5a1.5 1.5 0 00-1.5 1.5v6a1.5 1.5 0 001.5 1.5h2.25m-6.75-10.5h9" />
//   </svg>
// );

// const UserCircleIcon = ({ className = '' }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
//   </svg>
// );

// const CalendarDaysIcon = ({ className = '' }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V21a.75.75 0 00.75.75h16.5a.75.75 0 00.75-.75v-2.25M3 12h18M3 9h18m-9 3h.008V12h-.008zM12 9h.008V9h-.008z" />
//   </svg>
// );

// const TrophyIcon = ({ className = '' }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-2.25m-4.664-4.832a.75.75 0 01-.191-.84l.953-2.613a2.25 2.25 0 00-.776-2.553c-.702-.55-1.57-.962-2.502-1.127a.75.75 0 01-.176-1.493l2.646-.529c.772-.154 1.495-.512 2.112-1.013.719-.58 1.411-1.393 2.064-2.27l.184-.249.184.25a1.5 1.5 0 01.378 1.134l.243.692a.75.75 0 00.191.84l-.953 2.613a2.25 2.25 0 00.776 2.553c.702.55 1.57.962 2.502 1.127a.75.75 0 01.176 1.493l-2.646.529c-.772.154-1.495.512-2.112 1.013-.719.58-1.411 1.393-2.064 2.27l-.184.249-.184-.25z" />
//   </svg>
// );

// const SparkleIcon = ({ className = '' }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
//     <path d="M10 12.583L12.928 17l-1.353-4.417L17 12.928L12.583 10L17 7.072l-4.417 1.353L12.928 3L10 7.072L7.072 3L8.425 7.417L3 7.072l4.417 1.353L7.072 12.928L10 12.583z" />
//   </svg>
// );

// const ClockIcon = ({ className = '' }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );

// const DocumentTextIcon = ({ className = '' }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.25m0-4.5V4.5a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 4.5v15a2.25 2.25 0 002.25 2.25h12.75A2.25 2.25 0 0019.5 19.5v-2.25m-9-4.5l-2.25 2.25-2.25-2.25m4.5 0h-4.5" />
//   </svg>
// );

// const PlayCircleIcon = ({ className = '' }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
//   </svg>
// );

// // Progress Circle Component
// const ProgressCircle = ({ progress, color }) => {
//   const radius = 25;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset = circumference - (progress / 100) * circumference;

//   return (
//     <div className="position-relative" style={{ width: '64px', height: '64px' }}>
//       <svg className="w-100 h-100 transform -rotate-90">
//         <circle
//           className="text-light"
//           strokeWidth="6"
//           stroke="currentColor"
//           fill="transparent"
//           r={radius}
//           cx="32"
//           cy="32"
//         />
//         <circle
//           className={`text-${color}`}
//           strokeWidth="6"
//           strokeDasharray={circumference}
//           strokeDashoffset={strokeDashoffset}
//           strokeLinecap="round"
//           stroke="currentColor"
//           fill="transparent"
//           r={radius}
//           cx="32"
//           cy="32"
//         />
//       </svg>
//       <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
//         <span className="h5 fw-bold text-dark">{progress}%</span>
//       </div>
//     </div>
//   );
// };

// // Main App Component
// export default function App() {
//   const [messages, setMessages] = useState([
//     { role: 'model', text: "Hi there! I'm your AI study assistant. I can help with a quick explanation, a topic summary, or even brainstorm ideas for your next assignment." }
//   ]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = { role: 'user', text: input };
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const apiKey = "";
//       const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
//       const payload = {
//         contents: [
//           { role: 'user', parts: [{ text: `You are a helpful and professional student assistant. Respond to the following query: "${input}"` }] },
//         ],
//       };

//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) {
//         throw new Error(`API error: ${response.statusText}`);
//       }

//       const result = await response.json();
//       const modelResponseText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

//       if (modelResponseText) {
//         setMessages(prev => [...prev, { role: 'model', text: modelResponseText }]);
//       } else {
//         setMessages(prev => [...prev, { role: 'model', text: "Sorry, I couldn't generate a response. Please try again." }]);
//       }

//     } catch (error) {
//       console.error('Error fetching data from Gemini API:', error);
//       setMessages(prev => [...prev, { role: 'model', text: "An error occurred. Please check the console for details." }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container-fluid py-5">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
//         body { font-family: 'Inter', sans-serif; }
//         .bg-gradient-purple-indigo {
//           background-image: linear-gradient(to right, #8b5cf6, #6366f1);
//         }
//         .text-gradient-purple-indigo {
//           background-image: linear-gradient(to right, #8b5cf6, #6366f1);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }
//         .card-custom {
//           background-color: rgba(255, 255, 255, 0.2);
//           backdrop-filter: blur(8px);
//           border: 1px solid rgba(255, 255, 255, 0.3);
//           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//         }
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background-color: #d1d5db;
//           border-radius: 9999px;
//         }
//       `}</style>
//       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" xintegrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin="anonymous" />

//       {/* Hero Section */}
//       <header className="d-flex flex-column flex-sm-row align-items-center justify-content-between mb-5">
//         <div className="text-center text-sm-start mb-4 mb-sm-0">
//           <h1 className="display-4 fw-bold text-gradient-purple-indigo">
//             Welcome, Jane Doe!
//           </h1>
//           <p className="lead text-muted mt-2">Your portal to academic success.</p>
//         </div>
//         <div className="d-flex align-items-center">
//           <div className="rounded-circle bg-info-subtle text-info p-2" style={{ width: '64px', height: '64px' }}>
//             <UserCircleIcon className="w-100 h-100" />
//           </div>
//         </div>
//       </header>

//       <main className="row">
//         {/* Main Content Area */}
//         <section className="col-lg-8">
//           <div className="d-flex flex-column gap-4">
//             {/* Quick Actions */}
//             <div className="card card-custom rounded-4 p-4">
//               <div className="card-body">
//                 <h2 className="card-title h4 fw-bold mb-4">Quick Actions</h2>
//                 <div className="row g-3">
//                   <div className="col-4">
//                     <button className="btn btn-outline-primary d-flex flex-column align-items-center justify-content-center w-100 py-4">
//                       <PlayCircleIcon className="mb-2" style={{ width: '40px', height: '40px' }} />
//                       <span className="fw-semibold">Start Quiz</span>
//                     </button>
//                   </div>
//                   <div className="col-4">
//                     <button className="btn btn-outline-success d-flex flex-column align-items-center justify-content-center w-100 py-4">
//                       <DocumentTextIcon className="mb-2" style={{ width: '40px', height: '40px' }} />
//                       <span className="fw-semibold">Submit Homework</span>
//                     </button>
//                   </div>
//                   <div className="col-4">
//                     <button className="btn btn-outline-warning d-flex flex-column align-items-center justify-content-center w-100 py-4">
//                       <TrophyIcon className="mb-2" style={{ width: '40px', height: '40px' }} />
//                       <span className="fw-semibold">View Grades</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Courses Section */}
//             <div className="card card-custom rounded-4 p-4">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <h2 className="card-title h4 fw-bold">Your Courses</h2>
//                   <a href="#" className="text-decoration-none text-primary fw-medium">
//                     View All
//                   </a>
//                 </div>
//                 <div className="row g-3">
//                   {courses.map(course => (
//                     <div key={course.id} className="col-12 col-md-6">
//                       <div className="card bg-light shadow-sm rounded-4 p-3">
//                         <div className="d-flex align-items-center justify-content-between mb-3">
//                           <div className="d-flex align-items-center">
//                             <div className={`p-2 rounded-3 bg-gradient-purple-indigo text-white me-3`}>
//                               <BookOpenIcon style={{ width: '24px', height: '24px' }} />
//                             </div>
//                             <div>
//                               <h3 className="h6 fw-semibold mb-0">{course.name}</h3>
//                               <p className="text-muted small mb-0">{course.instructor}</p>
//                             </div>
//                           </div>
//                           <span className="badge bg-secondary-subtle text-secondary fw-bold">Grade: {course.grade}</span>
//                         </div>
//                         <div className="d-flex align-items-center justify-content-between">
//                           <p className="text-muted small mb-0">Progress</p>
//                           <ProgressCircle progress={course.progress} color={course.color} />
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* AI Study Assistant Card */}
//             <div className="card card-custom rounded-4 p-4 d-flex flex-column" style={{ height: '70vh' }}>
//               <div className="card-body d-flex flex-column h-100">
//                 <h2 className="card-title h4 fw-bold mb-4">AI Study Assistant <span className="text-warning">✨</span></h2>
//                 <div className="flex-grow-1 overflow-auto custom-scrollbar pe-3 mb-4">
//                   {messages.map((msg, index) => (
//                     <div key={index} className={`d-flex align-items-end mb-3 ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
//                       <div className={`p-3 rounded-3 shadow-sm ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-light text-dark'}`} style={{ maxWidth: '80%' }}>
//                         <p className="mb-0">{msg.text}</p>
//                       </div>
//                     </div>
//                   ))}
//                   {isLoading && (
//                     <div className="d-flex justify-content-start align-items-end mb-3">
//                       <div className="p-3 rounded-3 bg-light">
//                         <div className="d-flex gap-1">
//                           <div className="spinner-grow bg-primary" style={{ width: '0.5rem', height: '0.5rem' }} role="status"></div>
//                           <div className="spinner-grow bg-primary" style={{ width: '0.5rem', height: '0.5rem', animationDelay: '0.1s' }} role="status"></div>
//                           <div className="spinner-grow bg-primary" style={{ width: '0.5rem', height: '0.5rem', animationDelay: '0.2s' }} role="status"></div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 <form onSubmit={handleSendMessage} className="d-flex gap-2">
//                   <input
//                     type="text"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     className="form-control form-control-lg rounded-pill"
//                     placeholder="Ask me anything..."
//                   />
//                   <button
//                     type="submit"
//                     className="btn btn-primary rounded-pill d-flex align-items-center justify-content-center"
//                     disabled={isLoading}
//                   >
//                     <SparkleIcon style={{ width: '16px', height: '16px', marginRight: '8px' }} />
//                     <span>Ask</span>
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Sidebar-like Section */}
//         <aside className="col-lg-4 mt-4 mt-lg-0">
//           <div className="d-flex flex-column gap-4">
//             {/* Announcements Card */}
//             <div className="card card-custom rounded-4 p-4">
//               <div className="card-body">
//                 <h2 className="card-title h4 fw-bold mb-4">Announcements</h2>
//                 <div className="list-group list-group-flush">
//                   {announcements.map(announcement => (
//                     <div key={announcement.id} className="list-group-item bg-transparent border-0 py-3">
//                       <div className="d-flex justify-content-between align-items-center mb-1">
//                         <h3 className="h6 fw-semibold mb-0">{announcement.title}</h3>
//                         <span className="text-muted small">{announcement.date}</span>
//                       </div>
//                       <p className="small text-muted">{announcement.content}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Weekly Schedule Card */}
//             <div className="card card-custom rounded-4 p-4">
//               <div className="card-body">
//                 <h2 className="card-title h4 fw-bold mb-4">Weekly Schedule</h2>
//                 <ul className="list-group list-group-flush">
//                   {weeklySchedule.map((item, index) => (
//                     <li key={index} className="list-group-item bg-transparent border-0 py-3">
//                       <div className="d-flex align-items-center">
//                         <div className="text-primary me-3">
//                           <ClockIcon style={{ width: '24px', height: '24px' }} />
//                         </div>
//                         <div>
//                           <p className="fw-semibold mb-0">{item.course}</p>
//                           <p className="small text-muted mb-0">{item.day} at {item.time}</p>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
            
//             {/* Upcoming Events Card */}
//             <div className="card card-custom rounded-4 p-4">
//               <div className="card-body">
//                 <h2 className="card-title h4 fw-bold mb-4">Upcoming Events</h2>
//                 <div className="list-group list-group-flush">
//                   {upcomingEvents.map(event => (
//                     <div key={event.id} className="list-group-item bg-transparent border-0 py-3">
//                       <div className="d-flex align-items-start">
//                         <div className="text-primary me-3">
//                           <CalendarDaysIcon style={{ width: '24px', height: '24px' }} />
//                         </div>
//                         <div>
//                           <h3 className="h6 fw-semibold mb-0">{event.title}</h3>
//                           <p className="small text-muted mb-0">{event.date} at {event.time}</p>
//                           <p className="small text-muted fst-italic mt-1 mb-0">{event.location}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Quick Stats Card */}
//             <div className="card card-custom rounded-4 p-4">
//               <div className="card-body">
//                 <h2 className="card-title h4 fw-bold mb-4">Quick Stats</h2>
//                 <div className="row g-3">
//                   {quickStats.map(stat => (
//                     <div key={stat.id} className="col-6">
//                       <div className="card text-center rounded-4 p-3 bg-light">
//                         <p className={`fs-4 fw-bolder mb-1 ${stat.color}`}>{stat.value}</p>
//                         <p className="text-muted small mb-0">{stat.label}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </aside>
//       </main>

//       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" xintegrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin="anonymous"></script>
//     </div>
//   );
// }

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';

// // Import all components
// import Home from './Admin/Pages/Admin/home/Home.jsx';
// import UsersList from './Admin/Pages/Admin/Action/UsersList.jsx';
// import CreateUser from './Admin/Components/createuser/CreateUser.jsx';
// import UserDetails from './Admin/Components/details/Details.jsx';
// import EditUserPage from './Admin/Pages/Admin/Action/Edit.jsx';
// import CreateStudents from './Admin/Pages/Admin/users/CreateStudents.jsx';
// import CreateSupervisior from './Admin/Pages/Admin/users/CreateSupervisior.jsx';
// import CreateCustomer from './Admin/Pages/Admin/users/CreateCustomer.jsx';
// import IndexStudent from './Admin/Pages/Admin/users/Index-student.jsx';
// import IndexCustomer from './Admin/Pages/Admin/users/Index-customer.jsx';
// import IndexSupervisor from './Admin/Pages/Admin/users/Index-supervisior.jsx';
// import Announcements from './Admin/Pages/Admin/posts/Announcements.jsx';
// import Form from './Admin/Pages/Admin/posts/Form.jsx';
// import Publishing from './Admin/Pages/Admin/posts/Publishing-projects.jsx';
// import TermOfServices from './Admin/Pages/Admin/termofservices/TermOfServices.jsx';
// import Reports from './Admin/Pages/Admin/report/Reports.jsx';
// import WorkGroup from './Admin/Pages/Admin/workgroup/WorkGroup.jsx';
// import CreateWorkGroup from './Admin/Pages/Admin/workgroup/CreateWorkGroup.jsx';
// import EditWorkGroup from './Admin/Pages/Admin/workgroup/EditWorkGroup.jsx';
// import WorkGroupDetails from './Admin/Pages/Admin/workgroup/WorkGroupDetails.jsx';
// import OurCustomer from './Admin/Pages/Admin/ourcustomer/OurCustomer.jsx';
// import Projects from './Admin/Pages/Admin/projects/Projects.jsx';
// import ProjectDetails from './Admin/Pages/Admin/projects/ProjectDetails.jsx';
// import CreateProject from './Admin/Pages/Admin/projects/CreateProject.jsx';
// import ReportDetails from './Admin/Pages/Admin/report/ReportDetails.jsx';
// import AnnouncementsDetails from './Admin/Pages/Admin/posts/AnnouncementsDetails.jsx';
// import PageNotFound from './PageNotFound.jsx'; 
// import EditProject from './Admin/Pages/Admin/projects/EditProject.jsx';
// function App() {
//   return (
//     <div>
//       <Routes>
//         {/* Main routes */}
//         <Route path="/*" element={<Home />} /> {/* Updated here */}
//         <Route path="/home/Home" element={<Home />} />

//         {/* User routes */}
//         <Route path="/Action/UsersList" element={<UsersList />} />
//         <Route path="/createuser/CreateUser" element={<CreateUser />} />
//         <Route path="/details/Details/:id" element={<UserDetails />} />
//         <Route path="/Action/edit/:id" element={<EditUserPage />} />
//         <Route path="/users/CreateStudents/:id" element={<CreateStudents />} />
//         <Route path="/users/CreateSupervisior/:id" element={<CreateSupervisior />} />
//         <Route path="/users/CreateCustomer/:id" element={<CreateCustomer />} />

//         {/* Index routes */}
//         <Route path="/users/student" element={<IndexStudent />} />
//         <Route path="/users/customer" element={<IndexCustomer />} />
//         <Route path="/users/supervisor" element={<IndexSupervisor />} />

//         {/* Posts routes */}
//         <Route path="/posts/Announcements" element={<Announcements />} />
//         <Route path="/posts/AnnouncementsDetails" element={<AnnouncementsDetails />} />
//         <Route path="/posts/Form" element={<Form />} />
//         <Route path="/posts/Publishing-projects" element={<Publishing />} />

//         {/* General routes */}
//         <Route path="/termofservices/TermOfServices" element={<TermOfServices />} />
//         <Route path="/report/Reports" element={<Reports />} />
//         <Route path="/report/ReportDetails/:reportId" element={<ReportDetails />} />

//         {/* Workgroup routes */}
//         <Route path="/workgroup/WorkGroup" element={<WorkGroup />} />
//         <Route path="/workgroup/CreateWorkGroup" element={<CreateWorkGroup />} />
//         <Route path="/workgroup/edit/:id" element={<EditWorkGroup />} />
//         <Route path="/workgroup/workgroupdetails/:id" element={<WorkGroupDetails />} />

//         {/* Customer routes */}
//         <Route path="/ourcustomer/OurCustomer" element={<OurCustomer />} />

//         {/* Projects routes */}
//         <Route path="/projects/Projects" element={<Projects />} />
//         <Route path="/projects/ProjectDetails/:id" element={<ProjectDetails />} />
//         <Route path="/projects/CreateProject/" element={<CreateProject />} />
//         <Route path='projects/EditProject/:id' element={<EditProject/>}/>

  
//         {/* Catch-all route for undefined paths */}
//         <Route path="*" element={<PageNotFound />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;


import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // We will use Outlet to display child routes
import Home from './Admin/Pages/Admin/home/Home.jsx';
import CreateUser from './Admin/Components/createuser/CreateUser.jsx';
import UserDetails from './Admin/Components/details/Details.jsx';
import EditUserPage from './Admin/Pages/Admin/Action/Edit.jsx';
import CreateStudents from './Admin/Pages/Admin/users/CreateStudents.jsx';
import CreateSupervisior from './Admin/Pages/Admin/users/CreateSupervisior.jsx';
import CreateCustomer from './Admin/Pages/Admin/users/CreateCustomer.jsx';
import IndexStudent from './Admin/Pages/Admin/users/Index-student.jsx';
import IndexCustomer from './Admin/Pages/Admin/users/Index-customer.jsx';
import IndexSupervisor from './Admin/Pages/Admin/users/Index-supervisior.jsx';
import Announcements from './Admin/Pages/Admin/posts/Announcements.jsx';
import Form from './Admin/Pages/Admin/posts/Form.jsx';
import Publishing from './Admin/Pages/Admin/posts/Publishing-projects.jsx';
import TermOfServices from './Admin/Pages/Admin/termofservices/TermOfServices.jsx';
import Reports from './Admin/Pages/Admin/report/Reports.jsx';
import WorkGroup from './Admin/Pages/Admin/workgroup/WorkGroup.jsx';
import CreateWorkGroup from './Admin/Pages/Admin/workgroup/CreateWorkGroup.jsx';
import EditWorkGroup from './Admin/Pages/Admin/workgroup/EditWorkGroup.jsx';
import WorkGroupDetails from './Admin/Pages/Admin/workgroup/WorkGroupDetails.jsx';
import OurCustomer from './Admin/Pages/Admin/ourcustomer/OurCustomer.jsx';
import Projects from './Admin/Pages/Admin/projects/Projects.jsx';
import ProjectDetails from './Admin/Pages/Admin/projects/ProjectDetails.jsx';
import CreateProject from './Admin/Pages/Admin/projects/CreateProject.jsx';
import ReportDetails from './Admin/Pages/Admin/report/ReportDetails.jsx';
import AnnouncementsDetails from './Admin/Pages/Admin/posts/AnnouncementsDetails.jsx';
import PageNotFound from './PageNotFound.jsx';
import EditProject from './Admin/Pages/Admin/projects/EditProject.jsx';

// Loaders to fetch data before rendering components
import { fetchUserDetails, fetchProjectDetails, fetchReportDetails, fetchWorkGroupDetails } from './Admin/Components/loader/Loader.js';

const router = createBrowserRouter([
  {
    path: '/admin',
    element: <Home />,
  },
  {
    path: '/createuser/CreateUser',
    element: <CreateUser />,
  },
  {
    path: '/details/Details/:id',
    element: <UserDetails />,
    loader: ({ params }) => fetchUserDetails(params.id),  // Load user details
  },
  {
    path: '/Action/edit/:id',
    element: <EditUserPage />,
    loader: ({ params }) => fetchUserDetails(params.id),  // Load user details for editing
  },
  {
    path: '/users/CreateStudents/:id',
    element: <CreateStudents />,
    loader: ({ params }) => fetchUserDetails(params.id),  // Load student details
  },
  {
    path: '/users/CreateSupervisior/:id',
    element: <CreateSupervisior />,
    loader: ({ params }) => fetchUserDetails(params.id),  // Load supervisor details
  },
  {
    path: '/users/CreateCustomer/:id',
    element: <CreateCustomer />,
    loader: ({ params }) => fetchUserDetails(params.id),  // Load customer details
  },
  {
    path: '/users/student',
    element: <IndexStudent />,
  },
  {
    path: '/users/customer',
    element: <IndexCustomer />,
  },
  {
    path: '/users/supervisor',
    element: <IndexSupervisor />,
  },
  {
    path: '/posts/Announcements',
    element: <Announcements />,
  },
  {
    path: '/posts/AnnouncementsDetails',
    element: <AnnouncementsDetails />,
  },
  {
    path: '/posts/Form',
    element: <Form />,
  },
  {
    path: '/posts/Publishing-projects',
    element: <Publishing />,
  },
  {
    path: '/termofservices/TermOfServices',
    element: <TermOfServices />,
  },
  {
    path: '/report/Reports',
    element: <Reports />,
  },
  {
    path: '/report/ReportDetails/:reportId',
    element: <ReportDetails />,
    loader: ({ params }) => fetchReportDetails(params.reportId),  // Load report details
  },
  {
    path: '/workgroup/WorkGroup',
    element: <WorkGroup />,
  },
  {
    path: '/workgroup/CreateWorkGroup',
    element: <CreateWorkGroup />,
  },
  {
    path: '/workgroup/edit/:id',
    element: <EditWorkGroup />,
    loader: ({ params }) => fetchWorkGroupDetails(params.id),  // Load workgroup details
  },
  {
    path: '/workgroup/workgroupdetails/:id',
    element: <WorkGroupDetails />,
    loader: ({ params }) => fetchWorkGroupDetails(params.id),  // Load workgroup details
  },
  {
    path: '/ourpartner/OurPartner',
    element: <OurCustomer />,
  },
  {
    path: '/projects/Projects',
    element: <Projects />,
  },
  {
    path: '/projects/ProjectDetails/:id',
    element: <ProjectDetails />,
    loader: ({ params }) => fetchProjectDetails(params.id),  // Load project details
  },
  {
    path: '/projects/CreateProject/',
    element: <CreateProject />,
  },
  {
    path: '/projects/EditProject/:id',
    element: <EditProject />,
    loader: ({ params }) => fetchProjectDetails(params.id),  // Load project details for editing
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
  // User Pathes
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {index: true, element:<HomePage />},
      { path: 'signup', element: <SignUpPage /> },
      { path: 'login', element: <LoginPage /> },
      {path: 'workgroups', element: <WorkGroupsPage /> ,children:[
        {index: true, element: <WorkgroupsHome />},
        {path: 'projects', element: <WorkgroupsProjects />},
        {path: 'tasks', element: <WorkgroupsTasks />},
      ]}
    ]
  }
]);
function App(){
  return <RouterProvider router={router} />;
}

export default App;

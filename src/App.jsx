import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Admin/Pages/Admin/home/Home.jsx';
import IndexStudent from './Admin/Pages/Admin/users/Index-student.jsx';
import IndexCustomer from './Admin/Pages/Admin/users/Index-customer.jsx';
import IndexSupervisor from './Admin/Pages/Admin/users/Index-supervisior.jsx';
import TermOfServices from './Admin/Pages/Admin/termofservices/TermOfServices.jsx';
import Reports from './Admin/Pages/Admin/report/Reports.jsx';
import WorkGroup from './Admin/Pages/Admin/workgroup/WorkGroup.jsx';
import EditWorkGroup from './Admin/Pages/Admin/workgroup/EditWorkGroup.jsx';
import WorkGroupDetails from './Admin/Pages/Admin/workgroup/WorkGroupDetails.jsx';
import OurCustomer from './Admin/Pages/Admin/ourpartner/OurPartner.jsx';
import Projects from './Admin/Pages/Admin/projects/Projects.jsx';
import ProjectDetails from './Admin/Pages/Admin/projects/ProjectDetails.jsx';
import CreateProject from './Admin/Pages/Admin/projects/CreateProject.jsx';
import ReportDetails from './Admin/Pages/Admin/report/ReportDetails.jsx';
import PageNotFound from './PageNotFound.jsx';
import EditProject from './Admin/Pages/Admin/projects/EditProject.jsx';
import ContactUsForm from './Admin/Pages/Admin/Contact.jsx';
 import Roles from './Admin/Pages/Admin/roles/Roles.jsx';

//User Pages
import RootLayout from "./Users/pages/Root.jsx";
import SignUpPage from "./Users/pages/Authantication/SignUp.jsx";
import LoginPage from "./Users/pages/Authantication/Login.jsx";
import HomePage from "./Users/pages/Home.jsx";
import WorkGroupsPage from "./Users/pages/workgroupIndex/WorkGroups.jsx";
import WorkgroupsHome from "./Users/pages/workgroupIndex/WorkgroupsHome.jsx";
import WorkgroupsProjects from "./Users/pages/workgroupIndex/WorkgroupsProjects.jsx";
import WorkgroupsTasks from "./Users/pages/workgroupIndex/WorkgroupsTasks.jsx";

// WorkGroup by ID
import WorkgroupRoot from "./Users/pages/workgroupIndex/workgroup/WorkgroupRoot.jsx";
import WorkgroupHome from './Users/pages/workgroupIndex/workgroup/Workgroup.jsx';
import TasksPage from './Users/pages/workgroupIndex/workgroup/tasks.jsx';
// Loaders to fetch data before rendering components
import {fetchProjectDetails, fetchReportDetails, fetchWorkGroupDetails } from './Admin/Components/Loader.js';
// Tanstack Query 
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { Authentication } from './Users/pages/Authantication.jsx';
import { queryClient } from './util/httpsForUser/https.js';

// Routes Configuration
const router = createBrowserRouter([
  {
    path: '/admin',
    element: <Home />,
  },
 
  {
    path: "contact",
    element: <ContactUsForm />, 
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
    loader: ({ params }) => fetchReportDetails(params.reportId),
  },
  {
    path: '/workgroup/WorkGroup',
    element: <WorkGroup />,
  },
  {
    path: '/workgroup/edit/:id',
    element: <EditWorkGroup />,
    loader: ({ params }) => fetchWorkGroupDetails(params.id),
  },
  {
    path: '/workgroup/workgroupdetails/:id',
    element: <WorkGroupDetails />,
    loader: ({ params }) => fetchWorkGroupDetails(params.id),
  },
  {
    path: '/ourcustomer/OurCustomer',
    element: <OurCustomer />,
  },
  {
    path: '/projects/Projects',
    element: <Projects />,
  },
  {
    path: '/projects/:id',
    element: <ProjectDetails />,
    loader: ({ params }) => fetchProjectDetails(params.id),
  },
  {
    path: '/projects/CreateProject/',
    element: <CreateProject />,
  },
  {
    path: '/projects/EditProject/:id',
    element: <EditProject />,
    loader: ({ params }) => fetchProjectDetails(params.id),
  },
  {
    path: '/roles',
    element: <Roles />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: 'login', element: <LoginPage /> },
      // { path: 'logout' ,element: <Logout />},
      { element: <Authentication />, children: [
        {
          path: 'workgroups', element: <WorkGroupsPage />, children: [
            { index: true, element: <WorkgroupsHome /> },
            { path: ':workgroupId', element: <WorkgroupRoot />, children: [
                { index: true, element: <WorkgroupHome /> },
                { path: 'tasks', element: <TasksPage /> }
              ]
            },
            { path: 'projects', element: <WorkgroupsProjects /> },
            { path: 'tasks', element: <WorkgroupsTasks /> },
          ]
        }
      ]}
    ]
  }
]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
export default App;

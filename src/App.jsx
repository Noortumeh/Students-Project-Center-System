// App.jsx

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { QueryClientProvider } from '@tanstack/react-query';
// import { ToastContainer } from 'react-toastify';
// import { queryClient } from './util/httpsForUser/https.js';

// Admin Pages
import Home from './Admin/Pages/Admin/home/Home.jsx';
import IndexStudent from './Admin/Pages/Admin/users/Index-student.jsx';
import EditStudent from './Admin/Pages/Admin/users/EditStudent.jsx';
import IndexCustomer from './Admin/Pages/Admin/users/Index-customer.jsx';
import EditCustomer from './Admin/Pages/Admin/users/EditCustomer.jsx';
import IndexSupervisor from './Admin/Pages/Admin/users/Index-supervisior.jsx';
import EditSupervisor from './Admin/Pages/Admin/users/EditSupervisior.jsx';
import IndexUsers from './Admin/Pages/Admin/users/Index-users.jsx';
import TermOfServices from './Admin/Pages/Admin/termofservices/TermOfServices.jsx';
import Reports from './Admin/Pages/Admin/report/Reports.jsx';
import WorkGroup from './Admin/Pages/Admin/workgroup/WorkGroup.jsx';
import EditWorkGroup from './Admin/Pages/Admin/workgroup/EditWorkGroup.jsx';
import WorkGroupDetails from './Admin/Pages/Admin/workgroup/WorkGroupDetails.jsx';
import OurCustomer from './Admin/Pages/Admin/ourpartner/OurPartner.jsx';
import Projects from './Admin/Pages/Admin/projects/Projects.jsx';
import ProjectDetails from './Admin/Pages/Admin/projects/ProjectDetails.jsx';
import CreateProject from './Admin/Pages/Admin/projects/CreateProject.jsx';
import EditProject from './Admin/Pages/Admin/projects/EditProject.jsx';
import ReportDetails from './Admin/Pages/Admin/report/ReportDetails.jsx';
import ContactUsForm from './Admin/Pages/Admin/Contact.jsx';
import Roles from './Admin/Pages/Admin/roles/Roles.jsx';

import PageNotFound from './PageNotFound.jsx';

// User Pages
import RootLayout from "./Users/pages/Root.jsx";
import SignUpPage from "./Users/pages/Authantication/SignUp.jsx";
import LoginPage from "./Users/pages/Authantication/Login.jsx";
import HomePage from "./Users/pages/Home/Home.jsx";
import WorkGroupsPage from "./Users/pages/workgroupIndex/WorkGroups.jsx";
import WorkgroupsHome from "./Users/pages/workgroupIndex/WorkgroupsHome.jsx";
import WorkgroupsProjects from "./Users/pages/workgroupIndex/WorkgroupsProjects.jsx";
import WorkgroupsTasks from "./Users/pages/workgroupIndex/WorkgroupsTasks.jsx";
import WorkgroupRoot from "./Users/pages/workgroupIndex/workgroup/WorkgroupRoot.jsx";
import WorkgroupHome from './Users/pages/workgroupIndex/workgroup/Workgroup.jsx';
//Task pages
import TasksPage from './Users/pages/workgroupIndex/workgroup/Tasks/Tasks.jsx';
import AddTask from './Users/pages/workgroupIndex/workgroup/Tasks/AddTask.jsx';
import EditTask from './Users/pages/workgroupIndex/workgroup/Tasks/EditTask.jsx';
import ViewTaskDetails from './Users/pages/workgroupIndex/workgroup/Tasks/ViewTaskDetails.jsx';
// 
import ChatPage from './Users/pages/workgroupIndex/workgroup/Chat/Chat.jsx';
import Calendar from './Users/pages/workgroupIndex/workgroup/ScheduleMeeting/ScheduleMeeting.jsx';
// Loaders to fetch data before rendering components
// import { fetchProjectDetails, fetchReportDetails, fetchWorkGroupDetails } from './Admin/Components/Loader.js';
// Tanstack Query 
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { queryClient } from './util/httpsForUser/https.js';
// Authantication pages
import { Authentication } from './Users/pages/Authantication.jsx';
import ForgetPasswordPage from './Users/pages/Authantication/ForgotPassword.jsx';
import ConfirmationComponent from './Users/pages/Authantication/ConfirmationComponent.jsx';
import ResetPasswordPage from './Users/pages/Authantication/ResetPasswordPage.jsx';
import UserProfilePage from './Users/pages/UserProfile/UserProfile.jsx';
import ResetPasswordProfile from './Users/pages/UserProfile/ResetPasswoedProfile.jsx';
import AddMemebersPage from './Users/pages/workgroupIndex/workgroup/WorkgroupMembers/AddMembers.jsx';
// Routes Configuration
const router = createBrowserRouter([
  {
    path: '/admin',
    element: <Home />,
  },
  {
    path: '/contact',
    element: <ContactUsForm />,
  },
  {
    path: '/users/student',
    element: <IndexStudent />,
  },
  {
    path: '/users/student/edit/:id',
    element: <EditStudent />,
  },
  {
    path: '/users/customer',
    element: <IndexCustomer />,
  },
  {
    path: '/users/customer/edit/:id',
    element: <EditCustomer />,
  },
  
  {
    path: '/users/supervisor',
    element: <IndexSupervisor />,
  },
  {
    path: '/users/supervisor/edit/:id',
    element: <EditSupervisor />,
  },

  {
    path: '/users/users',
    element: <IndexUsers />,
  },
  {
    path: '/termofservices',
    element: <TermOfServices />,
  },
  {
    path: '/report',
    element: <Reports />,
  },

  {
    path: '/report/details/:reportId',
    element: <ReportDetails />,
  },
  {
    path: '/workgroup',
    element: <WorkGroup />,
  },
  {
    path: '/workgroup/edit/:id',
    element: <EditWorkGroup />,
  },
  {
    path: '/workgroup/details/:id',
    element: <WorkGroupDetails />,
  },
  {
    path: '/ourcustomer',
    element: <OurCustomer />,
  },
  {
    path: '/projects',
    element: <Projects />,
  },
  {
    path: '/projects/:projectId',
    element: <ProjectDetails />,
  },
  {
    path: '/projects/CreateProject',
    element: <CreateProject />,
  },
  {
    path: '/projects/EditProject/:projectid',
    element: <EditProject />,
  },
  {
    path: '/roles',
    element: <Roles />,
  },

  {
    path: '*',
    element: <PageNotFound />,
  },
  //* Users Routes
  // confirm email path
  { path: 'confirm-email', element: (<ConfirmationComponent />) },
  // Authantications pathes
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'forgot-password', element: <ForgetPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
      { path: 'user-profile', element: <UserProfilePage /> },
      { path: 'user-profile/reset-password', element: <ResetPasswordProfile /> },

      {
        element: <Authentication />, children: [
          {
            path: 'workgroups', element: <WorkGroupsPage />, children: [
              { index: true, element: <WorkgroupsHome /> },
              {
                path: ':workgroupId', element: <WorkgroupRoot />, children: [
                  { index: true, element: <WorkgroupHome /> },
                  { path: 'addmembers', element: <AddMemebersPage /> },
                  { path: 'tasks', element: <TasksPage /> },
                  { path: 'tasks/addtask', element: <AddTask /> },
                  { path: 'tasks/edittask/:taskid', element: <EditTask /> },
                  { path: 'tasks/viewtask/:taskid', element: <ViewTaskDetails /> },
                  { path: 'chat', element: <ChatPage /> },
                  { path: 'calendar', element: <Calendar /> }
                ]
              },
              { path: 'projects', element: <WorkgroupsProjects /> },
              { path: 'alltasks', element: <WorkgroupsTasks /> },
              { path: 'edittask/:taskid', element: <EditTask /> },
              { path: 'viewtask/:taskid', element: <ViewTaskDetails /> },
            ]
          }
        ]
      }
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

// App.jsx

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { QueryClientProvider } from '@tanstack/react-query';
// import { ToastContainer } from 'react-toastify';
// import { queryClient } from './util/httpsForUser/https.js';

// Admin Pages
import Home from './Admin/Pages/Admin/home/Home.jsx';
import IndexStudent from './Admin/Pages/Admin/users/Index-student.jsx';
import IndexCustomer from './Admin/Pages/Admin/users/Index-customer.jsx';
import IndexSupervisor from './Admin/Pages/Admin/users/Index-supervisior.jsx';
import IndexUsers from './Admin/Pages/Admin/users/Index-users.jsx';
import TermOfServices from './Admin/Pages/Admin/termofservices/TermOfServices.jsx';
import WorkGroup from './Admin/Pages/Admin/workgroup/WorkGroup.jsx';
import Projects from './Admin/Pages/Admin/projects/Projects.jsx';
import ProjectDetails from './Admin/Pages/Admin/projects/ProjectDetails.jsx';
import CreateProject from './Admin/Pages/Admin/projects/CreateProject.jsx';
import EditProject from './Admin/Pages/Admin/projects/EditProject.jsx';
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
import ContactUsForm from './Users/pages/Home/Contact.jsx';
import ProjectsRoot from './Users/pages/workgroupIndex/ProjectsRoot.jsx';
import ProjectDetailsWork from './Users/pages/workgroupIndex/Projects/ProjectDetails.jsx';
import HelpPage from './Users/pages/workgroupIndex/HelpPage.jsx';
import TermsOfServicePage from './Users/pages/Home/TermsOfServices.jsx';
// Routes Configuration
const router = createBrowserRouter([
  
  {
    path: '/admin',
    element: <Home />,
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
    path: '/users/users',
    element: <IndexUsers />,
  },
  
  {
    path: '/termofservices',
    element: <TermOfServices />,
  },

  {
    path: '/workgroup',
    element: <WorkGroup />,
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
      { path: '/contact', element: <ContactUsForm /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'forgot-password', element: <ForgetPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
      // { path: 'user-profile', element: <UserProfilePage /> },
      { path: 'user-profile/reset-password', element: <ResetPasswordProfile /> },
      { path: '/term', element: <TermsOfServicePage />},
      {
        element: <Authentication />, children: [
          { path: 'user-profile', element: <UserProfilePage /> },
          {
            path: 'workgroups', element: <WorkGroupsPage />, children: [
              { index: true, element: <WorkgroupsHome /> },
              { path: 'help', element: <HelpPage />},
              {
                path: ':workgroupId', element: <WorkgroupRoot />, children: [
                  { index: true, element: <WorkgroupHome /> },
                  { path: 'help', element: <HelpPage />},
                  { path: 'addmembers', element: <AddMemebersPage /> },
                  { path: 'tasks', element: <TasksPage /> },
                  { path: 'tasks/addtask', element: <AddTask /> },
                  { path: 'tasks/edittask/:taskid', element: <EditTask /> },
                  { path: 'tasks/viewtask/:taskid', element: <ViewTaskDetails /> },
                  { path: 'chat', element: <ChatPage /> },
                  { path: 'calendar', element: <Calendar /> }
                ]
              },
              {
                path: 'projects', element: <ProjectsRoot />, children: [
                  { index: true, element: <WorkgroupsProjects /> },
                  { path: ':projectId', element: <ProjectDetailsWork /> },
                ]
              },
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

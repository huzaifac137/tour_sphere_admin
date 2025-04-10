import { lazy } from 'react';


const Profile = lazy(() => import('../pages/Profile'));

const Users = lazy(() => import('../pages/Users/Users.tsx'));
const AddAdmin = lazy(() => import('../pages/Admins/AddAdmin.tsx'));
const EditAdmin = lazy(() => import('../pages/Admins/EditAdmin.tsx'));
const UserDetails = lazy(() => import('../pages/Users/UserDetails.tsx'));
const SubAdmins = lazy(()=> import('../pages/SubAdmins/SubAdmins.tsx'));
const CreateSubAdmins = lazy(()=> import('../pages/SubAdmins/CreateSubAdmin.tsx'));
const NewTourRequests = lazy(()=> import('../pages/NewTourRequests/NewTourRequests.tsx')); 
const NewTourDetails = lazy(()=> import('../pages/NewTourRequests/NewTourDetails.tsx')); 
const EditTourRequests = lazy(()=> import('../pages/EditTourRequests/EditTourRequests.tsx'));
const EditTourDetails = lazy(()=> import('../pages/EditTourRequests/EditTourDetails.tsx'));
const coreRoutes = [
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/users',
    title: 'Users',
    component: Users,
    
  },
  {
    path: '/user/:userId',
    title: 'User Details',
    component: UserDetails,
    
  },
  {
    path : '/admins',
    title: 'Admins',
    component: SubAdmins,
  },
  {
    path : '/admins/register',
    title: 'Register Admin',
    component: CreateSubAdmins,
  },
  {
    path: '/registeradmin',
    title: 'Register Admin',
    component: AddAdmin,
    
  },
  {
    path: '/new-tour-requests',
    title: 'New Tour Requests',
    component: NewTourRequests,
    
  },
  {
    path: '/new-tour-requests/:id',
    title: 'New Tour Details',
    component: NewTourDetails,
    
  },
  {
    path: '/edit-tour-requests',
    title: 'Edit Tour Requests',
    component: EditTourRequests,
    
  },
  {
    path: '/edit-tour-requests/:id',
    title: 'Edit Tour Details',
    component: EditTourDetails,
    
  },
];

const routes = [...coreRoutes];
export default routes;

import { ACCOUNT_TYPE } from "../utilities/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
    type: "ALL",

  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscMortarBoard",  
  },
  {
    id: 6,
    name: "Cart",
    path: "/dashboard/cart",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscArchive",
  }
  // {
  //   id: 7,
  //   name: "Courses",
  //   path: "/dashboard/Courses",
  //   type: ACCOUNT_TYPE.STUDENT,
  //   icon: "VscVmActive",
  // }
  
];

export const additionalLinks = [
  {
    id: 8,
    name: "Settings",
    path: "/dashboard/settings",
    type: "ALL",
    icon: "VscSettingsGear",
  },
  {
    id: 9,
    name: "Logout",
    path: "/",
    type: "ALL",
    icon: "VscSignOut",
  },

]

import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';


export const SidebarData = [
  {
    title: 'Homepage',
    path: '/homepage',
    icon: <AiIcons.AiFillHome />,   
  },
  {
    title: 'User Settings',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Add User',
        path: '/adduserpage',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Delete User',
        path: '/overview/revenue',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Quiz Settings',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Add Quiz',
        path: '/addquizpage',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Delete Quiz',
        path: '/deletequizpage',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Analytics',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Usage Report',
        path: '/reports/usage',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Ovarall Report',
        path: '/reports/overall',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Student Report',
        path: '/reports/student',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Log Out',
    path: '/',
    icon: <IoIcons.IoMdHelpCircle />
  }
];
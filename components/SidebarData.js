import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faFile,
  faUserTimes,
} from '@fortawesome/free-solid-svg-icons';

export const SidebarData = [
  {
    title: 'Home',
    path: '',
    icon: <FontAwesomeIcon icon={faHome} />,
    cName: 'nav-text',
  },
  {
    title: 'Lista Zakupów',
    path: 'ShopList',
    icon: <FontAwesomeIcon icon={faFile} />,
    cName: 'nav-text',
  },
  {
    title: 'Zaktualizuj Profil',
    path: 'UpdateProfile',
    icon: <FontAwesomeIcon icon={faUser} />,
    cName: 'nav-text',
  },
  {
    title: 'Wyloguj',
    path: '/Dashboard',
    icon: <FontAwesomeIcon icon={faUserTimes} />,
    cName: 'nav-text',
  },
];

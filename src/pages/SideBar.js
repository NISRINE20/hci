import React from 'react';
import {
  SidebarContainer,
  Logo,
  SectionTitle,
  SidebarLinkWrapper,
  SidebarLinkText,
  SidebarLink,
} from '../Designs/SideBarDesign';

import logo from '../Assets/logo.png';

// Font Awesome icons via react-icons
import {
  FaBullhorn,
  FaUsers,
  FaCalendarAlt,
  FaRunning,
  FaSignOutAlt,
} from 'react-icons/fa';

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Logo to="/home">
        <img src={logo} alt="Logo" />
      </Logo>

      <SectionTitle to="/home">ADMIN</SectionTitle>

      <SidebarLink to="/announcement">
        <SidebarLinkWrapper>
          <FaBullhorn />
          <SidebarLinkText>Announcement</SidebarLinkText>
        </SidebarLinkWrapper>
      </SidebarLink>

      <SidebarLink to="/department">
        <SidebarLinkWrapper>
          <FaUsers />
          <SidebarLinkText>Department/Program</SidebarLinkText>
        </SidebarLinkWrapper>
      </SidebarLink>



      <SidebarLink
        to="/"
        onClick={() => {
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('role');
        }}
      >
        <SidebarLinkWrapper>
          <FaSignOutAlt />
          <SidebarLinkText>Log Out</SidebarLinkText>
        </SidebarLinkWrapper>
      </SidebarLink>
    </SidebarContainer>
  );
};

export default Sidebar;

import React from 'react';
import Sidebar from './SideBar';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Sidebar />
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </LayoutWrapper>
  );
};

export default Layout;

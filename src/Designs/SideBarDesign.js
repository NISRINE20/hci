import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SidebarContainer = styled.div`
  background-color:rgb(251, 242, 242); /* Change background to white */
  color: #960706; /* Change text color to #960706 */
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Logo = styled(Link)`
  display: block;
  width: 100%;
  margin-bottom: 20px;
  text-align: center;

  img {
    width: 150px;
    height: auto;
  }
`;

export const SectionTitle = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  color: #960706; /* Change section title color to #960706 */
  margin: 20px 0;
`;

export const SidebarLink = styled(Link)`
  text-decoration: none;
  color: #960706; /* Change link text color to #960706 */
  width: 100%;
  margin: 10px 0;

  &:hover {
    color: darkred; /* Optional: Darker red on hover */
  }

  &.active {
    font-weight: bold;
    color: #4caf50;
  }
`;

export const SidebarLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  border-radius: 5px;

  &:hover {
    background-color: #f8f8f8; /* Optional: Light gray hover effect */
  }
`;

export const SidebarLinkText = styled.span`
  font-size: 1.2rem;
  margin-left: 10px;
  color: #960706; /* Change text inside links to #960706 */
`;

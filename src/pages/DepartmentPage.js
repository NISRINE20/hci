import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Sidebar from './SideBar'; // Import the Sidebar component

// Import your department images here
import businessLogo from '../Assets/business.png';
import engineeringLogo from '../Assets/engineering.png';
import hospitalityLogo from '../Assets/hospitality.png';
import maritimeLogo from '../Assets/maritime.png';
import criminologyLogo from '../Assets/criminology.png';
import humanitiesLogo from '../Assets/humanities.png';
import teacherLogo from '../Assets/teacher.png';
import graduateLogo from '../Assets/graduate.png';

const departments = [
  {
    id: 7,
    name: 'School of Business and Management Education',
    logo: businessLogo,
  },
  {
    id: 1,
    name: 'College of Engineering and Technology',
    logo: engineeringLogo,
  },
  {
    id: 3,
    name: 'School of Teacher Education',
    logo: teacherLogo,
  },
  {
    id: 2,
    name: 'College of Maritime Education',
    logo: maritimeLogo,
  },
  {
    id: 5,
    name: 'College of Criminal Justice Education',
    logo: criminologyLogo,
  },
  {
    id: 6,
    name: 'College of Humanities, Social Sciences and Communication',
    logo: humanitiesLogo,
  },
  {
    id: 4,
    name: 'College of Hospitality and Tourism Management Education',
    logo: hospitalityLogo,
  },
  {
    id: 8,
    name: 'Graduate School',
    logo: graduateLogo,
  },
];

function DepartmentPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCardClick = (dept) => {
    setSelectedDept(dept);
    setModalOpen(true);
    setLoading(true);
    // Fetch announcements for this department using the correct id
    fetch(`https://vynceianoani.helioho.st/hci/programpost.php?program_id=${dept.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAnnouncements(data.posts);
        } else {
          setAnnouncements([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setAnnouncements([]);
        setLoading(false);
      });
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDept(null);
    setAnnouncements([]);
  };

  return (
    <PageContainer>
      <Sidebar /> {/* Add the Sidebar component */}
      <Wrapper>
        <Title>Departments</Title>
        <CardGrid>
          {departments.map((dept) => (
            <Card key={dept.id} onClick={() => handleCardClick(dept)}>
              <Image src={dept.logo} alt={dept.name} />
              <LinkText as="div">{dept.name}</LinkText>
            </Card>
          ))}
        </CardGrid>
      </Wrapper>
      {modalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <h2>{selectedDept?.name} Announcements</h2>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
              {loading ? (
                <p>Loading...</p>
              ) : announcements.length === 0 ? (
                <p>No announcements found.</p>
              ) : (
                announcements.map((post) => (
                  <Announcement key={post.id}>
                    <h3>{post.title}</h3>
                    <p style={{ color: '#555', marginBottom: 8 }}>{post.content}</p>
                    <small style={{ color: '#888' }}>
                      Posted: {new Date(post.created_at).toLocaleString()}
                    </small>
                    {post.images && post.images.length > 0 && (
                      <ImageGrid>
                        {post.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={`data:image/jpeg;base64,${img}`}
                            alt={`Announcement ${idx + 1}`}
                            style={{
                              width: '80px',
                              height: '80px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                              margin: '4px',
                            }}
                          />
                        ))}
                      </ImageGrid>
                    )}
                  </Announcement>
                ))
              )}
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
}

export default DepartmentPage;

// Styled components
const PageContainer = styled.div`
  display: flex; /* Align the sidebar and content side by side */
  min-height: 100vh; /* Ensure the container spans the full height of the viewport */
`;

const Wrapper = styled.div`
  padding: 30px;
  background: linear-gradient(to bottom, #cdffd8, #168bde); /* Apply gradient background */
  flex: 1; /* Allow the content to take the remaining space */
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  font-size: 36px;
  color: #333;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 columns */
  grid-template-rows: repeat(2, auto); /* 2 rows */
  gap: 30px; /* Spacing between cards */
  justify-items: center; /* Center cards horizontally */
  align-items: center; /* Center cards vertically */
  height: auto; /* Remove fixed height to prevent scrolling */
  overflow: hidden; /* Ensure no scrolling occurs */
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 250px; /* Fixed width for the card */
  height: 300px; /* Fixed height for the card */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Space out content vertically */
  align-items: center; /* Center content horizontally */

  &:hover {
    transform: translateY(-5px); /* Slight lift on hover */
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
  }
`;

const Image = styled.img`
  width: 170px;
  height: 170px;
  object-fit: contain;
  margin-bottom: 20px;
  align-self: center; /* Center the image */
`;

const LinkText = styled(Link)`
  text-decoration: none;
  font-size: 18px;
  color: #007BFF;
  display: block;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 12px;
  width: 600px;
  max-width: 95vw;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  padding: 24px;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  margin-bottom: 16px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: #888;
  cursor: pointer;
`;

const ModalBody = styled.div`
  padding: 8px 0;
`;

const Announcement = styled.div`
  border-bottom: 1px solid #eee;
  padding: 12px 0;
  margin-bottom: 8px;
`;

const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
`;
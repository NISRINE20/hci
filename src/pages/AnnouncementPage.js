import React, { useEffect, useRef, useState } from 'react';
import Layout from './Layout';
import {
  AnnounceHeader,
  AnnounceContent,
  AddButton,
  AddButtonContainer,
  CardScrollWrapper,
  CardHolderContainer,
  ArrowButton,
  AnnouncementCard,
} from '../Designs/AnnouncePageDesign';
import '../CSS/ModalStyles.css';

const AnnouncementPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    media: null,
    program: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null); // <-- Add this line
  const [loading, setLoading] = useState(true); // Add loading state

  const [activeCardBackground, setActiveCardBackground] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const cardsPerPage = 2; // Show only 2 cards at a time
  const totalPages = Math.ceil(notifications.length / cardsPerPage);

  const [currentScrollIndex, setCurrentScrollIndex] = useState(0);

  // Refs for drag-to-scroll
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollAmount = currentScrollIndex * scrollRef.current.offsetWidth; // Calculate scroll amount
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth', // Smooth scrolling
      });
    }
  }, [currentScrollIndex]);

  useEffect(() => {
    setLoading(true); // Start loading
    fetch('https://vynceianoani.helioho.st/hci/getNotif.php')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const posts = data.posts.map((post) => ({
            id: post.id,
            title: post.title,
            description: post.content,
            program: post.target_program,
            createdAt: post.created_at,
            postedBy: post.posted_by,
            images: post.images.map((image) => `data:image/jpeg;base64,${image}`), // Convert base64 to usable image format
          }));
          setNotifications(posts);
        } else {
          console.error('Failed to fetch posts:', data.content);
        }
        setLoading(false); // Stop loading after fetch
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
        setLoading(false); // Stop loading on error
      });
  }, []);

  useEffect(() => {
    // Fetch programs
    fetch('https://vynceianoani.helioho.st/hci/get_programs.php')
      .then((response) => response.json())
      .then((data) => setPrograms(data))
      .catch((error) => console.error('Error fetching programs:', error));
  }, []);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Adjust scrolling speed
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleDotClick = (index) => {
    const scrollAmount = 320 * cardsPerPage * index;
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
    setActiveIndex(index);

    // Update the background based on the first image of the active card
    const activeCard = notifications[index * cardsPerPage];
    if (activeCard && activeCard.images && activeCard.images.length > 0) {
      setActiveCardBackground(activeCard.images[0]); // Use the first image as the background
    } else {
      setActiveCardBackground(''); // Reset background if no images
    }
  };

  const handleArrowClick = (direction) => {
    let newIndex = activeIndex;
    if (direction === 'prev') {
      newIndex = Math.max(activeIndex - 1, 0);
    } else {
      newIndex = Math.min(activeIndex + 1, totalPages - 1);
    }
    handleDotClick(newIndex);
  };

  const handlePost = () => {
    if (!formData.title || !formData.description) {
      alert('Title and description are required.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('content', formData.description);
    formDataToSend.append('program', parseInt(formData.program, 10) || 1);
    formDataToSend.append('posted_by', 1);

    // Append all selected images
    if (formData.media) {
      Array.from(formData.media).forEach((file) => {
        formDataToSend.append('image[]', file);
      });
    }

    fetch('https://vynceianoani.helioho.st/hci/upload.php', {
      method: 'POST',
      body: formDataToSend,
    })
      .then(async (response) => {
        const text = await response.text();
        console.log('Server Response:', text);
        return JSON.parse(text);
      })
      .then((data) => {
        if (data.success) {
          alert('Post added successfully!');
          setNotifications((prev) => [
            ...prev,
            {
              id: data.id,
              title: formData.title,
              description: formData.description,
              program: formData.program,
              createdAt: new Date().toISOString(),
              postedBy: 1,
              images: [], // Images will be fetched separately
            },
          ]);
          setIsModalOpen(false);
          setFormData({ title: '', description: '', media: null, program: '' });
        } else {
          alert(data.content || 'Failed to add post.');
        }
      })
      .catch((error) => console.error('Error posting data:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMediaChange = (e) => {
    setFormData((prev) => ({ ...prev, media: e.target.files }));
  };

  return (
    <Layout>
      <AnnounceContent>
        <AnnounceHeader>Mabuhay ug Madayaw!</AnnounceHeader>
        <AddButtonContainer>
          <AddButton onClick={() => setIsModalOpen(true)}>+</AddButton>
        </AddButtonContainer>

        {/* Loading Text */}
        {loading ? (
          <div style={{ marginTop: 40, fontSize: 22, color: '#168bde', fontWeight: 'bold' }}>
            Loading announcements...
          </div>
        ) : (
          <>
            {/* Post Details Modal */}
            {selectedPost && (
              <div
                className="modal-overlay"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0,0,0,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2000,
                }}
                onClick={() => setSelectedPost(null)}
              >
                <div
                  className="modal-content"
                  style={{
                    background: '#fff',
                    borderRadius: 12,
                    padding: 30,
                    maxWidth: 600,
                    width: '90%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    position: 'relative',
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedPost(null)}
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      background: 'none',
                      border: 'none',
                      fontSize: 28,
                      cursor: 'pointer',
                      color: '#888',
                    }}
                  >
                    &times;
                  </button>
                  <h2 style={{ marginTop: 0 }}>{selectedPost.title}</h2>
                  <p style={{ color: '#555' }}>{selectedPost.description}</p>
                  <p style={{ color: '#888', fontSize: 14 }}>
                    Assigned Department: {selectedPost.program || 'General'}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {selectedPost.images && selectedPost.images.length > 0 ? (
                      selectedPost.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`Image ${idx + 1}`}
                          style={{
                            width: 120,
                            height: 120,
                            objectFit: 'cover',
                            borderRadius: 8,
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            setSelectedImage(img);
                            setIsImageModalOpen(true);
                          }}
                        />
                      ))
                    ) : (
                      <p style={{ color: '#aaa' }}>No images available</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Modal */}
            {isModalOpen && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <div className="modal-header">
                    <h2>Write an Announcement</h2>
                    <button className="close-button" onClick={() => setIsModalOpen(false)}>
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter title"
                      style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '15px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        boxSizing: 'border-box',
                      }}
                    />
                    <label>Caption/Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter caption or description"
                      maxLength="500"
                      style={{
                        width: '100%',
                        height: '100px',
                        padding: '10px',
                        marginBottom: '15px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        resize: 'vertical',
                        boxSizing: 'border-box',
                      }}
                    />
                    <label>Program</label>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '15px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        boxSizing: 'border-box',
                      }}
                    >
                      <option value="">Select a program</option>
                      {programs.map((program) => (
                        <option key={program.id} value={program.id}>
                          {program.name}
                        </option>
                      ))}
                    </select>
                    <label>Media (Image/Video)</label>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      onChange={handleMediaChange}
                      style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '15px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div className="modal-footer">
                    <button className="post-button" onClick={handlePost}>
                      Post
                    </button>
                    <button className="cancel-button" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Image Modal */}
            {isImageModalOpen && (
              <div
                className="image-modal-overlay"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1000,
                }}
                onClick={() => setIsImageModalOpen(false)} // Close modal on overlay click
              >
                <div
                  className="image-modal-content"
                  style={{
                    position: 'relative',
                    maxWidth: '90%',
                    maxHeight: '90%',
                  }}
                >
                  <img
                    src={selectedImage}
                    alt="Full-size"
                    style={{
                      width: '500px',         // Fixed width
                      height: '400px',
                      objectFit: 'contain',
                      borderRadius: '8px',
                    }}
                  />
                  <button
                    onClick={() => setIsImageModalOpen(false)}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#fff',
                      fontSize: '24px',
                      cursor: 'pointer',
                    }}
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
            {/* CardHolder */}
            <CardHolderContainer>
              {notifications.length > cardsPerPage && (
                <ArrowButton onClick={() => handleArrowClick('prev')}>&#8249;</ArrowButton>
              )}
              <CardScrollWrapper
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                style={{
                  cursor: isDragging.current ? 'grabbing' : 'grab',
                }}
              >
                {notifications.map((notification, index) => (
                  <AnnouncementCard
                    key={index}
                    onClick={() => setSelectedPost(notification)} // <-- Make card clickable
                    style={{
                      flex: `0 0 48%`,
                      maxWidth: '48%',
                      minWidth: '48%',
                      height: '600px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '30px',
                      border: '1px solid #ddd',
                      borderRadius: '16px',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.18)',
                      backgroundColor: '#fff',
                      overflow: 'hidden',
                      margin: '1%',
                      cursor: 'pointer', // Indicate clickable
                    }}
                  >
                    {/* Title */}
                    <h3
                      style={{
                        margin: '0 0 20px 0',
                        fontSize: '28px',
                        fontWeight: 'bold',
                        color: '#333',
                        textAlign: 'left',
                        width: '100%',
                      }}
                    >
                      {notification.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        margin: '0 0 20px 0',
                        fontSize: '18px',
                        color: '#555',
                        textAlign: 'left',
                        width: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                        maxHeight: '120px',
                        overflowY: 'auto',
                      }}
                    >
                      {notification.description}
                    </p>

                    {/* Assigned Department */}
                    <p
                      style={{
                        fontSize: '16px',
                        color: '#888',
                        textAlign: 'left',
                        marginBottom: '20px',
                        width: '100%',
                      }}
                    >
                      Assigned Department: {notification.program || 'General'}
                    </p>

                    {/* Images */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)', // 2 images per row for bigger cards
                        gap: '12px',
                        width: '100%',
                      }}
                    >
                      {notification.images && notification.images.length > 0 ? (
                        <>
                          {notification.images.slice(0, 4).map((image, idx) => (
                            <img
                              key={idx}
                              src={image}
                              alt={`Image ${idx + 1}`}
                              draggable="false"
                              style={{
                                width: '100%',
                                height: '180px',
                                objectFit: 'cover',
                                borderRadius: '10px',
                                cursor: 'pointer',
                              }}
                              onClick={e => {
                                e.stopPropagation();
                                setSelectedImage(image);
                                setIsImageModalOpen(true);
                              }}
                            />
                          ))}
                          {notification.images.length > 4 && (
                            <div
                              style={{
                                width: '100%',
                                height: '180px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '10px',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#555',
                                cursor: 'pointer',
                              }}
                              onClick={e => {
                                e.stopPropagation();
                                setSelectedPost(notification);
                              }}
                            >
                              +{notification.images.length - 4}
                            </div>
                          )}
                        </>
                      ) : (
                        <p
                          style={{
                            fontSize: '14px',
                            color: '#aaa',
                            textAlign: 'left',
                            width: '100%',
                          }}
                        >
                          No images available
                        </p>
                      )}
                    </div>
                  </AnnouncementCard>
                ))}
              </CardScrollWrapper>
              {notifications.length > cardsPerPage && (
                <ArrowButton onClick={() => handleArrowClick('next')}>&#8250;</ArrowButton>
              )}
            </CardHolderContainer>
          </>
        )}
      </AnnounceContent>
    </Layout>
  );
};

export default AnnouncementPage;
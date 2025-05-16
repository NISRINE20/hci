import styled, { keyframes, css } from 'styled-components';

export const AnnounceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(to bottom, #cdffd8, #168bde); /* Apply gradient background */
`;
const slideIn = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  50% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;


export const AnnounceContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  min-height: 100vh;
background: linear-gradient(to bottom, #cdffd8, #168bde); /* Match DepartmentPage gradient */ `;

export const AnnounceHeader = styled.h1`
  font-size: 50px;
  margin-bottom: 1px;
  color: #333;
  font-family: 'Georgia', 'Times New Roman', serif; /* Changed to a more formal font */
  text-align: center; /* Optional: Center the text */
`;

export const AddButtonContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 20;
`;

export const AddButton = styled.button`
  background-color: #fff; /* Change button background to white */
  color: #168bde; /* Change the plus sign color to blue */
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 32px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #f0f0f0; /* Optional: Light gray background on hover */
  }
`;

export const AnnouncementCard = styled.div`
  flex: 0 0 auto;
  width: 170px;              // Reduced width
  background: #fff;
  border-radius: 12px;
  padding: 10px;             // Reduced padding
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }
`;

export const CardMessage = styled.p`
  margin: 0;
  color: #555;
  font-size: 16px;
`;

export const CardDate = styled.p`
  margin: 0;
  font-size: 14px;
  color: #888;
`;

export const CardProgram = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;
export const CardHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 80px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const CardForm = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CardInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
`;

export const CardTextarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  resize: none;
`;

export const CardButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  background-color: ${(props) => (props.cancel ? '#ccc' : '#007BFF')};
  color: ${(props) => (props.cancel ? '#000' : '#fff')};

  &:hover {
    background-color: ${(props) => (props.cancel ? '#bbb' : '#0056b3')};
  }`;

export const CardScrollWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 20px;
  gap: 20px;
  max-width: 1300px;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    background-color: #333;
  }
  50% {
    transform: scale(1.2);
    background-color: #555;
  }
  100% {
    transform: scale(1);
    background-color: #333;
  }
`;

export const Dot = styled.div`
  width: 12px;
  height: 12px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? '#333' : '#ccc')};
  transition: background-color 0.3s ease;
  cursor: pointer;

  ${(props) =>
    props.active &&
    css`
      animation: ${pulse} 1s infinite; /* Apply pulsing animation to active dot */
    `}

  &:hover {
    background-color: #555;
  }
`;

export const CardHolderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 90%;
  max-width: 1500px;
  margin: 60px 0;
`;

export const ArrowButton = styled.button`
  background-color: #00bcd4;
  color: #fff;
  border: none;
  padding: 8px 14px;
  margin: 0 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  transition: background 0.3s ease;
  &:hover {
    background-color: #0097a7;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 30px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;

  h2 {
    font-size: 24px;
    color: #333;
    margin: 0;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #888;

    &:hover {
      color: #333;
    }
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  label {
    font-size: 14px;
    color: #555;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    box-sizing: border-box;
  }

  textarea {
    resize: vertical;
    height: 100px;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  .post-button {
    background-color: #168bde;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background-color: #0d6fb8;
    }
  }

  .cancel-button {
    background-color: #ccc;
    color: #333;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background-color: #bbb;
    }
  }
`;



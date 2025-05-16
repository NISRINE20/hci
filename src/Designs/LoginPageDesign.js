import styled from 'styled-components';

export const RedirectText = styled.p`
  margin-top: 15px;
  text-align: center;

  a {
    color: #007bff;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      color: #0056b3;
    }
  }
`;

export const Select = styled.select`
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* Gradient background: red to dark blue */
  background: linear-gradient(135deg, #e53935 0%, #23395d 100%);
`;

export const Form = styled.form`
  background: #fff;
  padding: 40px 32px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.13);
  width: 400px; /* Increased width */
  max-width: 90vw;
  text-align: center;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

export const InputGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #555;
  display: block;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

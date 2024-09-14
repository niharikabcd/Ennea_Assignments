import styled from 'styled-components';

export const StyledButton = styled.button`
  background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#000')};
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  border: none;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0px 2px 4px ${({theme}) => (theme ==='light' ? '#fff': '#000')};
  border-radius: 10px;
`;

export const ContentWrapper = styled.div`
  background-color: ${({ theme }) => (theme === 'light' ? '#f0f0f0' : '#222')};
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius:20px;
  box-shadow: 0px 2px 4px ${({theme}) => (theme ==='light' ? '#fff': '#000')}
`;
export const Xyput=styled.div`
  background-color: ${({ theme }) => (theme === 'light' ? '#f0f0f0' : '#222')};
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  min-height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius:20px;
  box-shadow: 0px 2px 4px ${({theme}) => (theme ==='light' ? '#fff': '#000')}
`;
export const Lput=styled.div`
  border: 1px solid #ccc;
    padding: 50px;
    width: 400px;
    margin: 0 auto;
    background-color: gainsboro;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    border-radius: 20px;
    box-shadow: 0px 2px 4px ${({theme}) => (theme ==='light' ? '#fff': '#000')}
`
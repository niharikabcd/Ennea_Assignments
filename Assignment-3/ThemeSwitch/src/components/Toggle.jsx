import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { StyledButton } from '../styled';

const Toggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <StyledButton onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </StyledButton>
  );
};

export default Toggle;


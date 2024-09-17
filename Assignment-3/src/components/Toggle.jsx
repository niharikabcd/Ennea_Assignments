import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { StyledButton } from '../styled';

function Toggle(){
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <StyledButton onClick={toggleTheme}
    theme={theme}>
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </StyledButton>
  );
};

export default Toggle;
import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { ContentWrapper } from '../styled';

const Content = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <ContentWrapper theme={theme}>
      <h1>Welcome to the {theme === 'light' ? 'Light' : 'Dark'} Theme</h1>
    </ContentWrapper>
  );
};

export default Content;
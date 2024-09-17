import React from 'react';
import { ThemeProvider } from './ThemeContext';
import Toggle from './components/Toggle';
import Content from './components/Content';
import Input from './components/input';
const App = () => {
  return (
    <ThemeProvider>
      <Input/>
      <Toggle />
      <Content />
    </ThemeProvider>
  );
};

export default App;


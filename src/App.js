import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Layout>
          <HomePage />
        </Layout>
      </ThemeProvider>
    </div>
  );
}

export default App;

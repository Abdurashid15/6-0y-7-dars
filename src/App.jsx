import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DetailsPage from './pages/DetailsProduct';
import Error from './pages/Error';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
  );
};

export default App;
import React from 'react';
import './App.css';


import { BrowserRouter, Routes, Route } from "react-router-dom";


import Layout from './pages/Layout';
import Home  from './pages/Home';
import NoPage  from './pages/NoPage';
import Upload from './pages/Upload';
import Analytics from './pages/Analytics';


function App() {


  return (
    <>
      
        
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;

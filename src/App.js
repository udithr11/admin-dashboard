import './App.css';
import Admin from './components/Admin';
import Features from './components/Features';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/features" element={<Features />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

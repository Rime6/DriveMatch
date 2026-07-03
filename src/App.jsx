import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Deals from './pages/Deals';
import CarDetail from './pages/CarDetail';
import Checkout from './pages/Checkout';
import Survey from './pages/Survey';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/car/:id" element={<CarDetail />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/survey" element={<Survey />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

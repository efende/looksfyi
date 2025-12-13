import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import StudioPage from './pages/StudioPage';
import TryOnPage from './pages/TryOnPage';
import GlobalLooksPage from './pages/GlobalLooksPage';
import PricingPage from './pages/PricingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GlobalLooksPage />} />
        <Route path="/try-on" element={<TryOnPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </Router>
  );
}

export default App;

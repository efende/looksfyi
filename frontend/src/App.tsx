import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import TryOnPage from './pages/TryOnPage';
import GlobalLooksPage from './pages/GlobalLooksPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/try-on" element={<TryOnPage />} />
        <Route path="/looks" element={<GlobalLooksPage />} />
      </Routes>
    </Router>
  );
}

export default App;

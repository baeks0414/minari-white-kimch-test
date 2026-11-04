import { Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav.jsx';
import Home from './pages/Home.jsx';
import Store from './pages/Store.jsx';
import Me from './pages/Me.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <div className="shell">
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/me" element={<Me />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}

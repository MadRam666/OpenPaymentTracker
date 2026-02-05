import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useStore from './store/useStore';
import Dashboard from './pages/Dashboard';
import ItemDetail from './pages/ItemDetail';
import Settings from './pages/Settings';
import './index.css';

function App() {
  const fetchPaymentItems = useStore((state) => state.fetchPaymentItems);

  useEffect(() => {
    fetchPaymentItems();
  }, [fetchPaymentItems]);

  return (
    <Router basename="/OpenPaymentTracker">
      <div className="app-container">

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

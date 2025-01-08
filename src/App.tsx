import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import { ChatProvider } from './contexts/ChatContext';
import { Toaster } from './components/ui/toaster';
import './App.css';

function App() {
  return (
    <ChatProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </Router>
      <Toaster />
    </ChatProvider>
  );
}

export default App;
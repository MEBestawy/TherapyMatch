import logo from './logo.svg';
import './App.css';
import UserForm from './components/UserForm';
import DrawerAppBar from './components/Navbar';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import { ErrorPage } from './pages/Error/Errors';
import HomePage from './pages/Home';
import FrequentlyAsked from './pages/FAQ';

function App() {
  const [cmode, setCMode] = useState("light"); 
  const darkTheme = createTheme({
    palette: {
      mode: cmode,
    },
  });

  return (
    <BrowserRouter>
      <div className="App">
        <ThemeProvider theme={darkTheme} >
          <DrawerAppBar setMode={setCMode} mode={cmode} />
          <div style={{paddingTop: '80px'}}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/faq" element={<FrequentlyAsked />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
            
          </div>
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;

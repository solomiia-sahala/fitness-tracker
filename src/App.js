import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Error from './components/Error';
import SignIn from './pages/SignIn';
import theme from './config/theme.config';
import { ThemeProvider } from '@mui/material/styles';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
        <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={ <SignIn/> }/>
        <Route path="/sign-up" element={ <SignUp/> }/>
        <Route path="/dashboard" element={ <Dashboard/> }/>
        <Route path='*' element={ <Error/> }/>
      </Routes>
        </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

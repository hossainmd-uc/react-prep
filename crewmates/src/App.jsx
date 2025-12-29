import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Crewmates from './components/Crewmates'
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ViewCrewmates from './components/ViewCrewmates';
import CrewmateHome from './components/CrewmateHome';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary" }}>
        <BrowserRouter>
          <Routes>
            <Route index element={<CrewmateHome />} />
            <Route path='create' element={<><Crewmates /> </>} />
            <Route path='view' element={<><ViewCrewmates /> </>} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  )
}

export default App

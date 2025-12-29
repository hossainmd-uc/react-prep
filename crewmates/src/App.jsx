import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Crewmates from './components/Crewmates'
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ViewCrewmates from './components/ViewCrewmates';

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
          <Route index element={<><Crewmates /> <ViewCrewmates /></>}>
          </Route>
        </Routes>
      </BrowserRouter>
      </Box>
    </ThemeProvider>
  )
}

export default App

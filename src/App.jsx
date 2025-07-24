import { useEffect, useState, useRef } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Bylaw from './Components/Bylaw/Bylaw';
import TermsFrame from './Components/TermsFrame/TermsFrame';
import toast, { Toaster } from 'react-hot-toast';
import DarkTheme from './Components/DarkTheme/DarkTheme';
// import Login from './Components/Login/Login';

function App() {
  const [useNewBylaw, setUseNewBylaw] = useState(false);
  const [saved, setSaved] = useState([]);
  const hasRun = useRef(false); // 🧠 useRef to persist value across renders

  function loadSave() {
    try {
      let temp = localStorage.getItem('savedCourses');
      if (!temp) return;
      temp = JSON.parse(temp);
      setSaved(temp);
      toast.success('Saved courses loaded successfully');
    } catch (error) {
      toast.error('Could not load saved courses');
    }
  }

  useEffect(() => {
    if (!hasRun.current) {
      loadSave();
      hasRun.current = true;
    }
  }, []);

  useEffect(() => {
    if (saved?.useNewBylaw)
      setUseNewBylaw(saved?.useNewBylaw);
  }, [saved]);

  function changeByLaw(value) {
    setUseNewBylaw(value);
  }

  return (
    <>
      <Toaster />
      <DarkTheme />
      <Header />
      {/* <Login /> */}
      <Bylaw changeByLaw={changeByLaw} bylaw={useNewBylaw} />
      <TermsFrame useNewBylaw={useNewBylaw} saved={saved?.terms} />
    </>
  );
}

export default App;

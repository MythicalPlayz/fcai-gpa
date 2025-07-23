import { useState } from 'react'
import './App.css'
import Header from './Components/Header/Header'
import Bylaw from './Components/Bylaw/Bylaw'
import TermsFrame from './Components/TermsFrame/TermsFrame'
import { Toaster } from 'react-hot-toast'


function App() {
  const [useNewBylaw, setUseNewBylaw] = useState(false);

  function changeByLaw(value) {
    setUseNewBylaw(value);
  }

  return (
    <>
      <Toaster />
      <Header />
      <Bylaw changeByLaw={changeByLaw} />
      <TermsFrame useNewBylaw={useNewBylaw} />
    </>
  );
}

export default App;

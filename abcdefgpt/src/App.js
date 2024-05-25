import './App.css';
import  { BrowserRouter, Route, Routes} from "react-router-dom"
import UserChat from './view/UserChat.js';
import { useState, useEffect } from 'react';

function App() {

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(()=>{
    const handleResize = () =>{
      setWindowSize({
        width : window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    return () =>{
      window.removeEventListener('resize', handleResize)
    };
  },[]);

  return (
    <div className="App" style={{width: windowSize.width, height: windowSize.height}}>
      <BrowserRouter>
        <Routes>
          <Route path ='/userchat' element={<UserChat/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

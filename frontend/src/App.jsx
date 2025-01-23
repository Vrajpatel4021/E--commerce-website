import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage ,SignupPage,Home } from "./Routes";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/home' element = {<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

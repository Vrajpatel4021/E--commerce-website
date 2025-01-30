import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage ,SignupPage,Home ,CreateProduct} from "./Routes";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/home' element = {<Home/>}/>
        <Route path='/product' element = {<CreateProduct/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

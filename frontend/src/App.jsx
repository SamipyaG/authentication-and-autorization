import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App(){
  return <>
  <BrowserRouter>
  <AuthProvider>
  <Navbar/> 
  <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
  </Routes>
  </AuthProvider>   
  </BrowserRouter>
  
  </>
}
export default App;
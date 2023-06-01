
import './App.css';

import { Routes, Route, BrowserRouter } from "react-router-dom"
import LoginPage from "./Pages/LoginPage"
import SignUpPage from "./Pages/SignUpPage"
import ProfilePage from "./Pages/ProfilePage"


function App() {
 return (
   <div className="App">
     <BrowserRouter>
       <Routes>
         <Route  >
           <Route path="/login" element={<LoginPage />} />
           <Route path="/signup" element={<SignUpPage />} />
           <Route path="/profile" element={<ProfilePage />} />
         </Route>
       </Routes>
     </BrowserRouter>
   </div>
 )
}

export default App
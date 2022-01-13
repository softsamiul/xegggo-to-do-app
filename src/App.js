import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./Components/Home/Home";
import AuthProvider from "./Context/AuthProvider";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Signin from "./Shared/Signin/Signin";
import Signup from "./Shared/Signup/Signup";
import './responsive.scss'


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
        ,
      </AuthProvider>
    </div>
  );
}

export default App;

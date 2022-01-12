import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import AuthProvider from "./Context/AuthProvider";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Signin from "./Shared/Signin/Signin";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </BrowserRouter>
        ,
      </AuthProvider>
    </div>
  );
}

export default App;

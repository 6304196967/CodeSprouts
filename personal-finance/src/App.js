import { Routes, Route } from "react-router-dom";
import './App.css';
import Signup from "./pages/signup";
function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup/>} />
    </Routes>
  );
}

export default App;

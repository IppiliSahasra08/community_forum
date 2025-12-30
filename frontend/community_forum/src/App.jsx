import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/homepage";
import AddPost from "./components/AddPost";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-post" element={<AddPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

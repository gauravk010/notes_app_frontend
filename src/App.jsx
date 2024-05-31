import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/shared/Login";
import Home from "./Components/Pages/Home";
import Layout from "./Components/shared/Layout";
import AddNote from "./Components/Pages/AddNote";
import EditNote from "./Components/Pages/EditNote";
import Register from "./Components/shared/Register";
import AuthWrap from "./Components/Auth/AuthWrap";
import LogWrap from "./Components/Auth/LogWrap";
import ViewNote from "./Components/Pages/ViewNote";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LogWrap />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<AuthWrap />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="add-note" element={<AddNote />} />
            <Route path="view-note/:id" element={<ViewNote />} />
            <Route path="edit-note/:id" element={<EditNote />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

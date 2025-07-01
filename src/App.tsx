import TodoApp from "./pages/TodoApp"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ProtectedRoute from "./pages/ProtectedRoute"
import GetData from "./pages/GetData"
import SaveData from "./pages/SaveData"
import { BrowserRouter,Routes,Route } from "react-router-dom"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoApp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route element={<ProtectedRoute/>}>
          <Route path="/get-data" element={<GetData/>}></Route>
          <Route path="/save-data" element={<SaveData/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

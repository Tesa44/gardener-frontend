import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import AddPlant from "./pages/AddPlant";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home></Home>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppLayout></AppLayout>
              </ProtectedRoute>
            }
          >
            <Route path="add-plant" element={<AddPlant></AddPlant>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

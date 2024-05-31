import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Header from "./components/header/header";

import Home from "./pages/home";
import Products from "./pages/products";
import ProductDetail from "./components/product/productDetails";
import Cart from "./pages/cart";
import Login from "./pages/userLogin";
import Register from "./pages/userRegister";
import Profile from "./pages/userProfile";
import Box from "@mui/material/Box";
import Footer from "./components/footer/footer";
import UserOrder from "./pages/UserOrder";
import AdminOrder from "./pages/AdminOrder";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const authenticate = useSelector(
    (state: RootState) => state.users.isAuthenticated
  );

  return (
    <div className="testing" data-testid="testing">
      <Router>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Header></Header>
          <Box style={{ flex: "1" }}>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/products" element={<Products />}></Route>
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/userOrder" element={<UserOrder />}></Route>
              <Route path="/adminOrder" element={<AdminOrder />}></Route>
              <Route
                path="/profile"
                element={authenticate ? <Profile /> : <Navigate to="/login" />}
              ></Route>
              <Route
                path="/login"
                element={!authenticate ? <Login /> : <Navigate to="/profile" />}
              ></Route>
              <Route path="/register" element={<Register />}></Route>
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </div>
  );
}

export default App;

import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Thankyou from "./pages/Thankyou";
import ForgetPassword from "./components/auth/ForgetPassword";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Products from "./components/product/Products";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Account from "./components/account/Account";
import Profile from "./components/account/Profile";
import OrderHistory from "./components/account/OrderHistory";
import OrderDetails from "./components/account/OrderDetails";
import ChangePassword from "./components/account/ChangePassword";
import { CartProvider } from "./components/store/CartContext";
import { AuthProvider } from "./components/store/AuthContext";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Switch>
            <Route exact path="/anydrinks/login" component={Login} />
            <Route exact path="/anydrinks/signup" component={Signup} />
            <Route exact path="/anydrinks/thankyou" component={Thankyou} />
            <Route
              exact
              path="/anydrinks/forgetpassword"
              component={ForgetPassword}
            />
            <Fragment>
              <Navbar Link={Link} />
              <div className="main">
                <Switch>
                  <Route exact path="/anydrinks" component={Home} />
                  <Route
                    exact
                    path="/anydrinks/products"
                    component={Products}
                  />
                  <Route
                    exact
                    path="/anydrinks/products/:id"
                    component={ProductDetails}
                  />
                  <Route
                    exact
                    path="/anydrinks/checkout"
                    component={Checkout}
                  />
                  <Route path="/anydrinks/account">
                    <Account useRouteMatch={useRouteMatch} />
                  </Route>
                  <Route
                    exact
                    path="/anydrinks/profile"
                    component={Profile}
                  ></Route>
                  <Route
                    exact
                    path="/anydrinks/orderhistory"
                    component={OrderHistory}
                  ></Route>
                  <Route
                    exact
                    path="/anydrinks/orderhistory/:id"
                    component={OrderDetails}
                  />
                  <Route
                    exact
                    path="/anydrinks/changepassword"
                    component={ChangePassword}
                  ></Route>
                  <Route exact path="/anydrinks/contact" component={Contact} />
                </Switch>
                <Footer />
              </div>
            </Fragment>
          </Switch>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;

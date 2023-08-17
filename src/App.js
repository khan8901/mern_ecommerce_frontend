import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/login/Login";
import Products from "./pages/products/Products";
import Register from "./pages/auth/register/Register";
import { useEffect, useState } from "react";
// import { loadUser } from "./actions/userActions";

import Dashboard from "./pages/admin/dashboard/Dashboard";
import NewProduct from "./pages/admin/newProduct/NewProduct";
import ProductsList from "./pages/admin/products/ProductsList";
import ProtectedRoute from "./components/route/ProtectedRoute";
import ProductDetails from "./pages/admin/productDetails/ProductDetails";
import UpdateProduct from "./pages/admin/updateProduct/UpdateProduct";
import SingleProduct from "./pages/singleProduct/SingleProduct";
import Cart from "./pages/cart/Cart";
import Shipping from "./pages/cart/shipping/Shipping";
import ConfirmOrder from "./pages/cart/confirmOrder/ConfirmOrder";

//  payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./pages/cart/payment/Payment";
import Success from "./pages/cart/success/Success";
import Users from "./pages/admin/users/Users";
import UserDetails from "./pages/admin/users/userDetails/UserDetails";
import Orders from "./pages/admin/orders/Orders";
import ProcessOrder from "./pages/admin/orders/processOrder/ProcessOrder";
import Profile from "./pages/user/Profile";
import UpdateProfile from "./pages/user/updateProfile/UpdateProfile";
import ChangePassword from "./pages/user/changePassword/ChangePassword";
import MyOrders from "./pages/user/myOrders/MyOrders";
import OrderDetails from "./pages/user/orderDetails/OrderDetails";
import ProductReview from "./pages/admin/productReview/ProductReview";
import ForgotPassword from "./pages/auth/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/auth/resetPassword/ResetPassword";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import { baseUrl } from "./config";
import { UserContextProvider } from "./context/UserContext";

function App() {
  return (
    <UserContextProvider>
      <div className="app">
        <Router>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/password/forgot" component={ForgotPassword} exact />
          <Route
            path="/password/reset/:token"
            component={ResetPassword}
            exact
          />
          <Route path="/about" component={About} exact />
          <Route path="/contact" component={Contact} exact />
          <Route path="/products" component={Products} exact />
          <Route path="/products/search/:keyword" component={Products} />
          <Route path="/product/:id" component={SingleProduct} />
          <Route path="/cart" component={Cart} exact />

          <Route path="/me" component={Profile} exact />
          <Route path="/me/update" component={UpdateProfile} exact />
          <Route path="/me/password" component={ChangePassword} exact />
          <Route path="/orders/me" component={MyOrders} exact />
          <ProtectedRoute path="/order/:id" component={OrderDetails} exact />

          <Route path="/shipping" component={Shipping} />
          <Route path="/confirm" component={ConfirmOrder} />
          {
            <Elements
              stripe={loadStripe(
                " pk_test_51M4wO2LS2WpRBkHthNc8fnaL5zGCwKGtbyAINstJp802gJOkJ1uXUiomH2hRyCxrTgxRKKwLb4PxhJzcynJtoLFS00qIsRRGjD"
              )}
            >
              <Route path="/payment" component={Payment} />
            </Elements>
          }
          <ProtectedRoute path="/success" component={Success} />
          {/* <ProtectedRoute
          path="/admin"
          // isAdmin={true}
          component={Dashboard}
          exact
        /> */}
          <Route path="/admin" component={Dashboard} />
          <Route
            path="/add-products"
            isAdmin={true}
            component={NewProduct}
            exact
          />
          <Route
            path="/admin-products"
            isAdmin={true}
            component={ProductsList}
            exact
          />
          <Route
            path="/admin_product/details/:id"
            component={ProductDetails}
            exact
          />
          <Route
            path="/admin_product/:id"
            // isAdmin={true}
            component={UpdateProduct}
            exact
          />
          <Route path="/users" isAdmin={true} component={Users} exact />
          <ProtectedRoute
            path="/admin/user/details/:id"
            isAdmin={true}
            component={UserDetails}
            exact
          />
          <Route path="/admin-orders" isAdmin={true} component={Orders} exact />
          <ProtectedRoute
            path="/admin/order/:id"
            isAdmin={true}
            component={ProcessOrder}
            exact
          />
          <ProtectedRoute
            path="/admin/reviews"
            isAdmin={true}
            component={ProductReview}
            exact
          />
        </Router>
      </div>
    </UserContextProvider>
  );
}

export default App;

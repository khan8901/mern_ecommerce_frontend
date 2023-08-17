import React, { Fragment, useEffect, useContext, useState } from "react";
import Loader from "../../../components/loader/Loader";
import ProfileLink from "../../../components/profileLinks/ProfileLink";
import { baseUrl } from "../../../config";
import axios from "axios";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import styles from "./MyOrders.module.scss";
// import { clearErrors, myOrders } from "../../../actions/orderActions";
import { Link } from "react-router-dom";
import Navbar from "../../../components/header/Navbar";
import Footer from "../../../components/footer/Footer";
import MetaData from "../../../components/MetaData";
import { UserContext } from "../../../context/UserContext";

const MyOrders = () => {
  const { user, token } = useContext(UserContext);

  const alert = useAlert();
  const loading = false;
  const error = false;
  const [orders, setOrders] = useState([]);

  // const { orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    getOrders();
    if (error) {
      alert.error(error);
    }
  }, []);

  const getOrders = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      // const token = 'your-bearer-token';
      const response = await axios.get(`${baseUrl}/orders/me`, {
        headers: headers,
        user: user,
      });
      const data = response.data.orders;
      console.log(data, "This is the array of orders");
      setOrders(data);
    } catch (error) {
      // Handle the error
      console.log(error);
    }
  };
  return (
    <Fragment>
      <MetaData title={"My Order"} />
      <Navbar />
      <div className={styles.orders}>
        <div className="container mt-5 mb-3 flex">
          <div className="col-sm-3 m-2 ">
            <ProfileLink />
          </div>
          <div className="col-sm-9 m-4">
            {loading ? (
              <Loader />
            ) : (
              <>
                {orders && (
                  <Fragment>
                    <div className={styles.orders_container}>
                      {orders.length === 0 ? (
                        <>
                          <h4>No Item Order Yet</h4>
                        </>
                      ) : (
                        <>
                          {/* <div className="d-flex align-items-center justify-content-between mb-2 ps-2 pe-2 pt-2">
                                                <h5>
                                                    Total Orders :
                                                    <span className="ms-2 text-success">
                                                        {orders.length}
                                                    </span>
                                                </h5>
                                                <h5>
                                                    Total Spend :
                                                    <span className="ms-2 text-success">
                                                        {orders.length}
                                                    </span>
                                                </h5>
                                            </div> */}
                          <div>
                            <div className="row">
                              <div className="col-md-4">
                                <p className="fw-bold">Order ID</p>
                              </div>
                              <div className="col-md-2">
                                <p className="fw-bold">Quantity</p>
                              </div>
                              <div className="col-md-2">
                                <p className="fw-bold">Amount</p>
                              </div>
                              <div className="col-md-2">
                                <p className="fw-bold">Status</p>
                              </div>
                              <div className="col-md-2">
                                <p className="fw-bold">Actions</p>
                              </div>
                            </div>
                          </div>
                          <hr className="text-primary" />
                          {orders.map((order) => (
                            <div>
                              <div className="row">
                                <div className="col-md-4">
                                  <p>{order?._id}</p>
                                </div>
                                <div className="col-md-2">
                                  <p>{order?.orderItems.length}</p>
                                </div>
                                <div className="col-md-2">
                                  <p>${order?.totalPrice}</p>
                                </div>
                                <div className="col-md-2">
                                  {/* Delivered  */}
                                  {order?.orderStatus === "Delivered" && (
                                    <>
                                      <p
                                        style={{
                                          color: "green",
                                        }}
                                      >
                                        {order?.orderStatus}
                                      </p>
                                    </>
                                  )}
                                  {/* Shipped */}
                                  {order?.orderStatus === "Shipped" && (
                                    <>
                                      <p
                                        style={{
                                          color: "skyblue",
                                        }}
                                      >
                                        {order?.orderStatus}
                                      </p>
                                    </>
                                  )}
                                  {/* Processing  */}
                                  {order?.orderStatus === "On The Way" && (
                                    <>
                                      <p
                                        style={{
                                          color: "#DCAB2F",
                                        }}
                                      >
                                        {order?.orderStatus}
                                      </p>
                                    </>
                                  )}
                                  {/* Processing  */}
                                  {order?.orderStatus === "Processing" && (
                                    <>
                                      <p
                                        style={{
                                          color: "#DCAB2F",
                                        }}
                                      >
                                        {order?.orderStatus}
                                      </p>
                                    </>
                                  )}
                                </div>
                                <div className="col-md-2">
                                  <Link
                                    to={`/order/${order?._id}`}
                                    className={styles.view_button}
                                  >
                                    View
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </Fragment>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default MyOrders;

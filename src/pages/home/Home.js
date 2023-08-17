import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./home.css";
// import { getAdminProducts } from "../../actions/productAction";
import Product from "../../components/product/Product";
import { Row, Col } from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/header/Navbar";
import Loader from "../../components/loader/Loader";
import MetaData from "../../components/MetaData";
import Carousel from "../../components/car/Carousel";
import products from "../../db/productsDB";
import Products from "../products/Products";
import Cates from "./Cats/Cates";
import Banner from "../../components/banner/Banner";

const Home = () => {
  const alert = useAlert();
  // const { loading, error, products } = useSelector((state) => state.products);
  let loading = false;
  let error = false;

  // filter products by types

  useEffect(() => {
    // dispatch(getAdminProducts());

    if (error) {
      return alert.error(error);
    }
  }, [alert, error]);
  return (
    <Fragment>
      <MetaData title={"Home"} />
      <Navbar />
      <Products />
    </Fragment>
  );
};

export default Home;

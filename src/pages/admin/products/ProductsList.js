import React, { useEffect, useContext, useState } from "react";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import { Table } from "react-bootstrap";
import { useAlert } from "react-alert";
import axios from "axios";
import { baseUrl } from "../../../config";
import styles from "./ProductsList.module.scss";
// import {
//     clearErrors,
//     deleteProduct,
//     getAdminProducts,
// } from "../../../actions/productAction";
import Loader from "../../../components/loader/Loader";
import { UserContext } from "../../../context/UserContext";
import { Link } from "react-router-dom";

import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { DELETE_PRODUCT_RESET } from "../../../constants/productsConstants";
import Navbar from "../../../components/admin/navbar/Navbar";
import MetaData from "../../../components/MetaData";
import products from "../../../db/productsDB";
const ProductsList = ({ history }) => {
  const { user, token } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const alert = useAlert();

  const loading = false;
  const error = false;
  const isDeleted = false;
  useEffect(() => {
    getProductsList();
    if (error) {
      alert.error(error);
    }
  }, []);

  const getProductsList = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(`${baseUrl}/admin/products`, {
        headers: headers,
        user: user,
      });
      console.log(response, "This is response");
      const data = response.data.products;
      console.log(data, "This is the response.data");
      setProducts(data);
    } catch (error) {
      // Handle the error
      console.log(error);
    }
  };
  const deleteProductHandler = async (id) => {
    try {
      console.log("Inside Try");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      console.log("Before Response");
      const response = await axios.delete(`${baseUrl}/admin/product/${id}`, {
        headers: headers,
        user: user,
      });
      console.log(response, "This is response");
      const data = response.data;
      console.log(data, "This is the response.data");
      getProductsList();
    } catch (error) {
      // Handle the error
      console.log(error, "This is the error");
    }
  };
  return (
    <div className={styles.products}>
      <MetaData title={"All Products"} />
      <div className="row g-0">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          {/* <Navbar /> */}
          <div className={`${styles.table} container mt-3`}>
            <div>
              <Table responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {loading ? (
                  <>
                    <Loader />
                  </>
                ) : (
                  <>
                    <tbody>
                      {products?.map((product) => (
                        <tr key={product?._id}>
                          <td>{product?._id}</td>
                          <td>
                            <img
                              style={{
                                height: "40px",
                                width: "40px",
                              }}
                              src={product?.images[0]}
                              alt={product?.name}
                            />
                          </td>
                          <td>{product?.name}</td>
                          <td>{product?.price}</td>
                          <td>{product?.stock}</td>
                          <td className={styles.actions}>
                            <Link to={`/admin_product/details/${product._id}`}>
                              <AiOutlineEye size={20} />
                            </Link>
                            <Link to={`/admin_product/${product._id}`}>
                              <AiOutlineEdit size={20} />
                            </Link>
                            <button
                              onClick={() => deleteProductHandler(product._id)}
                            >
                              <AiOutlineDelete size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;

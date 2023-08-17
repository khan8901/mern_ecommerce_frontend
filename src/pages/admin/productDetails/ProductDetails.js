import React, { useEffect, useState, useContext } from "react";
// import { clearErrors, getProductDetails } from "../../../actions/productAction";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import axios from "axios";
import { baseUrl } from "../../../config";
import styles from "./ProductDetails.module.scss";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Navbar from "../../../components/admin/navbar/Navbar";
import MetaData from "../../../components/MetaData";
import products from "../../../db/productsDB";
import { UserContext } from "../../../context/UserContext";

const ProductDetails = () => {
  const { user, token } = useContext(UserContext);

  const [preview, setPreview] = useState(0);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});

  let { id } = useParams();
  console.log(id);

  const loading = false;
  useEffect(() => {
    getProductsList();
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
      console.log(error);
    }
  };
  useEffect(() => {
    const filteredProduct = products.find((x) => x._id === id);
    console.log(filteredProduct, "this is the filtered product.");
    if (filteredProduct) {
      setProduct(filteredProduct);
    }
  }, [products, id]);

  return (
    <div className={styles.product_details}>
      <MetaData title={"Product Details"} />
      <div className="row g-0">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <Navbar />
          <div className="container p-3">
            {loading ? (
              <div>
                <Spinner />
              </div>
            ) : (
              <>
                <div className="row">
                  <div className="col-md-6">
                    {product.images && (
                      <>
                        {console.log("Inside imges")}
                        <div className={styles.preview_image}>
                          <img src={product?.images[preview]} alt="" />
                        </div>
                        <div className={styles.image_thumbline}>
                          {product?.images.map((image, index) => (
                            <div key={index}>
                              <img
                                src={image}
                                onClick={() => setPreview(index)}
                                alt=""
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className={styles.Product_info}>
                      <h4>{product?.name}</h4>
                      <div className="d-flex align-items-center mt-3">
                        <h4>$ {product?.price}</h4>
                        <div className="ms-5">
                          <div className="rating-outer">
                            <div
                              className="rating-inner"
                              style={{
                                width: `${(product.ratings / 5) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span id="no_of_reviews">
                            ({product.numOfReviews} Reviews)
                          </span>
                        </div>
                      </div>
                      <p>{product?.description}</p>

                      {/* stock status  */}
                      <p className="mt-3">
                        Status:
                        <span
                          id="stock_status"
                          className={
                            product.stock > 0
                              ? "greenColor ms-2"
                              : "redColor ms-2"
                          }
                        >
                          <b>
                            {product.stock > 0 ? "In Stock" : "Out of Stock"}
                          </b>
                        </span>
                      </p>
                      {/* stock  */}
                      <p id="product_seller mb-3">
                        Stock:
                        <strong className="ms-2">{product.stock}</strong>
                      </p>
                      {/* product seller  */}
                      <p id="product_seller mb-3">
                        Sold by:
                        <strong className="ms-2">{product.seller}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

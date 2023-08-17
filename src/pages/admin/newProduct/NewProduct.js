import React, { useEffect, useState, useContext } from "react";
import Sidebar from "../../../components/admin/sidebar/Sidebar";

import styles from "./NewProduct.module.scss";

import MetaData from "../../../components/MetaData";
import { UserContext } from "../../../context/UserContext";
import { baseUrl } from "../../../config";
import axios from "axios";
import {
  Image,
  Transformation,
  CloudinaryContext,
  openUploadWidget,
} from "cloudinary-react";

const NewProduct = ({ history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);

  //const { setUser, setToken, setAuthenticated } = useContext(UserContext);
  const { token, user } = useContext(UserContext);

  const categories = [
    "Choose Categories",
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const uploadProduct = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      price: price,
      description: description,
      category: category,
      stock: stock,
      seller: seller,
      images: images,
      user: user._id,
    };

    try {
      console.log(data, " this is data1 ");
      console.log(token, " this is token ");

      const response = await axios.post(`${baseUrl}/admin/product/new`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Handle the response
      console.log(response.data);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    const imageArray = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    });

    Promise.all(imageArray)
      .then((base64Array) => {
        setImages((prevImages) => [...prevImages, ...base64Array]);
      })
      .catch((error) => {
        console.error("Error converting images:", error);
      });

    console.log(images, " this is images array ");
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  return (
    <div className={styles.new_product}>
      <MetaData title={"Add Product"} />
      <div className="row g-0">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <div className={styles.product_input}>
            <div className={styles.form}>
              <h4>Add Product</h4>
              {/* name section  */}
              <div className={styles.from_group}>
                <label htmlFor="name_field">Name</label>
                <input
                  multiple
                  type="text"
                  id="name_field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* descriptio section  */}
              <div className={styles.from_group}>
                <label htmlFor="description_field">Description</label>
                <textarea
                  id="description_field"
                  rows="8"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              {/* category & stock section  */}
              <div className="row">
                <div className="col-md-7">
                  <div className={styles.from_group}>
                    <label htmlFor="category_field">Category</label>
                    <select
                      id="category_field"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className={styles.from_group}>
                    <label htmlFor="stock_field">Stock</label>
                    <input
                      type="number"
                      id="stock_field"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {/* seller name & price section  */}
              <div className="row">
                <div className="col-md-7">
                  <div className={styles.from_group}>
                    <label htmlFor="seller_field">Seller Name</label>
                    <input
                      type="text"
                      id="seller_field"
                      value={seller}
                      onChange={(e) => setSeller(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-5">
                  <div className={styles.from_group}>
                    <label htmlFor="price_field">Price</label>
                    <input
                      type="text"
                      id="price_field"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* types section  */}

              {/* image section  */}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />

                {images.length > 0 && (
                  <div>
                    <h2>Preview</h2>
                    <ul className="image-list">
                      {images.map((image, index) => (
                        <li key={index} className="image-item">
                          <img src={image} alt={`Preview ${index + 1}`} />
                          <button
                            className="remove-button"
                            onClick={() => handleRemoveImage(index)}
                          >
                            X
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <style jsx>{`
                  .image-list {
                    list-style: none;
                    padding: 0;
                  }

                  .image-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                  }

                  .image-item img {
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                    margin-right: 10px;
                  }

                  .remove-button {
                    background: none;
                    border: none;
                    color: red;
                    cursor: pointer;
                  }
                `}</style>
              </div>

              <div className={styles.from_group}>
                <button type="submit" onClick={(e) => uploadProduct(e)}>
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;

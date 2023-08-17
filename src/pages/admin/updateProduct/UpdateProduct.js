import React, { useEffect, useState, useContext } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../config";
import ButtonLoader from "../../../components/loader/ButtonLoader";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import styles from "./UpdateProduct.module.scss";
import Navbar from "../../../components/admin/navbar/Navbar";
import MetaData from "../../../components/MetaData";
import { UserContext } from "../../../context/UserContext";

const UpdateProduct = () => {
  const { user, token } = useContext(UserContext);
  console.log(user);
  const [product, setProduct] = useState({});

  const categories = [
    "Eid Collection",
    "New Collection",
    "Featured",
    "Footwear",
    "Accessories",
    "Clothing",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Other",
  ];
  const types = ["Men", "Women", "Kids"];

  const { id } = useParams();
  const loading = false;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [type, setType] = useState("");
  const [images, setImages] = useState([]);

  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const getProduct = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(`${baseUrl}/product/${id}`, {
        headers: headers,
        user: user,
      });
      const product = response.data.product;
      setProduct(product);
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
      setSeller(product.seller);
      setPrice(product.price);
      setOldImages(product.images);
      // setImages(product.images);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("Inside useEffect");
    getProduct();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);
    formData.set("seller", seller);
    formData.set("type", type);

    images.forEach((image) => {
      formData.append("images", image);
    });
    try {
      console.log("Inside Try");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      console.log("Before Response");
      const response = await axios.put(
        `${baseUrl}/admin/product/${id}`,
        formData,
        {
          headers: headers,
          user: user,
          id: user.id,
        }
      );
      console.log(response, "This is response");
      const data = response.data;
      console.log(data, "This is the response.data");
    } catch (error) {
      // Handle the error
      console.log(error, "This is the error");
    }
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className={styles.new_product}>
      <MetaData title={"Update Products"} />
      <div className="row g-0">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <Navbar />
          <div className={styles.product_input}>
            <div className={styles.form}>
              <h4>Update Product</h4>
              <form onSubmit={submitHandler}>
                {/* name section  */}
                <div className={styles.from_group}>
                  <label htmlFor="name_field">Name</label>
                  <input
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

                {/* types  */}

                <div className={styles.from_group}>
                  <label htmlFor="type_field">Types</label>
                  <select
                    id="type_field"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* image section  */}

                <div className={styles.from_group}>
                  <label>Images</label>

                  <div className="image_file ms-2">
                    <input
                      type="file"
                      name="product_images"
                      id="customFile"
                      onChange={onChange}
                      multiple
                    />
                    <AiOutlineCloudUpload size={20} />
                  </div>

                  <div>
                    {oldImages &&
                      oldImages.map((img) => (
                        <img
                          key={img}
                          src={img}
                          alt={img}
                          className="mt-3 mr-2"
                          width="55"
                          height="52"
                        />
                      ))}

                    {imagesPreview.map((img) => (
                      <img
                        src={img}
                        key={img}
                        alt="Images Preview"
                        className="mt-3 mr-2"
                        width="55"
                        height="52"
                      />
                    ))}
                  </div>
                </div>

                <div className={styles.from_group}>
                  <button type="submit">
                    {loading ? <ButtonLoader /> : "Update Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;

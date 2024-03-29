import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import { useAlert } from "react-alert";

import styles from "./NewProduct.module.scss";
import ButtonLoader from "../../../components/loader/ButtonLoader";
import Navbar from "../../../components/admin/navbar/Navbar";
import MetaData from "../../../components/MetaData";

const NewProduct = ({ history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    'Electronics',
    'Cameras',
    'Laptops',
    'Accessories',
    'Headphones',
    'Food',
    "Books",
    'Clothes/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home'

  ];

  const alert = useAlert();

  const loading = false;
  const error = false;
  const success = true;

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);
    formData.set("seller", seller);

    images.forEach((image) => {
      formData.append("images", image);
    });

    // dispatch(newProduct(formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

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
  const deleteImage = (index) => {
    setImagesPreview((prevImagesPreview) =>
      prevImagesPreview.filter((_, i) => i !== index)
    );
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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
              <form onSubmit={submitHandler}>
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
                    {imagesPreview.map((img, index) => (
                      <div key={img} className={styles.image_container}>
                        <img
                          src={img}
                          alt="Images Preview"
                          className="mt-3 me-2"
                          width="85"
                          height="80"
                        />
                        <button
                          className={styles.delete_button}
                          onClick={() => deleteImage(index)}
                        >
                          &#x2716; {/* Unicode for cross symbol */}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.from_group}>
                  <button type="submit">
                    {loading ? <ButtonLoader /> : "dkjsnkjdk"}
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

export default NewProduct;

import React, { Fragment, useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { AiOutlineCloudUpload } from "react-icons/ai";
// import {
//     clearErrors,
//     loadUser,
//     updateProfile,
// } from "../../../actions/userActions";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/header/Navbar";
import ButtonLoader from "../../../components/loader/ButtonLoader";
import MetaData from "../../../components/MetaData";
import ProfileLink from "../../../components/profileLinks/ProfileLink";
import { UPDATE_PROFILE_RESET } from "../../../constants/userConstants";
import styles from "./UpdateProfile.module.scss";
import { UserContext } from "../../../context/UserContext";

const UpdateProfile = ({ history }) => {
  const { user } = useContext(UserContext);
  console.log(user, "This is the user");
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "https://res.cloudinary.com/mehedi08h/image/upload/v1647280872/react-final/auth/logo_wyrs86.png"
  );

  const alert = useAlert();
  // const user = {
  //   name: "Ahmad",
  //   email: "ahmad@gmail.com",
  //   phone: "03120073542",
  //   address: "house No 1",
  //   role: "admin",
  // };
  const loading = false;

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("address", address);
    formData.set("phone", phone);
    formData.set("avatar", avatar);
    console.log(formData);
    // dispatch(updateProfile(formData));
  };

  return (
    <Fragment>
      <MetaData title={"Update Profile"} />
      <Navbar />
      <div className={styles.update_profile}>
        <div className="container m-5 row">
          <div className="col-md-3">
            <ProfileLink />
          </div>
          <div className="col-md-9">
            <div className={styles.form_container}>
              <h4 className="text-center mt-3">
                Update Profile
                <form
                  className={styles.form}
                  onSubmit={submitHandler}
                  encType="multipart/form-data"
                >
                  <div className={styles.from_group}>
                    <label htmlFor="email_field">Name</label>
                    <input
                      className="from_input"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                    />
                  </div>
                  <div className={styles.from_group}>
                    <label htmlFor="email_field">Address</label>
                    <input
                      className="from_input"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                    />
                  </div>
                  <div className={styles.from_group}>
                    <label htmlFor="email_field">Phone</label>
                    <input
                      className="from_input"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="number"
                    />
                  </div>

                  <div className={styles.from_group}>
                    <button>{loading ? <ButtonLoader /> : "Update"}</button>
                  </div>
                </form>
              </h4>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default UpdateProfile;

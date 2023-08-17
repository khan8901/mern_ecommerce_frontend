import React, { Fragment , useContext} from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import styles from "./ProfileLink.module.scss";
import { AiOutlineEdit, AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdFavoriteBorder } from "react-icons/md";
import { useAlert } from "react-alert";
import { UserContext } from "../../context/UserContext";
import { baseUrl } from "../../config";




const ProfileLink = () => {
  const loading = false;
  const { token, user, isAuthenticated } = useContext(UserContext);
  const { setUser, setToken, setAuthenticated } = useContext(UserContext);



  const alert = useAlert();

  const logoutHandler = () => {

    setUser(null); 
    setToken(null); 
    setAuthenticated(false);


    // dispatch(logout());
    alert.success("Logged out successfully.");
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className={styles.profile_links}>
            <div className="text-center mt-3">
              <h4 className="mt-3">{user?.name}</h4>
              <p>{user?.email}</p>
            </div>
            <hr className="text-primary" />

            <div className={`mt-3 ${styles.links}`}>
              <Link to="/me">
                <AiOutlineUser className="me-3" size={25} /> Profile
              </Link>
              <Link to="/me/update">
                <AiOutlineEdit className="me-3" size={25} /> Edit Profile
              </Link>
              <Link to="/me/password">
                <RiLockPasswordLine className="me-3" size={25} />
                Password
              </Link>
              <Link to="/orders/me">
                <MdFavoriteBorder className="me-3" size={25} />
                My Order
              </Link>
              <button onClick={logoutHandler}>
                <AiOutlineLogout className="me-3" size={25} />
                Logout
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProfileLink;

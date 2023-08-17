import React, { Fragment, useContext } from "react";
import ProfileLink from "../../components/profileLinks/ProfileLink";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { AiOutlineEdit, AiOutlineMail } from "react-icons/ai";
import { BsEmojiSmile, BsPhone } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import styles from "./Profile.module.scss";
import Loader from "../../components/loader/Loader";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import MetaData from "../../components/MetaData";
import { baseUrl } from "../../config";
import { UserContext } from "../../context/UserContext";

const Profile = () => {
  const loading = false;
  const { setUser, setToken, setAuthenticated } = useContext(UserContext);
  const { token, user, isAuthenticated } = useContext(UserContext);

  return (
    <Fragment>
      <MetaData title={"Profile"} />
      <Navbar />
      <div className={styles.profile}>
        <div className="container m-5 mb-3 row">
          {/* <div className="row "> */}
          <div className="col-md-3">
            <ProfileLink />
          </div>
          <div className="col-md-9">
            {loading ? (
              <Loader />
            ) : (
              <>
                <div className={styles.profile_container}>
                  <div className="d-flex align-items-center justify-content-between ps-3 pe-3 pt-3">
                    <h4>My Profile</h4>
                    <Link to="/me/update">
                      <AiOutlineEdit className="me-2" size={20} />
                      Edit
                    </Link>
                  </div>
                  <hr className="text-primary" />
                  <div className="row g-3 p-3">
                    <div className="col-md-6">
                      <div className={styles.info}>
                        <Table responsive="sm md lg xl">
                          <tbody>
                            <tr>
                              <td>
                                <BsEmojiSmile size={25} />
                              </td>
                              <td className="fw-bold">Name</td>
                              <td>{user?.name}</td>
                            </tr>
                            <tr>
                              <td>
                                <AiOutlineMail size={25} />
                              </td>
                              <td className="fw-bold">Email</td>
                              <td>{user?.email}</td>
                            </tr>
                            <tr>
                              <td>
                                <BsPhone size={25} />
                              </td>
                              <td className="fw-bold">Phone</td>
                              <td>{user?.phone}</td>
                            </tr>
                            <tr>
                              <td>
                                <GrLocation size={25} />
                              </td>
                              <td className="fw-bold">Address</td>
                              <td>{user?.address}</td>
                            </tr>
                            <tr>
                              <td>
                                <BsEmojiSmile size={25} />
                              </td>
                              <td className="fw-bold">Role</td>
                              <td>{user.isAdmin ? "Admin" : "User"}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* </div> */}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Profile;

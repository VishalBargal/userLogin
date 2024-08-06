// Task.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/Task.css";
import Loader from "./Loader";
import comlogo from "../img/comlogo.png";
import headerimg from "../assets/rptn1.png";
import { Icon } from "@iconify/react";

const Task = () => {
  
  const [employeeNames, setEmployeeNames] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      // Step 1: Retrieve userid from sessionStorage
      const userid = sessionStorage.getItem("userid");

      if (!userid) {
        // Handle the case when the userid is not found in sessionStorage
        console.error("Userid not found in sessionStorage.");
        return;
      }

      // Step 2: Make the API call to the backend with the retrieved userid
      const result = await axios.get(`http://localhost:3005/empinfo/${userid}`);

      // Step 3: Set the employeeNames state with the retrieved value
      setEmployeeNames(result.data);
      // console.log(result.data);
    } catch (error) {
      // Step 4: Handle errors, if any
      console.error("Error fetching user data:", error);
    }
  };

  
  const [checktask, setchecktask] = useState([]);

  useEffect(() => {
    loadUserts();
  });

  const loadUserts = async () => {
    try {
      // Step 1: Retrieve userid from sessionStorage
      const userid = sessionStorage.getItem("userid");

      if (!userid) {
        // Handle the case when the userid is not found in sessionStorage
        console.error("Userid not found in sessionStorage.");
        return;
      }
      const currentDate = new Date().toISOString().split("T")[0];

      // Step 2: Make the API call to the backend with the retrieved userid
      const result = await axios.get(
        `http://localhost:3005/checktaskinfo/${userid}?date=${currentDate}`
      );

      // Step 3: Set the checktask state with the retrieved value
      setchecktask(result.data);
      // console.log(result.data);
    } catch (error) {
      // Step 4: Handle errors, if any
      console.error("Error fetching user data:", error);
    }
  };

  const [editPopup, setEditPopup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  const [userid, setUserid] = useState("");
  const [profileImageFile, setProfileImageFile] = useState(null);

  const handleEditClick = (id, name, email, mobile, address, profile_image) => {
    setUserid(id);
    setEmail(email);
    setName(name);
    setMobile(mobile);
    setAddress(address);

    setProfileImageFile(profile_image);
    setEditPopup(true);
  };

  const handleFile1Change = (event) => {
    const file = event.target.files[0];
    setProfileImageFile(file);
  };

  const handleSaveEdit = () => {
    // Email validation
    // const emailPattern = /@rptechnovelty\.com$/;
    // if (!emailPattern.test(email)) {
    //   toast.error("Please enter a valid @rptechnovelty.com email address.");
    //   return;
    // }
    // Create a FormData object to handle file uploads
    const formData = new FormData();

    // Append other data to the form data
    formData.append("userid", userid);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("address", address);

    // Check if a new profile image was selected
    if (profileImageFile) {
      formData.append("profile_image", profileImageFile);
    }

    // Send data to the backend through Axios POST request
    axios
      .post("http://localhost:3005/edit_profile", formData)
      .then((response) => {
        // Handle success
        window.location.reload();
      })
      .catch((error) => {
        // Handle error
        console.error("Edit failed", error);
      });

    // Close the edit popup after submitting the form
    setEditPopup(false);
  };

  const handleCancelEdit = () => {
    // Close the edit popup without saving changes
    setEditPopup(false);
  };

  return (
    <>
      <ToastContainer />

      <div className="task-main-div">
        <div className="main-nav">
          <div className="innerNavDiv">
            <div className="logo-div">
              <p>
                <small>developed by</small>
              </p>
              <p className="developedby">
                <b>bargalvishal@gmail.com</b>
              </p>
            </div>
            <div className="user-logout-btn">
              <div className="log-btn">
                <NavLink to="/logout">
                  <button
                    className="button  logoutBtn"
                    style={{ marginTop: 3, marginLeft: "50%", width: "104px" }}
                  >
                    Logout
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="main-form-div">
          <div className="profile-div">
            {employeeNames.map((value, index) => (
              <>
                <div>
                  <img
                    className="profimg"
                    src={`http://localhost:3005/uploads/${value.profile_image}`}
                  ></img>
                  <Icon
                    icon="material-symbols:edit-outline"
                    onClick={() =>
                      handleEditClick(
                        value.id,
                        value.name,
                        value.email,
                        value.mobile,
                        value.address,

                        value.profile_image
                      )
                    }
                    style={{ cursor: "pointer" }}
                    className="editIcon myedit"
                  />
                </div>
                <div className="pro-info">
                  <div className="info-right">
                    <h2>Name :</h2>
                    <br />
                    <h2>E-mail :</h2>
                    <br />
                    <h2>Mobile :</h2>
                    <br />
                    <h2>Address :</h2>
                  </div>
                  <div className="info-left">
                    <h2>
                      {" "}
                      <small> {value.name}</small>
                    </h2>
                    <br />
                    <h2>
                      <small>{value.email}</small>
                    </h2>
                    <br />
                    <h2>
                      <small> {value.mobile} </small>
                    </h2>
                    <br />
                    <h2>
                      <small>{value.address}</small>
                    </h2>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>

      {editPopup && (
        <>
          <div className="overlay"></div>
          <div className="edit-popup">
            <div className="hoursEditDiv">
              <label className="EditPoplabel">Name :</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="hoursInpEdit"
              />
            </div>
            <div className="hoursEditDiv">
              <label className="EditPoplabel">Email :</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="hoursInpEdit"
              />
            </div>

            <div className="hoursEditDiv">
              <label className="EditPoplabel">Mobile :</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="hoursInpEdit"
              />
            </div>
            <div className="hoursEditDiv">
              <label className="EditPoplabel">Address :</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="hoursInpEdit"
              />
            </div>

            <div className="hoursEditDiv">
              <label className="EditPoplabel">Profile Image :</label>
              {profileImageFile && (
                <img
                  alt=""
                  src={`http://localhost:3005/uploads/${profileImageFile}`}
                  className=""
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
              )}
              <input
                type="file"
                accept="image/jpeg"
                onChange={handleFile1Change}
                className="hoursInpEdit"
              />
            </div>

            <div className="actionpopButtons">
              <button onClick={handleSaveEdit} className="saveCancelBtn">
                Save
              </button>
              <button onClick={handleCancelEdit} className="saveCancelBtn">
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Task;

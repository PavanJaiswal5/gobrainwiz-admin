import React, { useContext, useState, useEffect, use } from "react";
import { collegeApi} from "../services/api/college.api";
import {userAuthApi} from "../services/api/userAuth.api"
import { getUserDataFromToken} from "../../utils/helpers/auth"
import {Navigate} from 'react-router'


import {
  Button,
  Dropdown,
  Form,
  Modal,
  Offcanvas,
  Table,
} from "react-bootstrap";
import { toast } from "react-toastify";
import Select from "react-select";

import data from "../Data";
import Navigation from "../components/Navigation";
import { Config } from "../components/ConfigProvider";
import Search from "../components/Search";
import { useAuth } from "../context/AuthContext";


function Colleges() {
  const { BwSwal } = useContext(Config);
  const [addModal, setAddmodal] = useState(false);
  const [viewModal, setViewmodal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    courses: [],
    phoneNumber: "",
    head: "",
    username: "",
    password: "",
  });
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [userData, setUserData] = useState(null);
   const { user } = useAuth();
  useEffect(() => {
    fetchColleges();
  
      
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  const filteredColleges = colleges.filter((college) =>
    college.collegeName.toLowerCase().includes(searchTerm)
  );
    // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColleges.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColleges.length / itemsPerPage);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all course items are in object format like { name: "BCA" }
    const normalizedCourses = (formData.courses || []).map((course) => {
      return typeof course === "string"
        ? data.courses2.find((c) => c.name === course) || { name: course }
        : course;
    });

    // Replace courses in formData with normalizedCourses
    const updatedFormData = { ...formData, courses: normalizedCourses };

    // Destructure updated data
    const { name, email, courses, phoneNumber, head, username, password, _id } =
      updatedFormData;

    // Basic Validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!name || name.length < 3)
      return toast.error("Name must be at least 3 characters.");
    if (!email || !emailRegex.test(email))
      return toast.error("Please enter a valid email.");
    if (!Array.isArray(courses) || courses.length === 0)
      return toast.error("Select at least one course.");
    if (!phoneNumber || phoneNumber.length !== 10 || isNaN(phoneNumber))
      return toast.error("Enter a valid 10-digit phone number.");
    if (!head || head.length < 3)
      return toast.error("Head must be at least 3 characters.");
    if (!username || username.length < 3)
      return toast.error("Username must be at least 3 characters.");
    if (!_id && (!password || password.length < 6))
      return toast.error("Password must be at least 6 characters.");

    try {
      const payload = {
        name,
        email,
        courses: courses.map((course) => course.name || course),
        phoneNumber,
        head,
        username,
      };
      console.log("Payload courses :", payload.courses);

      if (!_id) payload.password = password;

      let res;
      if (_id) {
        // Update existing college
        res = await collegeApi.updateCollege(_id, payload);
      } else {
        // Add new college
        res = await collegeApi.addCollege(payload);
      }

      if (res?.status === 200 || res?.status === 201 || res?.success) {
        toast.success(
          _id ? "College updated successfully!" : "College added successfully!"
        );
        setAddmodal(false);
        fetchColleges();
        setFormData({
          name: "",
          email: "",
          courses: [],
          phoneNumber: "",
          head: "",
          username: "",
          password: "",
        });
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Server Error");
    }
  };

  const fetchColleges = async () => {
    try {
      const res = await collegeApi.getCollegs();
      console.log("API Response:", res);
      if (res?.status === 200 || res?.success || res?.status === 201) {
        data.colleges = res.data;
        console.log("Colleges Data:", data.colleges);
        setColleges(data.colleges);
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to fetch colleges");
    }
  };
  const handleDeleteCollege = async (collegeId) => {
    try {
      const res = await collegeApi.deleteCollege(collegeId);
      console.log("API Response:", res);
      if (res?.status === 200 || res?.success || res?.status === 201) {
        toast.success("College Deleted Successfully!");
        fetchColleges();
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to delete college");
    }
  };

  const handleClearModel = () => {
    setFormData({
      name: "",
      email: "",
      courses: [],
      phoneNumber: "",
      head: "",
      username: "",
      password: "",
    });
    setAddmodal(false);
  };
  const handleAttendanceToggle = async (e, collegeId) => {
    const isChecked = e.target.checked;
    console.log("Attendance Toggle:", isChecked, collegeId);

    try {
      const res = await collegeApi.addAttendance(collegeId, isChecked);
      if (res?.status === 200 || res?.success || res?.status === 201) {
        toast.success(
          isChecked ? "Attendance Enabled!" : "Attendance Disabled!"
        );
        fetchColleges();
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Error updating attendance status");
      console.error("Attendance Toggle Error:", error);
    }
  };

// console.log(userData);
  return (
    <>
      <div>
        <Navigation
          items={[
            { label: "Courses", endpoint: "/account/courses" },
            { label: "Colleges", endpoint: "/account/colleges" },
            { label: "Students", endpoint: "/account/students" },
          ]}
        />
        <div className="flex-col flex md:flex-row md:items-center mb-[20px] gap-[10px]">
          <div className="text-[20px] font-bold flex-auto">Colleges</div>
          <Search onSearch={handleSearch} />
          {/* <div className="flex items-center gap-[10px]">
            <Button variant="outline-primary" className="bw-btn" >
              Upload Students <i className="fi fi-rr-upload"></i>
            </Button>
            
            <Button
              variant="primary"
              className="btn-icon"
              onClick={() => setAddmodal(true)}
            >
              <i className="fi fi-sr-plus"></i>
            </Button>
          </div> */}
          {user?.role === "superadmin" && (
  <div className="flex items-center gap-[10px]">
    <Button variant="outline-primary" className="bw-btn">
      Upload Students <i className="fi fi-rr-upload"></i>
    </Button>
    <Button
      variant="primary"
      className="btn-icon"
      onClick={() => setAddmodal(true)}
    >
      <i className="fi fi-sr-plus"></i>
    </Button>
  </div>
)}
        </div>
       <div className="table-responsive bw-card">
  <Table className="table table-hover bw-table m-0">
    <thead>
      <tr>
        <th>S.No</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Head</th>
        {user?.role === "superadmin" && (
          <>
            <th>Status</th>
            <th>Actions</th>
          </>
        )}
      </tr>
    </thead>
    <tbody>
      {Array.isArray(currentItems) && currentItems.length > 0 ? (
        currentItems.map((college, i) => (
          <tr key={college._id}>
            <td>{indexOfFirstItem + i + 1}</td>
            <td>{college.collegeName}</td>
            <td>{college.collegeEmail}</td>
            <td>{college.collegePhoneNumber}</td>
            <td>{college.collegeHead}</td>

            {user?.role === "superadmin" && (
              <>
                <td>
                  {college.status === "active" ? (
                    <span className="badge rounded-pill text-bg-primary">
                      Active
                    </span>
                  ) : (
                    <span className="badge rounded-pill text-bg-danger">
                      Inactive
                    </span>
                  )}
                </td>
                <td>
                  <Dropdown autoClose="outside">
                    <Dropdown.Toggle
                      variant="outline-default"
                      size="sm"
                      className="bw-btn"
                      bsPrefix=" "
                    >
                      Actions <i className="fi fi-sr-angle-small-down"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="bw-dropdown">
                      <Dropdown.Item as="button" onClick={() => setViewmodal(true)}>
                        <i className="fi fi-sr-eye"></i> View
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setFormData({
                            name: college.collegeName,
                            email: college.collegeEmail,
                            courses: college.courses,
                            phoneNumber: college.collegePhoneNumber,
                            head: college.collegeHead,
                            username: college.loginUserName,
                            password: college.loginPassword,
                            _id: college._id,
                          });
                          setAddmodal(true);
                        }}
                      >
                        <i className="fi fi-sr-edit"></i>Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() => toast.success("URL Copied!")}
                      >
                        <i className="fi fi-sr-copy"></i>Copy URL
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          BwSwal.fire({
                            text: `Are you sure you want to delete "${college.collegeName}"?`,
                            showCancelButton: true,
                            confirmButtonText: "Yes",
                            confirmButtonColor: "var(--bw-primary)",
                            cancelButtonText: "No",
                            icon: "warning",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleDeleteCollege(college._id);
                            }
                          });
                        }}
                      >
                        <i className="fi fi-sr-trash"></i>Delete
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item as="div" bsPrefix="px-[10px]">
                        <Form.Check
                          type="switch"
                          label="Attendance"
                          id={`attendance-${i}`}
                          checked={college.status === "active"}
                          onChange={(e) => handleAttendanceToggle(e, college._id)}
                        />
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </>
            )}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={user?.role === "superadmin" ? 7 : 5} className="text-center text-muted py-3">
            No colleges found.
          </td>
        </tr>
      )}
    </tbody>
  </Table>
</div>

       <div className="flex-col flex md:flex-row items-center gap-[10px] mt-[10px]">
  <div className="flex items-center gap-[10px] mr-auto">
    <select
      className="form-select form-select-sm"
      value={itemsPerPage}
      onChange={(e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // reset to first page
      }}
    >
      <option value={10}>10</option>
      <option value={25}>25</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
    </select>

    <span className="whitespace-nowrap">
      Showing {filteredColleges.length === 0 ? 0 : indexOfFirstItem + 1} to{" "}
      {Math.min(indexOfLastItem, filteredColleges.length)} of{" "}
      {filteredColleges.length} entries
    </span>
  </div>

  <nav>
    <ul className="pagination bw-card m-0">
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button
          className="page-link"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          <i className="fi fi-br-angle-left"></i>
        </button>
      </li>

      {[...Array(Math.ceil(filteredColleges.length / itemsPerPage))].map(
        (_, i) => (
          <li
            className={`page-item ${
              currentPage === i + 1 ? "active" : ""
            }`}
            key={i}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          </li>
        )
      )}

      <li
        className={`page-item ${
          currentPage === Math.ceil(filteredColleges.length / itemsPerPage)
            ? "disabled"
            : ""
        }`}
      >
        <button
          className="page-link"
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(
                prev + 1,
                Math.ceil(filteredColleges.length / itemsPerPage)
              )
            )
          }
        >
          <i className="fi fi-br-angle-right"></i>
        </button>
      </li>
    </ul>
  </nav>
</div>

      </div>
      <Modal
        className="bw-modal"
        show={addModal}
        onHide={() => handleClearModel()}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {formData._id ? "Update College" : "Add College"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            <div className="row g-3">
              <div className="col-md-12">
                <div>
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control bw-form-control"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control bw-form-control"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <label className="form-label">Courses</label>
                  <Select
                    isMulti
                    options={data.courses2}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.name}
                    value={formData.courses}
                    onChange={(selected) =>
                      setFormData({ ...formData, courses: selected })
                    }
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control bw-form-control"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div>
                  <label className="form-label">Head</label>
                  <input
                    type="text"
                    className="form-control bw-form-control"
                    value={formData.head}
                    onChange={(e) =>
                      setFormData({ ...formData, head: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div>
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control bw-form-control"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                </div>
              </div>
              {!formData._id && (
                <div className="col-md-12">
                  <div>
                    <label className="form-label">Password</label>
                    <input
                      type="text"
                      className="form-control bw-form-control"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            className="bw-btn"
            onClick={handleClearModel}
          >
            Cancel
          </Button>
          <Button variant="primary" className="bw-btn" onClick={handleSubmit}>
            {formData._id ? "Update" : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Offcanvas
        placement="end"
        show={viewModal}
        onHide={() => setViewmodal(false)}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>College Info</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="list-group">
            {Object.keys(data.colleges[0]).map((key, i) => (
              <div key={i} className="list-group-item">
                <div className="text-[12px] text-gray-400 capitalize">
                  {key}
                </div>
                <div>
                  {key == "status" ? (
                    data.colleges[key] ? (
                      <span className="badge rounded-pill text-bg-primary">
                        Active
                      </span>
                    ) : (
                      <span className="badge rounded-pill text-bg-danger">
                        Inactive
                      </span>
                    )
                  ) : (
                    data.colleges[0][key]
                  )}
                </div>
              </div>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Colleges;

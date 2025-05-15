import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
 import { BsTrashFill, BsPencilSquare, BsThreeDotsVertical } from "react-icons/bs";

import {
  Button,
  Tab,
  Tabs,
  Table,
  Form,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userAuthApi } from "../services/api/userAuth.api";

const roles = ["content", "marketing", "tech", "hr", "admin"];

function EmployeeAccess() {
  const [employeeList, setEmployeeList] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone: "",
    role: "",
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  const fetchEmployeeList = async () => {
    try {
      const res = await userAuthApi.getCurrentUser();
      if (res.success) {
        setEmployeeList(res.users);
      } else {
        toast.error(res.message || "Failed to fetch employees");
      }
    } catch (err) {
      toast.error("Something went wrong while fetching users");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { username, password, phone, role } = formData;
    if (!username || !password || !phone || !role) {
      toast.warning("Please fill all fields");
      return false;
    }
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      toast.warning("Phone number must be 10 digits");
      return false;
    }
    if (password.length < 6) {
      toast.warning("Password should be at least 6 characters");
      return false;
    }
    return true;
  };

 const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    const res = await userAuthApi.userSignup(formData);
    console.log("hi the res is :", res);
    
    if (res.success) {
      toast.success(res.message || "Employee added successfully");
      setFormData({ username: "", password: "", phone: "", role: "" });
      fetchEmployeeList();
    } else {
      toast.error(res.message || "Signup failed");
    }
  } catch (err) {
    toast.error("Something went wrong during signup");
  }
};

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      phone: user.phone,
      role: user.role,
      password: "", // password will be reset or changed
    });
    setShowEditModal(true);
  };

  const handleEditSave = async () => {
    try {
      const res = await userAuthApi.editUser(selectedUser._id, formData);
      if (res.success) {
        toast.success("User updated successfully");
        setFormData({
          username: "",
          phone: "",
          role: "",
          password: "",
        });
        setShowEditModal(false);

        fetchEmployeeList();
      } else {
        toast.error("Failed to update user");
      }
    } catch (err) {
      toast.error("Something went wrong while updating user");
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await userAuthApi.deleteUser(userId);

      if (res.status === 200 && res.success) {
        toast.success(res.message || "Employee added successfully");
        fetchEmployeeList();
      } else {
        toast.error(res.message || "Signup failed");
      }
    } catch (err) {
      toast.error("Something went wrong while deleting user");
    }
  };

  return (
    <div>
      {/* <Navigation items={[
        { label: "Employee List", endpoint: "/account/representatives" },
        { label: "Add Employee", endpoint: "/account/employee-access" }
      ]} /> */}

      <div className="text-[20px] font-bold mb-4">Employee Access</div>

      <Tabs defaultActiveKey="list" className="mb-3">
        <Tab eventKey="list" title="Employee List">
          <Table className="table table-hover bw-table m-0">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Username</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employeeList.map((emp, i) => (
                <tr key={emp._id}>
                  <td>{i + 1}</td>
                  <td>{emp.username}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.role}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary" size="sm">
                        <i className="bi bi-three-dots-vertical"></i>   Actions
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => openEditModal(emp)}>
                           <i className="bi bi-pencil-square me-2 text-primary"></i>  Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleDelete(emp._id)}
                          className="text-danger"
                        > Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="add" title="Add Employee">
          <div className="bw-card p-4">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="">Select Role</option>
                  {roles.map((role, i) => (
                    <option key={i} value={role}>
                      {role}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Button variant="primary" onClick={handleSubmit}>
                Add Employee
              </Button>
            </Form>
          </div>
        </Tab>
      </Tabs>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="">Select Role</option>
                {roles.map((role, i) => (
                  <option key={i} value={role}>
                    {role}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EmployeeAccess;

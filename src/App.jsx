import React, { useState } from "react";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Rohan",
      employeeId: "EMP101",
      department: "IT",
      gender: "Male",
      phone: "9876543210",
      localAddress: "Kolkata",
      permanentAddress: "West Bengal",
    },
    {
      id: 2,
      name: "Priya",
      employeeId: "EMP102",
      department: "HR",
      gender: "Female",
      phone: "9876501234",
      localAddress: "Delhi",
      permanentAddress: "Bihar",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    department: "IT",
    gender: "Male",
    phone: "",
    localAddress: "",
    permanentAddress: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add or Update employee
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.employeeId ||
      !formData.phone ||
      !formData.localAddress ||
      !formData.permanentAddress
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editingId !== null) {
      setEmployees(
        employees.map((employee) =>
          employee.id === editingId
            ? { ...formData, id: editingId }
            : employee
        )
      );

      setEditingId(null);
      alert("Employee updated successfully!");
    } else {
      const newEmployee = {
        ...formData,
        id: Date.now(),
      };

      setEmployees([...employees, newEmployee]);
      alert("Employee added successfully!");
    }

    clearForm();
  };

  // Delete employee
  const deleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((employee) => employee.id !== id));
    }
  };

  // Edit employee
  const editEmployee = (employee) => {
    setFormData({
      name: employee.name,
      employeeId: employee.employeeId,
      department: employee.department,
      gender: employee.gender,
      phone: employee.phone,
      localAddress: employee.localAddress,
      permanentAddress: employee.permanentAddress,
    });

    setEditingId(employee.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Clear form
  const clearForm = () => {
    setFormData({
      name: "",
      employeeId: "",
      department: "IT",
      gender: "Male",
      phone: "",
      localAddress: "",
      permanentAddress: "",
    });
  };

  // Search + department filter
  const filteredEmployees = employees.filter((employee) => {
    const searchText =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      employee.phone.includes(search);

    const departmentMatch =
      department === "All" || employee.department === department;

    return searchText && departmentMatch;
  });

  return (
    <div className="app">
      <header>
        <h1>Employee Directory</h1>
        <p>Employee Management System</p>
      </header>

      <main>
        {/* Employee Form */}
        <section className="form-section">
          <h2>
            {editingId !== null ? "Edit Employee" : "Add Employee"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter employee name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Employee ID</label>
                <input
                  type="text"
                  name="employeeId"
                  placeholder="Enter employee ID"
                  value={formData.employeeId}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>

              <div>
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Local Address</label>
                <input
                  type="text"
                  name="localAddress"
                  placeholder="Enter local address"
                  value={formData.localAddress}
                  onChange={handleChange}
                />
              </div>

              <div className="full-width">
                <label>Permanent Address</label>
                <textarea
                  name="permanentAddress"
                  placeholder="Enter permanent address"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className="buttons">
              <button type="submit" className="add-btn">
                {editingId !== null ? "Update Employee" : "Add Employee"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setEditingId(null);
                    clearForm();
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Search and Filter */}
        <section className="controls">
          <div>
            <label>Search Employee</label>
            <input
              type="text"
              placeholder="Search by name, ID or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div>
            <label>Department Filter</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="All">All Departments</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="count">
            <strong>{filteredEmployees.length}</strong>
            <span>Employees Found</span>
          </div>
        </section>

        {/* Employee List */}
        <section>
          <h2>Employee List</h2>

          {filteredEmployees.length === 0 ? (
            <div className="no-data">
              <h3>No Employees Found</h3>
              <p>Try changing your search or department filter.</p>
            </div>
          ) : (
            <div className="employee-grid">
              {filteredEmployees.map((employee) => (
                <div className="employee-card" key={employee.id}>
                  <div className="card-header">
                    <div className="avatar">
                      {employee.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h3>{employee.name}</h3>
                      <p>{employee.employeeId}</p>
                    </div>
                  </div>

                  <div className="employee-info">
                    <p>
                      <strong>Department:</strong>{" "}
                      {employee.department}
                    </p>

                    <p>
                      <strong>Gender:</strong> {employee.gender}
                    </p>

                    <p>
                      <strong>Phone:</strong> {employee.phone}
                    </p>

                    <p>
                      <strong>Local Address:</strong>{" "}
                      {employee.localAddress}
                    </p>

                    <p>
                      <strong>Permanent Address:</strong>{" "}
                      {employee.permanentAddress}
                    </p>
                  </div>

                  <div className="card-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => editEmployee(employee)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteEmployee(employee.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer>
        <p>© 2026 Employee Directory | React Assignment</p>
      </footer>
    </div>
  );
}

export default App;
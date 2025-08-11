import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function Edit() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [values, setValues] = useState({
    FirstName: "",
    LastName: "",
    Gender: "",
    DOB: "",
    Email: "",
    Phone: "",
    Department: "",
    HireDate: "",
    Salary: "",
    Status: "",
    Address: "",
  });


  useEffect(() => {
    axios.get("http://localhost:2000/api/getstaff/" + id)
      .then((res) => {
        const employeeData = res.data.result[0];
        const formatDate = (dateString) => {
          const date = new Date(dateString);
          return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
        };
        employeeData.DOB = formatDate(employeeData.DOB);
        employeeData.HireDate = formatDate(employeeData.HireDate);
        setValues(employeeData);
    })
  },[id])
  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
  }))
}

  
  const handleSubmit = (e) => {
    e.preventDefault();    
    axios.put("http://localhost:2000/update/" + id, values)
      .then(() => {
        alert("Data updated successfully");
        navigate("/")
      })
  }
  return (
    <div className="h-screen justify-center">
      <div className="w-150 bg-white shadow-2xl rounded-3xl border-gray-500 border-1 p-4 mx-auto mt-20">
        <h1 className="font-bold text-center text-3xl">Update Employee Data</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="">
                <span className="font-medium text-xl">First name:</span>
                <input
                  type="text"
                  name="FirstName"
                  value={values.FirstName}
                  onChange={handleChange}
                  className="border-1 border-gray-500 w-full rounded p-1 focus:ring-3 focus:ring-blue-700/50 focus:outline-0"
                />
                {values.FirstName}
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="">
                <span className="font-medium text-xl">Last name:</span>
                <input
                  value={values.LastName}
                  onChange={handleChange}
                  type="text"
                  name="LastName"
                  className="border-1 border-gray-500 w-full rounded p-1 focus:ring-3 focus:ring-blue-700/50 focus:outline-0"
                />
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="">
                <span className="font-medium text-xl">Gender:</span>
                <input
                  type="text"
                  value={values.Gender}
                  onChange={handleChange}
                  name="Gender"
                  className="border-1 border-gray-500 w-full rounded p-1 focus:ring-3 focus:ring-blue-700/50 focus:outline-0"
                />
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="">
                <span className="font-medium text-xl">DOB:</span>
                <input
                  type="date"
                  value={values.DOB}
                  onChange={handleChange}
                  name="DOB"
                  className="border-1 border-gray-500 w-full rounded p-1 focus:ring-3 focus:ring-blue-700/50 focus:outline-0"
                />
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="">
                <span className="font-medium text-xl">Email:</span>
                <input
                  value={values.Email}
                  onChange={handleChange}
                  type="email"
                  name="Email"
                  className="border-1 border-gray-500 w-full rounded p-1 focus:ring-3 focus:ring-blue-700/50 focus:outline-0"
                />
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="">
                <span className="font-medium text-xl">Phone:</span>
                <input
                  value={values.Phone}
                  onChange={handleChange}
                  type="number"
                  name="Phone"
                  className="border-1 border-gray-500 w-full rounded p-1 focus:ring-3 focus:ring-blue-700/50 focus:outline-0"
                />
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="">
                <span className="font-medium text-xl">Department:</span>
                <input
                  type="text"
                  value={values.Department}
                  onChange={handleChange}
                  name="Department"
                  className="border-1 border-gray-500 w-full rounded p-1 focus:ring-3 focus:ring-blue-700/50 focus:outline-0"
                />
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="">
                <span className="font-medium text-xl">HireDate:</span>
                <input
                  value={values.HireDate}
                  onChange={handleChange}
                  type="date"
                  name="HireDate"
                  className="border-1 border-gray-500 w-full rounded p-1 focus:ring-3 focus:ring-blue-700/50 focus:outline-0"
                />
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="">
                <span className="font-medium text-xl">Salary:</span>
                <input
                  value={values.Salary}
                  onChange={handleChange}
                  type="text"
                  name="Salary"
                  className="border-1 border-gray-500 w-full rounded p-1 focus:ring-3 focus:ring-blue-700/50 focus:outline-0"
                />
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="">
                <span className="font-medium text-xl">Status:</span>
                <input
                  value={values.Status}
                  onChange={handleChange}
                  type="text"
                  name="Status"
                  className="border-1 border-gray-500 w-full rounded p-1 focus:ring-3 focus:ring-blue-700/50 focus:outline-0"
                />
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="">
                <span className="font-medium text-xl">Address:</span>
                <input
                  value={values.Address}
                  onChange={handleChange}
                  type="text"
                  name="Address"
                  className="border-1 border-gray-500 w-full rounded p-1 focus:ring-3 focus:ring-blue-700/50 focus:outline-0"
                />
              </label>
            </div>
            <div className="flex gap-4 items-center">
              <div className="mt-3">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-1 px-2 rounded "
                >
                  Save
                </button>
              </div>
              <div className="mt-3">
                <Link
                  to="/"
                  className="bg-red-500 text-white py-1 px-2 rounded "
                >
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

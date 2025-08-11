import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function Edit() {
  const { id } = useParams();
  const navidate = useNavigate();
  const [Post, setPost] = useState([]);
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
    post:""
  });
  useEffect(() =>{
    axios.get("https://hrms-acsdsa-api-7acb9bf188ac.herokuapp.com/post")
    .then((res) =>{
      setPost(res.data.result);
      console.log(res.data);
    })
  })
    
  useEffect(() => {
    axios.get(`https://hrms-acsdsa-api-7acb9bf188ac.herokuapp.com/api/getstaff/${id}`).then((res) => {
      const employeeData = res.data.result[0];
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
      };
      employeeData.DOB = formatDate(employeeData.DOB);
      employeeData.HireDate = formatDate(employeeData.HireDate);
      setValues(employeeData);
    });
  }, [id]);

  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`https://hrms-acsdsa-api-7acb9bf188ac.herokuapp.com/api/updatestaff/${id}`, values)
      .then(() => {
        alert("Updated successfully");
        navidate(`/read/${id}`);
      });
  };
  const getMaxDOB = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split("T")[0]; // YYYY-MM-DD
  };
  return (
    <div className="h-screen justify-center">
      <div className="w-150 bg-white shadow-2xl rounded-3xl border-gray-500 border-1 p-4 mx-auto mt-20">
        <h1 className="font-bold text-center text-3xl">Update Employee Data</h1>
        <div>
          <form onSubmit={handleUpdate}>
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
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="">
                <span className="font-medium text-xl">Last name:</span>
                <input
                  type="text"
                  name="LastName"
                  value={values.LastName}
                  onChange={handleChange}
                  className="border-1 border-gray-500 w-full rounded p-1 focus:ring-3 focus:ring-blue-700/50 focus:outline-0"
                />
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="">
                <span className="font-medium text-xl">Gender:</span>
                <input
                  type="text"
                  name="Gender"
                  value={values.Gender}
                  onChange={handleChange}
                  className="border-1 border-gray-500 w-full rounded p-1 focus:ring-3 focus:ring-blue-700/50 focus:outline-0"
                />
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="">
                <span className="font-medium text-xl">DOB:</span>
                <input
                  type="date"
                  name="DOB"
                  max={getMaxDOB()}
                  value={values.DOB}
                  onChange={handleChange}
                  className="border-1 border-gray-500 w-full rounded p-1 focus:ring-3 focus:ring-blue-700/50 focus:outline-0"
                />
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="">
                <span className="font-medium text-xl">Email:</span>
                <input
                  type="email"
                  name="Email"
                  value={values.Email}
                  onChange={handleChange}
                  className="border-1 border-gray-500 w-full rounded p-1 focus:ring-3 focus:ring-blue-700/50 focus:outline-0"
                />
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="">
                <span className="font-medium text-xl">Phone:</span>
                <input
                  type="number"
                  name="Phone"
                  value={values.Phone}
                  onChange={handleChange}
                  className="border-1 border-gray-500 w-full rounded p-1 focus:ring-3 focus:ring-blue-700/50 focus:outline-0"
                />
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="">
                <span className="font-medium text-xl">Department:</span>
                <input
                  type="text"
                  name="Department"
                  value={values.Department}
                  onChange={handleChange}
                  className="border-1 border-gray-500 w-full rounded p-1 focus:ring-3 focus:ring-blue-700/50 focus:outline-0"
                />
              </label>
              <div className="mb-2">
              <label htmlFor="">
                  <span className="font-medium text-xl">Job Title</span>
                 
                  <select  className="border-1 border-gray-500 w-full rounded p-1 focus:ring-3 focus:ring-blue-700/50 focus:outline-0" name="post" id=""  onChange={handleChange}>
                  <option value="">Select Post</option>
                  {Post.map((post) =>(
                    <option value={post.PostID}>{post.PostTitle}</option>
                  ))}
                </select>
              </label>
            </div>
            </div>
            <div className="mb-2">
              <label htmlFor="">
                <span className="font-medium text-xl">HireDate:</span>
                <input
                  type="date"
                  name="HireDate"
                  value={values.HireDate}
                  onChange={handleChange}
                  className="border-1 border-gray-500 w-full rounded p-1 focus:ring-3 focus:ring-blue-700/50 focus:outline-0"
                />
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="">
                <span className="font-medium text-xl">Salary:</span>
                <input
                  type="text"
                  name="Salary"
                  value={values.Salary}
                  onChange={handleChange}
                  className="border-1 border-gray-500 w-full rounded p-1 focus:ring-3 focus:ring-blue-700/50 focus:outline-0"
                />
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="">
                <span className="font-medium text-xl">Status:</span>
                <input
                  type="text"
                  name="Status"
                  value={values.Status}
                  onChange={handleChange}
                  className="border-1 border-gray-500 w-full rounded p-1 focus:ring-3 focus:ring-blue-700/50 focus:outline-0"
                />
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="">
                <span className="font-medium text-xl">Address:</span>
                <input
                  type="text"
                  name="Address"
                  value={values.Address}
                  onChange={handleChange}
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

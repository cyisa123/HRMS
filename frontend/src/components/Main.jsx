import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Main() {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://hrms-acsdsa-api-7acb9bf188ac.herokuapp.com/api/getstaff")

      .then((res) => {
        console.log(res);

        const updatedEmployeeData = res.data.result.map((emp) => {
          emp.DOB = new Date(emp.DOB).toLocaleDateString();
          emp.HireDate = new Date(emp.HireDate).toLocaleDateString();
          return emp;
        });
        setEmployees(updatedEmployeeData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);
  const handleDelete = (id) => {
    axios
      .delete("https://hrms-acsdsa-api-7acb9bf188ac.herokuapp.com/api/deletestaff/" + id)
      .then((res) => {
        console.log(res);
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

 
  if (loading) return <div>Loading... </div>;
  if (employees.length === 0)
    return (
      <div className="flex justify-center items-center m-10 gap-3">
        No data available{" "}
        <div className="">
          <Link
            className="bg-blue-500 text-white py-2 px-2  rounded font-semibold"
            to="/addstaff"
          >
            Create +
          </Link>
        </div>
      </div>
    );
  return (
    <div className="h-screen">
      <div className="w-full text-center font-bold p-4 text-2xl">
        <h1>Hospital Staff Portal</h1>
      </div>

      <div>
        <h2 className="ml-4 font-bold p-4 pb-0">Hospital staff</h2>
        <hr />
        <div className="m-6 overflow-x-auto rounded-xl shadow-lg border border-gray-200">
          <div className="flex justify-end items-end">
            <Link
              className="bg-blue-500 text-white py-2 px-2  rounded font-semibold"
              to="/addstaff"
            >
              Create +
            </Link>
          </div>
          <table className="min-w-full table-auto text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-500 whitespace-nowrap">
              <tr>
                <th className="px-2 py-3">#</th>
                <th className="px-2 py-3">First Name</th>
                <th className="px-2 py-3">Last Name</th>
                <th className="px-2 py-3">Gender</th>
                <th className="px-2 py-3">DOB</th>
                <th className="px-2 py-3">Email</th>
                <th className="px-2 py-3">Department</th>
                <th className="px-2 py-3">Hire Date</th>
                <th className="px-2 py-3">Salary</th>
                <th className="px-2 py-3">Status</th>
                <th className="px-2 py-3">Address</th>
                <th className="px-2 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white  whitespace-nowrap">
              {employees.map((employee, index) => (
                <tr className="hover:bg-gray-50" key={employee.EmployeeID}>
                  <td className="px-2 py-3"> {index + 1}</td>
                  <td className="px-2 py-3 font-medium text-gray-900">
                    {employee.FirstName}
                  </td>
                  <td className="px-2 py-3">{employee.LastName}</td>
                  <td className="px-2 py-3"> {employee.Gender}</td>
                  <td className="px-2 py-3">{employee.DOB}</td>
                  <td className="px-2 py-3">{employee.Email}</td>
                  <td className="px-2 py-3">{employee.Department}</td>
                  <td className="px-2 py-3">{employee.HireDate}</td>
                  <td className="px-2 py-3">{employee.Salary}</td>
                  <td className="px-2 py-3">
                    <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                      {employee.Status}
                    </span>
                  </td>
                  <td className="px-2 py-3">{employee.Address}</td>
                  <td className="px-2 py-3 space-x-2">
                    <Link
                      to={`/read/${employee.EmployeeID}`}
                      className="px-3 py-1 rounded bg-blue-200 text-blue-600 hover:bg-blue-300 transition"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit/${employee.EmployeeID}`}
                      className="px-3 py-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(employee.EmployeeID)}
                      className="px-3 py-1 rounded bg-red-200 text-red-600 hover:bg-red-300 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

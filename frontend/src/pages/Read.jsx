import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Read() {
  const [users, setUsers] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://hrms-acsdsa-api-7acb9bf188ac.herokuapp.com/api/getstaff/${id}`).then((res) => {
      const employeeData = res.data.result[0];

      employeeData.DOB = new Date(employeeData.DOB).toLocaleDateString();
      employeeData.HireDate = new Date(
        employeeData.HireDate
      ).toLocaleDateString();
      setUsers(employeeData);
    });
  }, [id]);
  return (
    <div className="h-screen justify-center">
      <div className=" w-150 bg-white shadow-2xl rounded-3xl border-gray-500 border-1 p-4 mx-auto mt-20">
        <h1 className="font-bold text-2xl text-center">
          Hello, this is Data for {users.FirstName} {users.LastName}
        </h1>
        <h1>
          <span className="font-semibold">First Name:</span> {users.FirstName}
        </h1>
        <h1>Last Name:{users.LastName}</h1>
        <h1>Gender: {users.Gender}</h1>
        <h1>DOB : {users.DOB}</h1>
        <h1>Email :{users.Email}</h1>
        <h1> Department:{users.Department}</h1>
        <h1>Hire Date :{users.HireDate}</h1>
        <h1> Salary:{users.Salary}</h1>
        <h1> Status: {users.Status}</h1>
        <h1> Address: {users.Address}</h1>
        <div className="font-medium flex mt-6 gap-4">
          <div>
            <Link className="border-blue-500 bg-blue-500  text-white border-1 rounded px-4 py-1" to="/">Back</Link>
          </div>{" "}
          <div>
            <Link className="border-yellow-500 bg-yellow-500  text-white border-1 rounded px-4 py-1" to={`/edit/${id}`}>Update</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

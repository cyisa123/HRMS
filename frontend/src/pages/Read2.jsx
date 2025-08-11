import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Read() {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("https://hrms-acsdsa-api-7acb9bf188ac.herokuapp.com/api/getstaff/" + id)
      .then((res) => {
        const values = res.data.result[0];
        console.log(values);
        setUser(values);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  return (
    <div>
      <h3>USERS Data</h3>
      <div>
        <h2>Fullname: {user.FirstName}</h2>
        <h2>LastName: {user.LastName}</h2>
        <h2>Gender: {user.Gender}</h2>
        <h2>Email: {user.Email}</h2>
        <h2>Fullname: {user.FirstName}</h2>
        <h2>Fullname: {user.FirstName}</h2>
      </div>
    </div>
  );
}

import axios from "axios";
import React, { useState } from "react";

export default function Register() {
  const [fullname, setFullname] = useState("");
const [error, setError] = useState("");

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      axios.post("http://localhost:2000/api/fronttest", fullname).then(() => {
        alert(`Data sent!... ${fullname}`);
      })
        .catch((err) => {
          console.error("There was an error sending the data!", err);
        })
    }
    catch (errr) {
      setError(errr);
      console.error("There was an error!", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="p-3">
        <span className="h-10 w-full bg-red-600/40 text-black">{ error}</span>
        <label htmlFor="">Fullnanme:</label>
        <input
          className="border"
          type="text"
          name="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 rounded p-1 text-white m-3"
        >
          Send
        </button>
      </form>
      {fullname}
    </div>
  );
}

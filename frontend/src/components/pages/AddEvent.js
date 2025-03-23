import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/AddEvent.css";

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    price: "",
    organizer: "",
    date: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setEventData({ ...eventData, image: e.target.files[0] });
    } else {
      setEventData({ ...eventData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(eventData).forEach((key) =>
      formData.append(key, eventData[key])
    );

    const response = await fetch("http://localhost:5001/api/events", {
      method: "POST",
      body: formData,
    });
    if (response.ok) navigate("/events");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        placeholder="Event Name"
        required
      />
      <textarea
        name="description"
        onChange={handleChange}
        placeholder="Event Description"
        required
      />
      <input
        type="number"
        name="price"
        onChange={handleChange}
        placeholder="Price (0 for Free)"
        required
      />
      <input
        type="text"
        name="organizer"
        onChange={handleChange}
        placeholder="Organizer Name"
        required
      />
      <input type="date" name="date" onChange={handleChange} required />
      <input
        type="file"
        name="image"
        onChange={handleChange}
        accept="image/*"
        required
      />
      <button type="submit">Add Event</button>
    </form>
  );
};

export default AddEvent;

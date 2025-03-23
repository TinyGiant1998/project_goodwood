import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/EventPage.css";

const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({
    name: "",
    description: "",
    price: "",
    organizer: "",
    image: null,
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/events/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEvent(data);
          setUpdatedEvent({
            name: data.name,
            description: data.description,
            price: data.price,
            organizer: data.organizer,
            image: null,
          });
        } else {
          console.error("Failed to fetch event");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5001/api/events/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        navigate("/events"); // Redirect to events page after deletion
      } else {
        console.error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const confirmUpdate = window.confirm(
      "Are you sure you want to update this event?"
    );
    if (!confirmUpdate) return;

    const formData = new FormData();
    formData.append("name", updatedEvent.name);
    formData.append("description", updatedEvent.description);
    formData.append("price", updatedEvent.price);
    formData.append("organizer", updatedEvent.organizer);
    if (updatedEvent.image) formData.append("image", updatedEvent.image);

    try {
      const response = await fetch(`http://localhost:5001/api/events/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const updatedData = await response.json();
        setEvent(updatedData);
        setEditing(false);
      } else {
        console.error("Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  if (!event) return <p>Loading event...</p>;

  return (
    <div className="event-page">
      {!editing ? (
        <>
          <h2>{event.name}</h2>
          <img src={`http://localhost:5001${event.image}`} alt={event.name} />
          <p>{event.description}</p>
          <p>
            <strong>Price:</strong>{" "}
            {event.price === "0" ? "Free" : `$${event.price}`}
          </p>
          <p>
            <strong>Organizer:</strong> {event.organizer}
          </p>
          <button onClick={() => setEditing(true)} className="edit-btn">
            Edit
          </button>
          <button onClick={handleDelete} className="delete-btn">
            Delete
          </button>
        </>
      ) : (
        <form onSubmit={handleUpdate} className="edit-event-form">
          <input
            type="text"
            value={updatedEvent.name}
            onChange={(e) =>
              setUpdatedEvent({ ...updatedEvent, name: e.target.value })
            }
            required
          />
          <textarea
            value={updatedEvent.description}
            onChange={(e) =>
              setUpdatedEvent({ ...updatedEvent, description: e.target.value })
            }
            required
          />
          <input
            type="number"
            value={updatedEvent.price}
            onChange={(e) =>
              setUpdatedEvent({ ...updatedEvent, price: e.target.value })
            }
            required
          />
          <input
            type="text"
            value={updatedEvent.organizer}
            onChange={(e) =>
              setUpdatedEvent({ ...updatedEvent, organizer: e.target.value })
            }
            required
          />
          <input
            type="file"
            onChange={(e) =>
              setUpdatedEvent({ ...updatedEvent, image: e.target.files[0] })
            }
          />
          <button type="submit">Update Event</button>
          <button onClick={() => setEditing(false)} className="cancel-btn">
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default EventPage;

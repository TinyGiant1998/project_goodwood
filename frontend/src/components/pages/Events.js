import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../style/Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/events");
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="events-container">
      <h2>Events Calender</h2>
      <Calendar onChange={setDate} value={date} />
      <h3>Upcoming Events</h3>

      <div className="event-list">
        {events.length === 0 ? (
          <p>No Upcoming Events. Please check later.</p>
        ) : (
          events.map((event) => (
            <Link
              to={`/event/${event._id}`}
              key={event._id}
              className="event-card"
            >
              <img
                src={`http://localhost:5001${event.image}`}
                alt={event.name}
              />
              <div className="event-info">
                <h4>{event.name}</h4>
                <p>
                  <strong>Price:</strong>{" "}
                  {event.price === 0 ? "Free" : `$${event.price}`}
                </p>
                <p>
                  <strong>Organizer:</strong> {event.organizer}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
      <div className="add-event-btn-container">
        <Link to="/add-event" className="add-event-btn">
          Add Event
        </Link>
      </div>
    </div>
  );
};

export default Events;

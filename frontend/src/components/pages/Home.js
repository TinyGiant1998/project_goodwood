import React, { useEffect, useState } from "react";
import "../style/Home.css";

const Home = () => {
  const [latestEvent, setLatestEvent] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/events");
        if (response.ok) {
          const events = await response.json();

          const futureEvents = events.filter(
            (event) => new Date(event.date) >= new Date()
          );
          futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

          setLatestEvent(futureEvents[0] || null);
          setUpcomingEvents(futureEvents.slice(1));
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
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <img className="hero-image" src="/hero.avif" alt="Community" />

        <h1>
          Welcome to Goodwood <br />
          Community Centre
        </h1>
        <p className="intro-text">
          Discover a hub of activity and warmth at our community centre. Engage
          in diverse programs and events that bring people together. Join us in
          creating a vibrant and inclusive community space for all.
        </p>
      </div>

      {/* Latest Event Section */}
      {latestEvent && (
        <div className="latest-event-section">
          <h2>Events and Programs</h2>
          <div className="latest-event">
            <div className="event-details">
              <h3>{latestEvent.name}</h3>
              <p>{latestEvent.description}</p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(latestEvent.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Price:</strong>{" "}
                {latestEvent.price === 0 ? "Free" : `$${latestEvent.price}`}
              </p>
              <p>
                <strong>Location:</strong> {latestEvent.location}
              </p>
            </div>
            <img
              className="event-image"
              src={`http://localhost:5001${latestEvent.image}`}
              alt={latestEvent.name}
            />
          </div>
        </div>
      )}

      {/* Upcoming Events Table */}
      <div className="upcoming-events-section">
        <h2>Services</h2>
        <table className="upcoming-events-table">
          {/* <thead>
            <tr>
              <th>Event Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Location</th>
              <th>Book Now</th>
            </tr>
          </thead> */}
          <tbody>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <tr key={event._id}>
                  <td>{event.name}</td>
                  <td>{event.description}</td>
                  <td>{event.price === 0 ? "Free" : `$${event.price}`}</td>
                  <td>{event.location}</td>
                  <td>
                    <button className="book-now-btn">Book Now</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No upcoming events</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* News & Updates Section */}
      <div className="news-updates">
        <h2>News & Updates</h2>
        <h3>Stay Informed & Engaged</h3>
        <p>
          Keep up with the latest news, events, and activities happening at
          Goodwood Community Centre. Stay connected with us to be part of our
          community initiatives and projects.
        </p>

        {/* Four Sections in a Cross */}
        <div className="cross-sections">
          <div className="cross-section">
            <h3>Events</h3>
            <p>Upcoming Activities</p>
            <p>
              Join us for exciting events that cater to various interests and
              age groups. Our events are designed to bring the community
              together and create memorable experiences for everyone.
            </p>
          </div>
          <div className="cross-section">
            <h3>Programs</h3>
            <p>Diverse Offerings</p>
            <p>
              Discover our wide range of programs tailored to engage, educate,
              and entertain community members. From cultural workshops to
              fitness classes, there's something for everyone at Goodwood
              Community Center.
            </p>
          </div>
          <div className="cross-section">
            <h3>Workshops</h3>
            <p>Learning Opportunities</p>
            <p>
              Participate in our interactive workshops designed to enhance
              skills, foster creativity, and promote personal growth. Join us in
              our mission to empower individuals through continuous learning and
              development.
            </p>
          </div>
          <div className="cross-section">
            <h3>Cultural Events</h3>
            <p>Celebrating Diversity</p>
            <p>
              Immerse yourself in the rich tapestry of cultural events hosted at
              Goodwood Community Center. Experience the beauty of various
              traditions, art forms, and performances that showcase our
              community's diversity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import { Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/pages/Navbar";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Footer from "./components/pages/Footer";
import AboutUs from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Events from "./components/pages/Events";
import Gallery from "./components/pages/Gallery";
import CommunityEngagement from "./components/pages/CommunityEngagement";
import MembershipDonation from "./components/pages/MembershipDonation";
import WhatWeDo from "./components/pages/WhatWeDo";
import ScrollToTop from "./hooks/ScrollToTop";
import "./App.css";
import EventPage from "./components/pages/EventPage";
import AddEvent from "./components/pages/AddEvent";
import UserProfile from "./components/pages/UserProfile";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <ScrollToTop />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home route */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contactUs" element={<Contact />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route
            path="/communityEngagement"
            element={<CommunityEngagement />}
          />
          <Route path="/membershipDonation" element={<MembershipDonation />} />
          <Route path="/whatWeDo" element={<WhatWeDo />} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/user" element={<UserProfile />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

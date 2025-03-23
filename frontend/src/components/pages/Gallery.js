import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  // Fetch event images from the backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/gallery"); // Fetch event images
        setImages(response.data); // Set fetched images
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };

    fetchImages();
  }, []);

  // Open Modal
  const openModal = (imageUrl) => {
    console.log("Opening modal with image:", imageUrl);
    setCurrentImage(imageUrl);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage("");
  };

  return (
    <div className="gallery">
      <h1>
        Photos from <br />
        Past Events
      </h1>

      <div className="gallery-grid">
        {images.length === 0 ? (
          <p>No images available.</p> // Message if no images
        ) : (
          images.map((image) => (
            <div
              key={image._id} // Use unique _id for keys
              className="gallery-item"
              onClick={() => openModal(image.imageUrl)} // Open modal when image is clicked
            >
              <img
                src={`http://localhost:5001${image.imageUrl}`} // Correct path to the image
                alt={image.eventName}
                className="gallery-image"
              />
              <div>
                <p>{image.eventName}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className={`modal ${isModalOpen ? "show" : ""}`}
          onClick={closeModal}
        >
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <img
            src={`http://localhost:5001${currentImage}`}
            alt="Large view"
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;

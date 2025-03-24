import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [eventName, setEventName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [manageMode, setManageMode] = useState(false);

  // Fetch images when the component mounts
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/gallery");

        const sortedImages = response.data.sort(
          (a, b) =>
            new Date(b._id.toString().substring(0, 8), 16) -
            new Date(a._id.toString().substring(0, 8), 16)
        );

        // Update the state with sorted images
        setImages(sortedImages);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };
    fetchImages();
  }, []); // Empty dependency array, so it runs once on component mount

  const openModal = (imageUrl) => {
    setCurrentImage(`http://localhost:5001${imageUrl}`);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage("");
  };

  const toggleUploadForm = () => {
    setShowUploadForm(!showUploadForm);
  };

  // Handle the image upload
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!imageFile || !eventName) {
      alert("Please provide an image and event name");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("eventName", eventName);

    try {
      // Upload the image to the server
      await axios.post("http://localhost:5001/api/gallery", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Fetch the latest images from the backend and update state
      const response = await axios.get("http://localhost:5001/api/gallery");

      const sortedImages = response.data.sort(
        (a, b) =>
          new Date(b._id.toString().substring(0, 8), 16) -
          new Date(a._id.toString().substring(0, 8), 16)
      );

      // Update the state with sorted images
      setImages(sortedImages);

      // Reset form
      setShowUploadForm(false);
      setEventName("");
      setImageFile(null);
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  const confirmDelete = (id) => {
    setImageToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/gallery/${imageToDelete}`);
      setImages(images.filter((image) => image._id !== imageToDelete));
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Error deleting image", error);
    }
  };

  return (
    <div className="gallery">
      <h1>
        Photos from <br />
        Past Events
      </h1>
      <button onClick={toggleUploadForm} className="upload-btn">
        Add Image
      </button>
      <button onClick={() => setManageMode(!manageMode)} className="manage-btn">
        {manageMode ? "Done" : "Manage Images"}
      </button>

      {showUploadForm && (
        <form onSubmit={handleUpload} className="upload-form">
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <button type="submit">Upload</button>
        </form>
      )}

      <div className="gallery-grid">
        {images.map((image) => (
          <div key={image._id} className="gallery-item">
            <img
              src={`http://localhost:5001${image.imageUrl}`}
              alt={image.eventName}
              onClick={() => openModal(image.imageUrl)}
            />
            <p>{image.eventName}</p>
            {manageMode &&
              image.deletable && ( // Only show delete button for deletable images
                <button onClick={() => confirmDelete(image._id)}>Delete</button>
              )}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <img src={currentImage} alt="Full View" />
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="modal" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal-content">
            <p>Are you sure you want to delete this image?</p>
            <button className="confirm-delete" onClick={handleDelete}>
              Yes, Delete
            </button>
            <button onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

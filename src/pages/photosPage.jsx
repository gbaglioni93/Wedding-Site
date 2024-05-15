import React, { useState } from "react";
import "./css/photosPage.css";
import images from "../utils/loadImages";

const imageUrls = Object.values(images);

export default function PhotosPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const FullScreenImageModal = ({ onClose, selectedImage }) => {
    const closeHandler = () => {
      onClose();
      document.body.classList.remove("modal-open");
    };

    const previousImage = () => {
      setSelectedImage((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : imageUrls.length - 1
      );
    };

    const nextImage = () => {
      setSelectedImage((prevIndex) =>
        prevIndex < imageUrls.length - 1 ? prevIndex + 1 : 0
      );
    };

    return (
      <div className="full-screen-modal">
        <button className="close-button" onClick={closeHandler}>
          Close
        </button>
        <img src={imageUrls[selectedImage]} loading="lazy" alt="Full Screen" />
        <div className="navigation-buttons">
          <button onClick={previousImage}>Previous</button>
          <button onClick={nextImage}>Next</button>
        </div>
      </div>
    );
  };

  function handlePhotoClick(index) {
    setSelectedImage(index);
    document.body.classList.add("modal-open");
  }

  return (
    <div className="photos-page">
      <div className="header-section fancy-font">
        <h1>GALLERY</h1>
        <p>In case you can't remember what we look like</p>
      </div>
      <div className="small-photos">
        {imageUrls.map((imageUrl, index) => (
          <div className="img-box">
            <img
              key={index}
              src={imageUrl}
              alt={`Photo ${index}`}
              onClick={() => handlePhotoClick(index)}
            />
          </div>
        ))}
      </div>

      {selectedImage !== null && (
        <FullScreenImageModal
          onClose={() => setSelectedImage(null)}
          selectedImage={selectedImage}
        />
      )}
    </div>
  );
}

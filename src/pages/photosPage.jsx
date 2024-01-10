import React, { useState } from "react";
import "./css/photosPage.css";
import secondaryImage from "../assets/proposal.jpg";

const imageUrls = [
  secondaryImage,
  secondaryImage,
  secondaryImage,
  secondaryImage,
  secondaryImage,
  secondaryImage,
  secondaryImage,
  secondaryImage,
  secondaryImage,
  secondaryImage,
  secondaryImage,
  secondaryImage,
  secondaryImage,
  secondaryImage,
];

export default function PhotosPage() {
  const FullScreenImageModal = ({ onClose }) => {
    console.log(selectedImage);

    const closeHandler = () => {
      onClose();
      document.body.classList.remove("modal-open");
    };

    return (
      <div className="full-screen-modal">
        <button className="close-button" onClick={closeHandler}>
          Close
        </button>
        <img src={imageUrls[selectedImage]} alt="Full Screen" />
        <div className="navigation-buttons">
          <button onClick={() => setSelectedImage(selectedImage - 1)}>
            Previous
          </button>
          <button onClick={() => setSelectedImage(selectedImage + 1)}>
            Next
          </button>
        </div>
      </div>
    );
  };

  const [selectedImage, setSelectedImage] = useState(null);

  function handlePhotoClick(index) {
    setSelectedImage(index);
    console.log(index);
  }

  return (
    <div className="photos-page">
      <div className="header-section fancy-font">
        <h1>GALLERY</h1>
        <p>In case you can't remember what we look like</p>
      </div>
      <div className="small-photos">
        {imageUrls.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Photo ${index}`}
            onClick={() => handlePhotoClick(index)}
          />
        ))}
      </div>

      {selectedImage !== null && (
        <FullScreenImageModal onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
}

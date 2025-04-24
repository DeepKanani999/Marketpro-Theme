"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const ProductDescription = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageLoadError, setImageLoadError] = useState({});
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Updated image paths - ensure these images exist in your public folder
  const images = [
    "/assets/images/tv/tv1.png",
    "/assets/images/tv/tv2.png",
    "/assets/images/tv/tv3.png",
    "/assets/images/tv/tv1.png",
    "/assets/images/tv/tv2.png",
  ];

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    message: ""
  });

  useEffect(() => {
    let intervalId;
    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        setSelectedImageIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // Change image every 3 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoPlaying, images.length]);

  const handleImageError = (index) => {
    setImageLoadError((prev) => ({ ...prev, [index]: true }));
    console.error(`Failed to load image at index ${index}: ${images[index]}`);
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    setImageLoadError((prev) => ({
      ...prev,
      [index]: false,
    }));
    // Pause auto-play when user manually selects an image
    setIsAutoPlaying(false);
    // Resume auto-play after 5 seconds of user inactivity
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct WhatsApp message
    const message = `*New Product Inquiry*%0A
Name: ${formData.name}%0A
Email: ${formData.email}%0A
Phone: ${formData.phone}%0A
Product: ${formData.product}%0A
Message: ${formData.message}`;

    // Replace with your WhatsApp number
    const whatsappNumber = "911234567890"; // e.g., "911234567890"
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  // Get current day and time for opening hours
  const getCurrentDayAndStatus = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const currentDay = days[now.getDay()];
    const currentHour = now.getHours();
    
    // Define business hours
    const businessHours = {
      Monday: { open: 9, close: 18, display: '9am to 6pm' },
      Tuesday: { open: 9, close: 18, display: '9am to 6pm' },
      Wednesday: { open: 9, close: 18, display: '9am to 6pm' },
      Thursday: { open: 9, close: 18, display: '9am to 6pm' },
      Friday: { open: 11, close: 16, display: '11am to 4pm' },
      Saturday: { closed: true, display: 'Closed' },
      Sunday: { closed: true, display: 'Closed' }
    };

    const todayHours = businessHours[currentDay];
    let isOpenNow = false;
    
    if (!todayHours.closed) {
      isOpenNow = currentHour >= todayHours.open && currentHour < todayHours.close;
    }

    return {
      currentDay,
      isOpenNow,
      hours: businessHours
    };
  };

  const { currentDay, isOpenNow, hours } = getCurrentDayAndStatus();

  return (
    <div className="product-description-section py-40 bg-white">
      <div className="container">
        <div className="row g-4">
          {/* Left Column - Product Description */}
          <div className="col-lg-8">
            <div className="description-card bg-white rounded-16 p-24 shadow-sm">
              <h4 className="text-heading mb-3">About Us</h4>
              <p className="text-muted mb-14 mt-14">
                At Plixon, we bring to life the kind of tech that we, as geeks,
                tech enthusiasts, and entertainment buffs, have always dreamed
                about. An Indian brand, offering a full range of LED, QLED,
                Smart, and Google TVs. We are on a mission to craft viewing
                experiences, making connections that spark joy and challenge
                convention. We are Plixon: Smart way to View On.
              </p>
              <p className="text-muted">
                Driven by innovation and a passion for elevating everyday
                entertainment, we aim to transform ordinary spaces into
                immersive digital experiences. With a focus on cutting-edge
                technology, user-friendly design, and top-notch performance,
                Plixon TVs are made to match the evolving needs of modern
                viewers. Whether it's movie night, binge-watching a series, or
                playing high-action games, our products are built to deliver
                clarity, emotion, and excitement — turning every moment into
                something extraordinary.
              </p>
            </div>

            {/* Image Carousel Section */}
            <div className="image-carousel-section mt-16">
              <div className="main-image-container bg-white rounded-16 p-24 shadow-sm">
                <div className="position-relative" style={{ height: "400px" }}>
                  {imageLoadError[selectedImageIndex] ? (
                    <div className="w-100 h-auto d-flex align-items-center justify-content-center bg-light rounded-16">
                      <div className="text-center">
                        <i
                          className="ph ph-image text-muted"
                          style={{ fontSize: "3rem" }}
                        />
                        <p className="mt-2">Image not available</p>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={images[selectedImageIndex]}
                      alt={`Product view ${selectedImageIndex + 1}`}
                      fill
                      className="rounded-16 mb-4"
                      style={{ 
                        objectFit: "contain",
                        transition: "opacity 0.3s ease-in-out"
                      }}
                      onError={() => handleImageError(selectedImageIndex)}
                      priority
                    />
                  )}
                </div>
                
                <div 
                  className="thumbnail-container justify-content-center pb-16 d-flex flex-row gap-2 hide-scrollbar" 
                  style={{
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    maxHeight: '100px'
                  }}
                >
                  {images.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => handleThumbnailClick(index)}
                      className={`thumbnail-wrapper cursor-pointer transition-all ${
                        selectedImageIndex === index
                          ? "border-primary border-2"
                          : "opacity-60"
                      }`}
                      style={{ 
                        minWidth: "100px", 
                        height: "80px",
                        transition: "all 0.3s ease-in-out",
                        filter: selectedImageIndex === index ? "brightness(100%)" : "brightness(70%)"
                      }}
                    >
                      {imageLoadError[index] ? (
                        <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-light rounded-8">
                          <i className="ph ph-image text-muted" />
                        </div>
                      ) : (
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          width={100}
                          height={80}
                          className="rounded-8"
                          style={{
                            objectFit: "cover",
                            width: "150px",
                            transform:
                              selectedImageIndex === index
                                ? "scale(1.05)"
                                : "scale(1)",
                            transition: "all 0.3s ease-in-out",
                          }}
                          onError={() => handleImageError(index)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form and Opening Hours */}
          <div className="col-lg-4">
            {/* Contact Form */}
            <div className="contact-card bg-white rounded-16 p-24 shadow-sm mb-4">
              <h4 className="text-heading mb-4">Send Us a Message</h4>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control rounded-pill border-0 bg-light p-12 px-16 my-12"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control rounded-pill border-0 bg-light p-12 px-16 my-12"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-control rounded-pill border-0 bg-light p-12 px-16 my-12"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <select 
                    name="product"
                    value={formData.product}
                    onChange={handleInputChange}
                    className="form-select rounded-pill border-0 bg-light p-12 px-16 my-12"
                    required
                  >
                    <option value="">Select Product Interest</option>
                    <option value="Smart TV">Smart TV</option>
                    <option value="QLED TV">QLED TV</option>
                    <option value="LED TV">LED TV</option>
                    <option value="Android TV">Android TV</option>
                  </select>
                </div>
                <div className="form-group mb-4">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-control border-0 bg-light p-12 px-16 rounded-16 my-12"
                    rows="4"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 rounded-pill p-12 px-16 my-12"
                  style={{
                    background: '#299e60',
                    border: 'none',
                    fontWeight: '500',
                    fontSize: '16px'
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Opening Hours Card */}
            <div className="opening-hours-card bg-white rounded-16 p-24 shadow-sm">
              <h4 className="text-heading mb-4">Opening Hours</h4>
              
              {/* Today's Status */}
              {/* <div className={`today-status rounded-8 p-12 mb-4 text-center ${isOpenNow ? 'bg-success-subtle' : 'bg-danger-subtle'}`}>
                <p className="mb-0">
                  Today: {isOpenNow ? 'Open Now' : 'Closed'} 
                  {!hours[currentDay].closed && ` (${hours[currentDay].display})`}
                </p>
              </div> */}

              {/* Weekly Schedule */}
              <div className="schedule-list">
                {Object.entries(hours).map(([day, schedule]) => (
                  <div 
                    key={day} 
                    className="schedule-item d-flex justify-content-between align-items-center py-3 border-bottom"
                  >
                    <span className={day === currentDay ? 'fw-bold text-primary' : ''}>
                      {day}
                    </span>
                    <span className={schedule.closed ? 'text-danger' : 'text-dark'}>
                      {schedule.display}
                    </span>
                  </div>
                ))}
              </div>

              {/* Contact Information */}
              <div className="contact-info mt-4 pt-3 border-top">
                <div className="d-flex align-items-center mb-2">
                  <i className="ph ph-phone me-2 text-primary"></i>
                  <a href="tel:+1555123-4567" className="text-dark text-decoration-none">
                    +1 (555) 123-4567
                  </a>
                </div>
                <div className="d-flex align-items-center">
                  <i className="ph ph-envelope-simple me-2 text-primary"></i>
                  <a href="mailto:contact@plixon.com" className="text-dark text-decoration-none">
                    contact@plixon.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* End of columns */}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;

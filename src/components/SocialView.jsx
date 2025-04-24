"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const SocialView = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Smart TV Dealership",
        text: "Check out this amazing Smart TV deal!",
        url: window.location.href,
      });
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi, I am interested in your Smart TV collection. Can you provide more details?"
    );
    window.open(`https://wa.me/1234567890?text=${message}`, "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+911234567890";
  };

  const handleLocation = () => {
    window.open("https://www.google.com/maps/place/Rajkot,+Gujarat", "_blank");
  };

  const handleGoogleReview = () => {
    // Replace this URL with your actual Google Business Review URL
    window.open("https://g.page/r/YOUR-GOOGLE-BUSINESS-ID/review", "_blank");
  };

  return (
    <div className="listing-view py-40">
      <div className="container container-lg">
        <div className="listing-card bg-white rounded-16 p-24 shadow-lg">
          <div className="action-buttons-container py-5">
            {/* <div className="action-buttons-wrapper d-flex flex-wrap justify-content-between gap-32 w-100"> */}
            <div className="action-buttons-wrapper d-flex flex-wrap justify-content-center gap-22 w-70">
              <div className="rating-stars d-flex align-items-center me-3">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="me-13">
                  <img
                    key={index}
                    src="/assets/images/star-image.png"
                    alt="star"
                    className="me-1"
                    style={{ width: "30px", height: "30px" }}
                  />
                  </div>
                ))}
              </div>
              <button
                onClick={handleCall}
                className="btn btn-secondary btn-sm rounded-pill"
                title="Call +91 123 456 7890"
              >
                <i className="ph ph-phone me-2"></i>
                Call Now
              </button>
              <button
                onClick={handleWhatsApp}
                className="btn btn-success btn-sm rounded-pill"
              >
                <i className="ph ph-whatsapp-logo me-2"></i>
                Inquiry
              </button>
              <button
                onClick={() => setShowReviewModal(true)}
                className="btn btn-warning btn-sm rounded-pill"
              >
                <i className="ph ph-google-logo me-2"></i>
                Review Us
              </button>
              <div className="dropdown">
                <button
                  className="btn btn-primary btn-sm rounded-pill dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="ph ph-share-network me-2"></i>
                  Share
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button className="dropdown-item" onClick={handleShare}>
                      <i className="ph ph-share me-2"></i>
                      Share Now
                    </button>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="https://facebook.com/share"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="ph ph-facebook-logo me-2"></i>
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="https://twitter.com/intent/tweet"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="ph ph-twitter-logo me-2"></i>
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="https://instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="ph ph-instagram-logo me-2"></i>
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
              <button
                onClick={handleLocation}
                className="btn btn-info btn-sm rounded-pill"
              >
                <i className="ph ph-map-pin me-2"></i>
                Rajkot, Gujarat
              </button>
              <button className="btn btn-danger btn-sm rounded-pill">
                <i className="ph ph-flag me-2"></i>
                Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Google Review Modal */}
      {showReviewModal && (
        <div
          className="modal fade show "
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-16 shadow">
              <div className="modal-header border-bottom">
                <h5 className="modal-title">Rate Your Experience</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowReviewModal(false)}
                ></button>
              </div>
              <div className="modal-body text-center py-32">
                <div className="google-review-icon mb-16">
                  <i
                    className="ph ph-google-logo text-primary"
                    style={{ fontSize: "48px" }}
                  ></i>
                </div>
                <h4 className="mb-12">How was your experience?</h4>
                <p className="text-muted mb-24">
                  Your review helps others learn about our business
                </p>
                <div className="rating-stars flex-center gap-8 mb-24">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="btn btn-light btn-icon rounded-circle p-8 hover-warning"
                      onClick={() => {
                        handleGoogleReview();
                        setShowReviewModal(false);
                      }}
                    >
                      <i className="ph ph-star text-xl"></i>
                    </button>
                  ))}
                </div>
                <button
                  className="btn btn-primary rounded-pill px-32"
                  onClick={handleGoogleReview}
                >
                  Write a Review
                </button>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            onClick={() => setShowReviewModal(false)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default SocialView;

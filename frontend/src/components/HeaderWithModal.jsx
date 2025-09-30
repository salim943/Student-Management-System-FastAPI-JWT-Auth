import React, { useState, useEffect } from 'react';
import './HeaderWithModal.css'; // Import the CSS file

const HeaderWithModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    document.body.style.overflowY = 'hidden';
  };

  const closeModal = () => {
    setIsModalVisible(false);
    document.body.style.overflowY = 'scroll';
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div>
      <header className="header">
        <nav className="nav">
          <button onClick={showModal} className="menu-button">☰</button>
          <div className="logo-container">
            <a
              href="https://www.salimwireless.com/2022/11/search-for-wireless-communication.html"
              className="navbar-brand"
            >
              <img
                src="https://www.google.com/s2/favicons?domain=www.salimwireless.com&sz=64"
                alt="logo"
                className="logo"
              />
            </a>
          </div>
          <div className="nav-links">
            <ul className="nav-list">
              <li><a href="https://www.salimwireless.com/#subscribe">NEWSLETTER</a></li>
              <li><a href="https://www.salimwireless.com/#ContactForm1">CONTACT</a></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Overlay */}
      <div
        onClick={closeModal}
        className={`overlay ${isModalVisible ? 'overlay-show' : 'overlay-hide'}`}
      ></div>

      {/* Modal */}
      <div className={`modal ${isModalVisible ? 'modal-show' : 'modal-hide'}`}>
        <div className="modal-content">
          <div className="modal-header">
            <button onClick={closeModal} className="close-button">X</button>
          </div>
          <div className="modal-body">
            <a href="https://www.salimwireless.com/p/wireless.html"><b>Wireless Communication</b></a>
            <a href="https://www.salimwireless.com/p/modulation.html"><b>Modulation</b></a>
            <a href="https://www.salimwireless.com/p/wireless-communication-in-matlab.html"><b>MATLAB</b></a>
            <a href="https://www.salimwireless.com/p/beamforming.html"><b>Beamforming</b></a>
            <a href="https://www.salimwireless.com/p/project-and-thesis-topics.html"><b>Project Ideas</b></a>
            <a href="https://www.salimwireless.com/p/mimo.html"><b>MIMO</b></a>
            <a href="https://www.salimwireless.com/p/computer-networking-topics.html"><b>Computer Networks</b></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderWithModal;

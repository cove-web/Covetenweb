"use client";

import React, { useState } from 'react';
import { FaBullhorn, FaChartLine, FaUsers, FaHandshake, FaLightbulb, FaAddressBook, FaUserCheck, FaNetworkWired, FaTimes, FaEnvelope, FaPhone } from 'react-icons/fa';

interface CardProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ icon, text, onClick }) => {
  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.icon}>{icon}</div>
      <div style={styles.text}>{text}</div>
    </div>
  );
};

const Marketing: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState('');

  const openPopup = (content: string) => {
    setPopupContent(content);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.headline}>Start</h1>
      <p style={styles.headline}>Create Campaign</p>
      <div style={styles.cardContainer}>
        <Card icon={<FaBullhorn style={{ color: '#FF5733' }} />} text="Advertising" onClick={() => openPopup('Advertising')} />
        <Card icon={<FaChartLine style={{ color: '#33C1FF' }} />} text="SEO Optimization" onClick={() => openPopup('SEO Optimization')} />
        <Card icon={<FaUsers style={{ color: '#33FF57' }} />} text="Social Media" onClick={() => openPopup('Social Media')} />
        <Card icon={<FaHandshake style={{ color: '#FF33A1' }} />} text="Partnerships" onClick={() => openPopup('Partnerships')} />
        <Card icon={<FaLightbulb style={{ color: '#FFC733' }} />} text="Innovative Ideas" onClick={() => openPopup('Innovative Ideas')} />
      </div>
      <h1 style={styles.headline}>Create Audience</h1>
      <div style={styles.cardContainer}>
        <Card icon={<FaAddressBook style={{ color: '#FF5733' }} />} text="Google Ads" onClick={() => openPopup('Contact Lists')} />
        <Card icon={<FaUserCheck style={{ color: '#33C1FF' }} />} text="Facebook Audience" onClick={() => openPopup('Target Segments')} />
        <Card icon={<FaNetworkWired style={{ color: '#33FF57' }} />} text="Network Analysis" onClick={() => openPopup('Network Analysis')} />
      </div>
      <h1 style={styles.headline}>Promoted Posts</h1>
      <div style={styles.cardContainer}>
        <Card icon={<FaAddressBook style={{ color: '#FF5733' }} />} text="Facebook Ads" onClick={() => openPopup('Contact Lists')} />
        <Card icon={<FaUserCheck style={{ color: '#33C1FF' }} />} text="Instagram Ads" onClick={() => openPopup('Target Segments')} />
        <Card icon={<FaNetworkWired style={{ color: '#33FF57' }} />} text="Network Analysis" onClick={() => openPopup('Network Analysis')} />
      </div>

      {isPopupOpen && (
        <div style={styles.popup}>
          <div style={styles.popupHeader}>
            <h2>{popupContent}</h2>
            <FaTimes style={styles.closeIcon} onClick={closePopup} />
          </div>
          <div style={styles.popupContent}>
            <div style={styles.textContent}>
              <p>For more information please contact {popupContent}. 
              </p>
              <div style={styles.contactDetails}>
                <div style={styles.contactItem}>
                  <FaEnvelope style={styles.contactIcon} />
                  <span>marketing@coveten.com</span>
                </div>
                <div style={styles.contactItem}>
                  <FaPhone style={styles.contactIcon} />
                  <span>67668669</span>
                </div>
              </div>
              {/* <div style={styles.priceTables}>
                <div style={styles.priceTable}>
                  <h3>Your Profession</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Service</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Basic Plan</td>
                        <td>$100</td>
                      </tr>
                      <tr>
                        <td>Advanced Plan</td>
                        <td>$150</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style={styles.priceTable}>
                  <h3>Professional</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Service</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Basic Plan</td>
                        <td>$200</td>
                      </tr>
                      <tr>
                        <td>Advanced Plan</td>
                        <td>$300</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div> */}
            </div>
            {/* <div style={styles.imageContent}>
              <img src="https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Placeholder" style={styles.image} />
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    padding: '20px',
    position: 'relative',
  },
  headline: {
    fontSize: '1em',
    marginBottom: '20px',
    color: 'white',
    textAlign: 'left',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    margin: '10px',
    flex: '1 1 calc(25% - 40px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '250px',
    cursor: 'pointer',
  },
  icon: {
    fontSize: '2em',
    marginBottom: '10px',
  },
  text: {
    fontSize: '1.0em',
    color: 'black',
  },
  popup: {
    position: 'fixed',
    top: '0',
    right: '0',
    width: '300px',
    height: '100%',
    backgroundColor: '#fff',
    boxShadow: '-2px 0 5px rgba(0,0,0,0.5)',
    padding: '20px',
    zIndex: 1000,
    overflowY: 'auto',
  },
  popupHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
  },
  closeIcon: {
    cursor: 'pointer',
  },
  popupContent: {
    display: 'flex',
    marginTop: '20px',
    backgroundColor: '#409eef',
    padding: '10px',
    borderRadius: '8px',
  },
  textContent: {
    flex: '1',
  },
  contactDetails: {
    marginTop: '10px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  },
  contactIcon: {
    marginRight: '5px',
  },
  priceTables: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  priceTable: {
    width: '45%',
  },
  imageContent: {
    flex: '1',
    textAlign: 'right',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
};

export default Marketing;

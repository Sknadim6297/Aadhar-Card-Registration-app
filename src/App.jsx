import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css';

Modal.setAppElement('#root'); // Suppresses modal-related accessibility warnings

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    address: '',
    contactInfo: '',
  });
  const [uid, setUid] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const generateUID = () => {
    const arr = new Uint32Array(4);
    window.crypto.getRandomValues(arr);
    let uid = '';
    arr.forEach(num => {
      uid += num.toString().padEnd(10, '0');
    });
    return uid.substring(0, 16);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUid = generateUID();
    setUid(newUid);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="App">
    <h1>Aadhar Card Registration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder='Enter your Full name' required />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input placeholder='Select your date of birth' type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
        </div>
        <div>
          <label>Address:</label>
          <input  placeholder='Enter Your full address' type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Contact Information:</label>
          <input placeholder='Enter your contact information' type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Aadhar Card"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Aadhar Card</h2>
        <p><strong>Name:</strong> {formData.fullName}</p>
        <p><strong>Date of Birth:</strong> {formData.dateOfBirth}</p>
        <p><strong>Address:</strong> {formData.address}</p>
        <p><strong>Contact Info:</strong> {formData.contactInfo}</p>
        <p><strong>UID:</strong> {uid}</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './appfeature.css';

const Route = () => {
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedFeatures((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };
const handleSubmit=()=>{

}
  // const handleSubmit = async () => {
  //   try {
  //     const response = await fetch('https://your-api-endpoint.com/features', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ features: selectedFeatures }),
  //     });

  //     const data = await response.json();
  //     console.log('Response:', data);
  //   } catch (error) {
  //     console.error('Error sending data:', error);
  //   }
  // };

  return (
    <div className="main-feature-container">
       <div className="top-headingp">
          <h2>App Features</h2>
          <p>Select app features you want to hide</p>
        </div>
        <div className="feature-input-container">
      <label>
        <input
          type="checkbox"
          value="Feature1"
          onChange={handleCheckboxChange}
        />
        Feature 1
      </label>
      {/* <br /> */}
      <label>
        <input
          type="checkbox"
          value="Feature2"
          onChange={handleCheckboxChange}
        />
        Feature 2
      </label>
      {/* <br /> */}
      <label>
        <input
          type="checkbox"
          value="Feature3"
          onChange={handleCheckboxChange}
        />
        Feature 3
      </label>
      {/* <br /> */}
      <label>
        <input
          type="checkbox"
          value="Feature3"
          onChange={handleCheckboxChange}
        />
        Feature 4
      </label>
      </div>
      {/* <br /> */}
      
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Route;

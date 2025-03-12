import React, { useState } from "react";
import "./StoreProfile.css";

const StoreProfile = ({ storeinfo }) => {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(""); 
  const [trialDays,setTrialDays]=useState();
  const [planType, setPlanType] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handlelink = async () => {
    setShowModal(false);
    setLoading(true);
    try {
      const response = await fetch("/api/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: parseFloat(amount),
          interval: planType, 
          trialDays
        }),
      });

      const res = await response.json();

      if (res?.url?.confirmationUrl) {
        window.open(res?.url?.confirmationUrl, "_blank");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="profilee-main-container">
        <div className="top-headingp">
          <h2>Store Details</h2>
          <p>Store Details and Amenities</p>
        </div>
        <div className="profile-sections">
          <div className="section">
            <div className="sec-div">
              <h4>Active Plan :</h4>
              <button>{storeinfo?.planName}</button>
            </div>
            <div className="sec-div">
              <h4>Amount:</h4>
              <p>{storeinfo?.amount}</p>
            </div>
            <div className="sec-div">
              <h4>Domain:</h4>
              <p>{storeinfo?.myshopify_domain}</p>
            </div>
            <div className="sec-div">
              <button className="customize-btn" onClick={() => setShowModal(true)}>
                Customize Plan
              </button>
            </div>
           
          </div>
          <div className="section">
            <div className="sec-div">
              <h4>Plan Type :</h4>
              <button>{storeinfo?.interval}</button>
            </div>
            <div className="sec-div">
              <h4>Shop Name:</h4>
              <p>{storeinfo?.shopJson?.name}</p>
            </div>
            <div className="sec-div">
              <h4>Email:</h4>
              <p>{storeinfo?.shopJson?.customer_email}</p>
            </div>
          </div>
          <div className="section">
            <div className="sec-div">
              <h4>Plan Start Date :</h4>
              <button>{storeinfo?.createdAt}</button>
            </div>
            <div className="sec-div">
              <h4>Shop Owner:</h4>
              <p>{storeinfo?.shopJson?.shop_owner}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ✖
            </button>
            <h3>Customize Plan</h3>
            <div className="modal-content">
              <div className="input-group">
                <label>Amount</label>
                <input
                  type="text"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)} // Update state
                />
              </div>
              <div className="input-group">
                <label>Type</label>
                <select value={planType} onChange={(e) => setPlanType(e.target.value)}>
                  <option value="">Select Type</option>
                  <option value="EVERY_30_DAYS">Monthly</option>
                  <option value="ANNUAL">Yearly</option>
                </select>
              </div>
              <div className="input-group">
                <label>TrialDays</label>
                <input
                  type="text"
                  placeholder="Enter Trial Days"
                  value={trialDays}
                  onChange={(e) => setTrialDays(e.target.value)}
                />
              </div>
              <button className="submit-btn" onClick={handlelink} disabled={loading}>
                {loading ? <span className="spinner"></span> : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

    
    </>
  );
};

export default StoreProfile;

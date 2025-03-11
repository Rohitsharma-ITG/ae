import React, { useEffect, useState } from 'react';
import './partnerDetail.css';
import { FiUser } from "react-icons/fi";
// import PartnerProfile from '../Components/StoreProfile/StoreProfile';
import StoreProfile from "../Components/StoreProfile/StoreProfile"
import OrderEditss from "../Components/OrderEdits/route.jsx"
import { useParams } from '@remix-run/react';
// import PartnerOrders from '../Components/PartnerProfile/PartnerOrders';
// import PartnerSettings from '../Components/PartnerProfile/PartnerSettings';

const PartnerDetail = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [storeDetail,setstoreDetail]=useState();
  const { id } = useParams();
  console.log("storeeeeeeeeeeeeeee")
 if (id) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/partners`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }, 
          body: JSON.stringify(id)
        });
        const data = await response.json();
         setstoreDetail(data);

        console.log('data888888',data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData()
  },[id])

 }
  const tabs = [
    { id: "profile", label: "Store Profile", icon: <FiUser /> },
    { id: "orderEdits", label: "Order Edits", icon: <FiUser /> },
    { id: "features", label: "App Features", icon: <FiUser /> },
    { id: "settings", label: "Settings", icon: <FiUser /> },
  ];
console.log("storedetailll",setstoreDetail)
  const renderComponent = () => {
    switch (activeTab) {
      case "profile":
        return <StoreProfile storeinfo={storeDetail}/>;
      case "orderEdits":
        return <OrderEditss/>
      // case "features":
      //   return <PartnerSettings />;
      // default:
      //   return <PartnerProfile />; // Default fallback
    }
  };

  return (
    <div className="main-partnerDetail-container">
      <div className="top-tabs-partnerDetail">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tabs-partnerdetail-box ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className="tab-icon">{tab.icon}</div>
            <div className="tab-content">
              <h4>{tab.label}</h4>
            </div>
          </div>
        ))}
      </div>

      {renderComponent()}
    </div>
  );
};

export default PartnerDetail;

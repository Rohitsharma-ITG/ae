import React from 'react'
import './StoreProfile.css'
const StoreProfile = ({storeinfo}) => {
  console.log("storeprofileeeee")
  console.log("propssss",storeinfo)
  return (
    <>
    <div className="profilee-main-container">
      <div className="top-headingp">
        <h2>Store Details</h2>
        <p>Store Details and Amenities</p>
      </div>
      <div className="profile-sections">
        <div className="section">
          <div className='sec-div'>
            <h4>Active Plan :</h4>
            <button>{storeinfo?.planName}</button>
          </div>
          <div className='sec-div'>
            <h4>Shop Name:</h4>
            <p>{storeinfo?.shopJson?.name}</p>
          </div>
         
          <div className='sec-div'>
            <h4>Package Name:</h4>
            <p>Com.itg.Mob65859769867678687</p>
          </div>
         
        </div>
        <div className="section">
          <div className='sec-div'>
            <h4>Plan Type :</h4>
            <button>NA</button>
          </div>
          <div className='sec-div'>
            <h4>Shop Owner:</h4>
            <p>{storeinfo?.shopJson?.shop_owner}</p>
          </div>
          <div className='sec-div'>
            <h4>Email:</h4>
            <p>{storeinfo?.shopJson?.customer_email
            }</p>
          </div>
          <div className='sec-div'>
            <h4>Plan Name:</h4>
            <p>{storeinfo?.planName}</p>
          </div>
         
        </div>
        <div className="section">
          <div className='sec-div'>
            <h4>Plan Start Date :</h4>
            <button>{storeinfo?.createdAt}</button>
          </div>
          <div className='sec-div'>
            <h4>Domain:</h4>
            <p>{storeinfo?.myshopify_domain
            }</p>
          </div>
          <div className='sec-div'>
            <h4>Phone No. :</h4>
            <p>{storeinfo?.shopJson.phone ?storeinfo.shopJson.phone  : "Null" }</p>
          </div>
          <div className='sec-div'>
            <h4>Amount:</h4>
            <p>{storeinfo?.amount}</p>
          </div>
          
        </div>
      </div>
    </div>
    </>
  )
}

export default StoreProfile
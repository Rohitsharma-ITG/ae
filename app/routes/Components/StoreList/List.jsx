import React from 'react';
import './List.css'
import { Link } from '@remix-run/react';
import { useNavigate } from '@remix-run/react';

const List = ({ partners }) => {

  const navigate=useNavigate()

  const handleNavigate=(id)=>{
    console.log("runn")
    navigate(`/app/storedetail/${id}`)
  }

  return (
    <>
      {partners.length > 0 ? (
        partners.map((partner, index) => (
       <>
          <tr key={index}>
            <td>{partner?.shopJson?.name}</td>
            <td>{partner?.shopJson?.customer_email}</td>
            <td>{partner.phone}</td>
            <td>{partner.planName}</td>
            <td>{partner.myshopify_domain}</td>
            <td >
           <button className="view-btn" onClick={()=>handleNavigate(partner._id)} >
           View
           </button>
          
              
            </td>
          </tr>
        
       </>
        ))
      ) : (
        <tr>
          <td colSpan="6">No partners found.</td>
        </tr>
      )}
    </>
  );
};

export default List;

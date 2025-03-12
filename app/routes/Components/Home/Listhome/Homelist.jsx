import React from 'react';

const Homelist = ({ stores }) => {
  return (
    <>
      {stores.length > 0 ? (
        stores.map((store, index) => (
         <>
          <tr key={index}>
            <td>{store.myshopify_domain}</td>
        
            
           
          </tr>
         
         </>
        ))
      ) : (
        <tr>
          <td colSpan="6">No stores found.</td>
        </tr>
      )}
    </>
  );
};

export default Homelist;

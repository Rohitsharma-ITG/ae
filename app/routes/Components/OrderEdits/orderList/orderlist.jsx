import React from 'react'

const orderlist = ({orders}) => {
  return (
    <>
      {orders.length > 0 ? (
        orders.map((order, index) => (
       <>
          <tr key={index}>
            <td>{order?.orderId}</td>
            <td>{order?.orderAction}</td>
            {/* <td>{partner.phone}</td> */}
            <td>{order?.customerId?.split('/').pop()}</td>

            <td>{order?.createdAt}</td>
            <td >
           
          
              
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
  )
}

export default orderlist
import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { FiX } from "react-icons/fi";
import OrderList from "./orderList/orderlist";
import { useParams } from "@remix-run/react";
import { IoFilterSharp } from "react-icons/io5";

import "./style.css";

const OrderEditss = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedActions, setSelectedActions] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  
  const actionOptions = ["add_item", "store_credit", "up_sell_revenue", "remove_item", "order_refund", "update_status", "cancel_order", "swap_item", "update_item", "update_contact_info", "update_shipping_address"];

  const toggleFilter = () => setFilterOpen(!filterOpen);
 

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToPreviousPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const goToNextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const handleActionChange = async (action) => {
    let updatedActions;
    if (selectedActions.includes(action)) {
      updatedActions = selectedActions.filter((a) => a !== action);
    } else {
      updatedActions = [...selectedActions, action];
    }
    setSelectedActions(updatedActions);
    await handleFilterChange(updatedActions, selectedDate, selectedCustomer);
  };

  const handleFilterChange = async (actions) => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderAction: actions}),
      });
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error filtering data:", error);
    }
  };

  const removeSelectedFilter = async (type, value) => {
    if (type === "action") {
      const updatedActions = selectedActions.filter((a) => a !== value);
      setSelectedActions(updatedActions);
      await handleFilterChange(updatedActions, selectedDate, selectedCustomer);
    } else if (type === "date") {
      setSelectedDate("");
      await handleFilterChange(selectedActions, "", selectedCustomer);
    } else if (type === "customer") {
      setSelectedCustomer("");
      await handleFilterChange(selectedActions, selectedDate, "");
    }
  };

  const clearFilters = async () => {
    setFilterOpen(false);
    setSelectedActions([]);
  
    await handleFilterChange([]);
  };

  useEffect(() => {
    
    handleFilterChange([]);
  }, []);
  
  


  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="main-partner-container">
          <div className="filterr">
      <button className="apply-filter-btn" onClick={toggleFilter}><IoFilterSharp/></button>
   
      {filterOpen && (
        <div className="filter-box">
          <button className="close-icon-btn" onClick={toggleFilter}><FiX /></button>
          <div className="filter-options">
            <div className="filter-item">Filter by Action</div>
            <div className="action-list">
              {actionOptions.map((action) => (
                <label key={action} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={action}
                    checked={selectedActions.includes(action)}
                    onChange={() => handleActionChange(action)}
                  />
                  {action}
                </label>
              ))}
            </div>
           
          </div>
  
          
        </div>
      )}
      { selectedActions.length>0 &&
         <div className="selected-filters">
        <div className="selct-itemss">
        {selectedActions.map((action) => (
         
          <p key={action}> {action} <FiX onClick={() => removeSelectedFilter("action", action)} /></p>
        ))}
                <button className="clear-filter-btn" onClick={clearFilters}>Clear All</button></div>
      </div>
      }
      </div>
    

      <div className="table-wrapper">
        <table className="partner-table">
          <thead>
            <tr>
              <th>OrderId</th>
              <th>OrderAction</th>
              <th>CustomerId</th>
              <th>CreatedAt</th>
            </tr>
          </thead>
          <tbody>
            <OrderList orders={currentItems} />
          </tbody>
        </table>
          <div className="pagination">
                    <button className="pg-button" onClick={goToPreviousPage} disabled={currentPage === 1} >
                      pre
                    </button>
                  
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((page) =>
                        page === 1 || page === totalPages || 
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      )
                      .map((page, index, arr) => (
                        <React.Fragment key={page}>
                          {index > 0 && page !== arr[index - 1] + 1 && <span>...</span>}
                          <button
                            className={currentPage === page ? 'active' : ''}
                            onClick={() => paginate(page)}
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      ))}
                  
                    <button onClick={goToNextPage} disabled={currentPage === totalPages} className="pg-button">
                      next
                    </button>
                  </div>
      </div>
    </div>
  );
};

export default OrderEditss;

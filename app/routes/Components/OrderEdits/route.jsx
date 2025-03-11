import React, { useState, useEffect } from "react";
import OrderList from "./orderList/orderlist";
import { useParams } from "@remix-run/react";
import "./style.css";

const orderEditss = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedActions, setSelectedActions] = useState([]);

  const actionOptions = ["add_item",'store_credit','up_sell_revenue', "remove_item",'order_refund', "update_status","cancel_order","swap_item",'update_item','update_contact_info','update_shipping_address'];


  const toggleFilter = () => setFilterOpen(!filterOpen);

  const handleActionChange = (action) => {
    setSelectedActions((prev) =>
      prev.includes(action)
        ? prev.filter((a) => a !== action)
        : [...prev, action]
    );
  };

  const applyFilter = async () => {
  console.log("orderactions",selectedActions)

    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderAction: selectedActions }),
      });
      const data = await response.json();
      setOrders(data);
      setFilterOpen(false);
    } catch (error) {
      console.error("Error filtering data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/orders/${id}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  const handlelink = async () => {
    fetch('/api/subscription', {
      method: 'POST',
      body: JSON.stringify({
        price: 10.0,
        interval: 'EVERY_30_DAYS'
       }),
    });
  }


  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="main-partner-container">
      <button className="filter-btn" onClick={toggleFilter}>
        Filter by Action
      </button>

      {filterOpen && (
        <div className="modal-overlay">
          <div className="filter-modal">
            <h3>Select Actions</h3>
            <div className="checkbox-container">
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
            <div className="modal-buttons">
              {selectedActions.length>0 ?<button className="apply-btn" onClick={applyFilter}>
                Apply Filter
              </button>:""}
              <button className="close-btn" onClick={toggleFilter}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
          <button onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1}>
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) =>
              page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)
            )
            .map((page, index, arr) => (
              <React.Fragment key={page}>
                {index > 0 && page !== arr[index - 1] + 1 && <span>...</span>}
                <button className={currentPage === page ? "active" : ""} onClick={() => setCurrentPage(page)}>
                  {page}
                </button>
              </React.Fragment>
            ))}

          <button onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default orderEditss;

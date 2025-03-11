import React, { useState , useEffect} from 'react';
import OrderList from './orderList/orderlist';
import { useParams } from '@remix-run/react';
import './style.css'
const orderEditss = () => {
   const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; 
    const [orders, setorders] = useState([]);
    const [loading,setLoading]=useState(true);
    // const[error,setError]=useState("")
  const {id}=useParams();
 
  const handlePost=async()=>{
      try {
        const response = await fetch(`/api/orders/${id}`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }, 
          body: JSON.stringify({orderAction:"add_item"})
        });
        const data = await response.json();
       console.log("data==",data)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/orders/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setorders(data);
          setLoading(false);
        } catch (error) {
          // setError(error.message);
          setLoading(false);
        }
      };
      fetchData();
    }, []);


    const totalPages = Math.ceil(orders.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const goToPreviousPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    const goToNextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  return (
    <div className="main-partner-container">
    {/* <div className="top-heading">
      <h2>Orders</h2>
      <p>List of stores connected to services</p>
    </div> */}
    <button onClick={handlePost}>Post</button>
    <div className="table-wrapper">
      <table className="partner-table">

        <thead>
          <tr>
            <th>OrderId</th>
            <th>OrderAction</th>
            {/* <th>Number</th> */}
            <th>CustomerId</th>
            <th>CreatedAt</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          <OrderList  orders={currentItems}/>
        </tbody>
      </table>

            <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          &lt;
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
      
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          &gt;
        </button>
      </div>
    </div>
  </div>
  )
}

export default orderEditss
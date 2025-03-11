import React, { useState , useEffect} from 'react';
import './partner.css';
import List from '../Components/StoreList/list';

const Route = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 
  const [partners, setpartners] = useState([]);
  const [loading,setLoading]=useState(true);
  // const[error,setError]=useState("")

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/partners');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setpartners(data);
        setLoading(false);
      } catch (error) {
        // setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const totalPages = Math.ceil(partners.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = partners.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToPreviousPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const goToNextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

  return (
    <>
      <div className="main-partner-container">
        <div className="top-heading">
          <h2>Stores</h2>
          <p>List of stores connected to services</p>
        </div>
        <div className="table-wrapper">
          <table className="partner-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Plan</th>
                <th>Shop</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <List partners={currentItems} />
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>&lt;</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={currentPage === i + 1 ? 'active' : ''}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>&gt;</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Route;

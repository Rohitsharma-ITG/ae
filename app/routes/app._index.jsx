// import React,{useEffect, useState} from 'react'
// import './home.css'
// import { FiUsers } from 'react-icons/fi'
// // import List from '../Components/Partner/list';
// import Homelist from '../Components/Home/Listhome/Homelist'

// const route = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [stores, setstores] = useState(null)
//     const itemsPerPage = 2; 
  

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/partners');
//         const data = await response.json();
//         console.log('data',data);
//         setstores(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
//     fetchData();
//   },[])

//   //   const stores = [
//   //     {
//   //       myshopify_domain: "john-shop.myshopify.com",
//   //       android: "0",
//   //       ios: "23"
//   //     },
//   //     {
//   //       myshopify_domain: "jane-store.myshopify.com",
//   //      android: "0",
//   //       ios: "23"
//   //     },
//   //     {
//   //       myshopify_domain: "mike-shop.myshopify.com",
//   //        android: "0",
//   //       ios: "23"
//   //     },
//   //     {
//   //       myshopify_domain: "harvey-store.myshopify.com",
//   //     android: "0",
//   //       ios: "23"
//   //     },
//   //     {
//   //       myshopify_domain: "rachel-shop.myshopify.com",
//   //        android: "0",
//   //       ios: "23"
//   //     },
//   //     {
//   //       myshopify_domain: "donna-store.myshopify.com",
//   //       android: "0",
//   //       ios: "23"
//   //     },
//   //     {
//   //       myshopify_domain: "louis-shop.myshopify.com",
//   //      android: "0",
//   //       ios: "23"
//   //     },
//   //     {
//   //       myshopify_domain: "jessica-store.myshopify.com",
//   //     android: "0",
//   //       ios: "23"
//   //     },  {
//   //       myshopify_domain: "harvey-store.myshopify.com",
//   //      android: "0",
//   //       ios: "23"
//   //     },
//   //     {
//   //       myshopify_domain: "rachel-shop.myshopify.com",
//   //  android: "0",
//   //       ios: "23"
//   //     },
//   //     {
//   //       myshopify_domain: "donna-store.myshopify.com",
//   //       android: "0",
//   //       ios: "23"
//   //     },
//   //     {
//   //       myshopify_domain: "louis-shop.myshopify.com",
//   //       android: "0",
//   //       ios: "23"
//   //     },
//   //     {
//   //       myshopify_domain: "jessica-store.myshopify.com",
//   //       android: "0",
//   //       ios: "23"
//   //     },
//   //     {
//   //       myshopify_domain: "harvey-store.myshopify.com",
//   //     android: "0",
//   //       ios: "23"
//   //     },
//   //     {
//   //       myshopify_domain: "rachel-shop.myshopify.com",
//   //        android: "0",
//   //       ios: "23"
//   //     },
//   //     {
//   //       myshopify_domain: "donna-store.myshopify.com",
//   //       android: "0",
//   //       ios: "23"
//   //     },
//   //     {
//   //       myshopify_domain: "louis-shop.myshopify.com",
//   //      android: "0",
//   //       ios: "23"
//   //     },
//   //     {
//   //       myshopify_domain: "jessica-store.myshopify.com",
//   //     android: "0",
//   //       ios: "23"
//   //     },  {
//   //       myshopify_domain: "harvey-store.myshopify.com",
//   //      android: "0",
//   //       ios: "23"
//   //     },
//   //     {
//   //       myshopify_domain: "rachel-shop.myshopify.com",
//   //  android: "0",
//   //       ios: "23"
//   //     },
      
//   //   ];
    
  
//     const totalPages = Math.ceil(stores?.length / itemsPerPage);
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = stores?.slice(indexOfFirstItem, indexOfLastItem);
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);
//     const goToPreviousPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
//     const goToNextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  
//   return (
//   <div className="main-home-container">
//     <div className="top-home-boxes">
//       <div className="boxx">
//         <div className="boxx-content">
//           <p>Total Customers</p>
//           <h4>1402</h4>
//         </div>
//         <div className="box-icon">
//            <FiUsers />
//         </div>
//       </div>
     
//     </div>
//     <div className="table-wrapper">
//           <table className="Home-table">
//             <thead>
//               <tr>
//                 <th >My Shopify Domain</th>
//                 {/* <th>Android</th>
//                 <th>Ios</th> */}
                
//               </tr>
//             </thead>
//             <tbody>
//               <Homelist stores={currentItems} />
//             </tbody>
//           </table>

//           <div className="pagination">
//             <button onClick={goToPreviousPage} disabled={currentPage === 1}>&lt;</button>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i + 1}
//                 className={currentPage === i + 1 ? 'active' : ''}
//                 onClick={() => paginate(i + 1)}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             <button onClick={goToNextPage} disabled={currentPage === totalPages}>&gt;</button>
//           </div>
//         </div>
//   </div>
//   )
// }

// export default route


import React, { useEffect, useState } from 'react';
import './app.home/home.css';
import { FiUsers } from 'react-icons/fi';
// import Homelist from '../Components/Home/Listhome/Homelist';
import Homelist from './Components/Home/Listhome/Homelist'

const Route = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 8;

  // Fetching Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/partners');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setStores(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(stores.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stores.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const goToNextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

  return (
    <div className="main-home-container">
      <div className="top-home-boxes">
        <div className="boxx">
          <div className="boxx-content">
            <p>Total Stores</p>
            <h4>{stores.length}</h4>
          </div>
          <div className="box-icon">
            <FiUsers />
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : stores.length === 0 ? (
          <p>No customers found.</p>
        ) : (
          <>
            <table className="Home-table">
              <thead>
                <tr>
                  <th>My Shopify Domain</th>
                </tr>
              </thead>
              <tbody>
                <Homelist stores={currentItems} />
              </tbody>
            </table>

            {/* Pagination Section */}
            <div className="pagination">
              <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={currentPage === i + 1 ? 'active' : ''}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Route;

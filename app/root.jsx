import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useLocation
} from "@remix-run/react";
import './style.css';
import { AiOutlineHome } from 'react-icons/ai';
import { FiUsers } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";

export default function App() {
  const location = useLocation(); // Get current route

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="main_frame">
          <header>
            <div className="logo">
              <h2># Logo</h2>
            </div>
            <div className="header_btn">
              <button onClick={() => console.log("logout")} className="logOutButton">
                Log Out
              </button>
            </div>
          </header>
          <div className="frame-body">
            <div className="navbar">
              <div className="sidebar">
                <ul className="nav-links">
                  <li className={location.pathname === "/app" ? "active" : ""}>
                    <Link to="/app">
                      <div className="nav-icons">
                        <AiOutlineHome />
                      </div>
                      <span>Home</span>
                    </Link>
                  </li>
                  <li className={location.pathname === "/app/store" ? "active" : ""}>
                    <Link to="/app/store">
                      <div className="nav-icons">
                        <FiUsers />
                      </div>
                      <span>Store</span>
                    </Link>
                  </li>
                  
                </ul>
              </div>
            </div>
            <div className="outlet_body">
              <Outlet />
            </div>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

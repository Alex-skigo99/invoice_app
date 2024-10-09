// import { BrowserRouter as Router } from 'react-router-dom';

// function App() {
//   return (
//     <Router>
//       {/* Routes and navigation components go here */}
//     </Router>
//   );
// }


// import { Routes, Route } from 'react-router-dom';

// function ComponentA() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/contact" element={<Contact />} />
//     </Routes>
//   );
// }


// import { Link } from 'react-router-dom';

// function NavBar() {
//   return (
//     <nav>
//       <Link to="/">Home</Link>
//       <Link to="/about">About</Link>
//       <Link to="/contact">Contact</Link>
//     </nav>
//   );
// }


// import { useNavigate } from 'react-router-dom';

// function MyComponent() {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate('/about'); // Navigate to the "about" page
//   };

//   return <button onClick={handleClick}>Go to About</button>;
// }


// import { useParams } from 'react-router-dom';

// function User() {
//   const { id } = useParams(); // Access the dynamic "id" from the URL

//   return <div>User ID: {id}</div>;
// }


// import { useLocation } from 'react-router-dom';

// function LocationInfo() {
//   const location = useLocation();
  
//   return (
//     <div>
//       <p>Current path: {location.pathname}</p>
//       <p>Query params: {location.search}</p>
//     </div>
//   );
// }

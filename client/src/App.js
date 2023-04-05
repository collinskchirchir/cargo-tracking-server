import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import AdminDash from './components/AdminDashboard/AdminDash';
import ContactUs from './components/ContactUs/ContactUs';
import Navbar from './components/Navbar/Navbar';
import Error from './components/Error/Error';
import About from './components/About/About';
import LogIn from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  // if (!user) return <Login onLogin={setUser} />;

  return (

    <div className="App">
      <BrowserRouter>
        <Navbar user={user} setUser={setUser}/>
        <Routes>
          <Route index element={<Home />} />
          <Route exact path='/contact' element={<ContactUs />} />
          <Route exact path='/admin' element={<AdminDash />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/login' element={<LogIn setUser={setUser}/>} />
          <Route exact path='/shipment/:shipmentId' element={<Shipment />} />

          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;

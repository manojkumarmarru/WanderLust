import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import { Button } from 'primereact/button';
import PlannedTrip from "./components/plannedTrips";

import Login from './components/login';
import Home from './components/home';

import { Dialog } from 'primereact/dialog';
import Hotdeals1 from './components/Hotdeals';
import Search from './components/search';
//My works
import Register from './components/register';
import Book from "./components/bookComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_userId: sessionStorage.getItem('userId'),
      logged_userName: sessionStorage.getItem('userName'),
      dialog_visible: false,
      logged_out: false
    }
  }

  onClick = () => {
    this.setState({ dialog_visible: true })
  }

  onHide = () => {
    this.setState({ dialog_visible: false });
  }

  logout = () => {
    this.setState({ dialog_visible: false });
    sessionStorage.clear();
    this.setState({ logged_out: true });
    window.location.reload();
  }

  confirm_logout = () => {
    this.setState({ dialog_visible: true });
  }

  render() {
    const footer = (
      <div>
        <Button label="CONTINUE EXPLORING" icon="pi pi-check" className="p-button-primary" onClick={this.onHide} />
        <Button label="LOGOUT" icon="pi pi-times" onClick={this.logout} className="p-button-info" />
      </div>
    );

    return (
      <div>
        <Router>
          <div className="App">
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
              <div className="navbar-header">
                <Link className="navbar-brand" to="/">Start Wandering</Link>
              </div>
              <ul className="navbar-nav ml-auto">
                {this.state.logged_userId ? <li className="nav-item">
                  <Link className="nav-link" to="">Welcome {this.state.logged_userName}</Link>
                </li> : null}
                <li className="nav-item">
                  <Link className="nav-link" to="/packages">Hot Deals</Link>
                </li>
                {this.state.logged_userId ?
                  <li className="nav-item">
                    <Link className="nav-link" to="/viewBookings">Planned Trips</Link>
                  </li> : null}

                {!this.state.logged_userId ?
                  <li className="nav-item">
                    <Link className="nav-link" to="/login"> Login</Link>
                  </li>
                  : null}
                {this.state.logged_userId ?
                  <li className="nav-item">
                    <Link className="nav-link" onClick={this.onClick} to=""> Logout</Link>
                  </li> : null}
              </ul>
            </nav>

            <Routes>
              <Route path="/book/:dealId" element={<Book />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home/:userId" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/packages" element={<Hotdeals1 />} />
              <Route path="/packages/:continent" element={<Search />} />
              <Route path="/viewBookings" element={<PlannedTrip />} />
            </Routes>
          </div>
        </Router>
        <Dialog className="text-center" header="Confirmation" footer={footer} visible={this.state.dialog_visible} style={{ width: '35vw' }} onHide={this.onHide}>
          Are you sure you want to logout?
        </Dialog>

        <footer className="bg-black text-center text-white-50" id="footer">
          Copyright &copy; www.eta.wanderlust.com 2018
        </footer>
      </div>
    );
  }
}

export default App;
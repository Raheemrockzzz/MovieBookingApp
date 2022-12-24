import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { signOut } from "../../api/auth";

const Navbar = () => {

    const onLogout = () =>{
        signOut();
        window.location.href="/"
    }
  return (
    <div className="container-fluid bg-dark sticky-top p-2">
      <div className="row text-center">
        <div className="col-lg-3 col-sm-12">
          <Link to="/" className="text-decoration-none">
            <div className="display-5 text-danger text-start mx-5"> MBA</div>
          </Link>
        </div>
        <div className="col-lg-7 col-sm-8 py-2 ">
          <Form className="d-flex ">
            <Form.Control
              type="search"
              placeholder="Search a Movie"
              className=" me-2 w-75 "
              aria-label="Search"        
            />
            <Button variant="outline-danger">Search</Button>
          </Form>
        </div>
        <div className="col-lg-2 col-sm-4 p-2">
          {localStorage.getItem("accessToken") ? (
            <Button variant="danger" onClick={onLogout}>
              Logout
            </Button>
          ) : (
            <Button
              variant="danger"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Login/ Sign up
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

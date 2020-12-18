import React, { useEffect, useRef } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AlertMsg from "./components/AlertMsg";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PublicNavbar from "./components/PublicNavbar";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Col, Container, Row } from "react-bootstrap";
import SideMenu from "./components/SideMenu";

function App() {
  return (
    <Router>
      <PublicNavbar />
      <AlertMsg />
      <Container fluid>
        <Row>
          <Col sm={3}>
            <SideMenu />
          </Col>
          <Col sm={9}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/gallery" component={GalleryPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;

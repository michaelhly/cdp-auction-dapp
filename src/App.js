import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import { loadAuctions } from "./services/loadAuctions";
import CdpContainer from "./components/cdpContainer";
import Navbar from "./components/navbar";

class App extends Component {
  state = {
    auctions: []
  };

  async componentDidMount() {
    var auctions = [];
    try {
      auctions = await loadAuctions();
      this.setState({ auctions });
    } catch (err) {
      console.log("Error:", err.message);
    }
    console.log(this.state.auctions);
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Container>
          <Row>
            <Col>TODO: User Menu</Col>
            <Col lg="9">
              <CdpContainer auctions={this.state.auctions} />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;

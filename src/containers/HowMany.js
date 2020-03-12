import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

class HowMany extends React.Component {
  render() {
    return (
      <div style={{ marginTop: '20px' }}>
        <Container>
          <Row>
            <Col sm="4">
              <Card>
                <CardBody>
                  <CardTitle>1 section</CardTitle>
                  <div className="section-group">
                    <div className="one-section"></div>
                  </div>
                  <Button color="success" size="md" style={{ marginTop: '32px' }}>
                    Proceed
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col sm="4">
              <Card>
                <CardBody>
                  <CardTitle>2 section</CardTitle>
                  <div className="section-group">
                    <div className="one-section"></div>
                    <div className="one-section"></div>
                  </div>
                  <Button color="success" size="md" style={{ marginTop: '32px' }}>
                    Proceed
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col sm="4">
              <Card>
                <CardBody>
                  <CardTitle>3 section</CardTitle>
                  <div className="section-group">
                    <div className="one-section"></div>
                    <div className="one-section"></div>
                    <div className="one-section"></div>
                  </div>
                  <Button color="success" size="md" style={{ marginTop: '32px' }}>
                    Proceed
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default HowMany;

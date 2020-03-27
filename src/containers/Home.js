import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { history } from 'store/configure';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Row style={{ marginTop: '68px' }}>
          <Col sm="4"></Col>
          <Col sm="4">
            <div>
              <p>No patterns yet</p>
              <Button className="btn-primary btn-sm" size="sm" onClick={e => history.push('/pattern-type')}>
                Create Pattern
              </Button>
            </div>
          </Col>
          <Col sm="4"></Col>
        </Row>
      </div>
    );
  }
}

export default Home;

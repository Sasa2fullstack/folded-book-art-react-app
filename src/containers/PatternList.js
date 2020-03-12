import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { history } from 'store/configure';

class PatternList extends React.Component {
  render() {
    return (
      <div>
        <Row style={{ marginTop: '68px' }}>
          <Col sm="4"></Col>
          <Col sm="4">
            <div>
              <p>PatternList</p>
            </div>
          </Col>
          <Col sm="4"></Col>
        </Row>
      </div>
    );
  }
}

export default PatternList;

import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardImg, CardText, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import img140 from 'static/img/temp/140.png';

class SilhouetteList extends React.Component {
  render() {
    return (
      <div style={{}}>
        <Row>
          <Col sm="12">
            <div className="selectlist-silhouette">
              <img src={img140} className="img-size-65" />
              <div className="text-center">Executive Director</div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <div className="selectlist-silhouette">
              <img src={img140} className="img-size-65" />
              <div className="text-center">Executive Director</div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <div className="selectlist-silhouette">
              <img src={img140} className="img-size-65" />
              <div className="text-center">Executive Director</div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SilhouetteList;

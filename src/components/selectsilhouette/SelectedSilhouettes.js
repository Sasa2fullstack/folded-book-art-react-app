import React from 'react';
import { Row, Col, Media } from 'reactstrap';
import img140 from 'static/img/temp/140.png';

class SelectedSilhouettes extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col sm="12">
            <Media className="selected-silhouette">
              <Media body>
                <div className="card-title">
                  Section 1
                  <img src={img140} className="img-size-140" />
                </div>
              </Media>
            </Media>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Media className="selected-silhouette">
              <Media body>
                <div className="card-title">
                  Section 2
                  <img src={img140} className="img-size-140" />
                </div>
              </Media>
            </Media>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Media className="selected-silhouette">
              <Media body>
                <div className="card-title">
                  Section 3
                  <img src={img140} className="img-size-140" />
                </div>
              </Media>
            </Media>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SelectedSilhouettes;

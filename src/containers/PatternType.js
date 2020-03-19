import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { history } from 'store/configure';
import imgRuler from 'static/img/ruler.svg';
import imgGps from 'static/img/gps.svg';
import imgFold from 'static/img/fold.svg';
import imgCut from 'static/img/cut.svg';

class PatternType extends React.Component {
  constructor(props) {
    super(props);
    this.onProceed = this.onProceed.bind(this);
  }
  onProceed(mode) {
    history.push('/choose-how-many');
  }
  render() {
    return (
      <div style={{ marginTop: '20px' }}>
        <Container>
          <Row>
            <Col sm="2"></Col>
            <Col sm="4">
              <Card className="pattern-card" style={{ width: '90%', height: '224px' }}>
                <CardBody>
                  <div style={{ margin: '22px 22px' }}>
                    <img src={imgRuler} align="center" />
                    <img src={imgGps} align="center" style={{ marginLeft: '22px' }} />
                    <img src={imgFold} align="center" style={{ marginLeft: '22px' }} />
                  </div>
                  <CardTitle>
                    <div>Measure</div>
                    <div>Mark & Fold</div>
                  </CardTitle>

                  <Button color="success" size="md" style={{ marginTop: '32px' }} onClick={n => this.onProceed(1)}>
                    Proceed
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col sm="4">
              <Card className="pattern-card" style={{ width: '90%', height: '224px' }}>
                <CardBody>
                  <div style={{ margin: '22px 22px' }}>
                    <img src={imgCut} align="center" />
                    <img src={imgFold} align="center" style={{ marginLeft: '22px' }} />
                  </div>
                  <CardTitle>
                    <div>Cut & Fold</div>
                    <div></div>
                  </CardTitle>
                  <Button color="success" size="md" style={{ marginTop: '32px' }} onClick={n => this.onProceed(2)}>
                    Proceed
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col sm="2"></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default PatternType;

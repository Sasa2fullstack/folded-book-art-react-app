import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ListGroup, ListGroupItem, ListGroupItemText, Media } from 'reactstrap';
import { history } from 'store/configure';
import imgDownload from 'static/img/download.svg';

class HowMany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      many: 0,
      silhouetteList: ['', '', ''],
      modal: false
    };
    this.onProceed = this.onProceed.bind(this);
    this.onCreatePattnern = this.onCreatePattnern.bind(this);
  }
  onProceed(count) {
    this.setState({ many: count });
    // history.push('/select-silhouette');
  }
  toggle = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal
    });
  };
  onCreatePattnern() {}
  render() {
    const { many, silhouetteList, modal } = this.state;
    let hideClassName = '';
    if (many === 0) {
      hideClassName = 'hide-div';
    }
    let sections = <div></div>;
    switch (many) {
      case 1:
        sections = (
          <Row style={{ marginTop: '20px' }}>
            <Col sm="4"></Col>
            <Col sm="4">
              <Card className="pattern-card" onClick={this.toggle}>
                <img src={imgDownload} style={{ margin: 'auto', width: '57px' }} />
              </Card>
            </Col>
            <Col sm="4"></Col>
          </Row>
        );
        break;
      case 2:
        sections = (
          <Row style={{ marginTop: '20px' }}>
            <Col sm="2"></Col>
            <Col sm="4">
              <Card className="pattern-card">
                <img src={imgDownload} style={{ margin: 'auto', width: '57px' }} />
              </Card>
            </Col>
            <Col sm="4">
              <Card className="pattern-card">
                <img src={imgDownload} style={{ margin: 'auto', width: '57px' }} />
              </Card>
            </Col>
            <Col sm="2"></Col>
          </Row>
        );
        break;
      case 3:
        sections = (
          <Row style={{ marginTop: '20px' }}>
            <Col sm="4">
              <Card className="pattern-card">
                <img src={imgDownload} style={{ margin: 'auto', width: '57px' }} />
              </Card>
            </Col>
            <Col sm="4">
              <Card className="pattern-card">
                <img src={imgDownload} style={{ margin: 'auto', width: '57px' }} />
              </Card>
            </Col>
            <Col sm="4">
              <Card className="pattern-card">
                <img src={imgDownload} style={{ margin: 'auto', width: '57px' }} />
              </Card>
            </Col>
          </Row>
        );
        break;
    }
    return (
      <div style={{ marginTop: '20px' }}>
        <Container>
          <Row>
            <Col sm="4">
              <Card className={many === 1 ? 'pattern-card-selected' : 'pattern-card'} onClick={n => this.onProceed(1)}>
                <CardBody>
                  <CardTitle>1 section</CardTitle>
                  <div className="section-group">
                    <div className="one-section"></div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col sm="4">
              <div algin="center">
                <Card className={many === 2 ? 'pattern-card-selected' : 'pattern-card'} onClick={n => this.onProceed(2)}>
                  <CardBody>
                    <CardTitle>2 section</CardTitle>
                    <div className="section-group">
                      <div className="one-section"></div>
                      <div className="one-section"></div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
            <Col sm="4">
              <Card className={many === 3 ? 'pattern-card-selected' : 'pattern-card'} onClick={n => this.onProceed(3)}>
                <CardBody>
                  <CardTitle>3 section</CardTitle>
                  <div className="section-group">
                    <div className="one-section"></div>
                    <div className="one-section"></div>
                    <div className="one-section"></div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {sections}
          {many > 0 ? (
            <Row style={{ marginTop: '20px', marginBottom: '5px' }}>
              <Col sm="4"></Col>
              <Col sm="4">
                <Button color="success" size="md" onClick={this.onCreatePattnern()}>
                  Proceed
                </Button>
              </Col>
              <Col sm="4"></Col>
            </Row>
          ) : (
            ''
          )}
        </Container>

        <Modal isOpen={modal}>
          <ModalBody>
            <ListGroup style={{ height: '400px' }} className="overflow-auto ">
              <ListGroupItem align="left">
                <span>
                  <img src="assets/1.png" className="img-size-65 img-thumbnail" />
                </span>
                <span className="silhouette-list-name">example silhouette name 1</span>
              </ListGroupItem>
              <ListGroupItem align="left">
                <span>
                  <img src="assets/1.png" className="img-size-65 img-thumbnail" />
                </span>
                <span className="silhouette-list-name">example silhouette name 2 example</span>
              </ListGroupItem>
              <ListGroupItem align="left">
                <span>
                  <img src="assets/1.png" className="img-size-65 img-thumbnail" />
                </span>
                <span className="silhouette-list-name">example silhouette name 2 example</span>
              </ListGroupItem>
              <ListGroupItem align="left">
                <span>
                  <img src="assets/1.png" className="img-size-65 img-thumbnail" />
                </span>
                <span className="silhouette-list-name">example silhouette name 2 example</span>
              </ListGroupItem>
              <ListGroupItem align="left">
                <span>
                  <img src="assets/1.png" className="img-size-65 img-thumbnail" />
                </span>
                <span className="silhouette-list-name">example silhouette name 2 example</span>
              </ListGroupItem>
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default HowMany;

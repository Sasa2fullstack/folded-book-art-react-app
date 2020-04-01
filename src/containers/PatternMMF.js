import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Button, Modal, ModalBody, ModalFooter, ListGroup, ListGroupItem } from 'reactstrap';


import imgDownload from 'static/img/download.svg';

const { ipcRenderer } = window.require('electron');
const base64Img = window.require('base64-img');

class PatternMMF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      silhouetteList: [],
      isModal: false,
      silhouetteId: 0,
      isSettingModal: false,
    };
  }

  componentDidMount() {
    const res = ipcRenderer.sendSync('fba-get-silhouettes');
    this.setState({
      silhouetteList: res,
    });
  }

  onSelectSilhouette = (idx) => {
    this.setState({
      silhouetteId: idx,
      isModal: false,
    });
  };

  toggle = () => {
    const { isModal } = this.state;
    this.setState({
      isModal: !isModal,
    });
  };

  toggleSetting = () => {
    const { isSettingModal } = this.state;
    this.setState({
      isSettingModal: !isSettingModal,
    });
  };

  render() {
    let imgCard = imgDownload;
    let styleImgCard = { margin: 'auto', width: '57px' };
    let classImgCard = '';
    const { isModal, silhouetteList, silhouetteId, isSettingModal } = this.state;
    if (silhouetteId > 0) {
      const silhouetteFound = silhouetteList.find(element => element.id === silhouetteId);
      console.log(silhouetteFound);
      imgCard = base64Img.base64Sync(silhouetteFound.path);
      styleImgCard = { margin: 'auto', width: '150px', height: '150px' };
      classImgCard = 'img-thumbnail';
    }

    const silhouetteListData = silhouetteList.map((silhouette, idx) => (
      <ListGroupItem align="left" key={idx} onClick={id => this.onSelectSilhouette(silhouette.id)}>
        <span>
          <img src={base64Img.base64Sync(silhouette.path)} className="img-size-65 img-thumbnail" />
        </span>
        <span className="silhouette-list-name">{silhouette.name}</span>
      </ListGroupItem>
    ));

    return (
      <div>
        <Container>
          <Row style={{ marginTop: '20vh' }}>
            <Col sm="4" />
            <Col sm="4">
              <Card className="pattern-card" onClick={this.toggle}>
                <img src={imgCard} style={styleImgCard} alt="Selected Silhouette" className={classImgCard} />
              </Card>
            </Col>
            <Col sm="4" />
          </Row>
          <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
            <Col sm="4" />
            <Col sm="4">
              <Button color="success" size="md" onClick={this.toggleSetting}>
                Create Pattern
              </Button>
            </Col>
            <Col sm="4" />
          </Row>
        </Container>

        <Modal isOpen={isModal} centered>
          <ModalBody>
            <ListGroup style={{ height: '400px' }} className="overflow-auto ">
              {silhouetteListData}
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button className="btn-secondary btn-sm" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={isSettingModal} centered>
          <ModalBody />
          <ModalFooter>
            <Button className="btn-secondary btn-sm" onClick={this.toggleSetting}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default PatternMMF;

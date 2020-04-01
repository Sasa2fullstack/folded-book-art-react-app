import React from 'react';
import { Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import DataTable, { createTheme } from 'react-data-table-component';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import imgDownload from 'static/img/download.svg';

const electron = window.require('electron');
const base64Img = window.require('base64-img');
const { dialog } = electron.remote;
const ipcRenderer = electron.ipcRenderer;

createTheme('solarized', {
  headRow: {
    style: {
      border: 'none'
    }
  },
  headCells: {
    style: {
      color: '#202124',
      fontSize: '14px'
    }
  },
  text: {
    primary: '#ffffff',
    secondary: '#353535'
  },
  background: {
    default: '#474747'
  },
  context: {
    background: '#353535'
    // text: '#FFFFFF'
  },
  divider: {
    default: '#606060'
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)'
  }
});

class SilhouetteLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        name: '',
        center: true,
        width: '10%',
        cell: row => (
          <div>
            <img src={base64Img.base64Sync(row.path)} style={{ marginTop: '3px', marginBottom: '3px' }} className="img-size-65 img-thumbnail" />
          </div>
        )
      },
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
        center: true,
        width: '40%'
      },
      {
        name: 'Date',
        selector: 'created_datetime',
        sortable: true,
        center: true,
        width: '40%'
      },
      {
        name: '',
        center: true,
        width: '10%',
        cell: row => <div onClick={id => this.openConfirmDlg(row.id)} className="remove-btn"></div>
      }
    ];
    this.state = {
      confirmModal: 0,
      silhouetteAddModal: false,
      silhouetteImgPath: '',
      silhouetteName: '',
      errorMsg: '',
      data: []
    };
  }
  componentDidMount() {
    this.getSilhouetteData();
  }

  getSilhouetteData = () => {
    const res = ipcRenderer.sendSync('fba-get-silhouettes');
    this.setState({
      data: res
    });
  };

  openAddDlg = () => {
    this.setState({
      silhouetteAddModal: true
    });
  };

  closeDlg = () => {
    this.setState({
      silhouetteAddModal: false
    });
  };

  openSilhouetteImg = () => {
    const files = dialog.showOpenDialogSync({
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: ['jpg', 'png'] }],
      modal: true
    });

    let { silhouetteImgPath } = this.state;
    if (files !== undefined) {
      silhouetteImgPath = files[0].replace(/\\/g, '/');
    }

    this.setState({
      silhouetteImgPath: silhouetteImgPath
    });
  };

  handleChange = event => {
    let curState = this.state;
    curState[event.target.name] = event.target.value;
    this.setState(curState);
  };

  addSilhouette = () => {
    let error = null;
    const { silhouetteImgPath, silhouetteName } = this.state;
    if (silhouetteImgPath.length === 0) {
      error = 'Please choose silhouette image.';
    } else if (silhouetteName.length === 0) {
      error = 'Please enter the name.';
    }
    if (error) {
      this.setState({
        errorMsg: error
      });
    } else {
      const res = ipcRenderer.sendSync('fba-new-silhouette', {
        name: silhouetteName,
        path: silhouetteImgPath
      });
      if (res) {
        this.getSilhouetteData();
        this.setState({
          silhouetteAddModal: false,
          silhouetteImgPath: '',
          silhouetteName: '',
          errorMsg: ''
        });
      } else {
        this.setState({
          errorMsg: 'Error occured'
        });
      }
    }
  };

  openConfirmDlg = id => {
    this.setState({
      confirmModal: id
    });
  };

  removeSilhouette = () => {
    const { confirmModal } = this.state;
    const res = ipcRenderer.sendSync('fba-remove-silhouette-byId', { id: confirmModal });
    if (res) {
      this.getSilhouetteData();
      this.setState({
        confirmModal: 0
      });
    }
  };

  closeConfirmDlg = () => {
    this.setState({
      confirmModal: 0
    });
  };

  updateState = state => {
    this.setState({ selectedRows: state.selectedRows });
  };

  render() {
    const { confirmModal, silhouetteAddModal, silhouetteName, silhouetteImgPath, errorMsg } = this.state;
    let imgOnDlg = imgDownload;
    let imgStyle = { margin: 'auto', width: '57px' };
    if (silhouetteImgPath.length > 0) {
      imgOnDlg = base64Img.base64Sync(silhouetteImgPath);
      imgStyle = { margin: 'auto', width: '150px', height: '150px' };
    }
    return (
      <div style={{ marginTop: '20px' }}>
        <Button color="primary" size="sm" id="btn-add-silhouette" onClick={this.openAddDlg} style={{ marginBottom: '10px' }}>
          New Silhouette
        </Button>
        <DataTable columns={this.columns} theme="solarized" data={this.state.data} onSelectedRowsChange={this.updateState} noHeader={true} />

        <Modal isOpen={silhouetteAddModal} centered>
          <ModalBody>
            <Row>
              <Col sm="1"></Col>
              <Col sm="10">
                <Card className="pattern-card" onClick={this.openSilhouetteImg}>
                  <img src={imgOnDlg} style={imgStyle} alt="New Silhouette Image" />
                </Card>
              </Col>
              <Col sm="1"></Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
              <Col sm="3"></Col>
              <Col sm="6">
                <input className="fba-input" type="text" value={silhouetteName} onChange={this.handleChange} name="silhouetteName" />
              </Col>
              <Col sm="3"></Col>
            </Row>
            <div style={{ marginTop: '10px' }}>{errorMsg}</div>
          </ModalBody>
          <ModalFooter>
            <Button className="btn-primary btn-sm" onClick={this.addSilhouette}>
              Add new silhouette
            </Button>
            <Button className="btn-secondary btn-sm" onClick={this.closeDlg}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={confirmModal > 0 ? true : false} size="sm" centered>
          <ModalBody>
            <div style={{ lineHeight: '12pt' }}>Do you want really to delete a silhouette?</div>
          </ModalBody>
          <ModalFooter>
            <Button className="btn-primary btn-sm" onClick={this.removeSilhouette}>
              Yes
            </Button>
            <Button className="btn-secondary btn-sm" onClick={this.closeConfirmDlg}>
              No
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default SilhouetteLibrary;

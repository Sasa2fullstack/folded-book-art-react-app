import React from 'react';
import { Row, Col, Button, Form, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import DataTable, { createTheme } from 'react-data-table-component';
import ImageViewer from 'components/ImgViewer';

import imgDownload from 'static/img/download.svg';

const electron = window.require('electron');
const Jimp = window.require('jimp');
const { dialog } = electron.remote;
const { ipcRenderer } = electron;

createTheme('solarized', {
  headRow: {
    style: {
      border: 'none',
    },
  },
  headCells: {
    style: {
      color: '#202124',
      fontSize: '14px',
    },
  },
  text: {
    primary: '#ffffff',
    secondary: '#353535',
  },
  background: {
    default: '#474747',
  },
  context: {
    background: '#353535',
  },
  divider: {
    default: '#606060',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
});

class SilhouetteLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        name: '',
        center: true,
        width: '10%',
        cell: row => <ImageViewer path={row.path} width={row.width} height={row.height} size={65} alt="item" />,
      },
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
        center: true,
        width: '40%',
      },
      {
        name: 'Date',
        selector: 'created_datetime',
        sortable: true,
        center: true,
        width: '40%',
      },
      {
        name: '',
        center: true,
        width: '10%',
        cell: row => <div onClick={id => this.openConfirmDlg(row.id)} className="remove-btn" />,
      },
    ];
    this.state = {
      confirmModal: 0,
      silhouetteAddModal: false,
      silhouetteImgPath: '',
      silhouetteName: '',
      width: 0,
      height: 0,
      errorMsg: '',
      data: [],
    };
  }

  componentDidMount() {
    this.getSilhouetteData();
  }

  getSilhouetteData = () => {
    const res = ipcRenderer.sendSync('fba-get-silhouettes');
    this.setState({
      data: res,
    });
  };

  openAddDlg = () => {
    this.setState({
      silhouetteAddModal: true,
    });
  };

  closeDlg = () => {
    this.setState({
      silhouetteAddModal: false,
    });
  };

  openSilhouetteImg = async () => {
    const files = dialog.showOpenDialogSync({
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: ['jpg', 'png'] }],
      modal: true,
    });

    let { silhouetteImgPath } = this.state;
    if (files !== undefined) {
      silhouetteImgPath = files[0].replace(/\\/g, '/');
    }

    try {
      const image = await Jimp.read(silhouetteImgPath);
      this.setState({
        silhouetteImgPath,
        width: image.bitmap.width,
        height: image.bitmap.height,
        errorMsg: '',
      });
    } catch (error) {
      this.setState({
        errorMsg: 'Please open correct image',
        width: 0,
        height: 0,
      });
    }
  };

  handleChange = (event) => {
    const curState = this.state;
    curState[event.target.name] = event.target.value;
    this.setState(curState);
  };

  addSilhouette = () => {
    let error = null;
    const { silhouetteImgPath, silhouetteName, width, height } = this.state;
    if (silhouetteImgPath.length === 0) {
      error = 'Please choose silhouette image.';
    } else if (silhouetteName.length === 0) {
      error = 'Please enter the name.';
    }
    if (error) {
      this.setState({
        errorMsg: error,
      });
    } else {
      const res = ipcRenderer.sendSync('fba-new-silhouette', {
        name: silhouetteName,
        path: silhouetteImgPath,
        width,
        height,
      });
      if (res) {
        this.getSilhouetteData();
        this.setState({
          silhouetteAddModal: false,
          silhouetteImgPath: '',
          silhouetteName: '',
          width: 0,
          height: 0,
          errorMsg: '',
        });
      } else {
        this.setState({
          errorMsg: 'Error occured',
        });
      }
    }
  };

  openConfirmDlg = (id) => {
    this.setState({
      confirmModal: id,
    });
  };

  removeSilhouette = () => {
    const { confirmModal } = this.state;
    const res = ipcRenderer.sendSync('fba-remove-silhouette-byId', { id: confirmModal });
    if (res) {
      this.getSilhouetteData();
      this.setState({
        confirmModal: 0,
      });
    }
  };

  closeConfirmDlg = () => {
    this.setState({
      confirmModal: 0,
    });
  };

  updateState = (state) => {
    this.setState({ selectedRows: state.selectedRows });
  };

  render() {
    const { confirmModal, silhouetteAddModal, silhouetteName, silhouetteImgPath, errorMsg, width, height } = this.state;

    return (
      <div style={{ marginTop: '20px' }}>
        <Button className="btn-primary" size="sm" id="btn-add-silhouette" onClick={this.openAddDlg} style={{ marginBottom: '10px' }}>
          New Silhouette
        </Button>
        <DataTable columns={this.columns} theme="solarized" data={this.state.data} onSelectedRowsChange={this.updateState} noHeader />

        <Modal isOpen={silhouetteAddModal} centered>
          <ModalBody>
            <Row>
              <Col sm="1" />
              <Col sm="10">
                <Card className="pattern-card" onClick={this.openSilhouetteImg}>
                  {silhouetteImgPath.length > 0 ? (
                    <ImageViewer path={silhouetteImgPath} width={width} height={height} size={150} alt="silhoutette-Image" style={{ margin: 'auto' }} />
                  ) : (
                    <img src={imgDownload} style={{ margin: 'auto', width: '57px' }} alt="New Silhouette Image" />
                  )}
                </Card>
              </Col>
              <Col sm="1" />
            </Row>
            <Row style={{ marginTop: '20px' }}>
              <Col sm="3" />
              <Col sm="6">
                <input className="fba-input" type="text" value={silhouetteName} onChange={this.handleChange} name="silhouetteName" />
              </Col>
              <Col sm="3" />
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

        <Modal isOpen={confirmModal > 0} size="sm" centered>
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

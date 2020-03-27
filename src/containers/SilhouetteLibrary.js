import React from 'react';
import { Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import DataTable, { createTheme } from 'react-data-table-component';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import imgDownload from 'static/img/download.svg';

const fs = window.require('fs');
const electron = window.require('electron');
var base64Img = window.require('base64-img');
const { dialog } = electron.remote;
window.electron = {};
window.electron.dialog = dialog;

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
        name: 'a',
        center: true,
        width: '10%',
        cell: row => <div>{/* <img src={require('assets/1.png')} className="img-size-65 img-thumbnail" /> */}</div>
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
        selector: 'date',
        sortable: true,
        center: true,
        width: '40%'
      },
      {
        name: 'Remove',
        center: true,
        width: '10%',
        cell: row => <div onClick={id => this.remove(row.id)} className="remove-btn"></div>
      }
    ];
    this.state = {
      silhouetteAddModal: false,
      silhouetteImgPath: '',
      silhouetteName: '',
      errorMsg: '',
      data: [{ id: 1, name: 'Conan the Barbarian1', date: '2020/1/10', path: 'assets/1.png' }]
    };
    this.remove = this.remove.bind(this);
  }
  componentDidMount() {}

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
      this.setState({
        silhouetteAddModal: false,
        silhouetteImgPath: '',
        silhouetteName: ''
      });
    }
  };

  cancel = () => {
    this.setState({
      silhouetteAddModal: false,
      silhouetteImgPath: '',
      silhouetteName: ''
    });
  };

  add = () => {
    const files = dialog.showOpenDialogSync({
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: ['jpg', 'png'] }],
      modal: true
    });

    console.log(files);

    this.setState({
      silhouetteImgPath: files === undefined ? '' : files[0]
    });
  };

  handleChange = event => {
    let curState = this.state;
    curState[event.target.name] = event.target.value;
    this.setState(curState);
  };

  openAddDlg = () => {
    this.setState({
      silhouetteAddModal: true
    });
  };

  remove = id => {
    let curState = this.state;
    curState.data = curState.data.filter(item => item.id !== id);
    this.setState(curState);
  };

  updateState = state => {
    this.setState({ selectedRows: state.selectedRows });
  };

  render() {
    const { silhouetteAddModal, silhouetteName, silhouetteImgPath, errorMsg } = this.state;
    let imgOnDlg = imgDownload;
    let imgStyle = { margin: 'auto', width: '57px' };
    if (silhouetteImgPath.length > 0) {
      imgOnDlg = base64Img.base64Sync(silhouetteImgPath);
      imgStyle = { margin: 'auto', width: '150px', height: '150px' };
    }
    return (
      <div>
        <Button color="success" size="sm" id="btn-add-silhouette" onClick={this.openAddDlg} style={{ marginBottom: '10px' }}>
          New Silhouette
        </Button>
        <DataTable columns={this.columns} theme="solarized" data={this.state.data} onSelectedRowsChange={this.updateState} />

        <Modal isOpen={silhouetteAddModal}>
          <ModalBody>
            <Row>
              <Col sm="1"></Col>
              <Col sm="10">
                <Card className="pattern-card" onClick={this.add}>
                  <img src={imgOnDlg} style={imgStyle} alt="New Silhouette Image" />
                </Card>
              </Col>
              <Col sm="1"></Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
              <Col sm="2"></Col>
              <Col sm="8">
                <input className="fba-input" type="text" value={silhouetteName} onChange={this.handleChange} name="silhouetteName" />
              </Col>
              <Col sm="2"></Col>
            </Row>
            <div style={{ marginTop: '10px' }}>{errorMsg}</div>
          </ModalBody>
          <ModalFooter>
            <Button className="btn-primary btn-sm" onClick={this.addSilhouette}>
              Add new silhouette
            </Button>
            <Button className="btn-secondary btn-sm" onClick={this.cancel}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default SilhouetteLibrary;

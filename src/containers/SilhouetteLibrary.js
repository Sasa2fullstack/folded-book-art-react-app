import React from 'react';
import { Button } from 'reactstrap';
import DataTable, { createTheme } from 'react-data-table-component';
import imgRecylebin from 'static/img/recylebin.svg';

var fs = require('fs-extra');
const { dialog } = require('electron').remote;

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
        cell: row => (
          <div>
            <img src={require('d:/3.png')} className="img-size-65 img-thumbnail" />
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
      data: [{ id: 1, name: 'Conan the Barbarian1', date: '2020/1/10', path: 'd:/3.png' }]
    };
    this.remove = this.remove.bind(this);
  }
  componentDidMount() {
    // document.getElementById('btn-add-silhouette').addEventListener('click', () => {
    //   dialog.showOpenDialog(filenames => {
    //     if (filenames === undefined) {
    //       console.log('no files were selected');
    //       return;
    //     }
    //   });
    // });
  }
  remove = id => {
    let curState = this.state;
    curState.data = curState.data.filter(item => item.id !== id);
    this.setState(curState);
  };
  updateState = state => {
    this.setState({ selectedRows: state.selectedRows });
  };
  render() {
    return (
      <div>
        <Button color="success" size="sm" id="btn-add-silhouette">
          Proceed
        </Button>
        <DataTable columns={this.columns} theme="solarized" data={this.state.data} onSelectedRowsChange={this.updateState} />
      </div>
    );
  }
}

export default SilhouetteLibrary;

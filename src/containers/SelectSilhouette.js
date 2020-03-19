import React from 'react';
import { Row, Col } from 'reactstrap';
import SelectedSilhouettes from 'components/selectsilhouette/SelectedSilhouettes';
import SilhouetteList from 'components/selectsilhouette/SilhouetteList';

class SelectSilhouette extends React.Component {
  render() {
    return (
      <Row>
        <Col sm="3">
          <SelectedSilhouettes />
        </Col>
        <Col sm="9">
          <SilhouetteList />
        </Col>
      </Row>
    );
  }
}

export default SelectSilhouette;

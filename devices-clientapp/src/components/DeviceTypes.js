import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { DEVICES } from '../actions';

class DeviceTypes extends PureComponent {

  render() {
    var deviceType = this.props.data;
    return (
      <option value={deviceType.type}>{deviceType.type}</option>
    );
  }
}

const mapStateToProps = state => ({ deviceType: state.deviceType });
const mapDispatchToProps = dispatch => DEVICES(dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DeviceTypes);

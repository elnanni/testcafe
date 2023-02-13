import React, { PureComponent, lazy, Suspense } from 'react';
import { connect } from "react-redux";
import { DEVICES } from '../actions';
import { Link } from 'react-router-dom';

const DeviceTypes = lazy(() => import('./DeviceTypes'));

class ListOPtions extends PureComponent {
    componentDidMount() {
      this.props.getDeviceTypes()
    }

    constructor(props) {
        super(props);
        this.state = {
            device_type: "",
            sort_by: ""
        }
    }

    filterBy = (event) => {
        this.setState({ device_type: event.target.value }, () => this.props.filterValue(this.state.device_type));
    }
    sortBy = (event) => {
        this.setState({ sort_by: event.target.value }, () => this.props.sortList(this.props.devices , this.state.sort_by));
    }
    render() {
        const { deviceTypes } = this.props
        return (
            <div className="list-options-box">
                <div className="list-options">
                    <div className="list-filters">
                        <div className="filter1">
                            <label htmlFor="device_type">Device Type: </label>
                            <Suspense fallback={<div>Loading...</div>}>
                            <select id="device_type" name="device_type" value={this.state.device_type} onChange={this.filterBy}>
                                <option value="ALL">ALL</option>
                                {
                                    deviceTypes.map((deviceType) =>
                                        <DeviceTypes data={deviceType} key={deviceType.id} />
                                    )
                                }
                            </select>
                            </Suspense>
                        </div>
                        <div className="filter2">
                            <label htmlFor="sort_by">Sort by: </label>
                            <select id="sort_by" name="sort_by" value={this.state.sort_by} onChange={this.sortBy}>
                                <option value="hdd_capacity">HDD CAPACITY</option>
                                <option value="system_name">SYSTEM NAME</option>
                            </select>
                        </div>
                        <Link to="/devices/add" className="submitButton">ADD DEVICE</Link>
                    </div> 
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({ deviceTypes: state.devicesReducer.deviceTypes });
const mapDispatchToProps = dispatch => DEVICES(dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ListOPtions);

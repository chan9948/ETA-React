import React from 'react';
// import ReactDOM from 'react-dom';
import Select from 'react-select'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


class SelectorPanel extends React.Component {
    constructor(props) {
        super(props);



        this.state = {
            showRoutes: [],
            showStops: [],

            selectedRoute: null,
            selectedStop: null,

            routeValue: null,
            stopValue: null,
        }
    }
    componentDidMount() {
        let tmpShowRoutes = [];
        console.log("loading");
        this.props.routes.forEach((item) => {
            let text = item.route + " : " + item.orig_tc + " -> " + item.dest_tc;
            tmpShowRoutes.push({ value: item, label: text });
        });
        this.setState({ showRoutes: tmpShowRoutes }, (() => { console.log("loading end") }));
    }
    render() {
        const handleRouteChange = (e) => {
            let tmpShowStops = [];
            this.props.mappings.forEach((mapping) => {
                // console.log(mapping);
                if (mapping.route === e.value.route && mapping.bound === e.value.bound) {
                    this.props.stops.forEach((stop) => {
                        if (mapping.stop === stop.stop) {
                            tmpShowStops.push({ value: stop, label: stop.name_tc });
                        }
                    })
                }
            })
            this.setState({
                showStops: tmpShowStops,
                stopValue: null,
                selectedStop: null,
                selectedRoute: e.value,
                routeValue: { value: e.value, label: e.label }
            });
        }
        const handleStopChange = (e) => {
            this.setState({
                selectedStop: e.value,
                stopValue: { value: e.value, label: e.label }
            })
        }
        const handleAddTrack = () => {
            this.props.addTrack(this.state.selectedRoute, this.state.selectedStop);
            this.setState({
                selectedRoute: null,
                selectedStop: null,
                routeValue: null,
                stopValue: null,
            });
        }
        return (
            <div>
                <Autocomplete
                    options={this.state.showRoutes}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => <TextField {...params} label="Route" variant="outlined" />}
                    onChange={(e, newValue) => { handleRouteChange(newValue) }}
                    value={this.state.routeValue}
                ></Autocomplete>
                <Autocomplete
                    options={this.state.showStops}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => <TextField {...params} label="Stop" variant="outlined" />}
                    onChange={(e, newValue) => { handleStopChange(newValue) }}
                    value={this.state.stopValue}
                ></Autocomplete>
                <Button disabled={this.state.selectedRoute == null || this.state.selectedStop == null} style={{ width: '100%' }} variant="outlined" onClick={(e) => { handleAddTrack(e) }}>Add</Button>
            </div>
        )
    }
}


export default SelectorPanel;
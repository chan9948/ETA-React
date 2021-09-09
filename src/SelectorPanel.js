import React from 'react';
// import ReactDOM from 'react-dom';
// import Select from 'react-select'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


class SelectorPanel extends React.Component {
    constructor(props) {
        super(props);



        this.state = {
            showRoutes: [],
            showStops: [],

            selectedRouteValue: null,
            selectedStopValue: null,
        }
    }
    componentDidMount() {
        let tmpShowRoutes = [];
        console.log("loading");
        Object.entries(this.props.routes).forEach((item) => {
            let route = item[1];
            let text = route.route + " : " + route.orig_tc + " -> " + route.dest_tc;
            tmpShowRoutes.push({ value: route, label: text });
        });
        this.setState({ showRoutes: tmpShowRoutes }, (() => { console.log("loading end") }));
    }
    render() {
        const handleRouteChange = (newValue) => {
            let tmpShowStops = [];

            // console.log(newValue.value);
            let route = newValue.value;
            // console.log(this.props.mappings[route.route + "&" + route.bound]);
            let matchedMappings = this.props.mappings[route.route + "&" + route.bound];
            matchedMappings.forEach((mapping) => {
                // console.log(mapping);
                let stop = this.props.stops[mapping.stop];
                // console.log(stop);
                tmpShowStops.push({ label: stop.name_tc, value: stop});
            });

            this.setState({
                showStops: tmpShowStops,
                selectedStopValue: null,
                selectedRouteValue: newValue,
            });
        }
        const handleStopChange = (newValue) => {
            this.setState({
                selectedStopValue: newValue,
            })
        }
        const handleAddTrack = () => {
            this.props.addTrack(this.state.selectedRouteValue.value, this.state.selectedStopValue.value);
            this.setState({
                selectedRouteValue: null,
                selectedStopValue: null,
            });
        }
        return (
            <div>
                <Autocomplete
                    options={this.state.showRoutes}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => <TextField {...params} label="Route" variant="outlined" />}
                    onChange={(e, newValue) => { handleRouteChange(newValue) }}
                    value={this.state.selectedRouteValue}
                ></Autocomplete>
                <Autocomplete
                    options={this.state.showStops}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => <TextField {...params} label="Stop" variant="outlined" />}
                    onChange={(e, newValue) => { handleStopChange(newValue) }}
                    value={this.state.selectedStopValue}
                ></Autocomplete>
                <Button disabled={this.state.selectedRouteValue === null || this.state.selectedStopValue === null} style={{ width: '100%' }} variant="outlined" onClick={(e) => { handleAddTrack(e) }}>Add</Button>
            </div>
        )
    }
}


export default SelectorPanel;
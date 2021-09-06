import React from 'react';
// import ReactDOM from 'react-dom';
import Select from 'react-select'

class SelectorPanel extends React.Component {
    constructor(props) {
        super(props);



        this.state = {
            showRoutes: [],
            showStops: [],

            selectedRoute: null,
            selectedStop: null,
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
        const handleRouteChange = (route) => {
            let tmpShowStops = [];
            this.props.mappings.forEach((mapping) => {
                // console.log(mapping);
                if (mapping.route === route.route && mapping.bound === route.bound) {
                    this.props.stops.forEach((stop) => {
                        if (mapping.stop === stop.stop) {
                            tmpShowStops.push({ value: stop, label: stop.name_tc });
                        }
                    })
                }
            })
            this.setState({ showStops: tmpShowStops });
        }
        return (
            <div>
                <Select options={this.state.showRoutes} onChange={(e) => { this.setState({ selectedRoute: e.value }); handleRouteChange(e.value) }}></Select>
                <Select options={this.state.showStops} onChange={(e) => { this.setState({ selectedStop: e.value }) }}></Select>
            </div>
        )
    }
}


export default SelectorPanel;
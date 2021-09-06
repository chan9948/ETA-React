import React from 'react';
// import ReactDOM from 'react-dom';
// import Select from 'react-select'

class SelectorPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showRoutes: [],
            showStops: [],

            selectedRoute: null,
            selectedstop: null,
        }
    }

    render() {
        return (
            <div style={{ borderRadius: "12px", aspectRatio: "4/1", width: "100vw", maxWidth: "12cm", backgroundColor: "lightsteelblue", display: "flex", flexDirection: "row" }}>
                
            </div>
        )
    }
}

export default SelectorPanel;
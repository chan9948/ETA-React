import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import TrackItem from "./TrackItem";
import SelectorPanel from "./SelectorPanel";
// import TrackList from "./TrackList";

const routesUrl = "https://data.etabus.gov.hk/v1/transport/kmb/route/";
const stopsUrl = "https://data.etabus.gov.hk/v1/transport/kmb/stop"
const mappingsUrl = "https://data.etabus.gov.hk/v1/transport/kmb/route-stop";

const fetchData = (url) => {
    return fetch(url)
        .then(
            (res) => { return res.json() }
        )
}

const initData = (THIS, targetName, url) => {
    let ls = window.localStorage;
    let item = ls.getItem(targetName)
    if (item) {
        console.log("load " + targetName + " from localStorage");
        THIS.setState({
            [targetName]: JSON.parse(item)
        })
    } else {
        if (url) {
            console.log("load " + targetName + " from internet");
            fetchData(url).then(
                (json) => {
                    let data = json.data;
                    ls.setItem(targetName, JSON.stringify(data));
                    THIS.setState({
                        [targetName]: data
                    })
                }
            );
        } else {
            console.log("store empty " + targetName + " to localStorage");
            ls.setItem(targetName, JSON.stringify({}));
        }
    }
    return Promise.resolve();
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: [],
            stops: [],
            mappings: [],
        }
    }
    componentDidMount() {
        //init
        initData(this, "routes", routesUrl).then(() => { this.setState({ showRoutes: this.state.routes }) });
        initData(this, "stops", stopsUrl).then(() => { this.setState({ showStops: this.state.stops }) });
        initData(this, "mappings", mappingsUrl);
        initData(this, "trackList", null);
    }
    render() {
        return (
            <>
                <SelectorPanel routes={this.state.routes}></SelectorPanel>
                {/* <TrackList></TrackList> */}
            </>
        );
    }
}

// ========================================

ReactDOM.render(<
    App />,
    document.getElementById('root')
);
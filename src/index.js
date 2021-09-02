import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
        THIS.setState({ [targetName]: JSON.parse(item) })
    } else {
        if (url) {
            console.log("load " + targetName + " from internet");
            fetchData(url).then(
                (json) => {
                    let data = json.data;
                    ls.setItem(targetName, JSON.stringify(data));
                    THIS.setState({ [targetName]: data })
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

            showRoutes: [],
            showStops: [],

            selectedRoute: {},
            selectedstop: {},


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
                <div style={{ borderRadius:"12px",aspectRatio: "4/1", width: "100vw", maxWidth: "12cm", backgroundColor:"lightsteelblue", display: "flex", flexDirection: "row" }}> {/*a card*/}
                    <div style={{ backgroundColor: "lightgray",margin: "12px", borderRadius: "50%", aspectRatio: "1/1", display: "flex", justifyContent: "center", alignItems: "center" }}>{/*left section*/}
                        <div style={{ padding: "10%", fontSize: "1.5em" }}>ABCX</div>
                    </div>
                    <div style={{ aspectRatio: "3/1" }}>{/*right section*/}
                        <div style={{ aspectRatio: "6/1", display: "flex", justifyContent: "center", alignItems: "center" }}>{/*right top*/}
                            <div style={{ fontSize: "1.3em" }}>ADSDA -> dasdas</div>
                        </div>
                        <div style={{ aspectRatio: "6/1", display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-around" }}>{/*right bottom*/}
                            <div style={{ fontSize: "1.5em" }}>{/*right bottom left*/}
                                Asd
                            </div>
                            <div style={{ width: "30%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>{/*right bottom right*/}
                                <div style={{ backgroundColor: "lightblue", padding: "2.5px 5px", borderRadius: "7.5px" }}>12</div>
                                <div style={{ backgroundColor: "lightblue", padding: "2.5px 5px", borderRadius: "7.5px" }}>12</div>
                                <div style={{ backgroundColor: "lightblue", padding: "2.5px 5px", borderRadius: "7.5px" }}>12</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {
                    this.state.trackList.map((item, index) => (
                        <></>
                    ))
                } */}
            </>
        );
    }
}

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import TrackItem from "./TrackItem";
import SelectorPanel from "./SelectorPanel";
import TrackList from "./TrackList";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const routesUrl = "https://data.etabus.gov.hk/v1/transport/kmb/route/";
const stopsUrl = "https://data.etabus.gov.hk/v1/transport/kmb/stop"
const mappingsUrl = "https://data.etabus.gov.hk/v1/transport/kmb/route-stop";

const fetchData = (url) => {
    return fetch(url)
        .then(
            (res) => { return res.json() }
        )
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            routes: null,
            stops: null,
            mappings: null,

            tracks: null,

            debug: false,
            debugText: "init",
        }
    }
    componentDidMount() {
        const initData = (targetName, url) => {
            let ls = window.localStorage;
            let item = ls.getItem("eta-react-" + targetName)
            if (item) {
                console.log("load " + targetName + " from localStorage");
                this.setState({
                    [targetName]: JSON.parse(item)
                })
            } else {
                if (url) {
                    console.log("load " + targetName + " from internet");
                    fetchData(url).then(
                        (json) => {
                            let data = json.data;
                            let dict = {};
                            if (targetName === "routes") {
                                data.forEach((route) => {
                                    dict[route.route + "&" + route.bound] = route;
                                })
                            }
                            if (targetName === "stops") {
                                data.forEach((stop) => {
                                    dict[stop.stop] = stop;
                                })
                            }
                            if (targetName === "mappings") {
                                data.forEach((mapping) => {
                                    if (!dict[mapping.route + "&" + mapping.bound]) {
                                        dict[mapping.route + "&" + mapping.bound] = [];
                                    }
                                    dict[mapping.route + "&" + mapping.bound].push(mapping);
                                })
                            }
                            ls.setItem("eta-react-" + targetName, JSON.stringify(dict));
                            this.setState({
                                [targetName]: dict
                            })
                        }
                    );
                } else {
                    console.log("store empty " + targetName + " to localStorage");
                    let data = [];
                    this.setState({
                        [targetName]: data
                    })
                    ls.setItem("eta-react-" + targetName, JSON.stringify(data));
                }
            }
        }
        //init
        initData("routes", routesUrl);
        initData("stops", stopsUrl);
        initData("mappings", mappingsUrl);
        initData("tracks", null);
    }
    render() {
        const notifyInfo = (msg) => toast.info(msg);
        const notifyWarn = (msg) => toast.warn(msg);
        const addTrack = (route, stop) => {
            if (route !== null && stop !== null) {
                let newTrack = {
                    created: new Date(),
                    route: route.route,
                    orig: route.orig_tc,
                    dest: route.dest_tc,
                    stop: stop.name_tc,
                    bound: route.bound,
                    url: `https://data.etabus.gov.hk/v1/transport/kmb/eta/${stop.stop}/${route.route}/1`,
                };
                // console.log(newTrack);
                let alreadyExists = false;
                this.state.tracks.forEach(track => {
                    if (track.url === newTrack.url && track.bound === newTrack.bound) {
                        alreadyExists = true;
                    }
                });
                if (!alreadyExists) {
                    this.setState({ tracks: [...this.state.tracks, newTrack] }, () => { window.localStorage.setItem("eta-react-tracks", JSON.stringify(this.state.tracks)) });
                } else {
                    notifyWarn("track already exists");
                }
            } else {
                //err
            }
        }
        const removeTrack = (url) => {
            let tmpTracks = JSON.parse(JSON.stringify(this.state.tracks));
            let removeTrackRoute;
            tmpTracks.forEach((track) => {
                if (track.url === url) {
                    removeTrackRoute = track.route;
                    tmpTracks.splice(tmpTracks.indexOf(track), 1);
                }
            })
            // console.log(tmpTracks);
            this.setState({ tracks: tmpTracks }, () => {
                window.localStorage.setItem("eta-react-tracks", JSON.stringify(this.state.tracks));
                notifyInfo("removed " + removeTrackRoute + " track")
            });
        }
        return (
            <>
                {
                    this.state.debug
                        ?
                        <>
                            <pre>{this.state.debugText}</pre>
                            <button onClick={() => { window.localStorage.clear(); window.location.reload(); }}>DEBUG</button>
                            <button onClick={() => {
                                let a, b, c;
                                if (window.localStorage.getItem("eta-react-routes")) {
                                    a = JSON.stringify(JSON.parse(window.localStorage.getItem("eta-react-routes"))["968&I"]);
                                } else {
                                    a = "eta-react-routes load error";
                                }
                                if (window.localStorage.getItem("eta-react-stops")) {
                                    b = JSON.stringify(JSON.parse(window.localStorage.getItem("eta-react-stops"))["B7773ED8D2FC08E5"]);
                                } else {
                                    b = "eta-react-stops load error";
                                }
                                if (window.localStorage.getItem("eta-react-mappings")) {
                                    c = JSON.stringify(JSON.parse(window.localStorage.getItem("eta-react-mappings"))["968&I"]);
                                } else {
                                    c = "eta-react-mappings load error";
                                }
                                this.setState({ debugText: a + "\n" + b + "\n" + c });
                            }}>abc</button>
                        </>
                        :
                        <></>
                }
                <div onContextMenu={(e) => { this.setState({ debug: !this.state.debug }) }}>
                    <code> Right click (pc)/long press (mobile) track card to remove it </code>
                    <br />
                    <code> Refresh rate: 10s</code>
                </div>
                {
                    this.state.routes
                        ?
                        <SelectorPanel
                            addTrack={addTrack}
                            routes={this.state.routes}
                            stops={this.state.stops}
                            mappings={this.state.mappings} />
                        : ""
                }
                <TrackList
                    tracks={this.state.tracks}
                    removeTrack={removeTrack}
                />
                <ToastContainer position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick rtl={false}
                    pauseOnFocusLoss draggable pauseOnHover
                />
            </>
        );
    }
}

// ========================================

ReactDOM.render(<
    App />,
    document.getElementById('root')
);
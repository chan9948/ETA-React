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
            let data = [];
            THIS.setState({
                [targetName]: data
            })
            ls.setItem(targetName, JSON.stringify(data));
        }
    }
    return Promise.resolve();
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            routes: null,
            stops: null,
            mappings: null,

            tracks: null,
        }
    }
    componentDidMount() {
        //init
        initData(this, "routes", routesUrl).then(() => { this.setState({ showRoutes: this.state.routes }) });
        initData(this, "stops", stopsUrl).then(() => { this.setState({ showStops: this.state.stops }) });
        initData(this, "mappings", mappingsUrl);
        initData(this, "tracks", null);
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
                    if (track.url === newTrack.url) {
                        alreadyExists = true;
                    }
                });
                if (!alreadyExists) {
                    this.setState({ tracks: [...this.state.tracks, newTrack] }, () => { window.localStorage.setItem("tracks", JSON.stringify(this.state.tracks)) });
                } else {
                    notifyWarn("track already exists");
                }
            } else {
                //err
            }
        }
        const removeTrack = (url) =>{
            let tmpTracks = JSON.parse(JSON.stringify(this.state.tracks));
            let removeTrackRoute;
            tmpTracks.forEach((track) =>{
                if(track.url === url) {
                    removeTrackRoute = track.route;
                    tmpTracks.splice(tmpTracks.indexOf(track),1);
                }
            })
            // console.log(tmpTracks);
            this.setState({tracks: tmpTracks},()=>{window.localStorage.setItem("tracks", JSON.stringify(this.state.tracks));notifyInfo("removed " + removeTrackRoute + " track")});
        }
        return (
                <>
                <code>Right-click card to remove</code>
                <br />
                <code>Refresh rate: 10s</code>
                {this.state.routes ? <SelectorPanel addTrack={addTrack} routes={this.state.routes} stops={this.state.stops} mappings={this.state.mappings}></SelectorPanel> : ""}
                <TrackList tracks={this.state.tracks} removeTrack={removeTrack}></TrackList>
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
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
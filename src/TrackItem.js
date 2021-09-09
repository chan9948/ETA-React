import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';

class TrackItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            etas: [],
        }
    }
    componentDidMount() {
        const updateEta = () => {
            fetch(this.props.track.url)
                .then(
                    (res) => { return res.json() }
                ).then((myJson) => {
                    let data = myJson.data;
                    let tmpEtas = [];
                    let now = Date.now();
                    data.forEach((record) => {
                        if (record.dir === this.props.track.bound) {
                            let tmpEta = Math.round((new Date(record.eta) - now) / 1000 / 60);
                            if (tmpEta >= 0) {
                                tmpEtas.push(tmpEta)
                            }
                        }
                    });
                    if (tmpEtas.length === 0) {
                        tmpEtas.push("no car");
                    }
                    this.setState({ etas: tmpEtas });
                });
        }
        updateEta();
        setInterval(() => {
            updateEta();
        }, 10000);
    }
    render() {
        return (
            <div onContextMenu={() => { this.props.removeTrack(this.props.track.url) }} style={{ fontSize: "10px", marginBottom: "10px", borderRadius: "12px", aspectRatio: "4/1", width: "100%", maxWidth: "12cm", backgroundColor: "lightsteelblue", display: "flex", flexDirection: "row" }}> {/*a card*/}
                <div style={{ width: "20%", margin: "2.5%", backgroundColor: "lightgray", borderRadius: "50%", aspectRatio: "1/1", display: "flex", justifyContent: "center", alignItems: "center" }}>{/*left section*/}
                    <div style={{ padding: "10%", fontSize: "1.5em"}}>{this.props.track.route}</div>
                </div>
                <div style={{ width: "75%", aspectRatio: "3/1" }}>{/*right section*/}
                    <div style={{ aspectRatio: "6/1", display: "flex", justifyContent: "center", alignItems: "center" }}>{/*right top*/}
                        <div style={{ fontSize: "1.3em" }}>{this.props.track.orig + " -> " + this.props.track.dest}</div>
                    </div>
                    <div style={{ aspectRatio: "6/1", display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-around" }}>{/*right bottom*/}
                        <div style={{ fontSize: "1.5em" }}>{/*right bottom left*/}
                            {this.props.track.stop}
                        </div>
                        <div style={{ width: "30%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>{/*right bottom right*/}
                            {/* <div style={{ backgroundColor: "lightblue", padding: "2.5px 5px", borderRadius: "7.5px" }}>12</div>
                            <div style={{ backgroundColor: "lightblue", padding: "2.5px 5px", borderRadius: "7.5px" }}>12</div>
                            <div style={{ backgroundColor: "lightblue", padding: "2.5px 5px", borderRadius: "7.5px" }}>12</div> */}
                            {
                                this.state.etas.map((eta, index) => (
                                    <div key={index} style={{ backgroundColor: "lightblue", padding: "2.5px 5px", borderRadius: "7.5px" }}>{eta}</div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            // <div style={{marginBottom: "10px", borderRadius: "12px", aspectRatio: "4/1", width: "100%", maxWidth: "12cm", backgroundColor: "lightsteelblue", display: "flex", flexDirection: "row" }}> {/*a card*/}
            //     <div style={{ backgroundColor: "lightgray", margin: "12px", borderRadius: "50%", aspectRatio: "1/1", display: "flex", justifyContent: "center", alignItems: "center" }}>{/*left section*/}
            //         <div style={{ padding: "10%", fontSize: "1.5em", aspectRatio: "1/1"}}>{this.props.track.route}</div>
            //     </div>
            //     <div style={{ aspectRatio: "3/1" }}>{/*right section*/}
            //         <div style={{ aspectRatio: "6/1", display: "flex", justifyContent: "center", alignItems: "center" }}>{/*right top*/}
            //             <div style={{ fontSize: "1.3em" }}>{this.props.track.orig + " -> " + this.props.track.dest}</div>
            //         </div>
            //         <div style={{ aspectRatio: "6/1", display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-around" }}>{/*right bottom*/}
            //             <div style={{ fontSize: "1.5em" }}>{/*right bottom left*/}
            //                 {this.props.track.stop}
            //             </div>
            //             <div style={{ width: "30%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>{/*right bottom right*/}
            //                 {/* <div style={{ backgroundColor: "lightblue", padding: "2.5px 5px", borderRadius: "7.5px" }}>12</div>
            //                 <div style={{ backgroundColor: "lightblue", padding: "2.5px 5px", borderRadius: "7.5px" }}>12</div>
            //                 <div style={{ backgroundColor: "lightblue", padding: "2.5px 5px", borderRadius: "7.5px" }}>12</div> */}
            //                 {
            //                     this.state.etas.map((eta) => (
            //                         <div style={{ backgroundColor: "lightblue", padding: "2.5px 5px", borderRadius: "7.5px" }}>{eta}</div>
            //                     ))
            //                 }
            //             </div>
            //         </div>
            //     </div>
            // </div>
        )
    }
}

export default TrackItem;
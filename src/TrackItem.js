import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class TrackItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div style={{ borderRadius: "12px", aspectRatio: "4/1", width: "100vw", maxWidth: "12cm", backgroundColor: "lightsteelblue", display: "flex", flexDirection: "row" }}> {/*a card*/}
                <div style={{ backgroundColor: "lightgray", margin: "12px", borderRadius: "50%", aspectRatio: "1/1", display: "flex", justifyContent: "center", alignItems: "center" }}>{/*left section*/}
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
        )
    }
}

export default TrackItem;
import React from 'react';
// import ReactDOM from 'react-dom';
import TrackItem from './TrackItem';

class TrackList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column" ,padding: "10px 0"}}>
                {
                    this.props.tracks!==null
                    ?
                    this.props.tracks.map((track)=>(
                        <TrackItem key={track.created} track={track} removeTrack={this.props.removeTrack}></TrackItem>
                    ))
                    :""
                }
            </div>
        )
    }
}

export default TrackList;
import React, { Component } from 'react'

import YouTube from 'react-youtube';
import { ReactVideoPlay, VideoSourceType } from 'react-video-play';
import './header.css'

class VdoHeader extends Component {
    render() {
        const opts = {
            playerVars: {
                autoplay: 1,
                start: 0,
                loop: 1,
                playlist: "EJmGK1tby5Q",
                mute: 1
            },
        };
        return (
            <div className="imgHead">
                <div className="video-background">
                    <div className="video-foreground">
                        <YouTube
                            videoId="EJmGK1tby5Q"
                            opts={opts}
                            className="video-iframe"
                            onReady={this._onReady}
                        />
                    </div>

                </div>
            </div >
        );
    }
    _onReady(event) {
        // access to player in all event handlers via event.target
    }
}

export default VdoHeader
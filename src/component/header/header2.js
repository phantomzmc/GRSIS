import React, { Component } from 'react'

import YouTube from 'react-youtube';
import { ReactVideoPlay, VideoSourceType } from 'react-video-play';
import './header2.css'

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
                <div id="video-background">
                    <div id="video-foreground">
                        <YouTube
                            videoId="EJmGK1tby5Q"
                            opts={opts}
                            id="video-iframe"
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
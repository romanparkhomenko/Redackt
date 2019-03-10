import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';

export default class Media extends Component {

    getSource = () => {
        let url = this.props.url;
        if (url) {
            // If getting a reddit video preview, use that as source, else use image.
            if (url.fallback_url) {
                return url.fallback_url;
            } else {
                return url;
            }
        } else {
            return null
        }
    };

    render() {
        const source = this.getSource();
        return (
            <LazyLoad height={200} offset={100} overflow={true} resize={true} once={true}>
                <div className="mediaDiv">
                    {source.indexOf("v.redd.it") !== -1 ? (
                        <video controls={0} src={source} autoPlay={1} loop={1} muted={1}></video>
                    ) : (
                        <img src={source} alt={source}/>
                    )}
                </div>
            </LazyLoad>
        );
    }
}


import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';

export default class Media extends Component {

    // If getting a reddit video preview, use the fallback_url from the response
    // as the video source. Else if the url contains "youtube" generate an iframe,
    // else use the url source for an image.
    getSource = () => {
        let url = this.props.url;
        if (url) {
            if (url.fallback_url) {
                return url.fallback_url;
            } else {
                return url;
            }
        } else {
            return null
        }
    };

    getYoutubeSource = (url) => {
        let ID = '';
        url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if(url[2] !== undefined) {
            ID = url[2].split(/[^0-9a-z_-]/i);
            ID = ID[0];
        }
        else {
            ID = url;
        }
        return "https://www.youtube.com/embed/" + ID;
    };

    render() {
        const source = this.getSource();
        return (
            <LazyLoad height={200} offset={100} overflow={true} resize={true} once={true}>
                <div className="mediaDiv">
                    {source.indexOf("v.redd.it") !== -1 ? (
                        <video controls={0} src={source} autoPlay={1} loop={1} muted={1}></video>
                    ) : (
                        source.indexOf("youtube") !== -1 || source.indexOf("youtu.be") !== -1 ? (
                            <div className="responsiveIframe">
                                <iframe className={"iframe-video"} title={source}
                                        src={this.getYoutubeSource(source)}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen={1}>
                                </iframe>
                            </div>
                        ) : (
                            <img src={source} alt={source}/>
                        )
                    )}
                </div>
            </LazyLoad>
        );
    }
}


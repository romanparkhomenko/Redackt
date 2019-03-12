import React, { Component } from 'react';
// import headshot from '../images/slack-logo-icon.png';
import messageIcon from '../images/message-icon.svg';
import linkIcon from '../images/link-icon.svg';
import Media from "./Media";

export default class Message extends Component {

    state = {
        mediaExpanded: false
    };

    // Check if media prop received from RedditPost component and pass URL.
    getMedia = () => {
        let media = this.props.media;
        if (media) {
            if (media.reddit_video_preview) {
                return media.reddit_video_preview;
            } else {
                return media;
            }
        } else {
            return null
        }
    };

    //Get upvote number on post
    getScore = () => {
        return this.props.upvotes > 999 ? (this.props.upvotes/1000).toFixed(1) + 'k' : this.props.upvotes;
    };

    getSilver = () => {
      if (this.props.gildings) {
          if (this.props.gildings.gid_1 > 0) {
              return (
                  <div className="tooltip">
                      <span className="tooltiptext tooltip-top"><strong>{this.props.gildings.gid_1}</strong> silver awards.</span>
                      <button><span role="img" aria-label="bronze-award">&#x1F949;</span> {this.props.gildings.gid_1}</button>
                  </div>
              )
          }
      }
    };

    getGold = () => {
        if (this.props.gildings) {
            if (this.props.gildings.gid_2 > 0) {
                return (
                    <div className="tooltip">
                        <span className="tooltiptext tooltip-top"><strong>{this.props.gildings.gid_2}</strong> gold awards.</span>
                        <button><span role="img" aria-label="gold-award">&#x1F948;</span> {this.props.gildings.gid_2}</button>
                    </div>
                )
            }
        }
    };

    getPlat = () => {
        if (this.props.gildings) {
            if (this.props.gildings.gid_3 > 0) {
                return (
                    <div className="tooltip">
                        <span className="tooltiptext tooltip-top"><strong>{this.props.gildings.gid_3}</strong> platinum awards.</span>
                        <button><span role="img" aria-label="platinum-award">&#x1F947;</span> {this.props.gildings.gid_3}</button>
                    </div>
                )
            }
        }
    };

    getPostDate = (created) => {
        if (created) {
            let seconds = Math.floor((new Date() - created * 1000) / 1000);
            // let date = new Date(created * 1000);
            let interval = Math.floor(seconds / 31536000);
            if (interval > 1) {
                return interval + " years ago";
            }
            interval = Math.floor(seconds / 2592000);
            if (interval > 1) {
                return interval + " months ago";
            }
            interval = Math.floor(seconds / 86400);
            if (interval > 1) {
                return interval + " days ago";
            }
            interval = Math.floor(seconds / 3600);
            if (interval > 1) {
                return interval + " hours ago";
            }
            interval = Math.floor(seconds / 60);
            if (interval > 1) {
                return interval + " minutes ago";
            }
            return Math.floor(seconds) + " seconds ago";
        }
    };

    // Open thread if clicked inside message box.
    handleClick = (e) => {
        if (!this.node.contains(e.target) && !this.props.noClick) {
            this.props.handleThreadOpen(this.props.index, this.props.media)
        }
    };

    // Make media element pop up in modal
    expandMedia = (prevState) => {
        if (this.state.mediaExpanded !== prevState.mediaExpanded) {
            this.setState(prevState => ({
                mediaExpanded: !prevState.mediaExpanded
            }));
        }
    };

    // Generate random "profile pic" for messages.
    getRandomThumbnail = () => {
        this.setState({
            avatar: "https://picsum.photos/100/100/?image=" + (Math.floor(Math.random() * 200))
        });
    };

    componentDidMount() {
        this.getRandomThumbnail();
    }

    render() {
      const hasMedia = this.getMedia();
      const score = this.getScore();
      const messageBlockClassname = this.props.activeMessage === this.props.index && this.props.isToggleOn ? 'message-block active' : 'message-block';

    return (
        <React.Fragment>
          <div className={messageBlockClassname} onClick={(e) => this.handleClick(e)}>
            <div className="headshot">
                <img src={this.state.avatar} alt="headshot placeholder" />
            </div>
            <div className="message">
                <p className="author">{this.props.author} <span className="date">{this.getPostDate(this.props.created)}</span></p>
                <p className="title">{this.props.title}</p>
                <div className={this.state.mediaExpanded ? 'media expanded' : 'media'} onClick={!this.props.noClick ? () => this.expandMedia(this.state.mediaExpanded) : null} ref={node => this.node = node}>
                    {hasMedia ? (
                        <Media
                            key={1}
                            url={this.getMedia()}
                        />
                    ) : (
                        <p></p>
                    )}
                </div>
                <div className="reactions">
                    <div className="tooltip">
                        <span className="tooltiptext tooltip-top"><strong>{score}</strong> people reacted with upvote.</span>
                        <button><span role="img" aria-label="thumbs-up">&#x1F44D;</span> {score}</button>
                    </div>
                    {this.getSilver()}
                    {this.getGold()}
                    {this.getPlat()}
                </div>
            </div>
            <div className="thread-button">
                <div className="tooltip">
                    <span className="tooltiptext tooltip-top">Open Thread</span>
                    <button className={"thread-icon"} onClick={() => this.props.handleThreadOpen(this.props.index, this.props.media)}>
                        <img src={messageIcon} alt="Open Thread"/>
                    </button>
                </div>
                <div className="tooltip">
                    <span className="tooltiptext tooltip-top">Open in Reddit</span>
                    <button className={"link-icon"} onClick={() => window.open(this.props.permalink)}>
                        <img src={linkIcon} alt="Open in Reddit"/>
                    </button>
                </div>
            </div>
          </div>
        </React.Fragment>
    );
  }
}


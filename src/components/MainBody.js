import React, { Component } from 'react';
import Header from './Header.js';
import RedditPost from "./RedditPost.js";
import addFileIcon from "../images/add-file-icon.svg";
import atIcon from "../images/at-icon.svg";

export default class MainBody extends Component {

    state = {
      subCount: 100,
      isToggleOn: false,
      getMorePosts: false
    };

    //Function to get the subscriber count of the subreddit.
    getSubCount = (subCount) => {
      if (subCount > 999999) {
          subCount = (subCount/1000000).toFixed(1) + 'M';
      } else if (subCount > 999) {
          subCount = (subCount/1000).toFixed(1) + 'k';
      } else {
          subCount = subCount + 0;
      }
      this.setState(prevState => {
        return {
            subCount: subCount > 999 ? (subCount/1000).toFixed(1) + 'k' : subCount
        }
      })
    };

    // Function to open thread
    isThreadOpen = () => {
        this.setState(prevState => ({
            isToggleOn: true
        }));
    };

    // Function to open thread
    isThreadClose = () => {
        this.setState(prevState => ({
            isToggleOn: false
        }));
    };

    //Get more posts in main body.
    getMorePosts = () => {
        this.setState(prevState => ({
            getMorePosts: !prevState.getMorePosts
        }));
    };

  render() {
    return (
      <div className={!this.state.isToggleOn ? 'main thread-is-closed' : 'main thread-is-open'}>
        <Header
            activeSub={this.props.activeSub}
            activeSubURL={this.props.activeSubURL}
            isActiveSubStarred={this.props.getIsActiveSubStarred}
            subCount={this.state.subCount}
            getSortType={this.props.getSortType}
            sortType={this.props.sortType}
            getDarkMode={this.props.getDarkMode}
            openSideBar={this.props.openSideBar}
            toggleStar={this.props.toggleStar}
        />
        <RedditPost
            activeSub={this.props.activeSub}
            activeSubURL={this.props.activeSubURL}
            getSubCount={this.getSubCount}
            isThreadOpen={this.isThreadOpen}
            isThreadClose={this.isThreadClose}
            morePosts={this.state.getMorePosts}
            sortType={this.props.sortType}
        />

        <div className="message-bar">
            <div className="message-footer">
                <span className="add-file" onClick={() => this.getMorePosts()}>
                    <div className="tooltip">
                        <span className="tooltiptext tooltip-top">Click here to load more posts!</span>
                        <img src={addFileIcon} alt="add-file-icon"/>
                    </div>
                </span>
                <div className="messageBar">
                    <div className="message-bar-input">
                        <label className="tooltip">
                            <span className="tooltiptext tooltip-top">Typing here doesn't do anything yet, sorry.</span>
                            <input type="text" placeholder={"Message #" + this.props.activeSub}
                                   defaultValue={this.state.searchInput}
                                   className="searchInput"
                                   onChange={this.handleChange}
                                   onKeyPress={this.handleKeyPress}
                                   onFocus={this.handleFocus}
                                   onBlur={this.handleBlur}
                                   ref={el => (this.searchInput = el)}
                            />
                            <img src={atIcon} alt="at-icon"/>
                        </label>
                    </div>
                </div>
            </div>
        </div>

      </div>
    );
  }
}


import React, { Component } from 'react';
import axios from 'axios';
import Message from "./Message.js";
import lookupIcon from "../images/lookup-icon.svg";

export default class Modal extends Component {
    // State.URL requires default value to work right even though it's overridden when clicking the button.
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLoading: true,
            errors: null,
            isToggleOn: false,
            searchInput: "",
            searchInputHasFocus: false
        };
    }

    focusSearchInput = () => {
        this.searchInput && this.searchInput.focus();
    };

    handleChange = (e) => {
        this.setState({
            searchInput: (e.target.value || "").toLowerCase()
        });
    };

    handleKeyPress = (e) => {
        const { searchInput } = this.state;
        if (e.which === 13) {
            let url = "https://www.reddit.com/r/" + this.props.activeSub.toLowerCase() + "/search.json?q=" + searchInput + "&restrict_sr=1&limit=5";
            this.getSearchResults(url);
        }
        e.defaultValue = "";
    };

    handleFocus = (e) => {
        this.setState({
            searchInputHasFocus: true
        });
    };

    handleBlur = (e) => {
        this.setState({
            searchInput: "",
            searchInputHasFocus: false
        });
    };

    // Close modal if clicked outside.
    handleClick = (e) => {
      if (!this.node.contains(e.target)) {
          this.props.handleModalClose();
      }
    };

    // Make data request through axios
    getSearchResults = (url) => {
        axios.get(url)
            .then(response => {
                this.setState({
                    posts: response.data.data.children,
                    isLoading: false,
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    };

    getMedia = (data, index) => {
        let media = this.state.media;
        if (data.preview) {
            if (data.preview.reddit_video_preview) {
                media = data.preview;
            } else if (data.media) {
                if (data.media.reddit_video) {
                    media = data.media.reddit_video.fallback_url;
                }
            } else if (data.url.includes("png") || data.url.includes("jpg")) {
                media = data.url;
            }
        } else {
            media = null;
        }
        return media;
    };

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    render() {
        const { isLoading, posts } = this.state;
        return (
            <React.Fragment>
                <div className={this.props.isModalOpen ? "modal display-block" : "modal display-none"}>
                    <section className="modal-main" ref={node => this.node = node}>
                        <div className="searchBar">
                            <div className="search-to">
                                <label>
                                    <img src={lookupIcon} alt="search-icon"/>
                                    <input type="text" placeholder="Search..."
                                           defaultValue={this.state.searchInput}
                                           className="searchInput"
                                           onChange={this.handleChange}
                                           onKeyPress={this.handleKeyPress}
                                           onFocus={this.handleFocus}
                                           onBlur={this.handleBlur}
                                           ref={el => (this.searchInput = el)}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="search-results">
                            <h3 className="search-header">Search Results</h3>
                            {!isLoading ? (
                                posts.map((post, index) =>
                                    <Message
                                        key={index.toString()}
                                        index={index}
                                        title={post.data.title}
                                        author={post.data.author}
                                        url={post.data.permalink + ".json?limit=12&sort=top&raw_json=1"}
                                        upvotes={post.data.score}
                                        downvotes={post.data.downs}
                                        gildings={post.data.gildings}
                                        isToggleOn={this.state.isToggleOn}
                                        activeMessage={this.state.activeMessage}
                                        media={this.getMedia(post.data, index)}
                                        created={post.data.created_utc}
                                        noClick={true}
                                    />
                                )
                            ) : (
                                <p className={"load-message"}>Type a search term and hit Enter.</p>
                            )}
                        </div>
                    </section>
                </div>
            </React.Fragment>
        )
    }
}
import React, { Component } from 'react';
import axios from 'axios';
import Message from "./Message";
import Thread from "./Thread";


export default class RedditPost extends Component {
    // State.URL requires default value to work right even though it's overridden when clicking the button.
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLoading: true,
            errors: null,
            isToggleOn: false,
            moreLink: "https://www.reddit.com/r/askreddit/top.json?limit=10&raw_json=1&after=t3_axkl33",
            url: "https://www.reddit.com/r/AskReddit/comments/aus97z/bartenders_of_reddit_what_is_the_strangest/.json?limit=5&sort=top&raw_json=1",
            subCount: 100,
            media: null
        };
        // This binding is necessary to make `this` work in the callback
        this.handleThreadOpen = this.handleThreadOpen.bind(this);
        this.handleThreadClose = this.handleThreadClose.bind(this);
    }

    handleThreadOpen = (index, media) => {
        this.setState(prevState => ({
            isToggleOn: true,
            url: "https://www.reddit.com" + this.state.posts[index].data.permalink + ".json?&raw_json=1&sort=" + this.props.sortType,
            activeMessage: index,
            media: media
        }));
        this.props.isThreadOpen();
    };

    handleThreadClose = () => {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
        this.props.isThreadClose();
    };

    // Go through response to see if a GIF URL, YouTube Video URL, or image URL need to be sent to the Message component.
    getMedia = (data, index) => {
        let media = this.state.media;
        if (data.preview) {
             if (data.url.includes("png") || data.url.includes("jpg")  || data.url.includes("youtube") || data.url.includes("youtu.be")) {
                media = data.url;
            } else if (data.preview.reddit_video_preview) {
                media = data.preview;
            } else if (data.media) {
                if (data.media.reddit_video) {
                    media = data.media.reddit_video.fallback_url;
                }
            }
        } else {
            media = null;
        }
        return media;
    };

    // Get initial posts.
    getPosts = (url) => {
        axios.get(url)
            .then(response => {
                this.setState({
                    posts: response.data.data.children,
                    isLoading: false,
                });
                this.props.getSubCount(response.data.data.children[0].data.subreddit_subscribers);
            })
            .catch(error => this.setState({ error, isLoading: false }));
    };

    // Get more posts after initial posts.
    getMorePosts = (url) => {
        axios.get(url)
            .then(response => {
                this.setState( prevState => {
                    return {
                        posts: [...prevState.posts, ...response.data.data.children],
                        isLoading: false
                    }
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    };

    componentDidMount() {
        this.getPosts(this.props.activeSubURL);
    }

    // Once the RedditPost props update:
    // 1) If more posts is clicked, getMorePosts based on the activeSubURL.
    // 2) If the activeSub changes, or the sortType changes, call getPosts and reload the block.
    componentDidUpdate(prevProps) {
        if (this.props.morePosts !== prevProps.morePosts) {
            let posts = this.state.posts;
            let afterID = posts[posts.length-1].data.name;
            let url = "https://www.reddit.com/r/" + this.props.activeSub.toLowerCase() + "/"+this.props.sortType+".json?limit=10&raw_json=1&after=" + afterID;
            this.setState(prevState => ({
                moreLink: url
            }));
            this.getMorePosts(url);
        } else if (this.props.activeSub !== prevProps.activeSub || this.props.sortType !== prevProps.sortType) {
            let url = "https://www.reddit.com/r/" + this.props.activeSub.toLowerCase() + "/"+this.props.sortType+".json?limit=10&raw_json=1";
            this.setState(prevState => ({
                activeSub: this.props.activeSub,
                sortType: this.props.sortType
            }));
            this.getPosts(url);
        }
    }

    // Get message function to filter out NSFW posts so I don't randomly
    // see weiners when testing sort by new.
    getMessage = (post, index) => {
        if (!post.data.over_18) {
            return <Message
                key={index.toString()}
                index={index}
                title={post.data.title}
                author={post.data.author}
                url={post.data.permalink + ".json?limit=12&sort=top&raw_json=1"}
                permalink={"https://www.reddit.com" + post.data.permalink}
                upvotes={post.data.score}
                downvotes={post.data.downs}
                gildings={post.data.gildings}
                handleThreadOpen={this.handleThreadOpen}
                isToggleOn={this.state.isToggleOn}
                activeMessage={this.state.activeMessage}
                media={this.getMedia(post.data, index)}
                created={post.data.created_utc}
            />
        }
    };

    render() {
        const { isLoading, posts } = this.state;
        return (
            <React.Fragment>
                <div className={!this.state.isToggleOn ? 'main-content threads-close' : 'main-content threads-open'}>
                    {!isLoading ? (
                        posts.map((post, index) => this.getMessage(post, index))
                    ) : (
                        <p className="loading">Loading...</p>
                    )}
                </div>
                <div className={!this.state.isToggleOn ? 'threads-closed' : 'threads-open'}>
                    <Thread
                        url={this.state.url}
                        toggle={this.state.isToggleOn}
                        posts={this.state.posts}
                        activeSub={this.props.activeSub}
                        handleThreadClose={this.handleThreadClose}
                        media={this.state.media}
                    />
                </div>
            </React.Fragment>
        )
    }
}
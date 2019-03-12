import React, { Component } from 'react';
import axios from "axios";
import Message from "./Message.js";

export default class Thread extends Component {
    state = {
        posts: [],
        isLoading: true,
        errors: null
    };

    // Make data request through axios
    getPosts() {
        axios.get(this.props.url)
        // Once we get a response and store data, let's change the loading state
            .then(response => {
                this.setState({
                    posts: response.data,
                    isLoading: false
                });
            })
            // If we catch any errors connecting, let's update accordingly
            .catch(error => this.setState({ error, isLoading: false }));
    }

    componentDidMount() {
        this.getPosts();
    }

    // Set new URL state if props updated and get new posts. (I think this is how it should work?)
    componentDidUpdate(prevProps) {
        if (this.props.url !== prevProps.url) {
            this.getPosts();
        }
    }

    render() {
        const { isLoading, posts } = this.state;
        return (
            <div className={"thread-content"}>
                <div className="thread-header">
                    <div className="thread-title">
                        <h3>Thread</h3>
                        <p key={0}># {this.props.activeSub}</p>
                    </div>
                    <div className="thread-button-close">
                        <button onClick={() => this.props.handleThreadClose()}>X</button>
                    </div>
                </div>
                {!isLoading ? (
                    posts.map((post, index) => {
                        if (index === 0) {
                            return post.data.children.map((post, index) => {
                                return <React.Fragment key={index}>
                                    <div className="threadTopic">
                                    <Message
                                        key={index.toString()}
                                        title={post.data.title}
                                        author={post.data.author}
                                        upvotes={post.data.score}
                                        gildings={post.data.gildings}
                                        media={this.props.media}
                                        noClick={true}
                                    />
                                </div>
                                    <div className="replies">replies</div>
                                </React.Fragment>

                            })
                        } else {
                            return post.data.children.map((post, index) => {
                                return <React.Fragment key={index}>
                                    <Message
                                    key={index.toString()}
                                    title={post.data.body}
                                    author={post.data.author}
                                    upvotes={post.data.score}
                                    gildings={post.data.gildings}
                                    noClick={true}
                                />
                                </React.Fragment>
                            })
                        }
                    })
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        )
    }
}


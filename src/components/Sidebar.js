import React, { Component } from 'react';
import bell from '../images/bell.svg';
import search from '../images/search-icon.svg';
import add from '../images/add-icon.svg';
import remove from '../images/remove-icon.svg';
import message from '../images/message-icon-2.svg';
import unread from '../images/unread-icon.svg';
import addFileIcon from "../images/add-file-icon.svg";

export default class Sidebar extends Component {
	state = {
		subreddits: this.props.subReddits,
		subredditInput: "",
		subredditInputHasFocus: false
	};

	focusSubredditInput = () => {
		this.subredditInput && this.subredditInput.focus();
	};

	handleChange = (e) => {
		this.setState({
			subredditInput: (e.target.value || "").toLowerCase()
		});
	};

	handleKeyPress = (e) => {
		const { subredditInput } = this.state;
		if (e.which === 13) {
			this.props.addSub(subredditInput);
		}
		e.defaultValue = "";
	};

	handleFocus = (e) => {
		this.setState({
			subredditInputHasFocus: true
		});
	};

	handleBlur = (e) => {
		this.setState({
			subredditInput: "",
			subredditInputHasFocus: false
		});
	};

	displayStarredSubs = (sub) => {
		if (sub.isStarred) {
			return (
				<li className={sub.name === this.props.activeSub ? 'active' : ''}
				    onClick={() => this.props.changeActiveSub(sub.name)}>
				  <span># {sub.name}</span>
				</li>
			);
		}
	}

	render() {
		return (
			<React.Fragment>
			<div className={this.props.openSidebar  ? 'sidebar' : 'sidebar mobile'}>
				<div className="sidebar-header">
					<div className="header-bell">
						<h3>Redackt</h3>
						<img src={bell} alt="bell-icon"/>
					</div>
					<div className="header-close" onClick={() => this.props.openBar()}>
						<h3>Redackt</h3>
						<img src={addFileIcon} alt="close-icon"/>
					</div>
					<p>romanparkhomenko</p>
				</div>

				<div className="sidebar-threads">
					<div className="tooltip">
						<span className="tooltiptext tooltip-top">Not sure what to make this do yet.</span>
						<div><img src={unread} alt="thread-icon"/>All Unreads</div>
					</div>
					<div className="tooltip">
						<span className="tooltiptext tooltip-top">Not sure what to make this do yet.</span>
						<div><img src={message} alt="thread-icon"/>All Threads</div>
					</div>
				</div>

				<div className="sidebar-add-channel">
					<div className="jump-to">
						<label>
							<img src={search} alt="search-icon"/>
							<input type="text" placeholder="Add Sub..."
								   defaultValue={this.state.subredditInput}
								   className="addSubInput"
								   onChange={this.handleChange}
								   onKeyPress={this.handleKeyPress}
								   onFocus={this.handleFocus}
								   onBlur={this.handleBlur}
								   ref={el => (this.subredditInput = el)}
							/>
						</label>
					</div>
				</div>
                
				<div className="sidebar-channels" onClick={this.focusSubredditInput}>
					<span>Starred</span>
				</div>
				<ul>
				    {this.props.subReddits.map((subReddit) =>
					  this.displayStarredSubs(subReddit)
					)}
				</ul>
				<div className="sidebar-channels" onClick={this.focusSubredditInput}>
					<span>Channels</span>
					<img src={add} alt="add-icon"/>
				</div>
				<ul>
					{/* Subreddit List */}
					{this.props.subReddits.map( (subReddit, index) => {
					    if (subReddit.isStarred === false) {
						  return(
							<li
								className={(subReddit.name === this.props.activeSub) ? 'active' : ''}
								onClick={() => this.props.changeActiveSub(subReddit.name)}
								key={subReddit.id.toString()} >
								<span># {subReddit.name}</span>
								<span className={"remove-button"}>
								<button onClick={() => this.props.removeSub(index)}>
									<img src={remove} alt="Remove Subreddit"/>
								</button>
								</span>
							</li>
						  );
						}
				      }
					)}
				</ul>

				<div className="sidebar-channels direct-messages">
					<span>Direct Messages</span>
					<img src={add} alt="add-icon"/>
				</div>
				<div className="direct-messages">
					<ul>
						<li><p>slackbot</p></li>
						<li><p>Snoo</p></li>
						<li><p>romanparkhomenko</p></li>
					</ul>
				</div>

			</div>
			</React.Fragment>
		);
	}
}


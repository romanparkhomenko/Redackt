import React, { Component } from 'react';
import person from "../images/person-icon.svg";
import star from "../images/star-icon.svg";
import phone from "../images/phone-icon.svg";
import info from "../images/info-icon.svg";
import gear from "../images/gear-icon.svg";
import atIcon from "../images/at-icon.svg";
import settingsIcon from "../images/settings-icon.svg";
import lookupIcon from "../images/lookup-icon.svg";
import headshot from "../images/slack-logo-icon.png";
import yellowStarIcon from "../images/star-filled-icon.png";
import Modal from "./Modal.js";
import Dropdown from "./Dropdown.js";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortType: [
                {
                    id: 0,
                    title: 'top',
                    selected: false,
                    key: 'sortType'
                },
                {
                    id: 1,
                    title: 'hot',
                    selected: false,
                    key: 'sortType'
                },
                {
                    id: 2,
                    title: 'new',
                    selected: false,
                    key: 'sortType'
                },
                {
                    id: 3,
                    title: 'controversial',
                    selected: false,
                    key: 'sortType'
                },
                {
                    id: 4,
                    title: 'rising',
                    selected: false,
                    key: 'sortType'
                }
            ],
            isModalOpen: false,
            listOpen: false,
            selectedOption: "top"
        };
    }

    openModal = () => {
        this.setState({
            isModalOpen: true
        });
    };

    handleModalClose = () => {
        this.setState({
            isModalOpen: false
        });
    };

    toggleList = () => {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }));
    };

    toggleSelected = (id, key) => {
        let temp = this.state.sortType;
        temp[id].selected = !temp[id].selected;
        this.setState(prevState => {
            return {
                [key]: temp,
                selectedOption: temp[id].title,
                listOpen: !prevState.listOpen
            };
        });
        this.props.getSortType(temp[id].title);
    };

    setStarIcon = (activeSub) => {
        return this.props.isActiveSubStarred(activeSub) ? yellowStarIcon : star;
    }

    render() {
        const title = "#" + this.props.activeSub;
        const titleID = 'main-title';
        return (
            <React.Fragment>
            <header>
                <div className="open-sidebar" onClick={() => this.props.openSideBar()}>
                    <img src={headshot} alt="open-sidebar"/>
                </div>
                <div className="header-info">
                    <div className="title">
                        <h1 id={titleID}>{title}</h1>
                    </div>
                    <div className="subhead">
                        <img src= {this.setStarIcon(this.props.activeSub)} alt="star-icon" onClick={() => this.props.toggleStar()}/>
                        <span className="numberOfSubs">
                            <img src={person} alt="person-icon"/>
                            <p className={"subtitle"}>{this.props.subCount}</p>
                        </span>
                        <div className="dropdown">
                            <Dropdown
                                list={this.state.sortType}
                                listOpen={this.state.listOpen}
                                toggleList={this.toggleList}
                                toggleItem={this.toggleSelected}
                                selectedOption={this.state.selectedOption}
                                getSortType={this.props.getSortType}
                            />
                        </div>
                    </div>
                </div>

                <div className="header-search">
                    <div className="tooltip">
                        <span className="tooltiptext tooltip-bottom">This doesn't do anything yet, but I'm working on it!</span>
                        <img src={phone} alt="phone-icon"/>
                    </div>
                    <div className="tooltip">
                        <span className="tooltiptext tooltip-bottom">This doesn't do anything yet, but I'm working on it!</span>
                        <img src={info} alt="info-icon"/>
                    </div>
                    <div className="tooltip" onClick={() => this.props.getDarkMode()}>
                        <span className="tooltiptext tooltip-bottom">Click here to set Dark Mode!</span>
                        <img src={gear} alt="gear-icon"/>
                    </div>

                    <div className="tooltip search">
                        <span className="tooltiptext tooltip-bottom">Click to search this subreddit.</span>
                        <div className="searchBar">
                            <div className="search-to">
                                <label onClick={() => this.openModal()}>
                                    <img src={lookupIcon} alt="search-icon"/>
                                    <input type="text" placeholder="Search..."
                                           defaultValue={""}
                                           className="searchInput"
                                           disabled={1}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="tooltip">
                        <span className="tooltiptext tooltip-bottom">These don't do anything yet, but I'm working on it!</span>
                        <img src={atIcon} alt="at-icon"/>
                    </div>
                    <div className="tooltip">
                        <span className="tooltiptext tooltip-bottom">This doesn't do anything yet, but I'm working on it!</span>
                        <img src={star} alt="star-icon"/>
                    </div>
                    <div className="tooltip">
                        <span className="tooltiptext tooltip-bottom">This doesn't do anything yet, but I'm working on it!</span>
                        <img src={settingsIcon} alt="settings-icon"/>
                    </div>
                </div>
            </header>
                <Modal
                    isModalOpen={this.state.isModalOpen}
                    handleModalClose={this.handleModalClose}
                    activeSub={this.props.activeSub}
                />
            </React.Fragment>
        );
    }
};
import React, { Component } from 'react';
import './styles/main.scss';
import Sidebar from './components/Sidebar.js';
import MainBody from './components/MainBody.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleUp, faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons'
library.add(faAngleUp,faAngleDown,faCheck);

class App extends Component {
  state = {
    subReddits: [
      {
        name: "AskReddit",
        id: 0
      },
      {
        name: "all",
        id: 1
      },
      {
        name: "RocketLeague",
        id: 2
      },
      {
        name: "apexlegends",
        id: 3
      },
      {
        name: "reactjs",
        id: 4
      }
    ],
    sortType: "top",
    activeSub : "AskReddit",
    activeSubURL: "https://www.reddit.com/r/askreddit/top.json?limit=10&raw_json=1",
    darkMode: false,
    openSidebar: true
  };


  changeActiveSub = (name) => {
    this.setState(prevState => {
      return {
        activeSub: name,
        activeSubURL: "https://www.reddit.com/r/" + name + "/"+this.state.sortType+".json?limit=10&raw_json=1"
      }
    })
  };

  addSub = (name) => {
    let oldSubs = this.readCookie('subs');
    let newSubs = [...oldSubs, {"name": name, "id": oldSubs.length}];
    this.setState(prevState => {
      return {
        subReddits: newSubs,
        activeSub: name,
        activeSubURL: "https://www.reddit.com/r/" + name + "/"+this.state.sortType+".json?limit=10&raw_json=1"
      }
    });
    this.setCookie('subs', newSubs);
  };

  removeSub = (subID) => {
    let oldSubs = this.readCookie('subs');
    let updatedPosts = [...oldSubs];
    updatedPosts.splice(subID, 1);
    this.setState(prevState => {
      return {
        subReddits: updatedPosts
      }
    });
    this.setCookie('subs', updatedPosts);
  };

  getSortType = (sortType) => {
    this.setState(prevState => {
      return {
        sortType: sortType,
        activeSubURL: "https://www.reddit.com/r/" + this.state.activeSub + "/"+this.state.sortType+".json?limit=10&raw_json=1"
      }
    })
  };

  getDarkMode = () => {
    this.setState(prevState => {
      return {
        darkMode: !prevState.darkMode
      }
    });
    this.setCookie('darkMode', this.state.darkMode);
  };

  openSideBar = () => {
    this.setState(prevState => {
      return {
        openSidebar: !prevState.openSidebar
      }
    });
  };

  setCookie = (name, value) => {
    let cookie = [
      name,
      '=',
      JSON.stringify(value)
    ].join('');
    document.cookie = cookie;
  };

  readCookie = (name) => {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return JSON.parse(
            c.substring(nameEQ.length, c.length)
        );
      }
    }
    return null;
  };

  componentWillMount() {
    let subs = this.readCookie('subs');
    let darkMode = this.readCookie('darkMode');
    console.log(subs);
    if (!subs) {
      this.setCookie('subs', this.state.subReddits);
    }
    if (!darkMode) {
      this.setCookie('darkMode', false);
    }
  }

  // componentDidUpdate() {
  //   let subs = this.readCookie('subs');
  //   console.log(subs);
  //   let newSubs = this.readCookie('subs');
  //   if (newSubs !== prevState.subReddits) {
  //     this.setState(prevState => {
  //       return {
  //         subReddits: newSubs
  //       }
  //     });
  //   }
  // }

  render() {
    return (
      <div className={!this.readCookie('darkMode') ? 'App theme-wrapper theme-light' : 'App theme-wrapper theme-dark'}>
        <Sidebar
            subReddits={this.readCookie("subs")}
            // subReddits={this.state.subReddits}
            activeSub={this.state.activeSub}
            changeActiveSub={this.changeActiveSub}
            addSub={this.addSub}
            removeSub={this.removeSub}
            openSidebar={this.state.openSidebar}
            openBar={this.openSideBar}
        />
        <MainBody
            activeSub={this.state.activeSub}
            activeSubURL={this.state.activeSubURL}
            getSubCount={this.getSubCount}
            sortType={this.state.sortType}
            getSortType={this.getSortType}
            getDarkMode={this.getDarkMode}
            openSideBar={this.openSideBar}
        />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './styles/main.scss';
import Sidebar from './components/Sidebar.js';
import MainBody from './components/MainBody.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleUp, faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons'
import defaultSubreddits from './constants/subreddits.defaults';
import generateRedditUrl from './helpers/generateRedditUrl';;
library.add(faAngleUp, faAngleDown, faCheck);

class App extends Component {
  constructor(props) {
    super(props);
    const subReddits = this.readCookie('subs');

    this.state = {
      subReddits,
      sortType: "top",
      activeSub: subReddits[0].name,
      activeSubURL: generateRedditUrl(subReddits[0].name, "top"),
      darkMode: false,
      openSidebar: true
      };
    }

    componentWillMount() {
      let darkMode = this.readCookie('darkMode');
      if (!darkMode) {
        this.setCookie('darkMode', false);
      }
    }


  //Function to handle sub change from Sidebar.
  changeActiveSub = (name) => {
    this.setState(prevState => {
      return {
        activeSub: name,
        activeSubURL: generateRedditUrl(name, this.state.sortType)
      }
    });
    this.openSideBar();
  };

  addSub = (name) => {
    let oldSubs = this.readCookie('subs');
    let newSubs = [...oldSubs, { "name": name, "id": oldSubs.length }];
    this.setState(prevState => {
      return {
        subReddits: newSubs,
        activeSub: name,
        activeSubURL: generateRedditUrl(name, this.state.sortType)
      }
    }, () => {
      this.setCookie('subs', newSubs);
      this.forceUpdate();
    });
  };

  removeSub = (subID) => {
    let oldSubs = this.readCookie('subs');
    let updatedPosts = [...oldSubs];
    const subToRemove = oldSubs.findIndex((sub) => sub.id === subID);
    updatedPosts.splice(subToRemove, 1);
    const activeSub = updatedPosts.find((sub) => sub.name === this.activeSub) || updatedPosts[0];

    this.setState(prevState => {
        return {
          subReddits: updatedPosts,
          activeSub: activeSub.name,
          activeSubURL: generateRedditUrl(activeSub.name, this.state.sortType)
        }
      },
      () => {
        this.setCookie('subs', updatedPosts);
        this.forceUpdate();
      }
    );

  };

  getSortType = (sortType) => {
    this.setState(prevState => {
      return {
        sortType: sortType,
        activeSubURL: generateRedditUrl(this.state.activeSub, this.state.sortType)
      };
    });
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
        return defaultSubreddits;
  };

  toggleStar = () => {
    let oldSubs = this.readCookie('subs');
    if (oldSubs[0] === null) {
      return 
    } else {
      let newSubs = oldSubs.map(sub => {
        return (sub.name === this.state.activeSub ? {...sub, isStarred: !sub.isStarred} : {...sub});
      });
      this.setState(prevState => {
        return {
          subReddits: newSubs,
        }
      });
      this.setCookie('subs', newSubs);
    }      
  }

    activeSubStarredStatus = (activeSubName) => {
    const oldSubs = this.readCookie('subs');
        const activeSub = oldSubs.find(sub => sub.name === activeSubName);
        const isActiveSubStarred = activeSub ? activeSub.isStarred : false;
    return isActiveSubStarred;
  }



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
            getIsActiveSubStarred={this.activeSubStarredStatus}
            getSubCount={this.getSubCount}
            sortType={this.state.sortType}
            getSortType={this.getSortType}
            getDarkMode={this.getDarkMode}
            openSideBar={this.openSideBar}
            toggleStar={this.toggleStar}
        />
      </div>
    );
  }
}

export default App;

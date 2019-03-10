import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default class Dropdown extends Component {

    constructor(props){
        super(props);
        this.state = {
            listOpen: false
        };
    }

    // Close dropdown if clicked outside.
    handleClick = (e) => {
        if (this.props.listOpen && !this.node.contains(e.target)) {
            this.props.toggleList();
        }
    };

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    render() {
        const { list } = this.props;
        const { listOpen } = this.props;
        return(
            <div className="dd-wrapper" ref={node => this.node = node}>
                <div className="dd-header" onClick={() => this.props.toggleList()}>
                    <div className="dd-header-title">Sorted by {this.props.selectedOption}</div>
                    {listOpen
                        ? <FontAwesomeIcon icon="angle-up" />
                        : <FontAwesomeIcon icon="angle-down" />
                    }
                </div>
                {listOpen && <ul className="dd-list">
                    {list.map((item) => (
                        <li className="dd-list-item"
                            key={item.title}
                            onClick={() => this.props.toggleItem(item.id, item.key)}
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>}
            </div>
        )
    }
}


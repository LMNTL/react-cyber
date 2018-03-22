import { connect } from 'react-redux';
import React, { Component } from 'react';
import './hud.css';

class HUD extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return this.props ? (
            <div>
                <p className='hp'>HP: {this.props.player.hp}</p>
            </div>
        ) : null;
    }
}

function mapStateToProps(state) {
    return {
        player: state.player
    };
}

export default connect(mapStateToProps)(HUD);
import { connect } from 'react-redux';
import React, { Component } from 'react';
import './hud.css';

class HUD extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return this.props ? (
            <div className='hud'>
                <p className='hp'>HP: {this.props.player.hp}/{this.props.player.maxHp}</p>
            </div>
        ) : null;
    }
}

function mapStateToProps(state) {
    return {
        player: state.player.player
    };
}

export default connect(mapStateToProps)(HUD);
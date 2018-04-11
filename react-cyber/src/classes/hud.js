import { connect } from 'react-redux';
import React, { Component } from 'react';
import './hud.css';

class HUD extends React.Component {
    constructor(props){
        super(props);
    }

    generateHpColor = (curVal, maxVal) => {
        const ratio = curVal/maxVal;
        const colors = [    Math.floor(0x0a*ratio).toString(16).padStart(2, '0'),
                            Math.floor(0xff*ratio).toString(16).padStart(2, '0'),
                            Math.floor(0x15*ratio).toString(16).padStart(2, '0')
                        ];
        return `#${colors[0]}${colors[1]}${colors[2]}`;
    }

    render() {
        console.log(this.generateHpColor(10,15));
        return this.props ? (
            <div className='hud'>
                <div className='bottomHud'>
                    <p className='name'>{this.props.player.name} - Level {this.props.player.level}</p>   
                    <div
                        className='hpBar'
                        style={{
                            gridColumnEnd: (this.props.player.hp/this.props.player.maxHp)*20,
                            backgroundColor: this.generateHpColor(this.props.player.hp, this.props.player.maxHp)
                        }}>
                        <p className='hp'>HP: {this.props.player.hp}/{this.props.player.maxHp}</p>
                    </div>
                </div>
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
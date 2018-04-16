import { connect } from 'react-redux';
import React, { Component } from 'react';
import './hud.css';

class HUD extends React.Component {
    constructor(props){
        super(props);
    }

    generateHpColor = (curVal, maxVal) => {
        const ratio = curVal / maxVal;
        const colors = [    Math.floor(0x0a*ratio).toString(16).padStart(2, '0'),
                            Math.floor(0xff*ratio).toString(16).padStart(2, '0'),
                            Math.floor(0x15*ratio).toString(16).padStart(2, '0')
                        ];
        return `#${colors[0]}${colors[1]}${colors[2]}`;
    }

    render() {
        return this.props ? (
            <div className='hud'>
                <div className='bottomHud'>
                    <p className={'name stats'}>
                        {this.props.player.name} - Level {this.props.player.level}
                    </p>
                    <p className='xp stats'>XP to next level: {this.props.player.xpToNextLevel}</p>
                    <div
                        className='hpBar'
                        style={{
                            gridColumnEnd: 20                         
                        }}>
                        <div
                            className='hpBar--fill'
                            style={{
                                backgroundColor: this.generateHpColor ( this.props.player.hp, this.props.player.maxHp ),
                                width: ( this.props.player.hp / this.props.player.maxHp * 100 ) + '%'
                            }}
                            
                        >                            
                        </div>
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
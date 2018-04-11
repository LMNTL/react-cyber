import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNPC } from '../redux/actions';
import NPC from "./npc.js";
import './entities.js';

class Entities extends Component{
    constructor(props) {
      super(props);
    }

    isVisible = (x, y) => {
        return (Math.abs(x - this.props.playerX) < 3 && Math.abs(y - this.props.playerY) < 3);
    }

    componentDidMount(){
        let newNPC = new NPC();
        newNPC.name = "Security";
        newNPC.sprite = "security.png";
        newNPC.x = 1;
        newNPC.y = 1;
        newNPC.hp = 25;
        newNPC.maxHp = 25;
        this.props.addNPC(newNPC);
    }

    render(){
        return (
            <div className="entities">
                {this.props.npcs.map((npc, index) => {
                    return this.isVisible(npc.x, npc.y) && npc.active ? (
                        <h1                         
                            key={index}
                            style={{
                                gridColumn: (npc.x+3-this.props.playerX) / 1,
                                gridRow: (npc.y+3-this.props.playerY) / 1
                            }}
                            className="npc"
                        >
                            HP: {npc.hp}/{npc.maxHp}
                            <img
                                src={npc.sprite}
                                className='npcsprite'
                            />
                        </h1>
                    ) : null;
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      npcs: state.npcs.npcs,
      playerX: state.player.player.x,
      playerY: state.player.player.y
    };
  } 
  
  const mapDispatchToProps = {
    addNPC  
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Entities);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../redux/actions';
import './messagelog.css';

class MessageLog extends Component{
    constructor(props) {
      super(props);
    }


    componentDidMount(){
        this.props.addMessage("Frosted butts");
        this.props.addMessage("Incredible death");
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.props.messages.length != nextProps.messages.length;
    }

    render(){
        return (
            <div className="log">
                {
                    this.props.messages.map( (message, index) => {
                        return index >= this.props.messages.length - 10 ? (
                            <p className="message" key={index}>{message}</p>
                        ) : null
                    } )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      messages: state.messages
    };
  } 
  
  const mapDispatchToProps = { 
      addMessage
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(MessageLog);
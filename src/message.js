import React, { Component } from 'react';
import style from './message.css';

class Message extends Component {
  constructor() {
    super();
    this.state = {
      replyHover: false,
    }
  }
  handleMouseIn(e) {
    this.setState({
      replyHover: true,
    });
    setTimeout(() => {
      this.setState({
        replyHover: false,
      });
    }, 1000);
  }
  render() {
    const name = this.props.name;
    const content = this.props.content;
    const time = this.props.time;
    const handleReply = this.props.onReply;
    const nums = this.props.nums;
    const replyData = this.props.reply;
    
    return (
      <div id={style.Message} className="animated rotateInUpRight">
        <div className={style.Name}>{name}</div>        
        <div className={style.Time}>{time}</div>
        <div className={style.Reply} onClick={() => handleReply(nums)}>
          {(this.state.replyHover) ? (<button className="animated flipInY">reply</button>) : (
            <img className="animated flipInY" src="./replyIcon.png" alt="reply" onMouseEnter={this.handleMouseIn.bind(this)} />    
          )}
        </div> 
        <div className={style.Content}>{content}</div>
        <div>
          {replyData}
        </div>
      </div>
    );
  }
}

export default Message;

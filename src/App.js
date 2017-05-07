import React, { Component } from 'react';
import style from './App.css';
import Message from "./message.js";
import "babel-polyfill";
import fetch from 'isomorphic-fetch';
import Text from './Text.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      show: false,
      replyNums: 0,
      replyHover: false,
    };
    this.MessageArray = this.MessageArray.bind(this);
  }
  componentWillMount() {
    fetch('/api/comments').then(response => {
      return response.json();
    }).then(json => {
      this.setState({
        data: json.Messages,
      });
    });
  }
  handleClick(nameValue, contentValue) {
    let newData = this.state.data;
    const currentTime = new Date();
    const timeString = currentTime.getFullYear().toString() + '-' + (currentTime.getMonth()+1).toString() + '-' + currentTime.getDate().toString() + ' ' + currentTime.getHours().toString() + ':' + currentTime.getMinutes().toString();
    if (this.state.replyNums === 0) {
      newData.push({
        name: nameValue,
        time: timeString,
        content: contentValue,
        reply: [],
      });
    } else {
      let topData = [];   // 201 => 1 2
      let i = 0;
      let rem = [this.state.replyNums];
      while (rem[i] > 0.1) {
        rem[i+1] = (rem[i] / 100).toFixed(0);
        rem[i] = rem[i] % 100 - 1;
        i += 1;
      }
      i -= 1;
      topData[i] = newData[rem[i]];   // [] {2}
      for (let j = i-1; j >= 0; j -= 1) {
        topData[j] = topData[j+1].reply[rem[j]]; // {1} {2}
      }
      if (i <= 3) {
        topData[0].reply.push({
          name: nameValue,
          time: timeString,
          content: contentValue,
          reply: [],
        });
        for (let j = 1; j <= i; j += 1) {
          topData[j].reply[rem[j-1]] = topData[j-1];
        }
      } else {
        topData[1].reply.push({
          name: nameValue,
          time: timeString,
          content: contentValue,
          reply: [],
        });
        for (let j = 2; j <= i; j += 1) {
          topData[j].reply[rem[j-1]] = topData[j-1];
        }
      }
      newData[rem[i]] = topData[i];
    }

    this.setState({
      data: newData,
      show: false,
      replyNums: 0,
      replyHover: false,
    });

    fetch('/api/comments', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Messages: this.state.data }),
    });
  }
  handleCancel() {
    this.setState({
      show: false,
      replyNums: 0,
    });
  }
  handleReply(nums) {
    this.setState({
      show: true,
      replyNums: nums,
    });
  }
  handleNew() {
    this.setState({
      show: true,
    });
  }
  handleMouseIn() {
    this.setState({
      replyHover: true,
    });
    setTimeout(() => {
      this.setState({
        replyHover: false,
      });
    }, 1000);
  }
  MessageArray(InputArray, nums) {
    let DataRender = [];
    let kidRender = [];
    for (let i = 0; i < InputArray.length; i += 1 ) {
      if (InputArray[i].reply.length !== 0) {
        kidRender = this.MessageArray(InputArray[i].reply, nums*100 + i+1);
      }
      DataRender.splice( i, 0, (
        <Message key={InputArray[i].time + InputArray[i].name + InputArray[i].content + i.toString()}
                 name={InputArray[i].name}
                 time={InputArray[i].time}
                 content={InputArray[i].content}
                 reply={kidRender}
                 onReply={this.handleReply.bind(this)}
                 nums={nums*100 + i+1} />
      ));
      kidRender = [];
    }
    return DataRender;
  }
  render() {
    const DataOld = this.state.data;
    const DataRender = this.MessageArray(DataOld, 0);

    return (
      <div className="App">
        <h1 className={style.Title}>Message Board</h1>
        <div className={style.TopBoard}>
          {DataRender}
          <div className={style.New} onClick={this.handleNew.bind(this)}>
            {(this.state.replyHover) ? (<button className="animated flipInY">add</button>) : (
              <img className="animated flipInY" src="./add.png" alt="add" onMouseEnter={this.handleMouseIn.bind(this)} />    
            )}
          </div>
        </div>
        <Text title="New Message" show={this.state.show} onClick={this.handleClick.bind(this)} onCancel={this.handleCancel.bind(this)} />
      </div>
    );
  }
}

export default App;

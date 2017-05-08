import React, { Component } from 'react';
import style from './Text.css';
import "babel-polyfill";

class Text extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: "",
      contentValue: "",
    }
  }
  handleChangeName(e) {
    this.setState({
      nameValue: e.target.value,
    });
  }
  handleChangeContent(e) {
    this.setState({
      contentValue: e.target.value,
    });
  }
  handleKeyDown(e) {
    if (e.keyCode === 13) {
      if (this.state.contentValue !== "" && this.state.nameValue !== "") {
        this.props.onClick(this.state.nameValue, this.state.contentValue);
        this.setState({
          contentValue: "",
        });
      }
    }
  }
  render() {
    const title = this.props.title;
    const show = this.props.show;
    const handleClick = () => {
      if (this.state.contentValue !== "" && this.state.nameValue !== "") {
        this.props.onClick(this.state.nameValue, this.state.contentValue);
        this.setState({
          contentValue: "",
        });
      }
    }
    const handleCancel = () => {
      this.props.onCancel();
      this.setState({
        contentValue: "",
      });
    };
    return (
      (show) ? (
        <div id={style.Text} className="animated zoomIn">
          <div className={style.Subtitle}>name:</div>
          <input className={style.InputName} placeholder="Add your name..." value={this.state.nameValue} autoFocus={(this.state.nameValue === "")} type="text" onChange={this.handleChangeName.bind(this)} />
          <div className={style.Subtitle}>content:</div>
          <textarea className={style.InputContent} value={this.state.contentValue} autoFocus={(this.state.nameValue !== "")} onKeyDown={this.handleKeyDown.bind(this)} onChange={this.handleChangeContent.bind(this)} type="text" placeholder="Add comment..." />
          <div className={style.SubmitButton} onClick={handleClick}>Submit</div>
          <div className={style.CancelButton} onClick={handleCancel}>Cancel</div>
        </div>
      ) : null
    );
  }
} 

export default Text;

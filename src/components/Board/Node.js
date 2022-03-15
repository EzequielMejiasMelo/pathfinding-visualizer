import React, { Component } from "react";

// 0 - unvisited node
// 1 - visited node
// 2 - blocker node
// 3 - start node
// 4 - end node
// 5 - shortest path node

class Node extends Component {
  constructor(props) {
    super(props);
    this.row = props.row;
    this.column = props.column;
    this.state = {type: props.type};
  }

  getClass() {
    switch (this.state.type) {
      case 0:
        return "empty";
      case 1:
        return "explored";
      case 2:
        return "blocker";
      case 3:
        return "start";
      case 4:
        return "end";
      case 5:
        return "path";
      default:
        break;
    }
  }

  render() {
    return (
      <div
        className={this.getClass()}
        id={[this.row, this.column]}
        onMouseDown={() => {
            this.setState({type: this.props.type});
            this.props.MouseDown(this.row, this.column);
        }}
        onMouseEnter={() => {
            this.props.MouseEnter(this.row, this.column);
            this.setState({type: this.props.type});
        }}
        onMouseUp={() => {
            this.props.MouseUp();
            this.setState({type: this.props.type});
        }}
      ></div>
    );
  }
}

export default Node;

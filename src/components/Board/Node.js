import React, { Component } from 'react';

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
        this.neighbors = [];
        this.rowCount = 30;
        this.columnCount = 66;
        this.state = {type: props.type};
    };
    
    getPosition() {
        return [this.row, this.column];
    };

    getType() {
        return this.state.type;
    };

    getClass() {
        const { type } = this.state;
        switch (type) {
            case 0:
                return 'empty';
            case 1:
                return 'explored';
            case 2:
                return 'blocker';
            case 3:
                return 'start';
            case 4:
                return 'end';
            case 5:
                return 'path';
            default:
                break;
        };
    };

    makeUnvisited() {
        const type = 0;
        this.setState({type});
    };

    makeVisited() {
        const type = 1;
        this.setState({type});
    };

    makeBlocker() {
        const type = 2;
        this.setState({type});
    };

    makeStart() {
        const type = 3;
        this.setState({type});
    };

    makeEnd() {
        const type = 4;
        this.setState({type});
    };

    makePath() {
        const type = 5;
        this.setState({type});
    };

    getNeighbors(board) {
        this.neighbors = [];

        //Node below
        if (this.row < this.rowCount - 1 && board[this.row+1][this.column].type !== 2){
            this.neighbors.append(board[this.row+1][this.column]);
        }

        //Node above
        if (this.row > 0 && board[this.row-1][this.column].type !== 2){
            this.neighbors.append(board[this.row-1][this.column]);
        }

        //Node to the right
        if (this.column < this.columnCount - 1 && board[this.row][this.column+1].type !== 2) {
            this.neighbors.append(board[this.row][this.column+1]);
        }

        //Node to the left
        if (this.column > 0 && board[this.row][this.column-1].type !== 2){
            this.neighbors.append(board[this.row][this.column-1]);
        }
    };

    lessThan(node2) {
        return false;
    };
    
    render() { 
        return ( 
            <div className={this.getClass()} id={[this.row, this.column]}></div>
        );
    };
};
 
export default Node;
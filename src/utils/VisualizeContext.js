import React, { Component, useContext } from "react";

export const VisualizeContext = React.createContext();

export const useVisualize = () => useContext(VisualizeContext);

class BoardProvider extends Component {
    state = {
        visualize: false,
        visualized: false,
        algorithm: '',
        clearBoard: false
    };

    setClearBoard = () => {
        this.setState({clearBoard: !this.state.clearBoard});
    };

    setVisualize = () => {
        this.setState({visualize: !this.state.visualize});
    };

    setVisualized = () => {
        this.setState({visualized: !this.state.visualized})
    };

    setAlgorithm = (algo) => {
        this.setState({algorithm: algo});
    };

    render() {
        const { children } =this.props;
        const { visualize, algorithm, clearBoard, visualized } = this.state;
        const { setVisualize, setVisualized, setAlgorithm, setClearBoard } = this;

        return (
            <VisualizeContext.Provider value={{visualize, algorithm, clearBoard, visualized, setVisualize, setVisualized, setAlgorithm, setClearBoard}}>
                {children}
            </VisualizeContext.Provider>
        );
    };
};

export default BoardProvider;
import React, { Component, useContext } from "react";

export const VisualizeContext = React.createContext();

export const useVisualize = () => useContext(VisualizeContext);

class BoardProvider extends Component {
    state = {
        visualize: false,
        visualized: false,
        algorithm: ''
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
        const { visualize, algorithm } = this.state;
        const { setVisualize, setVisualized, setAlgorithm } = this;

        return (
            <VisualizeContext.Provider value={{visualize, setVisualize, setVisualized, setAlgorithm, algorithm }}>
                {children}
            </VisualizeContext.Provider>
        );
    };
};

export default BoardProvider;
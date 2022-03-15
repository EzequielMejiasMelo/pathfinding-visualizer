import React, { Component, useContext } from "react";

export const VisualizeContext = React.createContext();

export const useVisualize = () => useContext(VisualizeContext);

class BoardProvider extends Component {
    state = {
        visualize: false,
    };

    setVisualize = () => {
        this.setState({visualize: !this.state.visualize});
    };

    render() {
        const { children } =this.props;
        const { visualize } = this.state;
        const { setVisualize } = this;

        return (
            <VisualizeContext.Provider value={{visualize, setVisualize}}>
                {children}
            </VisualizeContext.Provider>
        );
    };
};

export default BoardProvider;
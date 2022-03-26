import React from 'react';

import { useVisualize } from '../../utils/VisualizeContext';

const Nav = () => {
    const {setVisualize, setAlgorithm } = useVisualize();
    
    const runVisualizer = () => {
        setVisualize();
    };

    const changeAlgorithm = (algo) => {
        setAlgorithm(algo);
    };

    return (
        <nav className="nav">
            <li className="nav-item"><a className="nav-link active text-light" href='/'>Pathfinding Visualizer</a></li>
            <li>
                <a className="nav-link dropdown-toggle text-light" data-bs-toggle="dropdown" role="button" href='/'>Algorithms</a>
                <ul className="dropdown-menu">
                    <li><button className="dropdown-item" onClick={() => changeAlgorithm('dijkstra')}>Dijkstra's Algorithm</button></li>
                    <li><button className="dropdown-item" onClick={() => changeAlgorithm('aStar')}>A* Search</button></li>
                    <li><button className="dropdown-item" onClick={() => changeAlgorithm('breadthFirst')}>Breadth-first Search</button></li>
                    <li><button className="dropdown-item" onClick={() => changeAlgorithm('depthFirst')}>Depth-first Search</button></li>
                </ul>
            </li>
            <button className=" btn nav-link text-light">Clear Board</button>
            <button type="button" className="btn btn-success" onClick={() => runVisualizer()}>Find Path</button>
        </nav>
    );
};

export default Nav;
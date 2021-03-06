import React from 'react';

import { useVisualize } from '../../utils/VisualizeContext';

const Nav = () => {
    const {setVisualize, setAlgorithm, setClearBoard, setVisualized, algorithm } = useVisualize();
    
    const runVisualizer = () => {
        if (algorithm !== '') {
            setVisualize();
        }
    };

    const changeAlgorithm = (algo) => {
        setAlgorithm(algo);
    };

    const clearBoard = () => {
        setClearBoard();
    };

    return (
        <nav className="nav">
            <li className="nav-item"><a className="nav-link active text-light" href='/pathfinding-visualizer'>Fish-finding Visualizer</a></li>
            <li>
                <a className="nav-link dropdown-toggle text-light" data-bs-toggle="dropdown" role="button" href='/'>Algorithms</a>
                <ul className="dropdown-menu">
                    <li><button className="dropdown-item" onClick={() => changeAlgorithm('dijkstra')}>Dijkstra's Algorithm</button></li>
                    <li><button className="dropdown-item" onClick={() => changeAlgorithm('aStar')}>A*Search Algorithm</button></li>
                    <li><button className="dropdown-item" onClick={() => changeAlgorithm('')}>Breadth-first Search (In development)</button></li>
                    <li><button className="dropdown-item" onClick={() => changeAlgorithm('')}>Depth-first Search (In development)</button></li>
                </ul>
            </li>
            <button className=" btn nav-link text-light" onClick={() => clearBoard()}>Clear Board</button>
            <button type="button" className="btn btn-success" onClick={() => runVisualizer()}>Find Path</button>
        </nav>
    );
};

export default Nav;
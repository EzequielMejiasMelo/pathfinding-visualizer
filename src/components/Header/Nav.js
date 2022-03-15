import React from 'react';

import { useVisualize } from '../../utils/VisualizeContext';

const Nav = () => {
    const {visualize, setVisualize} = useVisualize();

    const runVisualizer = () => {
        setVisualize();
    }

    return (
        <nav className="nav">
            <li className="nav-item"><a className="nav-link active text-light" href='/'>Pathfinding Visualizer</a></li>
            <li>
                <a className="nav-link dropdown-toggle text-light" data-bs-toggle="dropdown" role="button" href='/'>Algorithms</a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href='/'>Dijkstra's Algorithm</a></li>
                    <li><a className="dropdown-item" href='/'>A* Search</a></li>
                    <li><a className="dropdown-item" href='/'>Breadth-first Search</a></li>
                    <li><a className="dropdown-item" href='/'>Depth-first Search</a></li>
                </ul>
            </li>
            <a className="nav-link text-light" href='/'>Clear Board</a>
            <button type="button" className="btn btn-success" onClick={() => runVisualizer()}>Find Path</button>
        </nav>
    );
};

export default Nav;
import React, { useState, useEffect } from 'react';
import './style.css';
import defaultGrid from './grid';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default function App() {
  const [grid, setGrid] = useState([...defaultGrid]);
  const [shapes, setShapes] = useState({});

  function delayedLoop(fn, iterations, curr = 0) {
    let i = curr;
    let stop = false;
    setTimeout(function() {
      stop = fn(i);
      if (!stop) {
        i++;
        if (i < iterations) {
          delayedLoop(fn, iterations, i);
        }
      }
    }, 50);
  }

  const draw = (x, y) => {
    grid[x][y] = true;
    grid[x + 1][y] = true;
    grid[x + 2][y] = true;
  };

  const move = (x, y) => {
    const nxt = y + 1;
    const isAnyInNextPosOccupied = (nxt < 20)? (grid[x][nxt] || grid[x + 1][nxt] || grid[x + 2][nxt]) : true;

    if (!isAnyInNextPosOccupied) {
      grid[x][y] = false;
      grid[x + 1][y] = false;
      grid[x + 2][y] = false;

      grid[x][nxt] = true;
      grid[x + 1][nxt] = true;
      grid[x + 2][nxt] = true;
      return null;
    } else {
      return 'blocked';
    }
  };

  const drop = () => {
    const x = getRandomInt(7)
    draw(x, 0);
    delayedLoop(i => {
      let isBlocked = move(x, i) === 'blocked';
      setGrid([...grid]);
      return isBlocked;
    }, 20);
  };

  const clear = () => {
    setGrid(grid.map(row => row.map(col => (col = false))));
  };

  useEffect(() => {}, [grid]);
  return (
    <>
      <div className="tetris__grid" onClick={e => drop()}>
        {grid?.map((row, x) => (
          <div key={`row_${x}`} className="tetris__grid__row">
            {row.map((col, y) => (
              <span key={`col_${x}_${y}`} className={`tetris__grid__col ${col && 'on'}`} />
            ))}
          </div>
        ))}
      </div>
      <button onClick={clear}>Clear</button>
    </>
  );
}

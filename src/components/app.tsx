import * as React from 'react';
import { BoardProps } from './board/boardTypes';
import { GridProps } from './grid/gridTypes';
import { Header } from './header/header';
import { Board } from './board/board';
import { Grid } from './grid/grid';

export const App = () => {

  const gridSize: number = 4;
  const startTilesNumber: number = 2;

  let boardProps: BoardProps = {
    gridSize: gridSize,
  }

  let gridProps: GridProps = {
    gridSize: gridSize,
    startTilesNumber: startTilesNumber,
  }

  return (
    <div className='container-fluid'>
      <Header />
      <Board {...boardProps}/>
      <Grid {...gridProps}/>
    </div>
  );
};
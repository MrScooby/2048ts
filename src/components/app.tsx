import * as React from 'react';
import { BoardProps } from './board/boardTypes';
import { GridProps } from './grid/gridTypes';
import { Header } from './header/header';
import { Board } from './board/board';
import { Grid } from './grid/grid';

export const App = () => {

  let boardProps: BoardProps = {
    gridSize: 4,
  }

  let gridProps: GridProps = {
    gridSize: 4,
    startTilesNumber: 2,
  }

  return (
    <div className='container-fluid'>
      <Header />
      <Board {...boardProps}/>
      <Grid {...gridProps}/>
    </div>
  );
};
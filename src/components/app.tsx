import * as React from "react";
import { HeaderContainer } from "./header/header-container";
import { BoardContainer } from "./board/board-container";
import { TileContainer } from "./tile/tile-container";


export const App = () => {
  return (
    <div className="container-fluid">
      <HeaderContainer />
      <BoardContainer />
      <TileContainer />
    </div>
  );
};


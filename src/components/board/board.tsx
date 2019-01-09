import * as React from 'react';
import './board.css';
import { BoardProps } from './boardTypes'

export class Board extends React.Component<BoardProps> {

    createBoard = (size: number): HTMLDivElement[][] => {
        let board = [];

        for (let i = 0; i < size; i++) {
            let row = [];

            for (let a = 0; a < size; a++) {
                row.push(
                    <div className="board-cell" key={i + a}></div>
                );
            }
            board.push(
                <div className="board-row" key={i}>
                    {row}
                </div>
            );
        }
        return board;
    }

    render() {
        return (
            <div className="board-container">
                {this.createBoard(this.props.gridSize)}
            </div>
        )
    }

}

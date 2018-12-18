import * as React from 'react';
import './board.css';

export class Board extends React.Component {

    createBoard = () => {
        let board = [];

        for (let i = 0; i < 4; i++) {
            let row = [];

            for (let a = 0; a < 4; a++) {
                row.push(
                    <div className="board-cell" key={i+a}></div>
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
                {this.createBoard()}
            </div>
        );
    }
}
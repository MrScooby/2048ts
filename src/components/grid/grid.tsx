import * as React from 'react';
import { GridProps, GridState } from './gridTypes';
import { TileProps, LocationOnGrid } from './tile/tileTypes'
import './grid.css';
import { Tile } from './tile/tile'

export class Grid extends React.Component<GridProps, GridState> {

    // protected cellsGrid: React.ReactChild[][];

    constructor(props) {
        super(props);

        this.state = {
            grid: this.initCellsGrid(),
        }
        //
        this.initListener();

        // this.cellsGrid = this.initCellsGrid();
        this.addStartTiles();
        console.log(this.state.grid);

    }

    protected initListener() {

        enum keyToDirectionMap {
            ArrowLeft = 'left',
            ArrowUp = 'up',
            ArrowRight = 'right',
            ArrowDown = 'down',
            a = 'left',
            w = 'up',
            d = 'right',
            s = 'down'
        }
        let self = this;

        document.addEventListener('keydown', function (event) {
            let direction: string = keyToDirectionMap[event.key];

            let asd = self.state.grid;
            if (direction) {
                event.preventDefault();
                // self.moveAllTiles(direction);

                // for (let row = 0; row < 4; row++) {
                //     for (let column = 0; column < 4; column++) {
                //         if (asd[row][column]) asd[row][column] = row;
                //     }
                // }

                // self.setState({ grid: asd });
                // console.log(self.state.grid);

                self.addRandomTile(2);
            }
        })
    }

    protected initCellsGrid(): React.ReactChild[][] {
        let cellsGrid: React.ReactChild[][] = [];

        for (let x = 0; x < this.props.gridSize; x++) {
            cellsGrid[x] = [];
            for (let y = 0; y < this.props.gridSize; y++) {
                cellsGrid[x].push(null);
            }
        }

        return cellsGrid;
    }

    protected addStartTiles() {
        for (let i = 0; i < this.props.startTilesNumber; i++) {
            this.addRandomTile(2);
        }
    }

    // todo: better way of asigning key to tiles
    protected tileIteration: number = 0;

    protected addRandomTile(value: number): React.ReactChild {
        let emptyCells: LocationOnGrid[] = this.emptyCells();
        let randCellNumber: number = Math.floor(Math.random() * emptyCells.length);

        let tilePosition: LocationOnGrid = emptyCells[randCellNumber];

        let tileProps: TileProps = {
            position: tilePosition,
            value: value,
            key: this.tileIteration,
        }
        this.tileIteration++;

        let newTile = <Tile {...tileProps} />
        // this.cellsGrid[tilePosition.row][tilePosition.column] = newTile;

        let asd = this.state.grid;
        asd[tilePosition.row][tilePosition.column] = newTile;
        this.setState({
            grid: asd
        });

        return newTile;
    }

    protected emptyCells(): LocationOnGrid[] {
        let emptyCells: LocationOnGrid[] = [];

        for (let x = 0; x < this.props.gridSize; x++) {
            for (let y = 0; y < this.props.gridSize; y++) {
                if (this.isCellEmpty({ row: x, column: y })) emptyCells.push({ row: x, column: y });
            }
        }

        return emptyCells;
    }

    public isCellEmpty(cellPosition: LocationOnGrid): boolean {
        return this.getCellTile(cellPosition) == null ? true : false;
    }

    public getCellTile(cellPosition: LocationOnGrid): React.ReactChild {
        return this.state.grid[cellPosition.row][cellPosition.column];
    }

    render() {
        return (
            <div className="tile-container">
                {
                    this.state.grid.map((a) =>
                        a.map((b) =>
                            b
                        )
                    )
                }
            </div>
        );
    }
}
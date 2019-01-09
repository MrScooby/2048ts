import * as React from 'react';
import { GridProps } from './gridTypes';
import { TileProps, LocationOnGrid } from './tile/tileTypes'
import './grid.css';
import { Tile } from './tile/tile'

export class Grid extends React.Component<GridProps> {

    protected cellsGrid: React.ReactChild[][];

    constructor(props) {
        super(props);

        this.cellsGrid = this.initCellsGrid();
        this.addStartTiles();
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

    protected addRandomTile(value: number): React.ReactChild {
        let emptyCells: LocationOnGrid[] = this.emptyCells();
        let randCellNumber: number = Math.floor(Math.random() * emptyCells.length);

        let tilePosition: LocationOnGrid = emptyCells[randCellNumber];

        let tileProps: TileProps = {
            position: tilePosition,
            value: value,
        }

        let newTile = <Tile {...tileProps}/>
        this.cellsGrid[tilePosition.row][tilePosition.column] = newTile;

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
        return this.cellsGrid[cellPosition.row][cellPosition.column];
    }

    render() {
        return (
            <div className="tile-container">
                {this.cellsGrid}
            </div>
        );
    }
}
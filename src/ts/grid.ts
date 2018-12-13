import { Tile } from './tile';
import { LocationOnGrid } from './LocationOnGrid';


export class Grid {

    public cellsGrid: Tile[][];

    constructor(
        protected gridSize?: number,
        protected startTilesNumber?: number
    ) {

        this.setupGridSize();
        this.setupstartTilesNumber();

        this.cellsGrid = this.setupCellsGrid();
    }

    protected setupGridSize() {
        if (this.gridSize) {
            return;
        }
        this.gridSize = 4;
        console.log('!!!!!!! - gridSize not provided: set to 4 as default!');
    }

    protected setupstartTilesNumber() {
        if (this.startTilesNumber) {
            return;
        }
        this.startTilesNumber = 2;
        console.log('!!!!!!! - startTilesNumber not provided: set to 2 as default!');
    }

    protected setupCellsGrid(): Tile[][] {
        let cellsGrid: Tile[][] = [];

        for (let x = 0; x < this.gridSize; x++) {
            cellsGrid[x] = [];
            for (let y = 0; y < this.gridSize; y++) {
                cellsGrid[x].push(null);
            }
        }

        return cellsGrid;
    }

    public addStartTiles() {
        for (let i = 0; i < this.startTilesNumber; i++) {
            this.addRandomTile(2);
        }
    }

    public addRandomTile(value: number): Tile {
        let emptyCells: LocationOnGrid[] = this.emptyCells();
        let randCellNumber = Math.floor(Math.random() * emptyCells.length);

        let tilePosition = emptyCells[randCellNumber];

        let newTile = new Tile(tilePosition, value);

        this.cellsGrid[tilePosition.row][tilePosition.column] = newTile;

        return newTile;
    }

    protected emptyCells(): LocationOnGrid[] {
        let emptyCells: LocationOnGrid[] = [];

        for (let x = 0; x < this.gridSize; x++) {
            for (let y = 0; y < this.gridSize; y++) {
                if (this.isCellEmpty({ row: x, column: y })) emptyCells.push({ row: x, column: y });
            }
        }

        return emptyCells;
    }

    public isCellEmpty(cellPosition: LocationOnGrid): boolean {
        return this.getCellTile(cellPosition) == null ? true : false;
    }

    public getCellTile(cellPosition: LocationOnGrid): Tile {
        return this.cellsGrid[cellPosition.row][cellPosition.column];
    }

    public isWithinGrid(position: LocationOnGrid): boolean {

        if (position.row < 0 || position.row >= this.gridSize ||
            position.column < 0 || position.column >= this.gridSize)
            return false;

        return true;
    }

    public cellContent(cellPosition: LocationOnGrid): Tile {
        return this.cellsGrid[cellPosition.row][cellPosition.column];
    }

    public moveCell(startingPosition: LocationOnGrid, targetPosition: LocationOnGrid) {
        this.cellsGrid[targetPosition.row][targetPosition.column] = this.cellsGrid[startingPosition.row][startingPosition.column];
        this.cellsGrid[startingPosition.row][startingPosition.column] = null;
    }

    public isThereEmptySpace(): boolean {
        if (this.emptyCells.length) return false;
        return true;
    }

    public resetMovementFlagOnTiles() {
        for (let x = 0; x < this.gridSize; x++) {
            for (let y = 0; y < this.gridSize; y++) {
                if (!this.isCellEmpty({ row: x, column: y })) {
                    let tile = this.cellContent({ row: x, column: y });
                    tile.movedInThisRound = false;
                }
            }
        }
    }

}
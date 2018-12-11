import Tile from './tile';
import GridLocation from './gridLocation';

export default class Grid {

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
            this.createRandomTile(2);
        }
    }

    protected createRandomTile(value: number): Tile {
        let emptyCells: GridLocation[] = this.emptyCells();
        let randCellNumber: number = Math.floor(Math.random() * emptyCells.length);

        let tilePosition: GridLocation = emptyCells[randCellNumber];

        let newTile: Tile = new Tile(tilePosition, value);

        this.cellsGrid[tilePosition.row][tilePosition.column] = newTile;


        return newTile;
    }

    protected emptyCells(): GridLocation[] {
        let emptyCells: GridLocation[] = [];

        for (let x = 0; x < this.gridSize; x++) {
            for (let y = 0; y < this.gridSize; y++) {
                if (this.isCellEmpty(this.cellsGrid[x][y])) emptyCells.push({ row: y, column: x });
            }
        }

        return emptyCells;
    }

    protected isCellEmpty(cellValue: Tile): boolean {
        return cellValue == null ? true : false;
    }



}
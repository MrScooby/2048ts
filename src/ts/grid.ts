
export default class Grid {

    protected cellsGrid: number[][];

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

    protected setupCellsGrid() {
        let cellsGrid: number[][] = [];
        for (let i = 0; i < this.gridSize; i++) {
            cellsGrid[i] = [];
            for (let a = 0; a < this.gridSize; a++) {
                cellsGrid[i].push(null);
            }
        }
        return cellsGrid;
    }

    public addStartTiles(startTilesNumber: number) {
        for (let i = 0; i < startTilesNumber; i++) {
            this.addRandomTile();
        }
    }

    protected addRandomTile() {
        let emptyCells;
    }
}
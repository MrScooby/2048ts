import { HTMLManager } from './htmlManager';
import { Grid } from './grid';
import { LocationOnGrid } from './LocationOnGrid';
import { Tile } from './tile';


/////////////////////////////
// default exports to be gone !
/////////////////////////////

interface vector {
    x: number,
    y: number
}

export default class Manager {

    protected gridSize: number = 4;
    protected startTilesNumber: number = 2;
    protected htmlManager: HTMLManager;
    protected grid: Grid;

    constructor(
        // ...
    ) {

        this.htmlManager = new HTMLManager();
        this.grid = new Grid(this.gridSize, this.startTilesNumber);

        this.grid.addStartTiles();
        this.htmlManager.showAllTiles(this.grid.cellsGrid);

        this.initListener();
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

            if (direction) {
                event.preventDefault();
                self.moveAllTiles(direction);
            }
        })
    }

    protected moveAllTiles(direction: string) {
        let directionVector: vector = this.directionVectorMap[direction];
        let movingOrder: { x: number[], y: number[] } = this.movingOrder(directionVector);
        let tilesMoved = false;

        movingOrder.x.forEach(row => {
            movingOrder.y.forEach(column => {
                let cellPosition: LocationOnGrid = { row: row, column: column };
                let movingTile = this.grid.cellContent(cellPosition);

                if (movingTile !== null) {
                    let targetPosition = this.getTargetPosition(movingTile.position, directionVector);
                    let potentialMergePosition = targetPosition.blockedCell;
                    let furthestEmptyCellPosition = targetPosition.furthestEmptyCell;

                    if (this.isMergePossible(potentialMergePosition, movingTile)) {
                        this.moveTile(cellPosition, potentialMergePosition, movingTile);
                        this.htmlManager.deleteTile(potentialMergePosition);
                        this.htmlManager.updateTileValue(potentialMergePosition, movingTile.value);
                        movingTile.updateValue();
                        movingTile.movedInThisRound = true;
                        tilesMoved = true;
                    } else if (!this.isTheSame(cellPosition, furthestEmptyCellPosition)){
                        this.moveTile(cellPosition, furthestEmptyCellPosition, movingTile);
                        tilesMoved = true;
                    }
                }
            });
        })

        if (tilesMoved) {
            this.addNewTile();
        } else if (this.isGameOver) {

        }

        this.grid.resetMovementFlagOnTiles();

    }

    protected readonly directionVectorMap = {
        'left': { x: -1, y: 0 },
        'up': { x: 0, y: -1 },
        'right': { x: 1, y: 0 },
        'down': { x: 0, y: 1 }
    }

    protected movingOrder(directionVector: vector): { x: number[], y: number[] } {
        let rowMovingOrder: number[] = [];
        let columnMovingOrder: number[] = [];

        for (let i = 0; i < this.gridSize; i++) {
            rowMovingOrder.push(i);
            columnMovingOrder.push(i);
        }

        if (directionVector.x == 1) columnMovingOrder.reverse();
        if (directionVector.y == 1) rowMovingOrder.reverse();

        return { x: rowMovingOrder, y: columnMovingOrder };
    }

    protected getTargetPosition(cellPosition: LocationOnGrid, directionVector: vector): {
        furthestEmptyCell: LocationOnGrid,
        blockedCell: LocationOnGrid
    } {
        let previousPosition: LocationOnGrid;

        do {
            previousPosition = cellPosition;
            cellPosition = {
                row: previousPosition.row + directionVector.y,
                column: previousPosition.column + directionVector.x
            };
        } while (this.grid.isWithinGrid(cellPosition) && this.grid.isCellEmpty(cellPosition));

        return {
            furthestEmptyCell: previousPosition,
            blockedCell: cellPosition
        }
    }

    protected isMergePossible(targetPosition: LocationOnGrid, currentTile: Tile): boolean {
        if (!this.grid.isWithinGrid(targetPosition) || this.grid.isCellEmpty(targetPosition)) return false;

        let targetTile = this.grid.cellContent(targetPosition);

        if (currentTile.value !== targetTile.value || targetTile.movedInThisRound) return false;

        return true;
    }

    protected isTheSame(startingPosition: LocationOnGrid, targetPosition: LocationOnGrid): boolean {
        if ((startingPosition.row == targetPosition.row) &&
            (startingPosition.column == targetPosition.column)) return true;
        return false;
    }

    protected moveTile(startingPosition: LocationOnGrid, targetPosition: LocationOnGrid, tile: Tile) {
        this.grid.moveCell(startingPosition, targetPosition);
        tile.updateTilePosition(targetPosition);
        this.htmlManager.moveTile(startingPosition, targetPosition);
    }

    protected addNewTile() {
        let newTile = this.grid.addRandomTile(2);
        this.htmlManager.showTile(newTile);
    }

    protected isGameOver(): boolean {

        if (this.grid.isThereEmptySpace) return false;



        return true;
    }

}
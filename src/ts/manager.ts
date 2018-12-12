import HTMLManager from './htmlManager';
import Grid from './grid';
import GridLocation from './gridLocation';
import Tile from './tile';

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
                self.moveTiles(direction);
            }
        })
    }

    protected moveTiles(direction: string) {
        let directionVector: vector = this.directionVectorMap[direction];
        let movingOrder: { x: number[], y: number[] } = this.movingOrder(directionVector);
        let tilesMoved: boolean = false;

        movingOrder.x.forEach(row => {
            movingOrder.y.forEach(column => {
                let movingTile = this.grid.cellsGrid[row][column];

                if (movingTile !== null) {
                    let targetPosition = this.getTargetPosition(movingTile.position, directionVector);
                    let potentialMergePosition = targetPosition.blockedCell;
                    let furthestEmptyCellPosition = targetPosition.furthestEmptyCell;

                    if (this.isMergePossible(potentialMergePosition, movingTile)) {
                        // to do
                    }

                    if(this.grid.isWithinGrid(potentialMergePosition) && !this.grid.isCellEmpty(potentialMergePosition)) {
                        console.log('MERGE!!!!!!1!');
                    }
                    console.log('move to ' + furthestEmptyCellPosition.row + '  ' + furthestEmptyCellPosition.column);
                }
            });
        })

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

    protected getTargetPosition(cellPosition: GridLocation, directionVector: vector): {
        furthestEmptyCell: GridLocation,
        blockedCell: GridLocation
    } {
        let previousPosition: GridLocation;

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

    protected isMergePossible(targetPosition: GridLocation, currentTile: Tile):boolean {
        // to do
        return
    }

    protected checkIfMergePossible(potentialMergePosition: GridLocation, currentTile: Tile) {

    }
}
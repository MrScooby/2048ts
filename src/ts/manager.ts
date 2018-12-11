import HTMLManager from './htmlManager';
import Grid from './grid';

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
                self.moveTiles();
            }
        })
    }

    protected moveTiles() {

    };

}
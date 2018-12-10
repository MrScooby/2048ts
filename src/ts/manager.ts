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

    }

}
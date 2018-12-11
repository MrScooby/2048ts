import Tile from './tile';
import GridLocation from './gridLocation';


export default class HTMLManager {

    protected tileContainer: HTMLElement;

    constructor(

    ) {
        this.tileContainer = document.querySelector('.tile-container')
    }

    public showAllTiles(cellsGrid: Tile[][]) {
        this.clearAllTiles();

        for (let x = 0; x < cellsGrid.length; x++) {
            for (let y = 0; y < cellsGrid.length; y++) {
                if (cellsGrid[y][x] !== null) {
                    let tile: Tile = new Tile({row: y, column: x}, cellsGrid[y][x].value);
                    this.showTile(tile);
                }
            }
        }
    }

    protected clearAllTiles() {
        while (this.tileContainer.hasChildNodes()) {
            this.tileContainer.removeChild(this.tileContainer.firstChild);
        }
    }

    public showTile(tile: Tile) {
        let div = document.createElement('div');
        let valueClass = 'tile-' + tile.value;
        let positionClass = 'tile-position-' + tile.position.row + '-' + tile.position.column;

        this.tileContainer.appendChild(div);
        div.classList.add(valueClass, positionClass);

        setTimeout(function() {
            div.classList.add("tile");
            div.innerText = tile.value.toString();
        }, 100);
    }
}
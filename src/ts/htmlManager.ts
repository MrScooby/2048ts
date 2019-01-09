import { Tile } from "./tile";
import { LocationOnGrid } from "./LocationOnGrid";

export class HTMLManager {

    protected tileContainer: HTMLElement;

    constructor(
        // ...
    ) {
        this.tileContainer = document.querySelector('.tile-container')
    }

    public showAllTiles(cellsGrid: Tile[][]) {
        this.clearAllTiles();

        for (let x = 0; x < cellsGrid.length; x++) {
            for (let y = 0; y < cellsGrid.length; y++) {
                if (cellsGrid[y][x] !== null) {
                    let tile = new Tile({ row: y, column: x }, cellsGrid[y][x].value);
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
        let positionClass = this.tilePositionClass(tile.position);

        this.tileContainer.appendChild(div);
        div.classList.add(valueClass, positionClass);

        setTimeout(function () {
            div.classList.add("tile");
            div.innerText = tile.value.toString();
        }, 100);
    }

    protected tilePositionClass(position: LocationOnGrid): string {
        return 'tile-position-' + position.row + '-' + position.column;
    }

    protected tilwValueClass(value: number): string {
        return 'tile-' + value;
    }

    public moveTile(currentPosition: LocationOnGrid, targetPosition: LocationOnGrid) {
        let tile = this.tileHTMLelement(currentPosition);
        tile[0].classList.add(this.tilePositionClass(targetPosition));
        tile[0].classList.remove(this.tilePositionClass(currentPosition));
    }

    protected tileHTMLelement(position: LocationOnGrid): HTMLCollection {
        let tilePositionClass = this.tilePositionClass(position);
        return document.getElementsByClassName(tilePositionClass);
    }

    public deleteTile(tilePosition: LocationOnGrid) {
        let tile = this.tileHTMLelement(tilePosition);
        this.tileContainer.removeChild(tile[0]);
    }

    public updateTileValue(tilePosition: LocationOnGrid, value: number) {
        let tile = this.tileHTMLelement(tilePosition);
        let newValue = value * 2;
        let valueClass = this.tilwValueClass(value);
        tile[0].classList.remove(valueClass);
        valueClass = this.tilwValueClass(newValue);
        tile[0].classList.add(valueClass);
        tile[0].innerHTML = newValue.toString();
    }

}
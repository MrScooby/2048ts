import { LocationOnGrid } from './LocationOnGrid';

export class Tile {

    public position: LocationOnGrid;
    public value: number;
    public movedInThisRound: boolean;

    constructor(
        position: LocationOnGrid,
        value: number
    ) {

        this.position = position;
        this.value = value;
        this.movedInThisRound = false;

    }

    public updateTilePosition(targetPosition: LocationOnGrid) {
        this.position = targetPosition;
    }

    public updateValue() {
        this.value += this.value;
    }

}
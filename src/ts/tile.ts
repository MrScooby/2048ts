import { LocationOnGrid } from './LocationOnGrid';

export class Tile {

    public movedInThisRound: boolean;

    constructor(
        public position: LocationOnGrid,
        public value: number
    ) {
        this.movedInThisRound = false;
    }

    public updateTilePosition(targetPosition: LocationOnGrid) {
        this.position = targetPosition;
    }

    public updateValue() {
        this.value += this.value;
    }

}
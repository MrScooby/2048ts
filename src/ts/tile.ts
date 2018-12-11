import GridLocation from './gridLocation';

export default class Tile {

    public position: GridLocation;
    public value: number;

    constructor(
        position: GridLocation,
        value: number
    ) {

        this.position = position;
        this.value = value;

    }

}
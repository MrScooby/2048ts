export type TileProps = {
    position: LocationOnGrid,
    value: number,
}

export type LocationOnGrid = {
    row: number;
    column: number;
}
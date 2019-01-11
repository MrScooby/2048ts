export type TileProps = {
    position: LocationOnGrid,
    value: number,
    key: number,
}

export type LocationOnGrid = {
    row: number;
    column: number;
}
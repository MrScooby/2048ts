import * as React from 'react';
import { TileProps, LocationOnGrid } from './tileTypes'
import './tile.css';

export class Tile extends React.Component<TileProps> {

    protected tilePositionClass(position: LocationOnGrid): string {
        return 'tile-position-' + position.row + '-' + position.column;
    }

    protected tilwValueClass(value: number): string {
        return 'tile-' + value;
    }

    render() {
        return (
            <div className={
                'tile ' +
                this.tilePositionClass(this.props.position) + ' ' +
                this.tilwValueClass(this.props.value)
            } >
                {this.props.value}
            </div>
        );
    }

}
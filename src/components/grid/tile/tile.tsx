import * as React from 'react';
import { TileProps } from './tileTypes'
import './tile.css';

export class Tile extends React.Component<TileProps> {

    // protected tile: HTMLDivElement = document.createElement('div');
    protected positionClass: string = 'tile-position-&{this.props.value}';

    constructor(props) {
        super(props);

        // this.tile.innerText = (this.props.value as any);
        let positionClass = 'tile-position-&{this.props.value}'


    }

    render() {
        return (
            <div className={this.positionClass} >
                {this.props.value}
            </div>

        );
    }



}
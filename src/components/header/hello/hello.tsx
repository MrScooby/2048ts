import * as React from 'react';
import './hello.css';

interface HelloProps {
    value: number | string;
}

export class Hello extends React.Component<HelloProps> {

    render() {
        return (
            <div className="hello">
                {this.props.value}
            </div>
        );
    }
}
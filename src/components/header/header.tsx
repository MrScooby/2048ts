import * as React from 'react';
import './header.css';
import { Hello } from './hello/hello';
import { Manager } from '../../ts/manager';

export class Header extends React.Component {

    protected asd: Manager = new Manager();

    // constructor(props: HelloProps) {
    //     super(props);
    //     this.state = {
    //         value: 'asdasd'
    //     }

    //     this.setState({
    //         value: 3
    //     });

    // }

    componentDidMount() {

    }

    render() {
        return (
            <div className="header">
                <h1>2048</h1>
                < Hello value={'1'}/>
            </div>
        );
    }
}
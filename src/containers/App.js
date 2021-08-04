import React, { Component } from 'react';
import CardList from '../components/CardList';
//import { robots } from './robots'; //just a sample only (should be getting on the server)
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css'

//STATE >> props
//STATE - obj that describes your application
//Smart component have class
class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(Response => Response.json())
            .then(users => this.setState({ robots: users }))
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render() {
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robots => {
            return robots.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        //!robots.length will evaluate if length === 0 :- false then ! make it true
        return !robots.length ? <h1>Loading...</h1> : (
            <div className='tc'>
                <h1 className='f2'>RoboFriends</h1>
                <SearchBox onSearchChange={this.onSearchChange} />
                <Scroll>
                    <CardList robots={filteredRobots} />
                </Scroll>
            </div>
        );
    }
}
export default App;
import React, { Component } from 'react';
import GifsResults from './GifsResults/GifsResults';

//Styles
import './App.css';

/**
* @Class App
* Main class, where everything is conected,
* The title and the GifsResults component are loaded
*/
class App extends Component {
	render() {
		return (
			<div className="App">
				<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
					<h1 className="App-title">Giphy Search App</h1>
				</nav>
				<GifsResults />
			</div>
		);
	}
}

export default App;
import React, { Component } from 'react';
import GifList from '../GifList/GifList';
import Favorite from '../Favorite/Favorite';

//Icons
import searchIcon from '../../icons/magnifying-glass.svg';

/**
* @Class GifsResults
* This class handles the functionality to add, remove and updates gifs
* from both arrays gifs and favList.
* Renders the favorite list, the search input and the trending/results list.
*/
class GifsResults extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: "",
			gifs: [],
			favList: [],
			title: "Top 10 trending GIFs"
		};
		this.searchInput = React.createRef();
	}

	/**
	* @method componentDidMount
	* When the user enters the page will show the results of the API with the 
	* 10 top results, calling the Giphy API
	*/
	componentDidMount() {
		this.fetchResults("trending?", 10)
	}

	/**
	* @method fetchResults
	* Call the API assembling the url with the parameters passed,
	* then saves the response in the gifs array and 
	* calls the updateResultsWithFavorites to keep both arrays updated
	*/
	fetchResults = (type, limit) => {
		let url = `http://api.giphy.com/v1/gifs/${type}api_key=YNUUfVLVQoXlI1cnhA1feS11ksbdCK1k&limit=${limit}`;
		fetch(url)
			.then(response => response.json())
			.then((response) => {
				this.setState({
					gifs: response.data
				});
			})
			.then(() => {
				this.updateResultsWithFavorites();
			})
			.catch(error => {
				console.log('Error fetching and parsing data', error);
			});
	}

	focus() {
		this.searchInput.current.focus();
	}

	/**
	* @method onInputChange
	* When the user enters something in the search input, will update the state with the value. 
	* If the search input is empty, will show the "default", trendring tops results.
	*/
	onInputChange = (event) => {
		if (event.target.value !== "" ) {
			this.setState({searchTerm: event.target.value});
		} else {
			this.setState({
				searchTerm: "",
				title:"Top 10 trending GIFs"
			});
			this.fetchResults("trending?", 10);
		}
  	}
	/**
	* @method onSearch
	* When the uses clicks on the button or press enter, will trigger the fetch to the
	* API to display the top 20 results, and updates the title of the module.
	*/
	onSearch = (event) => {
		event.preventDefault();
		this.fetchResults(`search?q=${this.state.searchTerm}&`, 20);
		this.setState({
			title:"Top 20 results GIFs"
		});
		this.focus();
	}

	/**
	* @method updateResultsWithFavorites
	* Check for every item in favorites if they are on the new results
	* that are about to be displayed, setting the isFavorite property to true
	* that will display the red heart icon (This could be added in a new method to reuse in the others
	* functions that uses it)
	*/
	updateResultsWithFavorites = () => {
		let stateGifs = this.state.gifs;
		this.state.favList.forEach(function(fav){
			stateGifs.forEach(function(item){
				if (fav.id === item.id){
					item["isFavorite"] = true;
				}
			});
		});
		this.setState({
			gifs: stateGifs
		});
	}

	/**
	* @method handleClickedGif
	* Get the info of the clicked gif and check if it's already in the favorite list.
	* If it is, it will call the method to remove it, and if not, it will add it
	*/
	handleClickedGif = (gifClicked) => {
		const indexFav = this.state.favList.findIndex(gif => gifClicked.id === gif.id);
		indexFav >= 0 ? this.removeGifFromFavorites(indexFav, gifClicked.id) : this.addGifToFavorite(gifClicked);
	}

	/**
	* @method addGifToFavorite
	* Receives the information of the gif and adds it to the favorite list.
	* Also checks if this gif is among the results displayed and updates the
	* state of the heart icon (This could be added in a new method to reuse in the others
	* functions that uses it)
	*/
	addGifToFavorite = (gif) => {
		gif.isFavorite = true;
		let stateGifs = this.state.gifs;
		stateGifs.forEach(function(item){
			if (gif.id === item.id){
				item["isFavorite"] = true;
			}
		});
		this.setState({
			favList: [...this.state.favList, gif],
			gifs: stateGifs
		});
	}

	/**
	* @method removeGifFromFavorites
	* Receives the id of the gif and the index in wich this gif is in the favorite
	* list, and removes it from there.
	* Also checks if this gif is among the results displayed and updates the
	* state of the heart icon (This could be added in a new method to reuse in the others
	* functions that uses it)
	*/
	removeGifFromFavorites = (indexFav, gifId) => {
		let stateGifs = this.state.gifs;
		stateGifs.forEach(function(item){
			if (gifId === item.id){
				item["isFavorite"] = false;
			}
		});
		this.setState({
			favList: [
					...this.state.favList.slice(0, indexFav),
					...this.state.favList.slice(indexFav + 1)
				],
			gifs: stateGifs
		});
	}

	render() {
		return (
			<div>
				<Favorite
					favList={this.state.favList}
					handleClickedGif={this.handleClickedGif} />
				<form className="search-container" onSubmit={this.onSearch}>
					<input
						type="text"
						onChange={this.onInputChange}
						id="search"
						placeholder="Search" 
						ref={this.searchInput}
					/>
					<button type="submit" className="btn btn-primary">
						<img src={searchIcon} alt="Search icon" className="search-icon icon" />
					</button>
				</form>
				<h1>{this.state.title}</h1>
				<GifList
					results={this.state.gifs}
					handleClickedGif={this.handleClickedGif} />
			</div>
		);
	}
}

export default GifsResults;
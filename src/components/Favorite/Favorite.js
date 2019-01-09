import React, {Component} from 'react';
import GifList from '../GifList/GifList';
import PropTypes from 'prop-types';

//Styles
import './Favorite.css';

/**
* @Class Favorite
* Renders the markup for the favorite list
*/
class Favorite extends Component {
	render() {
		const { favList, handleClickedGif } = this.props;
		return (
			<nav className="favorite-bar navbar navbar-expand-lg navbar-light bg-light">
				{favList.length > 0 ? (
					<div>
						<h4 className="fav-title">This are your favorites!</h4>
						<GifList
							results={favList}
							handleClickedGif={handleClickedGif} />
					</div>
				) : (
					<div className="favorite-empty">
						<h4 className="fav-title"> You don't have any favorites, try add some :)</h4>
						<div className="favorite-image alert alert-light">
							Click on the <strong>Heart</strong> to add it on favorites
						</div>
					</div>
				)}
			</nav>
		)	
	}
}

Favorite.proptype = {
	favList: PropTypes.array,
	handleClickedGif: PropTypes.func
}

export default Favorite;
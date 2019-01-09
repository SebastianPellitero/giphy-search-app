import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Gif from '../Gif/Gif';

//Styles
import './GifList.css';

/**
* @Class GifList
* Renders the markup for the container of the list of gifs
*/
class GifList extends Component {
	render() {
		const { results, handleClickedGif } = this.props;

		return (
			<div className="gif-list-content">
				{ results.length > 0 ?
					results.map( currentGif => (
					<Gif
						gifInfo={currentGif}
						key={currentGif.id}
						handleClickedGif={handleClickedGif} />
				))
				: 
				(
					<span>There is nothing here :(</span> 
				)
			}
			</div>
		)	
	}
}

GifList.proptypes = {
	results: PropTypes.array,
	handleClickedGif: PropTypes.func
}

export default GifList;
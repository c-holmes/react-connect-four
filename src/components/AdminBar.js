import React, {Component} from 'react';
import { Link } from 'react-router';

class AdminBar extends Component{
	render() {
		return(
			<div className="admin-bar">
				<div className="container">
					<img className="sml-logo" src={`${window.location.origin}/connect-four-small.png`} alt="connect-four" />
					<Link to="/" className="back" >Back</Link>
				</div>
			</div>
		)
	}
}

export default AdminBar;
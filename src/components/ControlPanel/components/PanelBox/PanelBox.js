import React from 'react';
import PropTypes from 'prop-types';
import * as Icon from 'react-bootstrap-icons';
import { StyledPanelBox } from './styles';

const PanelBox = ({ size, color, icon, text, onClick }) => {

	const chosenIcon = () => {
		return React.createElement(
			Icon[icon],
			{
				color: color,
				size: size
			}
		)
	}

	return (
		<StyledPanelBox onClick={onClick}>
			{chosenIcon()}
			<p>{text}</p>
		</StyledPanelBox>
	);
}

PanelBox.propTypes = {
	size: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func
};

export default PanelBox;
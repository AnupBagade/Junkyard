import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';


const CustomAPINextPreviousButton = (props) => {
    return(
        <div style={{paddingTop:"5%", paddingBottom:"1%"}}>
            {props.previousResultsLink ?
                (<Button variant="dark" size="sm" onClick={() => {props.getResultsHandler(props.previousResultsLink)}}>Prev</Button>): null}
            {props.nextResultsLink ?
                (<Button variant="dark" size="sm" style={{float:"right"}} onClick={() => {props.getResultsHandler(props.nextResultsLink)}}>Next</Button>)
                 : null}
        </div>
    )
}

CustomAPINextPreviousButton.propTypes = {
    previousResultsLink : PropTypes.string,
    nextResultsLink : PropTypes.string,
    getResultsHandler : PropTypes.func
}

export default CustomAPINextPreviousButton;

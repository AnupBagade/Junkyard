import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';


const Failure = (props) => {
    const [showAlert, setShowAlert] = useState(true)
    return(
        <SweetAlert
            danger
            show={showAlert}
            title={props.title}
            confirmBtnText={props.btnText}
            onConfirm={() => setShowAlert(false)}
            onCancel={() => setShowAlert(false)}
        >
            {props.message}
        </SweetAlert>
    )
}

Failure.propTypes = {
    title: PropTypes.string,
    btnText: PropTypes.string,
    message: PropTypes.string
}

export default Failure;

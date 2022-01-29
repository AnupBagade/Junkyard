import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';


const Success = (props) => {
    const [showAlert, setShowAlert] = useState(true)
    return(
        <SweetAlert
            success
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

Success.propTypes = {
    title: PropTypes.string,
    btnText: PropTypes.string,
    message: PropTypes.string
}

export default Success;

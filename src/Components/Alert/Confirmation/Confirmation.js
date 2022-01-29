import React, { useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import PropTypes from 'prop-types'

const Confirmation = (props) => {
    const [showAlert, setShowAlert] = useState(true)
    return(
        <SweetAlert
            warning
            show={showAlert}
            showCancel
            title={props.title}
            confirmBtnText={props.btnText}
            confirmBtnBsStyle={props.btnStyle}
            onConfirm={props.onConfirm}
            onCancel={props.onCancel}
            focusCancelBtn
        >
            {props.message}
        </SweetAlert>
    )
}

Confirmation.propTypes = {
    title: PropTypes.string,
    btnText: PropTypes.string,
    message: PropTypes.string,
    onConfirm: PropTypes.func
}

export default Confirmation

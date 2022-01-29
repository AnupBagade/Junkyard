import  React, { useState, useEffect } from 'react';
import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';

const CustomDateRange = (props) => {

    return(
        <div>
            <RangeDatePicker
                startDate={props.startDate}
                endDate={props.endDate}
                disabled={props.disabledStatus ? props.disabledStatus : false}
                dateFormat="D-MM-YY"
                onChange={(startDate, endDate) =>  props.dateRangeHandler({start:startDate, end:endDate})}
            />
        </div>
    )
}

export default CustomDateRange;

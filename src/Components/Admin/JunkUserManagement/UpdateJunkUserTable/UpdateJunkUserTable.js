import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

const JUNKUSERBEPARAMETERS = {
    'junkUserId': 'junkuser_id',
    'junkUserLastName': 'junkuser_last_name',
    'junkUserFirstName': 'junkuser_first_name',
    'junkUserEmailId': 'email',
    'junkUserMobileNumber': 'junkuser_mobile_number',
    'junkUserAge': 'junkuser_age',
    'junkUserGender': 'junkuser_gender'
}

const UpdateJunkUserTable = (tableProps) => {
    return(
        <div style={{paddingTop:"5%"}}>
            <Table striped bordered hover>
                <thead style={{color:"white", backgroundColor:"#212529"}}>
                    <tr style={{textAlign:"center"}}>
                        <th>{`${tableProps.userType} ID`}</th>
                        <th>{`${tableProps.userType} LastName`}</th>
                        <th>{`${tableProps.userType} FirstName`}</th>
                        <th>{`${tableProps.userType} Email`}</th>
                        <th>{`${tableProps.userType} Details`}</th>
                    </tr>
                </thead>
                <tbody>
                    {tableProps.junkUserSearchResults.map(junkUser => {
                        return(
                            <tr style={{textAlign:"center"}} key={junkUser[JUNKUSERBEPARAMETERS['junkUserId']]}>
                                <td key={`employee-${junkUser[JUNKUSERBEPARAMETERS['junkUserId']]}`}>
                                    {junkUser[JUNKUSERBEPARAMETERS['junkUserId']]}
                                </td>
                                <td key={`employee-${junkUser[JUNKUSERBEPARAMETERS['junkUserId']]}-${junkUser[JUNKUSERBEPARAMETERS['junkUserLastName']]}`}>
                                    {junkUser[JUNKUSERBEPARAMETERS['junkUserLastName']]}
                                </td>
                                <td key={`employee-${junkUser[JUNKUSERBEPARAMETERS['junkUserId']]}-${junkUser[JUNKUSERBEPARAMETERS['junkUserFirstName']]}`}>
                                    {junkUser[JUNKUSERBEPARAMETERS['junkUserFirstName']]}
                                </td>
                                <td key={`employee-${junkUser[JUNKUSERBEPARAMETERS['junkUserId']]}-${junkUser[JUNKUSERBEPARAMETERS['junkUserEmailId']]}`}>
                                    {junkUser[JUNKUSERBEPARAMETERS['junkUserEmailId']]}
                                </td>
                                <td key={`employee-${junkUser[JUNKUSERBEPARAMETERS['junkUserId']]}-Details`}>
                                    <a onClick={() => tableProps.getJunkUserDetails(junkUser[JUNKUSERBEPARAMETERS['junkUserId']])}>{`${tableProps.userType} Details`}</a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

UpdateJunkUserTable.propTypes = {
    junkUserSearchResults: PropTypes.array
}

export default UpdateJunkUserTable

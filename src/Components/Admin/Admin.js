import React, { Component } from 'react';
import {Row} from 'react-bootstrap';
import {Container} from '@material-ui/core'
import ScrollableTabsButtonAuto from '../../Containers/HorizontalTabs/horizontalTabs';
import CustomLoader from '../CustomLoader/CustomLoader';
import CoreProviderContext from '../../Context/CoreProviderContext/CoreProviderContext';
const MenuManagement = React.lazy(() => import('./MenuManagement/MenuManagement'));
const ItemManagement = React.lazy(() => import('./ItemManagement/itemManagement'));
const OrderManagement = React.lazy(() => import('./OrderManagement/OrderManagement'));
const EmployeeManagement = React.lazy(() => import('./JunkUserManagement/EmployeeManagement/EmployeeManagement'));
const CustomerManagement = React.lazy(() => import('./JunkUserManagement/CustomerManagement/CustomerManagement'));


class Admin extends Component{

    constructor(props){
        super(props);
        this.adminTabsContent = [MenuManagement, ItemManagement, OrderManagement, EmployeeManagement, CustomerManagement];
        this.adminTabsName = ['Menu', 'Items', 'Orders', 'Employees', 'Customer']
    }


    loadingStatus = () => {
        return(
            <Container>
                <Row style={{display: 'flex', justifyContent: 'center'}}>
                    <CustomLoader />
                </Row>
            </Container>

        )
    }

    render(){
        console.log(this.context)
    return(
        <Container maxWidth="lg" style={{paddingTop:"5%"}}>
            <React.Suspense fallback={this.loadingStatus}>
                <ScrollableTabsButtonAuto
                    tabsContent={this.adminTabsContent}
                    tabsNames={this.adminTabsName} />
            </React.Suspense>
        </Container>
    )
    }
}

Admin.contextType = CoreProviderContext;

export default Admin;

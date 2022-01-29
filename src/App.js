import './App.css';
import JunkYardLayout from './Containers/JunkYardLayout/JunkYardLayout';
import { BrowserRouter } from 'react-router-dom';
import CoreProvider from './Provider/CoreProvider/CoreProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import CoreProviderContext from './Context/CoreProviderContext/CoreProviderContext';
import getUserRole from './Context/ContextManagement/GenericFunctions/GetUserRole';

class App extends Component{

    render(){
        return (
            <CoreProvider>
                <BrowserRouter>
                    <div className="App">
                        <JunkYardLayout/>
                    </div>
                </BrowserRouter>
            </CoreProvider>
        );
    }

}



export default App;

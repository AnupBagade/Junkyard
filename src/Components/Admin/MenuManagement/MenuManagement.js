import {Row} from 'react-bootstrap';
import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import firebaseDB from '../../../Utils/FirebaseConfiguration/FirebaseConfiguraiton';
import lodash from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import refreshToken from '../../../TokenManagement/RefreshToken';
import UpdateDeleteMenuTable from './UpdateDeleteMenuTable/UpdateDeleteMenuTable';
import AddMenu from './AddMenu/AddMenu';
import CustomLoader from '../../CustomLoader/CustomLoader';


const AXIOSMENU = {
    baseURL: 'http://localhost:8080/api/',
    withCredentials: true,
    headers:{
        'Content-Type':'application/json',
        'Accept': 'application/json'
    }
}

const junkAPIMenuModelKeys = {
    'menu_id' : 'menuId',
    'menu_name': 'menuName',
    'menu_image': 'menuImage',
}

const initialAddMenuValues = {
    menuId:0,
    menuName:'',
    menuImage: '',
    menuImagePreview: ''
}

const UPDATEDELETECOLUMNS = ['Menu','Update', 'Delete'];

const menuImageURLPattern = 'http://localhost:8080/';

const menuImageURLReplace = 'http://localhost:8080/api/';

const getMenuDetailObject = (itemObj) => {
    let resultObj = {};
    Object.keys(junkAPIMenuModelKeys).map((junkAPIKey) => {
        resultObj[junkAPIMenuModelKeys[junkAPIKey]] = itemObj[junkAPIKey]
    })
    return resultObj
}


class MenuManagement extends Component{

    constructor(props){
        super(props);
        console.log('inside menu menagement')
        console.log(this.props)
        this.state = {
            initialMenuValues : initialAddMenuValues,
            loadData : false,
            loading : false,
            menuData : {}
        };
    }

    loadMenuDataHandler = async (menuId,  event) => {
        const axiosloadMenu = axios.create(AXIOSMENU);

        axiosloadMenu.interceptors.response.use(
            response => {
                response.data.serialized_data = getMenuDetailObject(response.data)
                response.data.serialized_data["menuImagePreview"] = response.data["menu_image"].replace(menuImageURLPattern, menuImageURLReplace)
                if(document.getElementById("imagePreviewOne")){
                    document.getElementById("imagePreviewOne").src="#"
                }
                if(document.getElementById("imagePreviewTwo")){
                    document.getElementById("imagePreviewTwo").value=""
                }
                return response
            },
            async (error) => {
                if(error.response.status === 401){
                    const refreshStatus = await refreshToken();
                    if(refreshStatus.status === 'success'){
                        return axios.request(error.config)
                    }else if(refreshStatus.status === 'failed'){
                        return (<Redirect to={{pathname:'/login/'}}/>)
                    }
                    return Promise.reject(error)
                }
            }
        )

        axiosloadMenu.get(`menu/${menuId}/`)
        .then(resp => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    ['initialMenuValues'] : resp.data.serialized_data

                }
            })
        })
        .catch(err => {console.log(err)})

    }

    addMenuHandler = async (formData, axiosRequestController) => {
        this.setState(prevState => {
            return{
                ...prevState,
                ['loading']: true
            }
        })

        const axiosAddMenu = axios.create(AXIOSMENU);

        axiosAddMenu.interceptors.response.use(
            response => {return response},
            async error => {
                if(error.response.status === 401){
                    const refreshStatus = await refreshToken();
                    if(refreshStatus.status === 'success'){
                        return axios.request(error.config)
                    }else if(refreshStatus.status === 'failed'){
                        return (<Redirect to={{pathname:'/login/'}}/>)
                    }
                    return Promise.reject(error)
                }
            }
        )

        axiosAddMenu.post('menu/', formData, {cancelToken:axiosRequestController.token})
        .then(resp => {
            this.setState(prevState => {
                return{
                    ...prevState,
                    ['loadData'] : true
                }
            })
            // Returning value to addItem to set axiosRequestController value to null.
            return true
        })
        .catch(err => {console.log(err)})

        return true
    }

    updateMenuHandler = async (menuId, formData, axiosRequestController) => {
        const axiosUpdateMenu = axios.create(AXIOSMENU);

        axiosUpdateMenu.interceptors.response.use(
            response => {
                return response
            },
            async error => {
                if(error.response.status === 401){
                    const refreshStatus = await refreshToken();
                    if(refreshStatus.status === 'success'){
                        return axios.request(error.config)
                    }else if(refreshStatus.status === 'failed'){
                        return (<Redirect to={{pathname:'/login/'}}/>)
                    }
                    return Promise.reject(error)
                }
            }
        )

        axiosUpdateMenu.put(`menu/${menuId}/`, formData, {cancelToken:axiosRequestController.token})
        .then(resp => {
            this.setState(prevState => {
                return{
                    ...prevState,
                    ['loadData'] : true
                }
            })
            // Returning value to addItem to set axiosRequestController value to null.
            return true
        })
        .catch(err => {console.log(err)})
    }

    deleteMenuItemHandler = async (menuId, e) => {
        const axiosDeleteMenu = axios.create(AXIOSMENU);

        axiosDeleteMenu.interceptor.response.use(
            (response) => {return response},
            async (error) => {
                const refreshStatus = await refreshToken();
                if(refreshStatus.status === 'success'){
                    return axios.request(error.config);
                }else if(refreshStatus.status === 'failed'){
                    return (<Redirect to={{pathname:'/login/'}} />)
                }
                return Promise.reject(error)
            }
        )

        axiosDeleteMenu.delete(`menu/${menuId}/`)
        .then(resp => {
            this.setState(prevState => {
                return{
                    ...prevState,
                    ['loadData'] : !prevState.loadData
                }
            })
        })
        .catch(err => {console.log(err)})
    }

    getMenuData = async () => {
        // Updating "loading" to true to display CustomLoader.
        this.setState(prevState => {
            return{
                ...prevState,
                ['loading']: true
            }
        })

        const axiosGetMenu = axios.create(AXIOSMENU);

        axiosGetMenu.interceptors.response.use(
            (response) => {
                return response},
            async (error) => {
                const refreshStatus = await refreshToken();
                if(refreshStatus.status === 'success'){
                    return axios.request(error.config);
                }else if(refreshStatus.status === 'failed'){

                }
                return Promise.reject(error)
            }
        )
        axiosGetMenu.get('/menu')
        .then(resp => {
            this.setState(prevState => {
                return{
                    ...prevState,
                    ['menuData'] : resp.data,
                    ['loading'] : false,

                }
            })
        })
        .catch(err => {console.log(err)})
    }

    loadMenuTable = () => {
        // Updating "loadData" to true to retrieve data from firebase.
        this.setState(prevState => {
            return {
                ...prevState,
                ['loadData'] :!prevState.loadData
            }
        })
    }

    componentDidMount(){
        this.getMenuData();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        // Execute only if loadData is modified.
        if(prevState.loadData != this.state.loadData){
            this.getMenuData();
        }
    }

    render(){
        return(
          <div>
            <AddMenu
                initialData={this.state.initialMenuValues}
                defaultData={initialAddMenuValues}
                addMenuHandler={this.addMenuHandler}
                updateMenuHandler={this.updateMenuHandler}
                loadMenuTable={this.loadMenuTable}/>
            <Row style={{display: 'flex', justifyContent: 'center'}}>
              {this.state.loading && (<CustomLoader />)}
            </Row>
            <UpdateDeleteMenuTable
                updateDeleteColumns={UPDATEDELETECOLUMNS}
                loadMenuDataHandler={this.loadMenuDataHandler}
                deleteMenuHandler={this.deleteMenuItemHandler}
                menuData={this.state.menuData}
            />
          </div>
        )
    }

}
export default MenuManagement;

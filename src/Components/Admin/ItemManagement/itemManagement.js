import React, { Component } from 'react';
import AddItem from './AddItem/addItem';
import UpdateDeleteItemTable from './UpdateDeleteItem/UpdateDeleteItemTable';
import axios from 'axios';
import {Container, Row} from 'react-bootstrap';
import CustomLoader from '../../CustomLoader/CustomLoader';
import refreshToken from '../../../TokenManagement/RefreshToken';

const AXIOSITEMSCONFIG = {
    baseURL:'http://localhost:8080/api/',
    withCredentials: true,
    headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

const junkAPIItemsModelKeys = {
    'item_id': 'itemID',
    'item_type': 'itemType',
    'item_name': 'itemName',
    'item_description': 'itemDescription',
    'item_ingredients': 'itemIngredients',
    'item_diet_type': 'itemDietType',
    'item_calories': 'itemCalories',
    'item_image': 'itemImage'
}

const initialAddItemValues = {
    itemID:0,
    itemType: '',
    itemName: '',
    itemDescription: '',
    itemIngredients: '',
    itemDietType: '',
    itemCalories: 0,
    itemImage:'',
    itemImagePreview: ''
}

const itemImageURLPattern = 'http://localhost:8080/';

const itemImageURLReplace = 'http://localhost:8080/api/';

const getItemDetailObject = (itemObj) => {
    let resultObj = {};
    Object.keys(junkAPIItemsModelKeys).map((junkAPIKey) => {
        resultObj[junkAPIItemsModelKeys[junkAPIKey]] = itemObj[junkAPIKey]
    })
    return resultObj
}

class ItemManagement extends Component{

    constructor(props){
        super(props);
        this.state = {
            addItemFormValues : initialAddItemValues,
            itemsList: [],
            loading: false,
            loadItemsList: false
        }
        this.updateDeleteItemTableColumns = ['Item Type', 'Item Name', 'Diet Type', 'Edit', 'Delete']
        this.itemsListAPIKeys = ['item_id', 'item_type', 'item_name', 'item_name_key', 'item_diet_type']
        this.defaultData = initialAddItemValues
    }

    getItemsList = async () =>{
        this.setState(prevState => {
            return{
                ...prevState,
                ['loading']: true
            }
        })
        const axiosGetItems = axios.create(AXIOSITEMSCONFIG);

        axiosGetItems.interceptors.response.use(
            (response) => {
                return response
            },
            async (error) => {
                if(error.response.status === 403){
                    const refreshStatus = await refreshToken();
                    if(refreshStatus.status === 'success'){
                        return axios.request(error.config)
                    }
                }else{
                    return Promise.reject(error);
                }
            }
        )
        await axiosGetItems.get('items/').then((resp) =>{
            this.setState(prevState => {
                return{
                    ...prevState,
                    ['itemsList'] : resp.data.results,
                    ['loading'] : false,
                    ['loadItemsList'] : false
                }
            })
        }).catch(err => {console.log(err)})
    }

    addItemHandler = async (formData, axiosRequestController) => {
        this.setState(prevState => {
            return{
                ...prevState,
                ['loading']: true
            }
        })

        const axiosAddItem = axios.create(AXIOSITEMSCONFIG);

        axiosAddItem.interceptors.response.use(
            response => {return response},
            async error => {
                if(error.response.status === 403){
                    const refreshStatus = await refreshToken();
                    if(refreshStatus.status === 'success'){
                        return axios.request(error.config)
                    }
                }else{
                    return Promise.reject(error);
                }
            }
        )

        axiosAddItem.post('items/', formData, {cancelToken: axiosRequestController.token})
        .then(resp => {
            this.setState(prevState => {
                return{
                    ...prevState,
                    ['loadItemsList'] : true
                }
            })
            // Returning value to addItem to set axiosRequestController value to null.
            return true
        })
        .catch(err => {console.log(err)})
    }

    deleteItemHandler = async (itemId, event) => {
        this.setState(prevState => {
            return{
                ...prevState,
                ['loading']: true
            }
        })

        const axiosDeleteItem = axios.create(AXIOSITEMSCONFIG);

        axiosDeleteItem.interceptors.response.use(
            (response) => {return response},
            async (error) => {
                if(error.response.status === 403){
                    const refreshStatus = await refreshToken();
                    if(refreshStatus.status === 'success'){
                        return axios.request(error.config)
                    }
                }else{
                    return Promise.reject(error);
                }
            }
        )

        axiosDeleteItem.delete(`items/${itemId}/`)
        .then(resp =>{
            this.setState(prevState => {
                return{
                    ...prevState,
                    addItemFormValues : initialAddItemValues,
                    ['loadItemsList'] : true,
                    ['loading'] : false

                }
            })
        })
        .catch(err => {
            console.log('Unable to delete item.')
        })
    }

    updateItemHandler = async (itemID, formData) => {
        const axiosUpdateItem = axios.create(AXIOSITEMSCONFIG);

        axiosUpdateItem.interceptors.response.use(
            response => {return response},
            async error => {
                if(error.response.status === 403){
                    const refreshStatus = await refreshToken();
                    if(refreshStatus.status === 'success'){
                        return axios.request(error.config)
                    }
                }else{
                    return Promise.reject(error);
                }
            }
        )

        axiosUpdateItem.put(`items/${itemID}/`, formData)
        .then(resp => {
            this.setState(prevState => {
                return{
                    ...prevState,
                    ['loadItemsList'] : true
                }
            })
            // Returning value to addItem to set axiosRequestController value to null.
            return true
        })
        .catch(err => {console.log(err)})

    }

    loadItemDetails = async (item_id,event) => {

        const axiosLoadItem = axios.create(AXIOSITEMSCONFIG)

        axiosLoadItem.interceptors.response.use(
            (response) => {

                console.log(response)
                response.data.serialized_data = getItemDetailObject(response.data)
                response.data.serialized_data["itemImagePreview"] = response.data["item_image"].replace(itemImageURLPattern, itemImageURLReplace)
                if(document.getElementById("itemImagePreview1")){
                    document.getElementById("itemImagePreview1").src="#"
                }
                if(document.getElementById("itemImagePreview2")){
                    document.getElementById("itemImagePreview2").value=""
                }
                return response
            },
            async (error) => {
                if(error.response.status === 403){
                    const refreshStatus = await refreshToken();
                    if(refreshStatus.status === 'success'){
                        return axios.request(error.config)
                    }
                }else{
                    return Promise.reject(error);
                }
            }
        )

        await axiosLoadItem.get('items/'+item_id+'/').then(resp => {
            this.setState((prevState) => {
                return{
                    ...prevState,
                    ['addItemFormValues'] :{
                        ...resp.data.serialized_data
                    }
                }
            }
        )}).catch(err => {
            console.log(err);
        })
    }

    componentDidMount(){
        console.log('inside mount')
        this.getItemsList()
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.state.loadItemsList && (this.state.loadItemsList !== prevState.loadItemsList)){
            this.getItemsList()
        }
    }

    render(){
        return(
            <Container style={{paddingTop:"5%", paddingBottom:"5%"}}>
                <AddItem
                    initialData={this.state.addItemFormValues}
                    defaultData={this.defaultData}
                    addItemHandler={this.addItemHandler}
                    updateItemHandler={this.updateItemHandler}/>
                <Row style={{display: 'flex', justifyContent: 'center'}}>
                  {this.state.loading && (<CustomLoader />)}
                </Row>
                <UpdateDeleteItemTable
                    itemsList={this.state.itemsList}
                    updateDeleteColumns={this.updateDeleteItemTableColumns}
                    itemsListAPIKeys={this.itemsListAPIKeys}
                    deleteItemHandler={this.deleteItemHandler}
                    loadItemDetailsHandler={this.loadItemDetails}/>
            </ Container>
        )
    }
}

export default ItemManagement

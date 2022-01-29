import React, {useState} from 'react';
import axios from 'axios';
import {Formik} from 'formik';
import PropTypes from 'prop-types';
import {Form, Row, Col, Container, Button, Card, Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import CustomLoader from '../../../CustomLoader/CustomLoader';

// menuName:Yup.string().required('Please provide the menu name.').test(
// 'duplicate-menu',
// 'Menu Name already exists. Please confirm Yes on overriding existing menu details.',
// async (value, context) =>{
//   let temp = await validateMenuName('menuNameKey', value)
//   if(temp && !overrideMenu){
//     showConfirmWindow()
//   }
//   return true
// }),

let axiosRequestController = null;

const AddMenu = (menuProps) =>{
    const [formSubmitting, setformSubmitting] = useState(false);

    const validationSchema = Yup.object({
        menuName:Yup.string().required('Please provide the menu name.'),
        menuImage: Yup.string().required('Please select image to be uploaded.')
    })


    return(
        <Container style={{paddingTop:"5%", paddingBottom:"5%"}}>
            <Card>
                <Card.Header as="h5" style={{backgroundColor:"#212529", color:"white"}} data-test="add-menu-form-header">Add Menu</Card.Header>
                <Card.Body>
                    <Formik
                        enableReinitialize
                        htmlFor="menuForm"
                        initialValues={menuProps.initialData}
                        validationSchema={validationSchema}
                        onSubmit={async (values, actions) => {
                            // verify are there any duplicate requests.
                            if(axiosRequestController){
                                axiosRequestController.cancel();
                            }
                            // updating form submission progress status
                            setformSubmitting(true)

                            let formData = new FormData()
                            formData.append('menu_name', values.menuName)
                            formData.append('menu_name_key', values.menuName.trim().replace(/\s/g, '').toUpperCase())
                            if(typeof values.menuImage === "object"){
                                formData.append('menu_image', values.menuImage, values.type)
                            }
                            axiosRequestController = axios.CancelToken.source();
                            if(menuProps.initialData.menuId == 0){
                                await menuProps.addMenuHandler(formData, axiosRequestController);
                            }else{
                                await menuProps.updateMenuHandler(menuProps.initialData.menuId, formData, axiosRequestController)
                            }

                            // Resetting form for next cycle.
                            actions.setSubmitting(false);
                            // If we pass defaultData as argument, form won't be reset.
                            actions.resetForm({
                                values:menuProps.defaultData
                            });
                            if(document.getElementById("imagePreviewOne")){
                                document.getElementById("imagePreviewOne").src="#"
                            }
                            if(document.getElementById("imagePreviewTwo")){
                                document.getElementById("imagePreviewTwo").value=""
                            }
                            if(document.getElementById("menuImage")){
                                document.getElementById("menuImage").value=""
                            }
                            // Removing custom CustomLoader
                            setformSubmitting(false)
                        }}
                    >
                        {(props) =>(
                            <Form id="menuForm" onSubmit={props.handleSubmit} data-test="add-menu-form">
                                <Form.Group as={Row} data-test="add-menu-menuName-field">
                                    <Form.Label column sm="2">Menu Name</Form.Label>
                                    <Col sm="7">
                                        <Form.Control
                                            id="menuName"
                                            name="menuName"
                                            type="text"
                                            value={props.values.menuName}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}/>
                                        {props.errors.menuName && props.touched.menuName ? (<div>{props.errors.menuName}</div>) : null}
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} data-test="add-menu-menuImage-field">
                                    <Form.Label column sm="2">Menu Image</Form.Label>
                                    <Col sm="7">
                                        <Form.File
                                            id="menuImage"
                                            type="file"
                                            accept="image/*"
                                            name="menuImage"
                                            onChange={(event) =>{props.setFieldValue("menuImage", event.target.files[0])}}/>
                                      {props.errors.menuImage && props.touched.menuImage ? (<div>{props.errors.menuImage}</div>) : null}
                                    </Col>
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        {
                                            typeof props.values.menuImage == "object" ? (<Image id="imagePreviewOne" thumbnail src={URL.createObjectURL(props.values.menuImage)} style={{width:"400px", height:"300px"}}/>)
                                            : props.values.menuImagePreview ? (<Image id="imagePreviewTwo" thumbnail src={menuProps.initialData.menuImagePreview} style={{width:"400px", height:"300px"}}/>) : null
                                        }

                                    </ Form.Group>
                                </Form.Row>
                                <Button type="submit" variant="success" size="lg" style={{float:"right"}}>Submit</Button>
                            </Form>
                          )}
                    </Formik>
                </Card.Body>
            </Card>
        </Container>
  )
}

AddMenu.propTypes = {
    initialData : PropTypes.object,
    loadMenuTable: PropTypes.func
}

export default AddMenu;

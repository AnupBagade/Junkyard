import React, { useState } from 'react';
import { Formik } from 'formik';
import { Form, Col, Row, Button, Card, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import axios from 'axios';
import CustomLoader from '../../../CustomLoader/CustomLoader';


let axiosRequestController = null;

const AddItem = (itemProps) => {
    const [formSubmitting, setformSubmitting] = useState(false);

    const itemValidationSchema = Yup.object().shape({
        itemType: Yup.string().ensure().required('Please select item type from dropdown.'),
        itemName: Yup.string().required('Please enter valid item name.'),
        itemDescription: Yup.string().required('Please provide description.'),
        itemIngredients: Yup.string().required('Please provide ingredients details.'),
        itemDietType: Yup.string().ensure().required('Please select diet type from dropdown.'),
        itemCalories: Yup.number().moreThan(10).required('Please enter standard number of calories.'),
        itemImage: Yup.string().required('Please upload item image.')

    })

    return(
        <Card>
            <Card.Header as="h5" style={{backgroundColor:"#212529", color:"white"}}>Add Item</Card.Header>
            <Card.Body>
                <Formik
                    enableReinitialize
                    initialValues={itemProps.initialData}
                    validationSchema={itemValidationSchema}
                    onSubmit={ async (values, actions) => {
                        // Verify are there any requests in queue.
                        if(axiosRequestController){
                            axiosRequestController.cancel();
                        }

                        // updating form submission progress status
                        setformSubmitting(true)

                        let formData = new FormData()
                        formData.append('item_type', values.itemType)
                        formData.append('item_name', values.itemName)
                        formData.append('item_name_key', values.itemName.trim().replace(/\s/g, '').toUpperCase())
                        formData.append('item_description', values.itemDescription)
                        formData.append('item_ingredients', values.itemIngredients)
                        formData.append('item_diet_type', values.itemDietType)
                        formData.append('item_calories', values.itemCalories)
                        if(typeof values.itemImage === "object"){
                            formData.append('item_image', values.itemImage, values.type)
                        }
                        axiosRequestController = axios.CancelToken.source();
                        if(itemProps.initialData.itemID === 0){
                             if( await itemProps.addItemHandler(formData, axiosRequestController)){
                                 axiosRequestController = null
                             }
                        }else{
                            if(await itemProps.updateItemHandler(itemProps.initialData.itemID, formData, axiosRequestController)){
                                axiosRequestController = null
                            }
                        }

                        // Resetting form for next cycle.
                        actions.setSubmitting(false);
                        // If we pass defaultData as argument, form won't be reset.
                        actions.resetForm({
                            values:itemProps.defaultData
                        });
                        document.getElementById("itemImage").value="";
                        // Removing custom CustomLoader
                        setformSubmitting(false)

                    }}
                >
                    {props => (
                        <Form onSubmit={props.handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Item Type</Form.Label>
                                    <Form.Control
                                        as="select"
                                        id="itemType"
                                        name="itemType"
                                        type="text"
                                        value={props.values.itemType}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}>
                                        <option value="burger">Burger</option>
                                        <option value="pizza">Pizza</option>
                                        <option value="fries">Fries</option>
                                        <option value="pasta">Pasta</option>
                                        <option value="donught">Donught</option>
                                        <option value="dessert">Dessert</option>
                                        <option value="chicken">Chicken</option>
                                        <option value="seafood">Sea Food</option>
                                    </Form.Control>
                                    {props.errors.itemType && props.touched.itemType ? (<div>{props.errors.itemType}</div>) : null}
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Item Name</Form.Label>
                                    <Form.Control
                                        id="itemName"
                                        name="itemName"
                                        type="text"
                                        value={props.values.itemName}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                    {props.errors.itemName && props.touched.itemName ? (<div>{props.errors.itemName}</div>) : null}
                                </Form.Group>
                            </Form.Row>
                            <Form.Group>
                                <Form.Label>Item Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    id="itemDescription"
                                    value={props.values.itemDescription}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />
                                { props.errors.itemDescription && props.touched.itemDescription ? (<div>{props.errors.itemDescription}</div>) : null}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Ingredients</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    id="itemIngredients"
                                    name="itemIngredients"
                                    type="text"
                                    value={props.values.itemIngredients}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />
                                {props.errors.itemIngredients && props.touched.itemIngredients ? (<div>{props.errors.itemIngredients}</div>) : null}
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Diet Type</Form.Label>
                                    <Form.Control
                                        as="select"
                                        id="itemDietType"
                                        name="itemDietType"
                                        type="text"
                                        value={props.values.itemDietType}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}>
                                        <option value="veg">Vegetarian</option>
                                        <option value="nonveg">Non-Vegetarian</option>
                                        <option value="vegan">Vegan</option>
                                    </Form.Control>
                                    {props.errors.itemDietType && props.touched.itemDietType ? (<div>{props.errors.itemDietType}</div>) : null}
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Calories</Form.Label>
                                    <Form.Control
                                        id="itemCalories"
                                        name="itemCalories"
                                        value={props.values.itemCalories}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                    {props.errors.itemCalories && props.touched.itemCalories ? (<div>{props.errors.itemCalories}</div>) : null}
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Item Image</Form.Label>
                                    <Form.File
                                        accept="image/*"
                                        type="file"
                                        id="itemImage"
                                        name="itemImage"
                                        onChange={event => {
                                            props.setFieldValue("itemImage", event.target.files[0]);
                                        }}
                                    />
                                    {props.errors.itemImage && props.touched.itemImage ? (<div>{props.errors.itemImage}</div>) : null}
                                </Form.Group>
                                <Form.Group as={Col}>
                                    {
                                        typeof props.values.itemImage == "object" ?
                                            (<Image id="itemImagePreview1" thumbnail src={URL.createObjectURL(props.values.itemImage)} />)
                                        :
                                            props.values.itemImagePreview ? (<Image id="itemImagePreview2" thumbnail src={props.values.itemImagePreview} />) : null

                                    }

                                </Form.Group>
                            </Form.Row>
                            <Button type="submit" variant="success" size="lg" style={{float:"right"}}>Submit</Button>
                        </Form>
                    )}
                </Formik>
                <Row style={{display: 'flex', justifyContent: 'center'}}>
                  {formSubmitting && (<CustomLoader />)}
                </Row>
            </Card.Body>
        </ Card>

    )
}

export default AddItem;

import React, {useState} from 'react';
import {Formik} from 'formik';
import firebaseDB, {firebaseStorage} from '../../../../Utils/FirebaseConfiguration/FirebaseConfiguraiton';
import {Form, Row, Col, Container, Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import useCustomConfirm from '../../../CustomConfirm/CustomConfirm';
import CustomLoader from '../../../CustomLoader/CustomLoader';


const validateMenuName = async (uniqueKeyColumn, menuName='',requestType='Menu') => {
  let menuItems = await firebaseDB.ref('Menu').orderByChild('menuNameKey')
  .equalTo(menuName.trim().replace(/\s/g, '').toUpperCase()).once('value')
  return menuItems.val()
}

const AddMenu = (menuProps) =>{

  const [overrideMenu, setOverrideMenu] = useState(false);

  const [loading, setLoading] = useState(false);

  const duplicateKey='menuNameKey'

  const handleConfirmYes = () => {setOverrideMenu(true)}

  const handleConfirmNo = () => {setOverrideMenu(false)}

  const [showConfirmWindow] = useCustomConfirm(handleConfirmYes, handleConfirmNo);

  const validationSchema = Yup.object({
      requestType: Yup.string().matches("Menu").required('Please enter type of request.'),
      menuName:Yup.string().required('Please provide the menu name.').test(
        'duplicate-menu',
        'Menu Name already exists. Please confirm Yes on overriding existing menu details.',
        async (value, context) =>{
          let temp = await validateMenuName('menuNameKey', value)
          if(temp && !overrideMenu){
            showConfirmWindow()
          }
          return true
        }),
      imageURI: Yup.string().required('Please select image to be uploaded.')
  })


  return(
    <Container style={{paddingTop:"10%", paddingBottom:"10%"}}>
      <Card>
        <Card.Header as="h5" style={{backgroundColor:"#212529", color:"white"}}>Add Menu</Card.Header>
        <Card.Body>
          <Formik
            enableReinitialize
            htmlFor="menuForm"
            initialValues={menuProps.initialData}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {

              // Setting loading state to display loader.
              setLoading(prevState => true)

              // Creating or updating menu image and menu details to firebase.
              firebaseDB.ref(values.requestType).orderByChild(duplicateKey)
              .equalTo(values.menuName.trim().replace(/\s/g, '').toUpperCase())
              .once('value', (snapshot) =>{
                console.log('Submitting')
                const uploadTask = firebaseStorage.child(`Images/Menu/${values.menuName.trim().replace(/\s/g, '').toUpperCase()}`).put(values.imageURI);
                uploadTask.on(
                  'state_changed',
                  null,
                  (error) => {
                    console.log(error)
                  },
                  () =>{
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                      let firebaseObj=''
                      if(snapshot.exists()){
                        // Update menu image and menu details
                        firebaseObj = firebaseDB.ref(values.requestType+'/'+Object.keys(snapshot.val())[0])
                        firebaseObj.set({
                          'menuName':values.menuName,
                          'variants': 10,
                          'imageURI': downloadURL,
                          'menuNameKey':values.menuName.trim().replace(/\s/g, '').toUpperCase()},
                          (error) => {
                            error ? console.log('updating failed.') : console.log('Data updated successfully.')}
                        )}
                      else{
                        // Create a new menu image and menu details in firebase.
                        firebaseObj = firebaseDB.ref(values.requestType)
                        firebaseObj.push({
                          'menuName':values.menuName,
                          'variants': 10,
                          'imageURI': downloadURL,
                          'menuNameKey':values.menuName.trim().replace(/\s/g, '').toUpperCase()})
                      }

                      // resetting formik form
                      actions.setSubmitting(false);
                      actions.resetForm(menuProps.initialData)
                      document.getElementById("imageURI").value="";

                      // resetting overridemenu and loader state for new form.
                      setOverrideMenu(false);
                      setLoading(prevState => false)

                      // Update menuitems table.
                      menuProps.loadMenuTable(prevState => !prevState)
                    })
                  })
            })}}
          >
            {(props) =>(
                <Form id="menuForm" onSubmit={props.handleSubmit}>
                  <Form.Group as={Row}>
                    <Form.Label column sm="2">Request Type</Form.Label>
                    <Col sm="7">
                      <Form.Control
                        id="requestType"
                        name="requestType"
                        type="text"
                        value={props.values.requestType}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}/>
                      {props.errors.requestType && props.touched.requestType ? (<div>{props.errors.requestType}</div>) : null}
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
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
                  <Form.Group as={Row}>
                    <Form.Label column sm="2">Menu Image</Form.Label>
                    <Col sm="7">
                      <Form.File
                        id="imageURI"
                        name="imageURI"
                        onChange={props.handleChange}
                        onBlur={(event) =>{props.setFieldValue("imageURI", event.target.files[0])}}/>
                      {props.errors.imageURI && props.touched.imageURI ? (<div>{props.errors.imageURI}</div>) : null}
                    </Col>
                  </Form.Group>
                  <Button type="submit" variant="success" size="lg" style={{float:"right"}}>Submit</Button>
                </Form>
              )}
          </Formik>
          <Row style={{display: 'flex', justifyContent: 'center'}}>
            {loading && (<CustomLoader />)}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}


export default AddMenu;

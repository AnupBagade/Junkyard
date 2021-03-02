// import { Card, Avatar, Select, Col, Row, Popover, Button, InputNumber, Typography } from 'antd';
import { Card, Popover, Button, InputNumber, Typography } from 'antd';


const JunkItem = (props) => {
  const { Meta } = Card;
  const { Title } = Typography;
  const itemQuantity = (
    <InputNumber min={0} max={10} defaultValue={0}></InputNumber>
  )
  const itemInfo = (
    <Popover content='Food Information' title={props.title} trigger="click">
      <Button>Details</Button>
    </Popover>
  )
  const addItem = (
    <Button>Add</Button>
  )

  return(
    <Card
      className='junkItem'
      hoverable
      cover={<img alt="example" src={props.image} style={{height:'250px'}}/>}
      actions={[
        itemInfo,
        itemQuantity,
        addItem
      ]}>
      <Meta
        title={<Title level={3} style={{color:"#000000"}}>{props.name}</Title>}
        style={{textAlign: 'center'}} />
    </Card>
  );
};

export default JunkItem;

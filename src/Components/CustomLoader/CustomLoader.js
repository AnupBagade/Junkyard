import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const CustomLoader = (props) =>{
  return(
    <Loader
        style={{alignItems:"center"}}
        type="ThreeDots"
        color="#28A745"
        height={100}
        width={100}
      />
  )
}


export default CustomLoader;

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const useCustomConfirm  = (onYes, onNo) => {
  const submit = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => onYes()
        },
        {
          label: 'No',
          onClick: () => onNo()
        }
      ]
    });
  };

return [submit]
}

export default useCustomConfirm

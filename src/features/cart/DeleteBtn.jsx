/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItems } from './cartSlice';

function DeleteBtn({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button onClick={() => dispatch(deleteItems(pizzaId))} type="small">
      Delete
    </Button>
  );
}

export default DeleteBtn;

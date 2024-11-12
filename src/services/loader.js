import { redirect } from 'react-router-dom';
import { createOrder, getMenu, getOrder, updateOrder } from './apiRestaurant';
import store from './../store';
import { clearCart } from '../features/cart/cartSlice';
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export async function menuLoader() {
  const menu = await getMenu();
  return menu;
}

export async function orderLoader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export async function orderAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const erorrs = {};
  if (!isValidPhone(order.phone)) {
    erorrs.phone = 'please provide valid phone number';
  }
  if (Object.keys(erorrs).length > 0) return erorrs;
  //if everything ok then redirect
  const newOrder = await createOrder(order);
  //ginraw
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

// eslint-disable-next-line no-unused-vars
export async function updateAction({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}

/* eslint-disable react/no-unescaped-entities */
// import { useState } from "react";
import { Form, useActionData, useNavigation } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, getTotalprice } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const isLoading = navigation.state === 'submitting';
  const orderError = useActionData();
  const {
    userName,
    position,
    address,
    status,
    error: addressError,
  } = useSelector((store) => store.user);
  const loadingAddress = status === 'loading';
  const totalCartPrice = useSelector(getTotalprice);
  const priority = withPriority ? totalCartPrice * 0.2 : 0;
  const total = totalCartPrice + priority;

  if (!cart) return null;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={userName}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />

            {orderError?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {orderError.phone}
              </p>
            )}
          </div>
        </div>
        <div className="z-1 relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
              disabled={loadingAddress}
              defaultValue={address}
            />
            {status === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute -top-[5px] right-[3px] z-10 sm:top-[6px]">
              <Button
                type="small"
                disabled={loadingAddress || isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get your location
              </Button>
            </span>
          )}
        </div>
        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to give your order priority?
          </label>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button type="primary" disabled={isLoading}>
            {isLoading
              ? 'Placing your order'
              : `Order now for ${formatCurrency(total)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;

import React from "react";
import Dashboard from "../Dashboard";
import { connect } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../redux/actions";

const CartPage = ({
  cart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
}) => {
  const calculateSubtotal = (item) => {
    if (item && item.price && item.quantity) {
      return item.price * item.quantity;
    }
    return 0;
  };

  // Here CartCard component is called to display cart items one-by-one
  const renderCartItems = () => {
    return cart.map((data) => (
      <div className="col mb-5 w-100">
        <div className="card cart-card h-100 bg-light">
          <div className="card-header cart-card-header">
            <img className="cart-image" src={data.thumbnail} alt={data.title} />
            <div className="cart-title-description">
              <p className="cart-name">{data.title}</p>
              <p className="cart-description">{data.description}</p>
            </div>
            <div className="cart-header-last">
              <div className="cart-price-quantity">
                <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                  <button
                    className="btn btn-primary fs-5"
                    onClick={() => incrementQuantity(data.id)}
                  >
                    +
                  </button>
                  <span>{data.quantity}</span>
                  <button
                    className="btn btn-primary fs-5"
                    onClick={() => decrementQuantity(data.id)}
                  >
                    -
                  </button>
                </div>
                <p className="cart-price">&#36; {data.price}</p>
              </div>
              <div className="cart-remove">
                <p onClick={() => removeFromCart(data.id)} className="remove">
                  REMOVE
                </p>
              </div>
              <div className="cart-perITem-subTotal">
                <p className="cartSubText">SUB TOTAL :- &nbsp;</p>
                <p className="cart-SubTotal">$ {calculateSubtotal(data)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + calculateSubtotal(item), 0);
  };
  return (
    <Dashboard>
      <section className="py-5">
        <div className="container px-3 px-lg-3 mt-0">
          <div className="col gx-3 gx-lg-4 row-cols-1 row-cols-md-2 row-cols-xl-3 justify-content-start">
            {/* Here CartCard component is called to display cart items one-by-one */}
            {cart.length === 0 ? (
              <p className="text-center w-100 mb-5">The Cart is Empty</p>
            ) : (
              renderCartItems()
            )}
          </div>
          <div className="card cart-card-body card-header">
            <div className="cart-total-quantity">
              <p className="quantity-text">Total Quantity : </p>
              {/* The Total Quantity of the entire cart is displayed from App Component */}
              <p className="total-quantity">{calculateTotalQuantity()}</p>
            </div>
            <div className="cart-shipping">
              <p className="shipping-text">SHIPPING : </p>
              <p className="free-text">FREE</p>
            </div>
            <div className="cart-total-price">
              <p className="total-text">Total : </p>
              {/* The Total Price of the entire cart is displayed from App Component */}
              <p className="total-price">&#36; {calculateTotalAmount()}</p>
            </div>
          </div>
        </div>
      </section>
    </Dashboard>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
})(CartPage);

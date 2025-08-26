import React from "react";
import "./CartItem.css";

function CartItem({ producto }) {
  return (
    <div className="cartItem-product">
      <div className="w-1/4">
        <img src={producto.images[0]} alt="" className="w-2/3 rounded-md" />
      </div>
      <div className="Details-item">
        <div>
          <h3>{producto.name}</h3>
        </div>
        <div>
          <p>${producto.price.unit_amount / 100}</p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

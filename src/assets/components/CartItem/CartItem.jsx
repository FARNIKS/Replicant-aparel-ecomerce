import React from "react";
import "./CartItem.css";

function CartItem({ producto }) {
  return (
    <div className="CartItem-product">
      <div>
        <img src={producto.images[0]} alt="" />
      </div>
      <div>
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

import { currencyFormatter } from "../util/formatting.js";
export default function CartItem({ eachItem, onIncrease, onDecrease }) {
  return (
    <li className="cart-item">
      <p>
        {eachItem.name} - {eachItem.quantity} *{" "}
        {currencyFormatter.format(eachItem.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{eachItem.quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}

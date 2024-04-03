import { useContext } from "react";
import Modal from "../UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "../components/Error.jsx";
const requestconFig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  //   body: JSON.stringify({
  //     order: {
  //       items: cartCtx.items,
  //       customer: customerData,
  //     },
  //   }),
};
export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestconFig);

  const totalPrice = cartCtx.items.reduce((totalPriceOfItems, item) => {
    return totalPriceOfItems + item.price * item.quantity;
  }, 0);
  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
    // fetch("http://localhost:3000/orders", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     order: {
    //       items: cartCtx.items,
    //       customer: customerData,
    //     },
    //   }),
    // });
  }

  let actions = (
    <>
      <Button type="button" textOnly={true} onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (isSending) {
    actions = <span>Sending Order data..</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleCloseCheckout}
      >
        <h2>Success!</h2>
        <p>Your order was submitted Successfully</p>
        <p>we will get back to you via email within next few minutes.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount:{currencyFormatter.format(totalPrice)}</p>
        <Input label="Full Name " type="text" id="name" />
        <Input label="Email" type="email" id="email" />
        <Input label="Street " type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code " type="text" id="postal-code" />
          <Input label="City " type="text" id="city" />
        </div>
        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}

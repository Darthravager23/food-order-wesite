import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import logoImg from "../assets/logo.jpg";
import Button from "../UI/Button.jsx";

export default function Header() {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);
  const totalCartItems = items.reduce((totalNumberOfItems, item) => {
    //final total we get is stored in TNOI=>^
    return totalNumberOfItems + item.quantity;
  }, 0); // 0 is starting value for first iteration only

  // function handleShowCart() {
  //   UserProgressCtx.showCart();
  // }

  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt='website logo' />
        <h1>DEMO WEBSITE</h1>
      </div>
      <div>
        {/* onClick={handleShowCart} */}
        <Button textOnly={true} onClick={showCart}>
          Cart ({totalCartItems})
        </Button>
      </div>
    </header>
  );
}

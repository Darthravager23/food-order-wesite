import { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");
  function handleShowCart() {
    setUserProgress("cart");
  }
  function handleHideCart() {
    setUserProgress("");
  }
  function handleShowCheckout() {
    setUserProgress("checkout");
  }
  function handleHideCheckout() {
    setUserProgress("");
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart: handleShowCart,
    hideCart: handleHideCart,
    showCheckout: handleShowCheckout,
    hideCheckout: handleHideCheckout,
  };
  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}
export default UserProgressContext;

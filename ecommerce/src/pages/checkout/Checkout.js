import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, selectCartItems, selectCartTotalAmount } from "../../redux/slice/cartSlice";
import { selectEmail } from "../../redux/slice/authSlice";
import { selectBillingAddress, selectShippingAddress } from "../../redux/slice/checkoutSlice";
import { toast } from "react-toastify";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Checkout = () => {
  
    const [giftCardCode, setGiftCardCode] = useState("");
    const [giftCardPIN, setGiftCardPIN] = useState("");
    const [giftCardProof, setGiftCardProof] = useState(null);
  
    const cartItems = useSelector(selectCartItems);
    const totalAmount = useSelector(selectCartTotalAmount);
    const customerEmail = useSelector(selectEmail);
    const shippingAddress = useSelector(selectShippingAddress);
    const billingAddress = useSelector(selectBillingAddress);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  const description = `eShop payment: email: ${customerEmail}, Amount: ${totalAmount}`;

    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);
    // http://localhost:4242/create-payment-intent
    // Create PaymentIntent as soon as the page loads
    fetch("https://eshop-react-firebase.herokuapp.com/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        userEmail: customerEmail,
        shipping: shippingAddress,
        billing: billingAddress,
        description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        setMessage("Failed to initialize checkout");
        toast.error("Something went wrong!!!");
      });
  }, []);

  
  const options = {
    clientSecret,
    appearance,
  };

  const handleGiftCardSubmit = () => {
    // Implement logic to register gift card with the system
    console.log("Gift card code:", giftCardCode);
    console.log("Gift card PIN:", giftCardPIN);
    console.log("Gift card proof:", giftCardProof);
    // Upload gift card proof to server
    // Set gift card proof state to null after uploading
    setGiftCardProof(null);
    // Show success message to the user
    toast.success("Gift card registered successfully!");
  };

  const handleGiftCardProofUpload = (e) => {
    const file = e.target.files[0];
    setGiftCardProof(file);
  };

  return (
    <section>
      <div className="container">
        <h3>Enter Gift Card Information</h3>
        <input type="text" placeholder="Gift Card Code" value={giftCardCode} onChange={(e) => setGiftCardCode(e.target.value)} />
        <input type="text" placeholder="Gift Card PIN" value={giftCardPIN} onChange={(e) => setGiftCardPIN(e.target.value)} />
        <input type="file" accept="image/*" onChange={handleGiftCardProofUpload} />
        <button onClick={handleGiftCardSubmit}>Register Gift Card</button>
      </div>
    </section>
  );
};

export default Checkout;

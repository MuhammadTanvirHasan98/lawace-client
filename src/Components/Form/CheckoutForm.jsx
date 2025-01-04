import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { ImSpinner } from "react-icons/im";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const CheckoutForm = ({packageInfo, closeModal}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState();
  const [cardError, setCardError] = useState('');
  const [processing, setProcessing] = useState('');
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();

   
   useEffect(()=>{
      if(packageInfo?.price && packageInfo?.price>1){
         getClientSecret({price: packageInfo?.price});
      }
   },[])

  //  get client secret
  const getClientSecret = async(price)=>{
      const {data} = await axiosSecure.post(`/create-payment-intent`, price)
      console.log(data);
      setClientSecret(data.clientSecret)
      // return data;
  }

  console.log(clientSecret);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error)
      return
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError('');
    }

    // confirm payment
     const{ error:confirmError, paymentIntent} =  await stripe.confirmCardPayment(clientSecret, {
       payment_method:{
        card: card,
        billing_details:{
          email:user?.email,
          name:user?.displayName,
        },
      }
    })

    if(confirmError){
      console.log(confirmError);
      setCardError(confirmError.message);
      setProcessing(false);
      return
    }

    if(paymentIntent.status ==='succeeded'){

       console.log(paymentIntent)
        // 1. Create payment info object
         const paymentInfo = {
            ...packageInfo,
             user_name: user?.displayName,
             user_email: user?.email,
             transactionId: paymentIntent?.id,
             date: new Date(),
         }
     
         setProcessing(false);
        // 2. Save payment info in userPackage collection db
         try{
              const{data} = await axiosSecure.post(`/purchasePackage`, paymentInfo)
              if(data.insertedId){
                 closeModal();
                 Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: `You have purchased ${packageInfo?.plan} plan successfully.`,
                  showConfirmButton: false,
                  timer: 2500
                });
              }
         }catch(err){
           toast.error(err.message)
         }

    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="form-control mt-6">
        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="btn btn-outline text-cyan-500 hover:bg-cyan-600  text-lg font-bold rounded-t-none"
        >
          {
            processing ? (
              <ImSpinner className="animate-spin m-auto text-cyan-500 "/>
            ):(
              `Pay ${packageInfo.price}`
            )
          }
        
      
        </button>
      </div>
    </form>
    {
      cardError && <>
      <p className="text-red-500 text-lg text-center mt-2">{cardError}</p>
      </>
    }
    </>
  );
};

export default CheckoutForm;


CheckoutForm.propTypes = {
  packageInfo: PropTypes.object,
  closeModal: PropTypes.func,
};
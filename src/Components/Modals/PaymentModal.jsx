import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import { Fragment } from "react";
import PropTypes from "prop-types";
import useAuth from "../../Hooks/useAuth";
import { GoPackage } from "react-icons/go";
import { IoPricetagsOutline } from "react-icons/io5";
import { RiInformation2Line } from "react-icons/ri";
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Form/CheckoutForm";


  
const stripePromise = loadStripe(import.meta.env. VITE_STRIPE_PUBLISHABLE_KEY);

console.log(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const PaymentModal = ({ packageInfo, closeModal, isOpen }) => {
  const { user } = useAuth();
  const { plan, price,} = packageInfo || {};



  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                <div className="mb-2 border-2 p-4 rounded-2xl rounded-b-none bg-slate-100">
                  {/* Meal info */}
                  <div className="font-semibold">
                    <p className="text-2xl flex items-center gap-1">
                      <RiInformation2Line />
                      Membership Info:
                    </p>
                    <p className="text-xl text-cyan-600 flex items-center gap-1">
                      <GoPackage />
                      Package name: {' '}
                      {plan}
                    </p>
                    <p className="flex items-center gap-1">
                      <IoPricetagsOutline className="text-lg"/> You need to pay:{" "}
                      <span className="text-cyan-500">${price}</span>
                    </p>
                  </div>
                </div>

                <div method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Your Name
                      </span>
                    </label>
                    <input
                      type="text"
                      value={user?.displayName}
                      disabled={true}
                      name="name"
                      className="input input-bordered  font-semibold"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Your Email
                      </span>
                    </label>
                    <input
                      type="text"
                      value={user?.email}
                      disabled={true}
                      name="name"
                      className="input input-bordered font-semibold"
                    />
                  </div>

                  <div className="mt-6">
                    {/* Checkout form */}
                    <Elements stripe={stripePromise}>
                        <CheckoutForm packageInfo={packageInfo} closeModal={closeModal}/>
                    </Elements>

                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                  ✕
                </button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

PaymentModal.propTypes = {
  packageInfo: PropTypes.object,
  price:PropTypes.number,
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
  // handleUpdateReview: PropTypes.func,
};

export default PaymentModal;

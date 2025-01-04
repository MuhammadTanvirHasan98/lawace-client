import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from '@headlessui/react'
import { Fragment} from 'react'
import PropTypes from 'prop-types'
import useAuth from '../../Hooks/useAuth';
import { AiOutlineLike } from 'react-icons/ai';
import { BiDish } from 'react-icons/bi';
import { RiInformation2Line } from 'react-icons/ri';


const UpdateModal = ({ review, closeModal, isOpen, handleUpdateReview}) => {

  const { user } = useAuth();

  const{ mealLikes, mealTitle} = review;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all'>
              <div className="mb-2 border-2 p-4 rounded-2xl rounded-b-none bg-slate-100">
               {/* Meal info */}
               <div className="font-semibold">
                 <p className="text-2xl flex items-center gap-1"><RiInformation2Line/>Meal Info:</p>
                 <p className="text-xl text-cyan-600 flex items-center gap-1"><BiDish/>{mealTitle}</p>
                 <p className="flex items-center gap-1"><AiOutlineLike/> Total Likes: <span className="text-cyan-500">{mealLikes}</span> </p>
               </div>
            </div>

            <form onSubmit={handleUpdateReview} method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Your Name</span>
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
                  <span className="label-text font-semibold">Your Email</span>
                </label>
                <input
                  type="text"
                  value={user?.email}
                  disabled={true}
                  name="name"
                  className="input input-bordered font-semibold"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Update Review</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  name="review"
                  defaultValue={review?.review}
                  placeholder="Give your review about this meal item within 85 characters."
                  required
                ></textarea>
              </div>
              <div type="submit" className="form-control mt-6">
                <button className="btn btn-outline text-cyan-500 hover:bg-cyan-600  text-lg font-bold rounded-t-none">
                  Submit
                </button>
              </div>
            </form>
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
  )
}

UpdateModal.propTypes = {
  review: PropTypes.object,
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
  handleUpdateReview: PropTypes.func,
  id: PropTypes.string,
}

export default UpdateModal
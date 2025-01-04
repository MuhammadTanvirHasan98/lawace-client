import useAuth from "../../Hooks/useAuth";
import PropTypes from "prop-types";
import { IoStarOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { BiDish } from "react-icons/bi";
import { RiInformation2Line } from "react-icons/ri";

const ReviewModal = ({ mealInfo, handleReviewSubmit, handleClose }) => {
  const { user } = useAuth();

  const{rating, likes, title} =mealInfo;

  return (
    <div>
      <div>
        <dialog id="review_modal" className="modal">
          <div className="modal-box p-8">

            <div className="mb-2 border-2 p-4 rounded-2xl rounded-b-none bg-slate-100">
               {/* Meal info */}
               <div className="font-semibold">
                 <p className="text-2xl flex items-center gap-1"><RiInformation2Line/>Meal Info:</p>
                 <p className="text-xl text-cyan-600 flex items-center gap-1"><BiDish/>{title}</p>
                 <p className="flex items-center gap-1"><AiOutlineLike/> Total likes: <span className="text-cyan-500">{likes}</span> </p>

                 <p className="flex items-center gap-1"> <IoStarOutline/>Rating: <span className="text-cyan-500">{rating} out of 5</span> </p>

               </div>
            </div>

            <form onSubmit={handleReviewSubmit} method="dialog">
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
                  <span className="label-text font-semibold">Give Review</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  name="review"
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
              onClick={handleClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ReviewModal;

ReviewModal.propTypes = {
  mealInfo: PropTypes.object,
  handleReviewSubmit: PropTypes.func,
  handleClose: PropTypes.func,
};

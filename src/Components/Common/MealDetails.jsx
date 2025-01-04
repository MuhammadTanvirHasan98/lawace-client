import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpinner from "./LoadingSpinner";
import { AiOutlineLike } from "react-icons/ai";
import { IoStarOutline } from "react-icons/io5";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import ReviewModal from "../Modals/ReviewModal";
import useProfile from "../../Hooks/useProfile";
import useRole from "../../Hooks/useRole";

const MealDetails = () => {
  const { id } = useParams();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const { profile } = useProfile();
  console.log(profile);
  const [role] = useRole();

  const {
    data: mealInfo = {},
    isLoading: isMealLoading,
    refetch: refetchMeal,
  } = useQuery({
    queryKey: ["meal-details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/meal/${id}`);
      return data;
    },
    enabled: !!id,
  });

  const {
    _id,
    title,
    post_time,
    image,
    price,
    category,
    rating,
    description,
    likes,
    reviews,
    ingredients,
    admin,
  } = mealInfo;
  // console.log(mealInfo);

  const time = new Date(post_time).toLocaleTimeString();
  const date = new Date(post_time).toLocaleDateString();
  // console.log(time, date);

  // Reviews Data fetching  for specific meal

  const {
    data: allReviews = [],
    isLoading: areReviewsLoading,
    refetch: refetchReviews,
  } = useQuery({
    queryKey: ["all-reviews", _id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reviews/${_id}`);
      return data;
    },
    enabled: !!_id,
  });

  // console.log(allReviews);

  // Handle like button method
  const handleLike = async (id) => {
    console.log(id);

    try {
      const { data } = await axiosSecure.patch(`/meal/${id}`);
      console.log(data);
      setLiked(true);
      refetchMeal();
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  const handleMealRequest = async () => {
    if (role == "admin") return toast.error("Action can not be permitted!");

    if (profile?.badge == "Bronze")
      return toast.error("You have to purchase a package.");

    const mealData = {
      title,
      likes,
      reviews,
      status: "Pending",
      userInfo: { name: user?.displayName, email: user?.email },
    };
    console.log(mealData);

    try {
      const { data } = await axiosSecure.post("/requestMeal", mealData);
      console.log(data);
      if (data.acknowledged) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your meal request has been sent successfully.",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const review = form.review.value;

    if (review.length > 70) return toast.error("Your character limit exceeds");

    const reviewInfo = {
      mealId: _id,
      reviewer: {
        name: user?.displayName,
        image: user?.photoURL,
        email: user?.email,
      },
      review,
      mealLikes: likes,
      review_count: reviews + 1,
      mealTitle: title,
    };

    // console.table({ reviewInfo });

    try {
      const { data } = await axiosSecure.post("/addReview", reviewInfo);
      console.log(data);
      if (data.acknowledged) {
        document.getElementById("review_modal").close();
        toast.success("Thanks for your Review!");
        refetchReviews();
        refetchMeal();
        form.reset();
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  const handleClose = () => {
    document.getElementById("review_modal").close();
  };

  return (
    <div className="py-32 md:px-20 px-6">
      {isMealLoading ? (
        <>
          <LoadingSpinner />
        </>
      ) : (
        <>
          <div>
            <div className="text-center">
              <h1 className=" md:text-5xl text-3xl  font-bold text-yellow-600 merienda">
                Meal details
              </h1>
              <hr className="md:w-[280px] w-[180px] my-1 border-yellow-600 mx-auto" />
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-4 p-2 mt-10">
              {/* Meal Card section */}
              <div className="lg:w-2/3  ">
                <div className="flex flex-col lg:flex-row  border-2 border-orange-200 rounded-xl shadow-2xl">
                  {/* craft image  */}
                  <div className="lg:w-1/2 w-full  p-4 lg:pb-4 lg:pr-0 pb-0">
                    <img
                      src={image}
                      className="w-full  lg:h-full md:min-h-[500px] h-[350px] lg:rounded-l-xl lg:rounded-tr-none rounded-t-xl"
                    />
                  </div>

                  {/* Craft Info */}
                  <div className="xl:text-2xl text-xl lg:w-1/2 w-full  md:p-7 p-5 text-[#385398] flex flex-col justify-between">
                    <div className="">
                      <h1 className="lg:text-left text-center xl:text-3xl text-2xl mb-2 font-bold merienda">
                        {title}
                      </h1>

                      <h2 className="text-lg lg:text-left text-center">
                        <span className="font-semibold">Category: </span>
                        {category}
                      </h2>

                      <hr className="border-orange-100 md:my-2 my-1 " />

                      <div className="flex justify-between">
                        <p className="flex items-center gap-1">
                          <span className="font-semibold">Post time: </span>
                          {`${time} | ${date}`}
                        </p>
                      </div>

                      <hr className="border-orange-100 md:my-2 my-1 " />

                      <div className="flex justify-between font-semibold">
                        <p>$ {price}</p>
                        <p className="flex items-center gap-1">
                          <IoStarOutline /> {rating}
                        </p>
                      </div>

                      <hr className="border-orange-100 md:my-2 my-1 " />

                      <p>
                        <span className="font-bold merienda">
                          {" "}
                          Distributor:{" "}
                        </span>
                        {admin?.name}
                      </p>

                      <hr className="border-orange-100 md:my-2 my-1 " />

                      {/* Review */}
                      <div>
                        <p className="">
                          <span className="font-semibold">Ingredients: </span>
                          {ingredients.map((item, inx) => (
                            <span key={inx}>
                              {inx + 1}
                              {")"} {item}{" "}
                            </span>
                          ))}
                          .
                        </p>

                        <p className="mt-2 ">
                          <span className=" font-semibold">Description: </span>
                          {description}
                        </p>
                      </div>
                    </div>

                    {/* Like and Meal Request buttons */}
                    <div className="flex justify-between mt-4">
                      <p className="flex items-center gap-2 font-semibold text-lg">
                        <button
                          disabled={liked}
                          onClick={() => handleLike(_id)}
                          className="btn btn-sm "
                        >
                          <AiOutlineLike
                            className={`text-3xl ${liked && "text-blue-400"} `}
                          />
                        </button>
                        {likes}
                      </p>
                      <button
                        onClick={handleMealRequest}
                        className="btn btn-outline  transition duration-500  font-extrabold text-[#385398] merienda"
                      >
                        Meal Request
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/*Review section  */}
              <div className="lg:w-1/3 lg:mt-0 mt-20">
                <div className="border-2 rounded-lg border-slate-300 p-2 rounded-b-none shadow-xl">
                  {/* User Count and Button */}
                  <div className="flex justify-between items-center  bg-slate-100 rounded-md p-1 rounded-b-none">
                    <p className="text-center text-xl font-bold  text-gray-600 merienda">
                      Reviews:{" "}
                      <span className="bg-slate-200 text-cyan-600 px-2 rounded-full">
                        {allReviews.length}
                      </span>
                    </p>

                    <div>
                      {role == "admin" ? (
                        <button
                          className="btn btn-outline text-cyan-600 hover:bg-cyan-700  md:px-6 px-4 btn-sm font-semibold rounded-none rounded-tr-md"
                          onClick={() =>
                            toast.error("Action can be permitted!")
                          }
                        >
                          {" "}
                          Give Review
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline text-cyan-600 hover:bg-cyan-700  md:px-6 px-4 btn-sm font-semibold rounded-none rounded-tr-md"
                          onClick={() =>
                            document.getElementById("review_modal").showModal()
                          }
                        >
                          {" "}
                          Give Review
                        </button>
                      )}

                      {/* Review Modal */}

                      <ReviewModal
                        mealInfo={mealInfo}
                        handleReviewSubmit={handleReviewSubmit}
                        handleClose={handleClose}
                      />
                    </div>
                  </div>

                  {/* Users Review */}
                  <div className="space-y-2">
                    {areReviewsLoading ? (
                      <LoadingSpinner smallHeight={true} />
                    ) : (
                      <>
                        {allReviews.map((review) => (
                          <div
                            key={review?._id}
                            className="border-2 bg-gradient-to-tr from-slate-50 to-blue-100 mt-2 p-1 flex items-center gap-2"
                          >
                            <img
                              src={review?.reviewer?.image}
                              className="w-11 h-11 rounded-md border-2  border-blue-300"
                              alt="user-img"
                            />
                            <div>
                              <h1 className="font-bold text-gray-600">
                                {review?.reviewer?.name}
                              </h1>
                              <p className="text-sm text-gray-600">
                                {" "}
                                <span className="font-semibold">Review: </span>
                                {review?.review}
                              </p>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MealDetails;

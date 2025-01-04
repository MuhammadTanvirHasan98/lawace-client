import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { IoStarOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";

const MealCard = ({ meal }) => {
  const { _id, title, image, category, likes,reviews, rating, price } = meal;

  return (
    <div className="">
      <div className=" hover:bg-[#e0f3fd] transition duration-500  rounded-lg shadow-2xl">
        {/* Meal Image */}
        <figure className="xl:px-8 xl:pt-8 px-5 pt-5">
          <img
            src={image}
            alt="food_image"
            className="rounded-lg w-full xl:h-[300px] md:h-[220px] h-[280px]"
          />
        </figure>

        <div className="font-semibold p-4">
          {/* Cards Info */}
          <h2 className="text-2xl font-semibold merienda text-center mb-2">
            {title}
          </h2>

          <hr className="my-1" />

          <div className="text-left text-lg">
            <p>Category: {category}</p>
            <p>Total reviews: {reviews}</p>
          </div>

          <div className="flex justify-between  my-2">
            <p className="text-2xl text-orange-600 font-normal">${price}</p>
            <p className="flex items-center gap-1 text-2xl text-orange-600 font-normal">
              <IoStarOutline /> {rating}
            </p>
          </div>

          <hr className="my-1" />

          <div className="flex justify-between items-center">
            <p className="flex gap-1 bg-blue-100 p-1 rounded-xl">
              <AiOutlineLike className="text-2xl text-blue-500" />
              {likes}
            </p>

            {/* Buttons */}
            <div className="flex justify-center mt-2">
              <Link to={`/mealDetails/${_id}`}>
                <button className="btn btn-outline btn-sm  transition duration-500 rounded-md hover:bg-[#5eade6] font-extrabold text-[#8a88eb] merienda">
                  Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;

MealCard.propTypes = {
  meal: PropTypes.object,
};

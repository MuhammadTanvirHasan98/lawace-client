import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import Select from "react-select";
import { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useForm } from "react-hook-form";
import imageUpload from "../../../Utils/ImageUpload";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddFood = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
   const axiosSecure = useAxiosSecure()
   const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    reset
  } = useForm();

  // const handleAddFood = async (e) => {
  //   // e.preventDefault();
  //   // const form = new FormData(e.currentTarget);
  //   // console.log(form);
  //   // const food_name = form.get("itemName");
  //   // const food_img  = form.get("photo");
  //   // const category = form.get("category");
  //   // const quantity = parseInt(form.get("quantity"));
  //   // const price = form.get("price");
  //   // const food_origin = form.get("origin");
  //   // const description = form.get("description");
  //   // const purchase_count = 0;
  //   // const made_by ={
  //   //    name: user?.displayName,
  //   //    email: user?.email,
  //   // }
  //   // const newFood = {
  //   //   food_name,food_img,price, quantity,purchase_count, category,food_origin ,  made_by,
  //   //   description
  //   // };
  //   // console.table(newFood);
  //   // try{
  //   //   const {data} = await axiosSecure.post("/addFood", newFood)
  //   //   console.log(data);
  //   //   if(data.insertedId){
  //   //           Swal.fire({
  //   //             title: "Food Added!",
  //   //             text: "Your food item has been added successfully.",
  //   //             icon: "success"
  //   //           });
  //   //            e.target.reset();
  //   //            navigate('/addedFoods')
  //   //         }
  //   // }
  //   // catch(err){
  //   //    console.log(err.message);
  //   // }
  // };
  // const post_time =  Date.now();

  const onSubmit = async (formData) => {
    //  console.log(formData);

    const imageFile = formData.image[0]; // Extract the file from the input
    formData.image = await imageUpload(imageFile);
    formData.price = parseInt(formData.price)
    formData.ingredients = formData.ingredients.split(",");
     
    const post_time = new Date().toLocaleString;
    console.log(post_time)
    const mealInfo = {
      ...formData,
      post_time: Date.now(),
      rating,
       likes: 0,
       reviews: 0,

      admin:{
        name: user?.displayName,
        email: user?.email,
      }
    };
    console.table(mealInfo);

    try{
      const {data} = await axiosSecure.post('/addMeal', mealInfo)
      console.log(data)
      if(data.insertedId){
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your meal item has been added",
          showConfirmButton: false,
          timer: 2000
        });
        setRating(0);
        reset();
      }
    }
    catch(err){
       console.log(err.message)
    }



  
  };

  return (
    <div className="min-h-[calc(100vh-80px)] border-2 border-cyan-300 space-y-7 flex flex-col justify-center">
      <div className="md:p-10 p-6 my-8 xl:w-[70%] w-[90%]  mx-auto border-2 border-cyan-200 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="text-center">
          <h1 className=" md:text-3xl text-2xl coff font-bold merienda text-cyan-600">
            Add a Meal Item
          </h1>
          <hr className="md:w-[240px] w-[195px] mx-auto border-cyan-400" />
          <p className="md:w-3/4 mx-auto  mt-2 text-gray-500 font-semibold tracking-wide md:text-sm  text-xs">
            You can add a meal item that is available in your stock.After adding
            meal, you can find it in{" "}
            <span className="text-cyan-600">All Meals </span>
          </p>
        </div>

        <div className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Field 1 */}
            <div className="flex flex-col md:flex-row justify-between md:gap-4">
              <div className="form-control md:w-1/2 w-full">
                <label className="label">
                  <span className="label-text font-bold text-cyan-600 text-lg">
                    Title
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter meal's title"
                  name="title"
                  {...register("title")}
                  className="block w-full px-4 py-2 text-cyan-700 bg-white border focus:border-cyan-500 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-cyan-300"
                  required
                />
              </div>

              <div className="form-control md:w-1/2 w-full">
                <label className="label">
                  <span className="label-text font-bold text-cyan-600 text-lg">
                    Category
                  </span>
                </label>
                <select
                  name="category"
                  {...register("category")}
                  className="block w-full px-4 py-2 text-cyan-700 bg-white border focus:border-cyan-500 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-cyan-300"
                  required
                >
                  <option value="">Category</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                </select>
              </div>
            </div>

            {/* Field 2 */}
            <div className="flex flex-col md:flex-row justify-between md:gap-4">
              <div className="form-control md:w-1/2 w-full ">
                <label className="label">
                  <span className="label-text font-bold text-cyan-600 text-lg">
                    Image
                  </span>
                </label>
                <input
                  id="image"
                  autoComplete="image"
                  name="image"
                  {...register("image")}
                  type="file"
                  accept="image/*"
                  className="block w-full p-1 text-cyan-700 bg-white border focus:border-cyan-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-cyan-300"
                  required
                />
              </div>

              <div className="form-control md:w-1/2 w-full">
                <label className="label">
                  <span className="label-text font-bold text-cyan-600 text-lg">
                    Price
                  </span>
                </label>
                <input
                  type="number"
                  name="price"
                  {...register("price")}
                  placeholder="Enter meal's price"
                  className="block w-full px-4 py-2 text-cyan-700 bg-white border focus:border-cyan-500 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-cyan-300"
                  required
                />
              </div>
            </div>

            {/* Field 3 */}
            <div className="flex flex-col md:flex-row justify-between md:gap-4">
              <div className="form-control md:w-1/2 w-full">
                <label className="label">
                  <span className="label-text font-bold text-cyan-600 text-lg">
                    Ingredients
                  </span>
                </label>
                <input
                  type="text"
                  // name="ingredients"
                  {...register("ingredients")}
                  placeholder="Example: carrots, broccoli, onion, olive oil etc"
                  className="block w-full px-4 py-2 text-cyan-700 bg-white border focus:border-cyan-500 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-cyan-300"
                  required
                />
              </div>

              <div className="form-control md:w-1/2 w-full">
                <label className="label">
                  <span className="label-text font-bold text-cyan-600 text-lg">
                    Rate Us
                  </span>
                </label>
                <div className="block w-full px-4 py-1.5 text-cyan-700 bg-white border    hover:border-cyan-500 hover:ring-opacity-40  hover:outline-none hover:ring hover:ring-cyan-300 transition duration-500">
                  <Rating
                    style={{ maxWidth: 130 }}
                    value={rating}
                    onChange={setRating}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Field 4 */}
            <div className="flex flex-col md:flex-row justify-between md:gap-4">
              <div className="form-control md:w-1/2 w-full">
                <label className="label">
                  <span className="label-text font-bold text-cyan-600 text-lg">
                    Admin Name
                  </span>
                </label>

                <input
                  type="text"
                  name="userName"
                  disabled={true}
                  className="block w-full px-4 py-2 text-cyan-500 bg-white border font-semibold hover:border-cyan-500 hover:ring-opacity-40  hover:outline-none hover:ring hover:ring-cyan-300 transition duration-500"
                  value={user?.displayName}
                />
              </div>

              {/* User email */}
              <div className="form-control md:w-1/2 w-full">
                <label className="label">
                  <span className="label-text font-bold text-cyan-600 text-lg">
                    Admin Email
                  </span>
                </label>

                <input
                  type="text"
                  name="email"
                  disabled={true}
                  className="block w-full px-4 py-2 text-cyan-500 bg-white border font-semibold hover:border-cyan-500 hover:ring-opacity-40  hover:outline-none hover:ring hover:ring-cyan-300 transition duration-500"
                  value={user?.email}
                />
              </div>
            </div>

            {/*Short description field */}
            <div className="form-control w-">
              <label className="label">
                <span className="label-text font-bold text-cyan-600 text-lg">
                  Description
                </span>
              </label>
              <textarea
                name="description"
                {...register("description")}
                className="block w-full px-4 py-2 text-cyan-700 bg-white border     focus:border-cyan-500 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-cyan-300"
                placeholder="Give a short description of meal item such as making procedure, ingredients etc. within 100-120 words."
                required
              ></textarea>
            </div>

            {/*Add coffee Button */}
            <div className="text-center mt-4">
              <button className="btn md:btn-md btn-sm transition duration-700 text-cyan-600 hover:bg-cyan-500 hover:text-white hover:border-cyan-300  btn-outline font-bold rounded-none text-xl mt-4 md:px-6 px-8">
                Add Meal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFood;

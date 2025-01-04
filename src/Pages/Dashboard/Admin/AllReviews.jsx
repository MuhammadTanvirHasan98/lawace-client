import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import TableHeaderText from "../../../Components/Dashboard/TableHeaderText";
import { RiDeleteBin2Line } from "react-icons/ri";
import LoadingSpinner from "../../../Components/Common/LoadingSpinner";
import { MdOutlinePageview } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const AllReviews = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();


  const {
    data: allReviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/reviews');
      return data;
    },
    enabled: !loading && !!user,
  });

  console.log(allReviews);


  const handleDelete = (id, mealId) => {

    console.log(id, mealId);
    try {
      Swal.fire({
        title: "Are you sure to delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axiosSecure.delete(`/review?id=${id}&mealId=${mealId}`);
           console.log(data)
          if (data.deletedCount > 0) {
            Swal.fire({
              position: "top-middle",
              icon: "success",
              title: "Your review has been deleted successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        }
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] border-2 border-cyan-300 space-y-7">
      <div className="m-2">
        <TableHeaderText text={"All Reviews"} count={allReviews.length} />

        {isLoading || loading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-6">
            <div className=" overflow-x-auto ">
              <div className="inline-block min-w-full py-2 align-middle ">
                <div className="overflow-hidden border border-slate-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-100 text-cyan-600 ">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm  text-left rtl:text-right "
                        >
                          <div className="gap-x-2 min-w-[180px] text-center whitespace-nowrap">
                            <span>Review</span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm  text-center rtl:text-right whitespace-nowrap"
                        >
                          <span>Meal Title</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm  text-center rtl:text-right "
                        >
                          <span>Likes</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm  text-center rtl:text-right "
                        >
                          <span>Review Count</span>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm  text-center rtl:text-right whitespace-nowrap"
                        >
                          Delete
                        </th>

                        <th className="px-4 py-3.5 text-sm  text-center rtl:text-right whitespace-nowrap">
                          View Meal
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200 ">
                      {allReviews.map((review) => (
                        <tr key={review?._id}>
                          {/* Meal title*/}
                          <td className="px-4 py-4 text-sm text-gray-500  w-[180px] text-center">
                            {review?.mealTitle}
                          </td>

                          {/* Meal likes */}
                          <td className="px-4  py-4 text-sm text-gray-500 text-center whitespace-nowrap">
                            {review?.review}
                          </td>

                          {/* Meal review */}
                          <td className="px-4 py-4 text-sm text-gray-500  text-center text-pretty">
                            {review?.mealLikes}
                          </td>

                          {/* Meal likes */}
                          <td className="px-4  py-4 text-sm text-gray-500 text-center whitespace-nowrap">
                            {review?.review_count}
                          </td>


                          {/* Delete button */}
                          <td className="px-4 py-4 text-sm  whitespace-nowrap">
                            <div className="flex justify-center items-center">
                              <button
                                onClick={() => handleDelete(review?._id, review?.mealId)}
                                className="btn btn-sm hover:bg-red-100/80 text-red-500"
                              >
                                <RiDeleteBin2Line className="text-xl " />
                              </button>
                            </div>
                          </td>

                          {/* View meal btn */}
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <Link to={`/mealDetails/${review?.mealId}`}>
                              <div className="flex justify-center  items-center">
                                <button className="btn hover:bg-cyan-100/40  px-2 btn-sm">
                                  <MdOutlinePageview className="text-3xl text-cyan-500" />
                                </button>
                              </div>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReviews;

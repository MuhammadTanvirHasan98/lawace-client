import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import TableHeaderText from "../../../Components/Dashboard/TableHeaderText";
import { RiDeleteBin2Line } from "react-icons/ri";
import LoadingSpinner from "../../../Components/Common/LoadingSpinner";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const RequestedMeals = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: requestedMeals = [], isLoading , refetch} = useQuery({
    queryKey: ["requestedMeals"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/requestedMeals/${user?.email}`);
      return data;
    },
    enabled: !loading && !!user,
  });
  console.log(requestedMeals);

  const handleDelete = (id) => {
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
          const { data } = await axiosSecure.delete(`/requestedMeals/${id}`);
          if (data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your requested meal item has been deleted successfully.",
              icon: "success",
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
        <TableHeaderText
          text={"Your Requested Meals"}
          count={requestedMeals.length}
        />

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
                          <div className="flex items-center gap-x-2">
                            <span>Meal Title</span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm  text-left rtl:text-right "
                        >
                          <span>Likes</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm  text-left rtl:text-right"
                        >
                          <span>Reviews</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm  text-left rtl:text-right "
                        >
                          Status
                        </th>

                        <th className="px-4 py-3.5 text-sm  text-center rtl:text-right ">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200 ">
                      {requestedMeals.map((meal) => (
                        <tr key={meal?._id}>
                          {/* Meal Title */}
                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            {meal?.title}
                          </td>

                          {/* Meal Likes */}
                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            {meal?.likes}
                          </td>

                          {/* Meal Reviews */}
                          <td className="px-4 pl-8 py-4 text-sm text-gray-500  whitespace-nowrap">
                            {meal?.reviews}
                          </td>

                          {/* Meal status */}
                          <td className="px-4  text-sm whitespace-nowrap">
                            <div
                              className={`inline-flex items-center px-3 py-1 rounded-lg gap-x-2 
                            ${
                              meal?.status === "Pending" &&
                              "bg-orange-100/60 text-orange-400"
                            }
                            ${
                              meal?.status === "Served" &&
                              "bg-blue-100/60 text-blue-500"
                            }
                             `}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full
                               ${meal?.status === "Pending" && "bg-orange-400"}
                               ${
                                 meal?.status === "Served" && "bg-blue-500"
                               }`}
                              ></span>
                              <h2 className="text-sm font-normal ">
                                {meal?.status}
                              </h2>
                            </div>
                          </td>

                          {/* Action button */}
                          <td className="px-4 py-4 text-sm flex justify-center whitespace-nowrap">
                            <button
                              onClick={() => handleDelete(meal?._id)}
                              disabled={meal?.status === "Served"}
                              className="btn btn-sm hover:bg-red-100/80 text-red-500"
                            >
                              <RiDeleteBin2Line className="text-xl " />
                            </button>
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

export default RequestedMeals;

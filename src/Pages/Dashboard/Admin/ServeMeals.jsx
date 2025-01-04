import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import TableHeaderText from "../../../Components/Dashboard/TableHeaderText";
import LoadingSpinner from "../../../Components/Common/LoadingSpinner";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ServeMeals = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: requestedMeals = [], isLoading , refetch} = useQuery({
    queryKey: ["requestedMeals"],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/requestedMeals');
      return data;
    },
    enabled: !loading && !!user,
  });
  console.log(requestedMeals);

  const handleServeMeal = async(id) => {

     console.log(id);
    try {
     
          const { data } = await axiosSecure.patch(`/serveMeal/${id}`);
          console.log(data);

          if(data?.modifiedCount>0){
            Swal.fire({
              title: "Served Meal",
              text: "Your meal has been served successfully",
              icon: "success",
            });
             refetch();
          }
      
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] border-2 border-cyan-300 space-y-7">
      <div className="m-2">
        <TableHeaderText
          text={"All Requested Meals"}
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
                          <div className="flex items-center gap-x-2 whitespace-nowrap">
                            <span>Meal Title</span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm  text-left rtl:text-right whitespace-nowrap"
                        >
                          <span>User Name</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm  text-left rtl:text-right whitespace-nowrap"
                        >
                          <span>User Email</span>
                        </th>


                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm  text-left rtl:text-right whitespace-nowrap"
                        >
                          <span>Status</span>
                        </th>


                        <th className="px-4 py-3.5 text-sm  text-center rtl:text-right ">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200 ">
                      {requestedMeals.map((meal) => (
                        <tr key={meal?._id}>
                          {/* Food Name */}
                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            {meal?.title}
                          </td>

                          {/* Food Category */}
                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            {meal?.userInfo?.name}
                          </td>

                          {/* Food Origin */}
                          <td className="px-4  py-4 text-sm text-gray-500  whitespace-nowrap">
                           {meal?.userInfo?.email}
                          </td>


                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
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
                              onClick={() => handleServeMeal(meal?._id)}
                              disabled={meal?.status === 'Served'}
                              className="btn btn-sm hover:bg-blue-100 text-blue-600"
                            >
                              Serve Meal
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

export default ServeMeals;

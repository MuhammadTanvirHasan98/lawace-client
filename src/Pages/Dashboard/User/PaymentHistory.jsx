import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import TableHeaderText from "../../../Components/Dashboard/TableHeaderText";
import LoadingSpinner from "../../../Components/Common/LoadingSpinner";
import EmptyStateText from "../../../Components/Common/EmptyStateText";

const PaymentHistory = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: paymentHistory = [], isLoading } = useQuery({
    queryKey: ["requestedMeals"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/paymentHistory/${user?.email}`);
      return data;
    },
    enabled: !loading && !!user,
  });
  console.log(paymentHistory);


  return (
    <div className="min-h-[calc(100vh-80px)] border-2 border-cyan-300 space-y-7">
      <div className="m-2">
        <TableHeaderText
          text={"Your Payment History"}
          count={paymentHistory.length}
        />

        {  isLoading || loading ? (
          <LoadingSpinner />
        ) : paymentHistory.length === 0 ?
         (<EmptyStateText text={`You didn't purchase any package yet.`} /> ) : (
          <div className="mt-6">
            <div className=" overflow-x-auto ">
              <div className="inline-block min-w-full py-2 align-middle ">
                <div className="overflow-hidden border border-slate-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-100 text-cyan-600 ">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm text-center rtl:text-right "
                        >
                          <div className="flex items-center gap-x-2 whitespace-nowrap ">
                            <p>Plan Name</p>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm  text-left rtl:text-right whitespace-nowrap "
                        >
                          <span>Price</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm  text-left rtl:text-right whitespace-nowrap"
                        >
                          <span>Email</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm  text-left rtl:text-right whitespace-nowrap "
                        >
                          Transaction ID
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200 ">
                      {paymentHistory.map((pay) => (
                        <tr key={pay?._id}>
                          {/* plan name */}
                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            {pay?.plan}
                          </td>

                          {/* Price */}
                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            {pay?.price}
                          </td>

                          {/* Food Origin */}
                          <td className="px-4  py-4 text-sm text-gray-500  whitespace-nowrap">
                            {pay?.user_email}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            {pay?.transactionId
}
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

export default PaymentHistory;

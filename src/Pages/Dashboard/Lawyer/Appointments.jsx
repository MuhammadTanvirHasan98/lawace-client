import React from "react";
import TableHeaderText from "../../../Components/Dashboard/TableHeaderText";
import LoadingSpinner from "../../../Components/Common/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

function Appointments() {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const {
    data: appointments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/appointments/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  console.log(appointments);

  return (
    <div>
      {" "}
      <div className="min-h-[calc(100vh-80px)] border-2 border-cyan-300 space-y-7">
        <div className="m-2">
          <TableHeaderText
            text={"All Appointments"}
            count={appointments.length}
          />

          {isLoading || loading ? (
            <LoadingSpinner />
          ) : (
            <div className="mt-6">
              <div className=" overflow-x-auto ">
                <div className="inline-block min-w-full py-2 align-middle ">
                  {appointments.map((app) => (
                    <div
                      key={app?._id}
                      className="overflow-hidden border border-slate-200 p-4 mb-2"
                    >
                      <div>
                        <h3>Name: {app?.userName}</h3>
                        <p>Email: {app?.email}</p>
                        <p>Subject: {app?.subject}</p>
                        <p>
                          Message: Professionally visualize B2C services for
                          market-driven functionalities. Seamlessly generate
                          maintainable web services for adaptive interfaces.
                          Assertively morph wireless ideas.
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p>Consultation Type: Online</p>
                        <div className="flex gap-2 items-center">
                          <p>Status: pending</p>
                          <button className="btn btn-sm btn-outline">
                            Approval
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Appointments;

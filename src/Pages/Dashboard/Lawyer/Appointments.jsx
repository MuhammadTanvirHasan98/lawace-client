import React from "react";
import TableHeaderText from "../../../Components/Dashboard/TableHeaderText";
import LoadingSpinner from "../../../Components/Common/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

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

  const handleApprove = async (id, app) => {
    console.log({ id, app });

    try {
      const { data } = await axiosSecure.patch(`/appointment/${id}`, app);
      console.log(data);
      if (data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You have approved appointment successfully!.",
          showConfirmButton: false,
          timer: 2000,
        });
        refetch();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

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
                      className="overflow-hidden border space-y-2 border-slate-200 p-4 mb-2"
                    >
                      <div>
                        <h3>Name: {app?.userName}</h3>
                        <p>Email: {app?.userEmail}</p>
                        <p>Subject: {app?.subject}</p>
                        <p>Message: {app?.message}</p>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p>Consultation Type: {app?.consultationType}</p>
                          <p>Attached Documents:{app?.documentUrl}</p>
                        </div>

                        <div className="flex gap-2 items-center">
                          <p>Status: {app?.status}</p>
                          <button
                            onClick={() => handleApprove(app?._id, app)}
                            className="btn btn-sm btn-outline"
                          >
                            Give Approval
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

import LoadingSpinner from "../../../Components/Common/LoadingSpinner";
import useAuth from "../../../Hooks/useAuth";
import useProfile from "../../../Hooks/useProfile";
import useRole from "../../../Hooks/useRole";

const UserProfile = () => {
  const { profile, isLoading } = useProfile();
  const { user, loading } = useAuth();
  console.log(profile, isLoading);
  const [role] = useRole();

  return (
    <div>
      <div>
        <div>
          {isLoading || loading ? (
            <>
              <LoadingSpinner />
            </>
          ) : (
            <>
              <div className="min-h-[calc(100vh-80px)] flex flex-col  border-2 border-cyan-300 items-center space-y-7 py-10">
                <div>
                  <p className="text-3xl font-semibold text-cyan-600">
                    Your Profile Info
                  </p>
                  <hr className="border-2  border-cyan-100 w-[220px]" />
                </div>

                <div className="lg:w-[50%] w-[80%] md:p-10  py-10 p-5 space-y-2 border-2 flex flex-col justify-center items-center bg-gradient-to-t from-blue-200 to-cyan-100 ">
                  {/* Profile image */}
                  <img
                    src={user?.photoURL}
                    className="w-40 h-40 rounded-full border-4 border-blue-300 p-2"
                    alt="user-image"
                  />

                  {/* Profile info */}
                  <div className="text-center font-semibold md:text-lg">
                    <p> {profile?.name}</p>
                    <p>{profile?.email}</p>
                    {!role == "admin" && (
                      <p>
                        Badge:{" "}
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-lg gap-x-2 mt-2
                             ${
                               profile?.badge === "Bronze" &&
                               "bg-[#ffdebc47] text-[#CD7F32]"
                             }
                            ${
                              profile?.badge === "Silver" &&
                              "bg-cyan-100/60 text-cyan-500"
                            }
                            ${
                              profile?.badge === "Gold" &&
                              "bg-yellow-100/60 text-yellow-500"
                            }
                            ${
                              profile?.badge === "Platinum" &&
                              "bg-blue-100/70 text-blue-600"
                            }
                             `}
                        >
                          <p>{profile?.badge}</p>
                        </div>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

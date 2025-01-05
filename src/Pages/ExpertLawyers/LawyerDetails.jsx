import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Phone, Mail, Scale, ScrollText, Share2, Star } from "lucide-react";
import PageHeader from "../../Components/Common/PageHeader";
import LoadingSpinner from "../../Components/Common/LoadingSpinner";

function LawyerDetails() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: lawyer = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["lawyer-details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/lawyer/${id}`);
      return data;
    },
    enabled: !!id,
  });

  const {
    _id,
    lawyer_image,
    lawyer_email,
    lawyer_name,
    category,
    phone,
    professional_info,
    qualification,
    rating,
    experience,
  } = lawyer;

  console.log({ id, lawyer });
  return (
    <div>
      <PageHeader
        title={"Lawyer Details"}
        track={"Home > Expert Lawyers > Lawyer Details"}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-6xl  mx-auto p-6">
          <div className="flex flex-col md:flex-row my-32 gap-8">
            {/* Profile Image Section */}
            <div className="md:w-1/3 relative">
              <img
                src={lawyer_image}
                alt="lawyer_image"
                className="w-full rounded-2xl object-cover aspect-[3/4]"
              />
              <div className="absolute bottom-4 right-4 bg-white text-[#B08968]  rounded-lg  hover:bg-[#003B4F] flex items-center px-3 gap-1  transition-colors">
                <Star /> <p className="text-2xl font-semibold">{rating}</p>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-2/3">
              <div className="space-y-4">
                <h2 className="text-[#B08968] font-medium tracking-wide uppercase">
                  {category} Lawyer
                </h2>

                <h1 className="text-4xl md:text-5xl font-bold text-[#002B3B]">
                  {lawyer_name}
                </h1>

                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>{professional_info}</p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                  {/* Phone */}
                  <div className="flex items-center gap-4">
                    <div className="bg-[#B08968] p-4 rounded-lg">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone :</p>
                      <p className="font-medium text-[#002B3B]">{phone}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="bg-[#B08968] p-4 rounded-lg">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email :</p>
                      <p className="font-medium text-[#002B3B]">
                        [ {lawyer_email} ]
                      </p>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="flex items-center gap-4">
                    <div className="bg-[#B08968] p-4 rounded-lg">
                      <Scale className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Experience :</p>
                      <p className="font-medium text-[#002B3B]">
                        {experience} Years
                      </p>
                    </div>
                  </div>

                  {/* Qualification */}
                  <div className="flex items-center gap-4">
                    <div className="bg-[#B08968] p-4 rounded-lg">
                      <ScrollText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Qualification :</p>
                      <p className="font-medium text-[#002B3B]">
                        {qualification}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Get appointment button */}
                <div>
                  <button className="btn mt-4 btn-outline">
                    GET A APPOINTMENT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LawyerDetails;

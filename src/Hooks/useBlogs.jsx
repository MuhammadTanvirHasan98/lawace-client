import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useBlogs = (search = "") => {
  const axiosPublic = useAxiosPublic();

  const { data: allBlogs = [], isLoading } = useQuery({
    queryKey: ["allBlogs", search],
    queryFn: async () => {
      const res = await axiosPublic.get("/allBlogs", {
        params: {
          search,
        },
      });
      if (res.status === 204) {
        return []; // Return empty array if no content
      }
      return res.data;
    },
    enabled: true, // Always fetch regardless of filters
  });

  return [allBlogs, isLoading];
};

export default useBlogs;

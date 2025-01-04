import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
import blog1 from "../../../assets/images/blog-img1.jpg";
import blog2 from "../../../assets/images/blog-img2.jpg";
import blog3 from "../../../assets/images/blog-img3.jpg";

export default function BlogSection() {
  const blogs = [
    {
      date: "7 June 2024",
      title: "Proven legal tactics for effective representation.",
      description:
        "Fusce elementum nibh, quis suscipit quam venenatis eget. Donec ut egestas nunc. Proin convallis velit purus, quis sollicitudin dolor vehicula ac.",
      image: blog1,
    },
    {
      date: "7 June 2024",
      title: "Defending your rights by expert guidance.",
      description:
        "Fusce elementum nibh, quis suscipit quam venenatis eget. Donec ut egestas nunc. Proin convallis velit purus, quis sollicitudin dolor vehicula ac.",
      image: blog2,
    },
    {
      date: "7 June 2024",
      title: "Development Violence in California a Lawyer Can Help.",
      description:
        "Fusce elementum nibh, quis suscipit quam venenatis eget. Donec ut egestas nunc. Proin convallis velit purus, quis sollicitudin dolor vehicula ac.",
      image: blog3,
    },
  ];

  return (
    <section className="py-16 px-4 mt-32">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#C19A5B] font-medium mb-2 block">
            OUR BLOG
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#002626]">
            Explore Our Latest Blog
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <article
              key={index}
              className="bg-white rounded-lg overflow-hidden group"
            >
              {/* Image Container */}
              <div className="relative w-full overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="object-cover w-full h-[300px] transition-transform duration-300 group-hover:scale-105 "
                />
              </div>

              {/* Content */}
              <div className="space-y-4 relative">
                <div className="flex items-center absolute bg-white p-2 rounded-tr-xl bottom-[200px] gap-2 text-gray-500 text-sm">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{blog.date}</span>
                </div>

                <h3 className="text-xl font-bold text-[#002626] line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-gray-600 line-clamp-3">{blog.description}</p>

                <Link
                  href="#"
                  className="inline-flex items-center text-[#C19A5B] hover:text-[#A88347] transition-colors group"
                >
                  <span className="font-medium">DISCOVER MORE</span>
                  <GoArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

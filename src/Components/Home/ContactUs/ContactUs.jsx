import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="container  mx-auto px-4 py-12 max-w-7xl">
      <div className="my-32">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-[#C08D5D] font-medium">CONTACT US</h3>
              <h1 className="text-4xl md:text-5xl font-bold text-[#002139]">
                Get In Touch Now
              </h1>
            </div>

            <div className="space-y-6">
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="p-4 bg-[#C08D5D] rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Location</h3>
                  <p className="text-gray-600">
                    24 Parkland Rd, Osborne Park WA 6017
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-4 bg-[#C08D5D] rounded-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Email Address</h3>
                  <p className="text-gray-600">support@lawace.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-4 bg-[#C08D5D] rounded-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Phone No.</h3>
                  <p className="text-gray-600">+91 987 9874 987</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <p className="text-gray-600 mb-8">
              * Call us 24/7 at 869-5414-5 or fill out the form below to receive
              a free and confidential initial consultation.
            </p>

            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name*"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C08D5D] focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name*"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C08D5D] focus:border-transparent"
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email Address*"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C08D5D] focus:border-transparent"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone No.*"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C08D5D] focus:border-transparent"
                  required
                />
              </div>
              <textarea
                placeholder="Message..."
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C08D5D] focus:border-transparent"
              ></textarea>

              <button
                type="submit"
                className="bg-[#C08D5D] text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-[#A77B4F] transition-colors"
              >
                SUBMIT NOW
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

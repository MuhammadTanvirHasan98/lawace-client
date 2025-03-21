import { GoArrowRight } from "react-icons/go";
import Img from "../../../assets/images/about-img.jpg";

function AboutUsSection() {
  return (
    <div className="w-[70%] mx-auto my-32">
      <div className="flex justify-between">
        {/* Right section */}
        <div className="relative w-1/2">
          <img src={Img} className="rounded-2xl" alt="" />
          <div className="absolute top-60 right-10 p-10 bg-[#C19A5B] text-white border-white rounded-full border-[20px] py-16">
            <p className="text-2xl text-center font-semibold">
              584+ <br />
              Case Solved
            </p>
          </div>
        </div>

        {/*Left section */}
        <div className="w-1/2 py-10 space-y-8">
          <p className="text-2xl font-bold text-[#C19A5B]">About Us</p>
          <h3 className="text-7xl font-bold">We Give Justice To The Truth</h3>
          <p>
            Aliquam eu nunc imperdiet, volutpat mi vel, lobortis ligula. In
            pharetra dignissim lacus, faucibus volutpat lorem suscipit nec. Nunc
            fringilla arcu eu massa ornare pharetra. Etiam consectetur molestie
            purus, sed auctor felis blandit eget. Suspendisse vitae molestie
            est, et blandit felis.
          </p>

          <div className="space-y-4">
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" checked="checked" />
              <div className="collapse-title text-xl font-medium">
                Our Mission
                <hr className="mt-2" />
              </div>
              <div className="collapse-content">
                <p>
                  Etiam id justo vitae lacus hendrerit ornare sit amet in justo.
                  Donec non felis tempus augue malesuada viverra sagittis
                  accumsan nisl.
                </p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                Our Vision
                <hr className="mt-2" />
              </div>
              <div className="collapse-content">
                <p>
                  Etiam id justo vitae lacus hendrerit ornare sit amet in justo.
                  Donec non felis tempus augue malesuada viverra sagittis
                  accumsan nisl.
                </p>
              </div>
            </div>
          </div>

          <div>
            <button className="flex items-center gap-2 bg-[#C19A5B] text-white px-6 py-3 rounded-full hover:bg-[#000000] transition-colors font-semibold">
              MORE ABOUT US
              <GoArrowRight className="w-6 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsSection;

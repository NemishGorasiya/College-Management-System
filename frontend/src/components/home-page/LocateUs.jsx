import { FaMapLocationDot } from "react-icons/fa6";
import Footer from "./Footer";

export default function LocateUs() {
  return (
    <div
      id="locate-us"
      name="locate-us"
      className="bg-white rounded-lg p-2 mt-[2rem] mb-[5rem]"
    >
      <h3 className="text-[2rem] font-bold text-purple-600 hover:underline hover:text-purple-900 transition-all mb-5 flex gap-5 items-center">
        <FaMapLocationDot className="inline-block" />
        Locate Us
      </h3>

      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720.3759909640457!2d72.54438849046927!3d23.03345892723034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84eaf57ac615%3A0x5c7498bb96b34c97!2sLalbhai%20Dalpatbhai%20College%20of%20Engineering!5e1!3m2!1sen!2sin!4v1713614314035!5m2!1sen!2sin"
          height="400"
          style={{ border: "0", width: "100%" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <Footer />
    </div>
  );
}

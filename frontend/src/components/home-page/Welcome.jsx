import { SiWelcometothejungle } from "react-icons/si";

export default function Welcome() {
  return (
    <div name="about" id="about" className="bg-white rounded-lg p-2">
      <h3 className="text-[2rem] font-bold text-purple-600 hover:underline hover:text-purple-900 transition-all mb-5 flex gap-5 items-center">
        <SiWelcometothejungle className="inline-block" />
        Welcome to L.D. College of Engineering
      </h3>

      <div className="flex flex-col gap-3 border-l-4 border-l-stone-900 px-[2rem]">
        <p className=" text-justify text-lg font-semibold">
          L.D. College of Engineering is a premier engineering college in Gujarat, India. It is affiliated with Gujarat Technological University (GTU), Ahmedabad. The college is located in Ahmedabad, Gujarat.
        </p>
        <p className=" text-justify text-lg font-semibold">
          The college was established in 1948. It is one of the oldest engineering institutions in Gujarat. The college offers undergraduate and postgraduate programs in engineering and technology. The college has a strong faculty and infrastructure to support the academic and research activities of the students.
        </p>

        <p className=" text-justify text-lg font-semibold">
          The college has a strong industry-academia interface. The college has tie-ups with leading industries and research organizations to provide hands-on training and research opportunities to the students. The college has a strong placement record with leading companies visiting the campus for recruitment.
        </p>

        <p className=" text-justify text-lg font-semibold">
          The college has a strong alumni network with alumni working in leading companies and research organizations across the globe. The college has a strong research culture with faculty and students engaged in cutting-edge research in various fields of engineering and technology.
        </p>

        <p className=" text-justify text-lg font-semibold">
          The college has a strong focus on innovation and entrepreneurship. The college has a dedicated innovation and entrepreneurship cell to support students in developing innovative ideas and starting their own ventures.
        </p>
      </div>
    </div >
  )
}
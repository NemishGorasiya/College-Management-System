import { SiPrivatedivision } from "react-icons/si";
import { GiSwissArmyKnife } from "react-icons/gi";

export default function VisionMission() {
  return (
    <>

      <div className="bg-white rounded-lg p-2 my-[2rem]">
        <h3 className="text-[2rem] font-bold text-purple-600 hover:underline hover:text-purple-900 transition-all mb-5 flex gap-5 items-center">
          <SiPrivatedivision className="inline-block" />
          Vision
        </h3>

        <ul className="flex flex-col gap-3 border-l-4 border-l-stone-900 px-[2rem]">
          <li className=" text-justify text-lg font-semibold">
            To contribute for sustainable development of nation through achieving excellence in technical education and research while facilitating transformation of students into responsible citizens and competent professionals.
          </li>
        </ul>
      </div >

      <div className="bg-white rounded-lg p-2 my-[2rem]">
        <h3 className="text-[2rem] font-bold text-purple-600 hover:underline hover:text-purple-900 transition-all mb-5 flex gap-5 items-center">
          <GiSwissArmyKnife className="inline-block" />
          Mission
        </h3>

        <ul className="flex flex-col gap-3 border-l-4 border-l-stone-900 px-[2rem]">
          <li className=" text-justify text-lg font-semibold">
            To impart affordable and quality education in order to meet the needs of industries and achieve excellence in the teaching-learning process.
          </li>
          <li className=" text-justify text-lg font-semibold">
            To create a conducive research ambiance that drives innovation and nurtures research-oriented scholars and outstanding professionals.
          </li>
          <li className=" text-justify text-lg font-semibold">
            To collaborate with other academic & research institutes as well as industries in order to strengthen education and multidisciplinary research.
          </li>
          <li className=" text-justify text-lg font-semibold">
            To promote equitable and harmonious growth of students, academicians, staff, society, and industries, thereby becoming a center of excellence in technical education.
          </li>
          <li className=" text-justify text-lg font-semibold">
            To practice and encourage high standards of professional ethics, transparency, and accountability.
          </li>
        </ul>
      </div >
    </>
  );
}
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { GiAchievement } from "react-icons/gi";
import { A11y, Mousewheel, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";

export default function Achievements() {

  const achievementsSlides = [
    {
      title: "Two BE programs- IC and Chemical Engineering received NBA re-accreditation for the three years(June 2027)",
      date: "28 Mar, 2024",
      by: "LDCE",
      paragraph_text: "Proud moment for L.D. College of Engineering as both Chemical Engineering and IC departments received NBA accreditation until June 2027."
    },
    {
      title: "Patent Secured. We are happy to share that patent filled by Rubber department has been granted",
      date: "01 Mar, 2024",
      by: "LDCE",
      paragraph_text: "Patent Secured! Innovation recognized and protected! LDCE congratulates to Dr. Rupande Desai, Head of Rubber Technology, Prof. Sunil Padhiyar, Asst. Prof. in Rubber Technology, and Akash Limbani, Student of M.E. in Rubber Technology, on this significant achievement! The team's invention 'IONIC LIQUID APPLICATION AS CURATIVE FOR UNSATURATED RUBBER' has been granted a patent for 20 years starting from December 20, 2019. This milestone not only signifies a remarkable accomplishment but also reflects your dedication and perseverance!"
    },
    {
      title: "LDCE is delighted to share that NBA has accredited Computer Engineering and Rubber Technology undergraduate program for three years (upto June 2026).",
      date: "03 Apr, 2023",
      by: "LDCE",
      paragraph_text: "LDCE is delighted to share that NBA has accredited Computer Engineering and Rubber Technology undergraduate program for three years (upto June 2026)."
    },
    {
      title: "Three under graduate(B.E.) programs of LDCE- Civil, Electrical and Mechanical Engineering accredited by NBA for the three years(upto June 2025)",
      date: "08 Aug, 2022",
      by: "LDCE",
      paragraph_text: "Three under graduate(B.E.) programs of LDCE- Civil, Electrical and Mechanical Engineering accredited by NBA for the three years(upto June 2025)"
    },
    {
      title: "LDCE secured the first position in the Gujarat Samachar INT drama competition and our student Monit Pal won 2nd prize for Best Actor",
      date: "04 Mar, 2022",
      by: "LDCE",
      paragraph_text: "LDCE secured first position in Gujarat Samachar INT drama competition and our student Monit Pal won 2nd prize for Best Actor"
    },
    {
      title: "Chemical and Instrumentation & Control engineering department accredited by NBA.",
      date: "04 Oct, 2021",
      by: "LDCE",
      paragraph_text: "Chemical and Instrumentation & Control engineering department accredited by NBA."
    },
    {
      title: "Roshan Rawal, Computer Engineering Student, LDCE received Best Student Startup award at GTU Convocation,2020",
      date: "13 Jan, 2020",
      by: "LDCE",
      paragraph_text: "Roshan Rawal, Computer Engineering Student, LDCE received Best Student Startup award of graduating batch 2019 for his startup EXPOSIT at GTU Annual Convocation,2020"
    },
    {
      title: "Team Robocon LDCE stood 2nd runners-up in ROBOMINTON",
      date: "07 Mar, 2015",
      by: "Team Robocon LDCE",
      paragraph_text: "Team Robocon LDCE stood 2nd runners-up among top 84 colleges of India in the Robocon National Contest 2015-ROBOMINTON held from 5-7 March at Balewadi Stadium, Pune. Robocon is an international level robotics competition participated by engineering students across the world."
    },
    {
      title: "i-SCALE award from GTU to the students for leadership & excellence",
      date: "14 Feb, 2016",
      by: "LDCE",
      paragraph_text: "Nilesh Dwivedi & Vishal Parekh, students of BE Computer Engineering won the 'Innovative Students’ Co-Creation Awards for Leadership and Excellence (i-SCALE)' for their remarkable efforts towards a competitive coding portal 'CodingHeaven'. CodingHeaven is to create awareness in students of India about Competitive Programming and to develop their skills so that India can come up with great coding talent and can compete with the top programmers of the world. It will help to take India to the next level of competitive coding and CodingHeaven will be the single place for every talented problem solver in the world to hang out. This Platform will hone the skills of programmers and companies can recruit great tech talent easily."
    },
    {
      title: "i-SCALE award from GTU to the students for leadership & excellence",
      date: "27 Mar, 2018",
      by: "LDCE",
      paragraph_text: "Dhanik Gohel, Student of B.E. Mechanical Engineering Department Won GTU's Prestigious 'Innovative Students' Co-Creation Award for Leadership and Excellence (i-SCALE)' for his remarkable efforts towards founding & organizing 'Sahitya Sarita: A Gujarati Literature Festival' Which was first of this kind Literature festival dedicated only for engineering students in the history of engineering field in Gujarat state."
    },
  ]

  return (
    <div name="achievements" id="achievements" className="bg-white rounded-lg p-2 my-[2rem]">
      <h3 className="text-[2rem] font-bold text-purple-600 hover:underline hover:text-purple-900 transition-all mb-5 flex gap-5 items-center">
        <GiAchievement className="inline-block" />
        Achievements
      </h3>

      <Swiper
        modules={[Navigation, Mousewheel, A11y]}
        spaceBetween={50}
        slidesPerView={4}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation
        loop={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        keyboard={{ enabled: true }}
        mousewheel={{ forceToAxis: true }}
        className="mySwiper px-[3rem]"
      >
        {achievementsSlides.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <AchievementSlide key={index} item={item} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

function AchievementSlide({ item }) {
  const [opened, setOpened] = useState(false)

  return (
    <div className="bg-white rounded-lg p-2 my-[2rem] border-2 border-stone-800">
      <h3 className="text-2xl font-bold text-purple-600  hover:text-purple-700 transition-all mb-5">
        {item.title}
      </h3>
      <p className="text-[1rem] font-semibold text-gray-600">{item.date}</p>
      <p className="text-[1rem] font-semibold text-gray-600">{item.by}</p>
      <p className="text-justify text-lg font-semibold">
        {(opened === true) ? item.paragraph_text : item.paragraph_text.slice(0, 200) + "..."}
        <button onClick={() => setOpened(!opened)} className="text-blue-500 hover:text-blue-700 transition-all">{opened ? "Read Less" : "Read More"}</button>
      </p>
    </div>
  );
}
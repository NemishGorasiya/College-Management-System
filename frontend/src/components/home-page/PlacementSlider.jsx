import { MdHomeWork } from "react-icons/md";
import { A11y, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function PlacementSlider() {
  const placementCompanySlides = [
    {
      name: "Wipro",
      fileName: "wipro.png",
    },
    {
      name: "Welspun",
      fileName: "welspun.png",
    },
    {
      name: "Thomson Reuters",
      fileName: "thomson-reuters.png",
    },
    {
      name: "Accenture",
      fileName: "accenture.png",
    },
    {
      name: "Cybage",
      fileName: "cybage.png",
    },
    {
      name: "IBM",
      fileName: "ibm.png",
    },
    {
      name: "Kivi Technologies",
      fileName: "kivi-technologies.png",
    },
    {
      name: "Searce",
      fileName: "searce.png",
    },
  ];

  return (
    <div
      id="placements"
      name="placements"
      className="bg-white rounded-lg p-2 my-[2rem]"
    >
      <h3 className="text-[2rem] font-bold text-purple-600 hover:underline hover:text-purple-900 transition-all mb-5 flex gap-5 items-center">
        <MdHomeWork className="inline-block" />
        Visiting Companies for Placement
      </h3>

      <Swiper
        modules={[Mousewheel, A11y]}
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
        {placementCompanySlides.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-lg p-2 my-[2rem] border-2 border-stone-800 flex flex-col items-center justify-center">
                <img
                  src={`https://ldce.ac.in/upload/logo/company/${item.fileName}`}
                  alt={item.name}
                  className="w-[50%] object-cover"
                  style={{ maxHeight: "500px" }}
                />
                <p className="text-center text-lg font-semibold">{item.name}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

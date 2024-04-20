import { A11y, Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";

import hustler from "../../assets/hustle.png";

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/mousewheel';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function PhotoSwiper() {

  const imgList = [
    {
      link: hustler,
      alt: "L.D. College Of Engineering"
    },
    {
      link: "https://ldce.ac.in/img/sliders/sahyog-2022-oPfQUe.jpeg",
      alt: "Sahyog-2022"
    },
    {
      link: "https://ldce.ac.in/img/sliders/sahitya-sarita-a-literature-fest-t3vvUN.jpg",
      alt: "Sahitya Sarita"
    },
    {
      link: "https://ldce.ac.in/img/sliders/safeguard-your-future-gIe02l.jpg",
      alt: "Safeguard Your Future"
    },
    {
      link: "https://ldce.ac.in/img/sliders/mera-pehla-vote-desh-ke-liye-JykUtd.jpg",
      alt: "Mera Pehla Vote Desh Ke Liye"
    },
    {
      link: "https://ldce.ac.in/img/sliders/ldite-shri-sandeep-engineer-stands-on-forbes-indias-richest-list-2022-YRSKen.jpg",
      alt: "Shri Sandeep Engineer Stands On Forbes India's Richest List 2022"
    },
    {
      link: "https://ldce.ac.in/img/sliders/ldce-won-the-national-award-for-an-outstanding-engineering-institute-hTq5wK.jpeg"
      , alt: "LDCE Won The National Award For An Outstanding Engineering Institute"
    }
  ]

  return (
    <div className='m-[3rem]' style={{ userSelect: false }}>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, A11y, Mousewheel, Keyboard]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          enabled: true,
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        mousewheel // enable mouse wheel control
        keyboard // enable keyboard control
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        onSwiper={(swiper) => console.log(swiper)}
        className='p-10'
      >
        {
          imgList.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={item.link} alt={item.alt} className="w-full object-cover" style={{ maxHeight: '500px' }} />
                <p className="text-center text-lg font-semibold">{item.alt}</p>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  )
}
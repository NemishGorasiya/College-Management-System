import Content from "./Content";
import PhotoSwiper from "./PhotoSwiper";

export default function HomePage() {
  return (
    <div style={{ overflow: 'auto' }} className="h-[100vh]" >
      <PhotoSwiper />
      <Content />
    </div >
  );
}
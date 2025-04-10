import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"

import { useEffect, useState } from "react"

import "swiper/css"
import styles from "./Slider.module.scss"

import { imgSliders } from "../../consts/consts"

function Slider() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className='container'>
      <div className={styles.wrapper}>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          speed={600}
          loopAdditionalSlides={1}
          resistanceRatio={0}
        >
          {imgSliders.map((el, ind) => (
            <SwiperSlide key={ind}>
              <img src={el} alt='el' />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Slider

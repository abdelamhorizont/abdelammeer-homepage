import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper';

// import './content.scss'
import 'swiper/css'
// import 'swiper/scss/navigation';
// import 'swiper/scss/pagination';

const ImageSection = ({ content, type, columnStart, columnEnd }) => {
  // const [imgClick, setimgClick] = useState(false)
  // const [index, setindex] = useState()

  // function handleClick(i) {
  //   setimgClick(true)
  //   setindex(i)
  // }

  // const [swiper, setSwiper] = useState(null);
  // const slideTo = (index) => swiper.slideTo(index);

  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)

  const gridCols = {
    gridColumn: columnStart + "/" + (columnEnd)
  }

  const gridColsFallback = {
    gridColumn: "span 12"
  }


  return (
    <div style={columnStart ? gridCols : gridColsFallback} className={`html-content`}>
      <div className="image-section">

        {
          type == "iframe" ?
            // content?.iframe != null ?
            <iframe src={content.iframe} frameborder="100px"></iframe>
            :
            // type == "video" ?
            content?.videoFile != null ?
            <div className="video-section">
              <video key={content?.videoFile?.publicURL} muted autoPlay loop webkit-playsinline="true" playsInline>
                <source src={content?.videoFile?.publicURL} type="video/mp4" />
              </video> 
            </div>
            :
            // type == "image" ?
            content?.fallbackImage != null ?
              <GatsbyImage image={getImage(content?.fallbackImage)} alt={''} />
            :
                type == "grid" ?
                  content?.images?.map((image) => {
                    const myimage = getImage(image?.image?.image)

                    return (
                      // <div onClick={() => handleClick(i)}>
                      <div>
                        <GatsbyImage image={myimage} alt={''} />
                        <p className="caption">{image?.image?.caption}</p>
                      </div>
                    )
                  })
                  :
                  type == "carousel" &&
                  // <div onClick={() => handleClick(i)}>
                  <Swiper
                    // onSwiper={(swiper) => swiper.slideTo(index)}
                    modules={[Navigation]}
                    navigation={{
                      nextEl: navigationNextRef.current,
                      prevEl: navigationPrevRef.current
                    }}
                    onBeforeInit={(swiper) => {
                      swiper.params.navigation.nextEl = navigationNextRef.current;
                      swiper.params.navigation.prevEl = navigationPrevRef.current;
                    }}
                    loop
                    initialSlide={0}
                    spaceBetween={0}
                    slidesPerView={'auto'}
                    // centeredSlides
                    className="swiper"
                  // onClick={() => setimgClick(false)}
                  >

                    {
                      content?.map((image) => {
                        const myimg = getImage(image.imageFile)

                        return (
                          <SwiperSlide className="swiper-slide" >
                            <GatsbyImage
                              image={myimg}
                              alt={''}
                              // style={{ height: '100%' }}
                              className="swiper-img"
                            />
                          </SwiperSlide>

                        )
                      })
                    }

                    <div className="swiper-buttons">
                      <div ref={navigationPrevRef} className="swiper-button-prev">  </div>
                      <div ref={navigationNextRef} className="swiper-button-next">  </div>
                    </div>
                  </Swiper>
        }


      </div>
    </div>
  )
}

export default ImageSection;

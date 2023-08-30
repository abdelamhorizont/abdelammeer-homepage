import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper';

// import './content.scss'

const ImageSection = ({ content, columns }) => {
  const [imgClick, setimgClick] = useState(false)
  const [index, setindex] = useState()

  function handleClick(i) {
    setimgClick(true)
    setindex(i)
  }

  // const [swiper, setSwiper] = useState(null);
  // const slideTo = (index) => swiper.slideTo(index);

  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)

  const gridclass = 'col-' + columns

  return (
    <div>
      <div className={`html-content ${gridclass}`}>

        {
          content?.images?.map((image, i) => {
            const myimage = getImage(image?.image?.image)

            return (
              <div onClick={() => handleClick(i)}>
                <GatsbyImage image={myimage} alt={''} />
                <p className="caption">{image?.image?.caption}</p>
              </div>
            )
          })
        }

      </div>

      {columns == "12" &&
        <div className="swiper-modal" style={{ display: imgClick ? 'flex' : 'none' }}>
          {/* <div className="background-blur"></div> */}

          <Swiper
            onSwiper={(swiper) => swiper.slideTo(index)}
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
            initialSlide={index}
            spaceBetween={0}
            slidesPerView={1}
            centeredSlides
            className="swiper"
            onClick={() => setimgClick(false)}
          >
            {
              content?.images?.map(image => {
                const myimage = getImage(image?.image?.image)
                if (image != null) {
                  return (
                    <SwiperSlide className="swiper-slide" >
                      <div className="slide-img-wrapper">
                        <GatsbyImage
                          image={myimage}
                          imageStyle={{
                            objectFit: `contain`,
                          }}
                          Style={{
                            objectFit: `contain`,
                          }}
                          alt={''}
                        />
                      </div>
                    </SwiperSlide>
                  )
                }
              })
            }

            <div className="swiper-buttons">
              <div ref={navigationPrevRef} className="swiper-button-prev">  </div>
              <div ref={navigationNextRef} className="swiper-button-next"> </div>
            </div>
          </Swiper>

        </div>
      }

    </div>
  )
}

export default ImageSection;

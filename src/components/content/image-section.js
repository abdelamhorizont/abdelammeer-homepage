import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper';

import './content.scss'
import 'swiper/css'
// import 'swiper/scss/navigation';
// import 'swiper/scss/pagination';

const ImageSection = ({ content, type }) => {
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



  return (
    <div className={type == "grid" && "grid"}>
      {
        // type == "iframe" ?
        content?.iframe_link != null ?
          <iframe src={content.iframe_link} frameborder="100px"></iframe>
        :
          // type == "video" ?
        ( content?.videoFile) != null ?          
            <div className="video-section">
              <video key={content?.newVideoFile?.publicURL || content?.videoFile?.publicURL} muted autoPlay loop webkit-playsinline="true" playsInline>
                <source src={content?.newVideoFile?.publicURL || content?.videoFile?.publicURL} type="video/mp4" />
              </video>
              {/* <p className="caption">{content?.caption}</p> */}
            </div>
        :
            // type == "image" ?
        (content?.imageFile != null) ?
            <GatsbyImage image={getImage(content?.imageFile)} alt={''} />
        :
              // (content?.length > 1 && type == "grid") ?
        (type == ("" || "grid")) ?
                content?.images?.map((image) => {
                  const myimage = getImage(image?.imageFile)
                  console.log(image);
                  

                  return (
                    // <div onClick={() => handleClick(i)}>
                    <>
                      {
                        image.type == "iFrame" ?
                          <div className="website">
                            <iframe src={image?.iFrame_link} frameborder="100px"></iframe>
                            {/* <iframe width="1434" height="637" src="https://www.youtube.com/embed/ncz9mrj5VHA" title="Deep Sea Bots" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
                            <p className="caption">{image?.caption}</p>
                          </div>
                          :
                          image.type == ("newVideo" || "video") ?
                            <div className="video-section">
                              <video key={image?.newVideoFile?.publicURL || image?.videoFile?.publicURL} autoPlay muted loop controls>
                                {/* <video key={image?.videoFile?.publicURL} muted autoPlay loop webkit-playsinline="true" playsInline> */}
                                <source src={image?.newVideoFile?.publicURL || image?.videoFile?.publicURL} type="video/mp4" />
                                {/* <source src={image?.videoFile} type="video/mp4" /> */}
                              </video>
                              <p className="caption">{image?.caption}</p>
                            </div>
                            :
                            <div className="image">
                              <GatsbyImage image={myimage} alt={''} />
                              {/* <img src={image.imageFile} alt={''} /> */}
                              <p className="caption">{image?.caption}</p>
                            </div>
                      }
                    </>
                  )
                })
          :
                // (content?.length > 1 && type == "carousel") &&
          (type == "carousel") &&
                // <div onClick={() => handleClick(i)}>
                <Swiper
                  // onSwiper={(swiper) => swiper.slideTo(index)}
                  modules={[Navigation]}
                  // navigation
                  navigation={{
                    nextEl: navigationNextRef.current,
                    prevEl: navigationPrevRef.current
                  }}
                  onBeforeInit={(swiper) => {
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                  }}
                  loop
                  // initialSlide={0}
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
                        (image?.videoFile || image.newVideoFile) != null ?
                          <SwiperSlide className="swiper-slide" >
                            {/* <div className="video-section"> */}
                            <video key={image?.videoFile?.publicURL || image?.newVideoFile?.publicURL} muted autoPlay loop webkit-playsinline="true" playsInline>
                              <source src={image?.videoFile?.publicURL || image?.newVideoFile?.publicURL} type="video/mp4" />
                            </video>
                            {/* </div> */}
                          </SwiperSlide>
                          :
                          <SwiperSlide className="swiper-slide" >
                            <GatsbyImage
                              image={myimg}
                              alt={''}
                            // style={{ height: '100%' }}
                            // className="swiper-img"
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
  )
}

export default ImageSection;

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper';
import Arrow from '../../assets/img/SVG/arrow.png'
import Hand from '../../assets/img/SVG/hand.png'

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

  const [mobile, setMobile] = useState(false)
  React.useEffect(() => {
    const isBrowser = () => typeof window !== `undefined`
    window.addEventListener('resize', setMobile(isBrowser() && window.screen.width < 768))
  }, [])


  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)

  console.log(content);


  return (
    // <div className={type == "grid" ? "grid" : "block"}>
    <div className={type}>
      {        
        content?.iframe_link != null ?
        <>
          <iframe src={content.iframe_link} frameborder="100px"></iframe>
          {/* <img src={Hand} alt="interactive symbol" /> */}
        </>
          :
          // type == "image" ?
          (content?.imageFile != null) ?
            <GatsbyImage image={getImage(content?.imageFile)} alt={''} />
            :
          (content?.images?.length == 1) && (content?.images[0]?.imageFile != null) ?
          <div className="image">
            <GatsbyImage image={getImage(content?.images[0]?.imageFile)} alt={''} />
            <p className="caption">{content?.images[0]?.caption}</p>
            </div>
            :
            // type == "video" ?
            (content?.videoFile) != null ?
              <div className="video-section">
                <video key={content?.videoFile?.publicURL} muted autoPlay loop webkit-playsinline playsInline>
                  <source src={content?.videoFile?.publicURL} type="video/mp4" />
                </video>
                {/* <p className="caption">{content?.caption}</p> */}
              </div>
              :
              (content?.images?.length == 1) && (content?.images[0]?.newVideoFile) != null ?
              <div className="video-section">
                <video key={content?.newVideoFile?.publicURL || content?.images[0]?.newVideoFile?.publicURL } playsinline webkit-playsinline autoPlay muted controls>
                  <source src={content?.newVideoFile?.publicURL || content?.images[0]?.newVideoFile?.publicURL } type="video/mp4" />
                </video>
                <p className="caption">{content?.images[0]?.caption}</p>
              </div>
              :
              // (content?.length > 1 && type == "grid") ?
              (type == ("block") || type == ("grid") ) ?
              //  (content?.images?.length > 1) &&  content?.images?.map((image) => {
               content?.images?.map((image) => {
                  const myimage = getImage(image?.imageFile)

                  return (
                    <>
                      {
                        image.type == "iFrame" ?
                          <div className="website">
                            <iframe src={image?.iFrame_link} frameborder="100px"></iframe>
                            {/* <iframe width="1434" height="637" src="https://www.youtube.com/embed/ncz9mrj5VHA" title="Deep Sea Bots" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
                            <p className="caption">{image?.caption}</p>
                            <a id="hand" target="_blank" href={image?.iFrame_link}>
                              <img src={Hand} alt="interactive symbol" />
                            </a>
                          </div>
                          :
                          image.type == ("newVideo" || "video") ?
                            <div className="video-section">
                              <video key={image?.newVideoFile?.publicURL || image?.videoFile?.publicURL} autoPlay muted controls playsinline webkit-playsinline>
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
                (type == "work-carousel") ?
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
                  spaceBetween={'-1px'}
                  slidesPerView={'auto'}
                  centeredSlides={mobile}
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
                            <video key={image?.videoFile?.publicURL || image?.newVideoFile?.publicURL} muted autoPlay loop webkit-playsinline playsInline>
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
                            className="swiper-img"
                            />
                          </SwiperSlide>
                      )
                    })
                  }

                  <div className="swiper-buttons">
                    <div ref={navigationPrevRef} className="swiper-button-prev"> <img id="arrow-left" src={Arrow} alt="Arrow" /> </div>
                    <div ref={navigationNextRef} className="swiper-button-next"> <img id="arrow-right" src={Arrow} alt="Arrow" /> </div>
                  </div>
                </Swiper>
                :
                (type == "carousel") && (content?.images?.length > 1) &&
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
                  spaceBetween={'10px'}
                  slidesPerView={'auto'}
                  centeredSlides={mobile}
                  className="blog-swiper"
                // onClick={() => setimgClick(false)}
                >

                  {
                    content?.images?.map((image) => {
                      const myimg = getImage(image.imageFile)

                      return (
                        (image?.videoFile || image.newVideoFile) != null ?
                          <SwiperSlide className="swiper-slide" >
                            {/* <div className="video-section"> */}
                            <video key={image?.videoFile?.publicURL || image?.newVideoFile?.publicURL} muted autoPlay webkit-playsinline playsInline controls>
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
                            className="swiper-img"
                            />
                          </SwiperSlide>
                      )
                    })
                  }

                  <div className="swiper-buttons">
                    <div ref={navigationPrevRef} className="swiper-button-prev"> <img id="arrow-left" src={Arrow} alt="Arrow" /> </div>
                    <div ref={navigationNextRef} className="swiper-button-next"> <img id="arrow-right" src={Arrow} alt="Arrow" /> </div>
                  </div>
                </Swiper>
      }


    </div>
  )
}

export default ImageSection;

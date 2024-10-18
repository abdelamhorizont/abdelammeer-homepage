import * as React from "react";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from 'react-markdown'


import './content.scss'
// import 'swiper/css'
// import 'swiper/scss/pagination';

export const HTMLContent = ({ content }) => (
  <div className='html-content' dangerouslySetInnerHTML={{ __html: content }} />
);


const TextSection = ({ content }) => {
  return (
    <ReactMarkdown>
      {content}
    </ReactMarkdown>
  )
}


export default TextSection;

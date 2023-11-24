import * as React from "react";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from 'react-markdown'


import './content.scss'
import 'swiper/css'
import 'swiper/scss/pagination';

export const HTMLContent = ({ content }) => (
  <div className='html-content' dangerouslySetInnerHTML={{ __html: content }} />
);


const TextSection = ({ content, columnStart, columnEnd }) => {
  const gridCols = {
    gridColumn: columnStart + "/" + columnEnd
  }
 
  const gridColsFallback = {
    gridColumn: "span 6"
  }

  return (
      <div style={columnStart ? gridCols : gridColsFallback} className={`html-content`}>
      {/* <div style={ gridCols } className={`html-content`}> */}
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </div>
  )
}


export default TextSection;

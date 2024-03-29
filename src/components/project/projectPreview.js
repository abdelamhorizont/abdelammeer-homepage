import React from "react";
import ImageSection from "../content/image-section";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { motion } from "framer-motion"

import _ from 'lodash';

import "./project-preview.scss"

export function ProjectPreview({ content, type, hero }) {
  return (
      <Link to={content?.fields?.slug} className={`${_.kebabCase(content?.frontmatter?.title)} project-preview`}>
        <div className={hero ? "blogpostcover" : "preview-title"}>
          <h2 className="year">{content?.frontmatter?.title_section?.date}</h2>

          <div className={`cover-image`}>
            <ImageSection type={type} content={content?.frontmatter.cover} columnStart={1} columnEnd={12} />
          </div>

          {/* <div className="cover-title"> */}
          {/* <h2 className="work-year">{content?.frontmatter?.title_section?.date}</h2> */}

          {content?.frontmatter?.title_section?.images?.length ?
            <>
              <GatsbyImage className="title-img" image={getImage(content?.frontmatter?.title_section.images[0]?.imageFile)} alt={''} />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, illo impedit rerum, laudantium cupiditate aliquam totam natus neque consequatur, odio error omnis. Deleniti, molestias. Quasi quos officia laudantium quia vel.
              </p>
            </>
            :
            <div className="project-description">
              <h1 className="headline">{content?.frontmatter?.title}</h1>
              <p>{content?.frontmatter?.Description}
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, illo impedit rerum, laudantium cupiditate aliquam totam natus neque consequatur, odio error omnis. Deleniti, molestias. Quasi quos officia laudantium quia vel. */}
              </p>
            </div>
          }

          <h2 className="type">{content?.frontmatter?.title_section?.format}</h2>

          {content?.frontmatter?.collaborators && <h2 className="collaborators">with {content?.frontmatter?.collaborators} </h2>}
          {/* </div> */}
        </div>
      </Link>
  )
}

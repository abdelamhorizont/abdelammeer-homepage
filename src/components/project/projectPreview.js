import React, { useEffect, useState } from "react";
import ImageSection from "../content/image-section";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { motion } from "framer-motion"

import _ from 'lodash';

import '../../styles/index.scss'
import '../../styles/blog.scss'
import '../../styles/space.scss'


export function ProjectPreview({ content, type, colorTheme }) {
  const [theme, setTheme] = useState(colorTheme || 'light-theme')

  const passTheme = (theme) => {
    setTheme(theme)
  }

  return (
    <Link state={{theme}} to={content?.fields?.slug} className={`${_.kebabCase(content?.frontmatter?.title)} project-preview`}>
      <div className={"postcover"}>
        <h2 className="year">{content?.frontmatter?.title_section?.date}</h2>

        <div className={`cover-image`}>
          <ImageSection type={type} content={content?.frontmatter?.cover_image && content?.frontmatter?.cover_image[0]} columnStart={1} columnEnd={12} />
        </div>

        {content?.frontmatter?.title_section?.images?.length ?
          <div className="title-img">
            <GatsbyImage image={getImage(content?.frontmatter?.title_section.images[0]?.imageFile)} alt={''} />
            {/* <div className="project-description">
              <p>{content?.frontmatter?.Description} </p>
            </div> */}
          </div>
          :
          <div className="project-description">
            <h1 className="headline">{content?.frontmatter?.title}</h1>
            <p>{content?.frontmatter?.Description} </p>
          </div>
        }

        <h2 className="type">{content?.frontmatter?.title_section?.format}</h2>

        {content?.frontmatter?.collaborators && <h2 className="collaborators">with {content?.frontmatter?.collaborators} </h2>}
        {/* </div> */}
      </div>
    </Link>
  )
}

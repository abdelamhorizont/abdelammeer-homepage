import React from "react";
import ImageSection from "../content/image-section";
import { Link } from "gatsby";
import _ from 'lodash';

import "./project-preview.scss"

export function ProjectPreview({ content, type }) {
  return (
    <Link to={content?.fields?.slug} className={`${_.kebabCase(content?.frontmatter?.title)} project-preview`}>
      <h2 className="blog-year" >{content?.frontmatter?.date}</h2>

      <div className={`cover-image`}>
        {/* <div className={content.frontmatter?.title == "deep sea bots" ? "cover-image deep-sea-bots" : "cover-image"}> */}
        <ImageSection type={type} content={content?.frontmatter.cover} columnStart={1} columnEnd={12} />
      </div>

      <div className="cover-title">
        <h2 className="year">{content?.frontmatter?.date}</h2>
        <h1 className="headline">{content?.frontmatter?.title}</h1>
        <h2>{content?.frontmatter?.type}</h2>

        {content?.frontmatter?.collaborators && <h2 className="collaborators">with {content?.frontmatter?.collaborators} </h2>}
      </div>
    </Link>
  )
}

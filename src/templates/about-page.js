import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"


import Layout from "../components/layout/Layout";
import TextSection, { HTMLContent } from "../components/content/text-section";
import ImageSection from "../components/content/image-section";

// import Tags from "../components/tags/tags";

import '../styles/reset.css'
import '../styles/global.scss'
import '../styles/typo.scss'

import '../styles/about.scss'

const AboutPage = ({ data }) => {
  const { frontmatter: post } = data.markdownRemark
  // const { markdownRemark: post } = data;
  // const myimage = getImage(post.frontmatter?.cover?.fallbackImage)

  return (
    <Layout>
      <div className="about-page">

        {/* <div className={hero ? "blogpostcover" : "preview-title"}> */}
          <h1 className="year">{post?.title}</h1>

          {/* <div className={`cover-image`}>
            <ImageSection type={type} content={content?.frontmatter.cover} columnStart={1} columnEnd={12} />
          </div>


          {content?.frontmatter?.title_section?.images?.length ?
            <GatsbyImage className="title-img" image={getImage(content?.frontmatter?.title_section.images[0]?.imageFile)} alt={''} />
            :
            <div className="project-description">
              <h1 className="headline">{content?.frontmatter?.title}</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, illo impedit rerum, laudantium cupiditate aliquam totam natus neque consequatur, odio error omnis. Deleniti, molestias. Quasi quos officia laudantium quia vel.
              </p>
            </div>
          }

          <h2 className="type">{content?.frontmatter?.title_section?.type}</h2>

          {content?.frontmatter?.collaborators && <h2 className="collaborators">with {content?.frontmatter?.collaborators} </h2>} */}
          {/* </div> */}
        {/* </div> */}

        {/* <div className='blogpostcover'>
          <h2 className="date"> {post.frontmatter?.title_section.date} </h2>
          <div className="cover-image">
            <GatsbyImage
              image={myimage}
              alt={''}
            />
            <p className="caption">{post.frontmatter.cover?.caption}</p>
          </div>
          <h1 className="headline">{post.frontmatter.title}</h1>
          <h2 className="type"> {post.frontmatter.title_section.type} </h2>
        </div>


        <div className="blog-post-content">
          <div className="description prom-text">
            <TextSection content={post.frontmatter.Description} columns={'2'} />
          </div>

          {
            post.frontmatter?.variable_content?.map((content) => {
              if (content.type == 'text-section') {
                return (
                  <div style={{ gridColumn: content.column_start + "/" + content.column_end }} className={`html-content`}>
                    <TextSection content={content.text} />
                  </div>
                )
              } else if (content.type == 'image-section') {
                return (
                  <div style={{ gridColumn: content.column_start + "/" + content.column_end }} className={`html-content`}>
                    <ImageSection content={content} type={"grid"} />
                  </div>
                )
              }
            })
          }
        </div> */}
      </div>


    </Layout>
  )
}



export default AboutPage;

export const aboutPageQuery = graphql`
query AboutPageTemplate {
  markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
      frontmatter {
        title
        Description
        variable_content {
          type
          column_end
          column_start
          text
          images {
            caption
            type
            imageFile {
              childImageSharp {
                gatsbyImageData
              }
            }
            videoFile {
              publicURL
            }
            iFrame_link
          }
        }
      }
    }
  }
`;
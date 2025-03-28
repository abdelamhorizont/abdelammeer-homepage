import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import _ from 'lodash';

import Layout from "../components/layout/Layout";
import TextSection, { HTMLContent } from "../components/content/text-section";
import ImageSection from "../components/content/image-section";
import { ProjectPreview } from '../components/project/projectPreview';
import Hand from '../assets/img/SVG/hand.png'

import '../styles/space.scss'

const SpacePost = ({ data }) => {
  const { markdownRemark: post } = data;
  const myimage = getImage(post.frontmatter?.cover_image[0]?.imageFile)
  let iframeIndex = post.frontmatter.cover_image[0]?.iframe_link ? 0 : 1

  return (
    <Layout activeSite={'space'}>

      <div className={`${_.kebabCase(post?.frontmatter?.title)} space-post`}>

        <div className='postcover'>
          <h2 className="year"> {post.frontmatter.title_section.date} </h2>
          <div className="cover-image">
            <GatsbyImage
              image={myimage}
              alt={''}
            />
            <iframe src={post.frontmatter.cover_image[iframeIndex]?.iframe_link} frameborder="100px"></iframe>
             <img src={Hand} alt="interactive symbol" id="hand" />

            <p className="caption">{post.frontmatter.cover_image?.caption}</p>
          </div>

          {post?.frontmatter?.title_section?.images?.length ?
            <div className="title-img">
              <GatsbyImage image={getImage(post?.frontmatter?.title_section.images[0]?.imageFile)} alt={''} />
              {/* <div className="project-description">
              <p>{content?.frontmatter?.Description} </p>
            </div> */}
            </div>
            :
            <div className="project-description">
              <h1 className="headline">{post?.frontmatter?.title}</h1>
              {/* <p>{post?.frontmatter?.Description} </p> */}
            </div>
          }

          <h2 className="type"> {post.frontmatter.title_section.format} </h2>
        </div>

        <div className="space-post-content">
          <div className="description prom-text">
            <TextSection content={post.frontmatter.Description} columns={'2'} />
          </div>

          {
            post.frontmatter?.variable_content?.map((content) => {
              if (content.type == 'text-section') {
                return (
                  <div style={{ gridColumn: content.column_start ? content.column_start + "/" + content.column_end : "4/11" }} className={`text-section`}>
                    {content?.title &&
                      <h1>{content?.title}</h1>
                    }
                    <TextSection content={content.text} />
                  </div>
                )
              } else if (content.type == 'image-section') {
                return (
                  <div style={{ gridColumn: content.column_start ? content.column_start + "/" + content.column_end : "4/11" }} className={`image-section`}>
                    {content?.title &&
                      <h1>{content?.title}</h1>
                    }
                    <ImageSection content={content} type={"grid"} />
                  </div>
                )
              }
            })
          }
        </div>
      </div>

    </Layout>
  )
}



export default SpacePost;

export const pageQuery = graphql`
  query SpacePostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        templateKey
        title
        title_section {
          type
          format
          date(formatString: "YYYY")
          images {
                imageFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
        }
        cover_image {
              caption
              iframe_link
              imageFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
              videoFile {
                publicURL
              }
        }
        Description
        variable_content {
          type
          column_end
          column_start
          text
          images {
            caption
            type
            iFrame_link          
            imageFile {
              childImageSharp {
                gatsbyImageData
              }
            }
            newVideoFile {
              publicURL
            }
          }
        }
      }
    }
  }
`
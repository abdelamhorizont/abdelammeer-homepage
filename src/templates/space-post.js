import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import _ from 'lodash';

import Layout from "../components/layout/Layout";
import TextSection, { HTMLContent } from "../components/content/text-section";
import ImageSection from "../components/content/image-section";
import { ProjectPreview } from '../components/project/projectPreview';

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
              <p>{post?.frontmatter?.Description} </p>
            </div>
          }

          <h2 className="type"> {post.frontmatter.title_section.format} </h2>
        </div>

        <div className="space-post-content">
          <div className="description">
            <TextSection content={post.frontmatter.Description} columns={'2'} />
          </div>

          {
            post.frontmatter?.variable_content?.map((content) => {
              if (content.type == 'text-section') {
                return (
                  <TextSection content={content.text} columnStart={content.column_start} columnEnd={content.column_end} />
                )
              } else if (content.type == 'image-section') {
                return (
                  <ImageSection content={content} type={"grid"} columnStart={content.column_start} columnEnd={content.column_end} />
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
            imageFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`
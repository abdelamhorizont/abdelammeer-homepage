import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout/Layout";
import TextSection, { HTMLContent } from "../components/content/text-section";
import ImageSection from "../components/content/image-section";

// import '../styles/work-post.scss'

const SpacePost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout activeSite={'space'}>

      <div className="space-post">
        <div className='spacepostcover'>

          <div className={post.frontmatter.title == "deep sea bots" ? "cover-image deep-sea-bots" : "cover-image"}>
            <ImageSection type={"iframe"} content={post.frontmatter.cover?.iframe} columnStart={1} columnEnd={12} />
          </div>

          <div className="cover-title">
            <h2> {post.frontmatter.date} </h2>
            <h1 className="headline">{post.frontmatter.title}</h1>
            <h2> {post.frontmatter.type} </h2>
            {post.frontmatter?.collaborators &&
              <div className="collaborators"><h2>with {post.frontmatter?.collaborators} </h2></div>
            }
          </div>

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
        type
        date(formatString: "YYYY")
        iframe
        collaborators
        Description
        cover {
          iframe
          fallbackImage {
            childImageSharp {
              gatsbyImageData
            }
          }
          images {
            imageFile {
              childImageSharp {
                gatsbyImageData
              }
            }
            videoFile {
              publicURL
            }
            caption
          }
          videoFile {
            publicURL
          }
        }
        variable_content {
          type
          column_end
          column_start
          text
          images {
            image {
              image {
                childImageSharp {
                  gatsbyImageData
                }
              }
              caption
            }
          }
        }
      }
    }
  }
`
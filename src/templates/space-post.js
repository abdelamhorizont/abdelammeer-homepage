import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout/Layout";
import TextSection, { HTMLContent } from "../components/content/text-section";
import ImageSection from "../components/content/image-section";

// import '../styles/work-post.scss'

const SpacePost = ({ data }) => {
  // const { markdownRemark: post } = data;

  return (
    <Layout>

      {/* {
        post.frontmatter?.variable_content?.map((content) => {
          if (content.type == 'text-section') {
            return (
              <TextSection content={content.text} columns={'2'} />
            )
          } else if (content.type == 'image-section') {
            return (
              <ImageSection content={content} columns={content.columns} />
            )
          }
        })
      } */}

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
import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout/Layout";
import TextSection, { HTMLContent } from "../components/content/text-section";
import ImageSection from "../components/content/image-section";
import { ProjectPreview } from '../components/project/projectPreview';

import '../styles/space.scss'

const SpacePost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout activeSite={'space'}>

      <div className="space-post space-section">
        <ProjectPreview content={post} type={"iframe"} />

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
          date(formatString: "YYYY")
          collaborators
          images {
            imageFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
        iframe
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
          }
        }
      }
    }
  }
`
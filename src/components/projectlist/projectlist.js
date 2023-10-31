import React, { useEffect, useState } from 'react'
import { Link, useStaticQuery, graphql } from "gatsby";

import Project from '../project/project'
// import './projectlist.scss'


export default function Projectlist( ) {
//   const data = useStaticQuery(graphql`
// query {
//   allMarkdownRemark(
//     filter: {frontmatter: {templateKey: {eq: "work-post"}}}
//     sort: {fields: frontmatter___date, order: DESC}
//     ) {
//     edges {
//       node {
//         fields {
//           slug
//         }
//         frontmatter {
//           title
//           date(formatString: "YYYY")
//           cover_image {
//             childImageSharp {
//               gatsbyImageData
//             }
//           }
//           tags
//         }
//       }
//      }
//    }
//   }
// `)

  const [activeTag, setactiveTag] = useState('All')

  const tags = ["All", "Object", "Space", "Research", "Exhibition"]
  // const projectlist = data.allMarkdownRemark.edges 

  return (
    <div className='menu'>
      {/* <div className='tags'>
        {
          tags.map(tag => {
            return (
              <div>
                <button
                  className={tag != activeTag && 'inactiveTag'}
                  onClick={() => {
                    setactiveTag(tag)
                  }}
                >{tag}</button>
              </div>
            )
          })
        }
      </div>

      <ul className='projectlist'>
        {
          projectlist.map((project, i) => {
            return (
              <Project
                project={project}
                index={i}
              />
            )
          })
        }
      </ul> */}
    </div>
  )
}

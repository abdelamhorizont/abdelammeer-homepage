import { Link } from '@reach/router';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { getImage, GatsbyImage } from "gatsby-plugin-image";

export default function Project({ project }) {
    const myimage = getImage(project.node.frontmatter?.cover_image)

    return (
        <>
            <motion.li>
                <Link
                    to={project.node.fields.slug}
                >
                    <h1>
                        {project.node.frontmatter.title}
                    </h1>

                    <h3> {project.node.frontmatter.date} </h3>

                </Link>

                {/* <div>
                    <GatsbyImage
                        image={myimage}
                        alt={''}
                        imageStyle={{
                            isolation: 'isolate'
                        }}
                    />
                </div> */}
            </motion.li>

        </>
    )
}

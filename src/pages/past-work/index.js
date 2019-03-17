import React from 'react';
import { graphql } from 'gatsby';

import ExtLink from '../../components/ExtLink';
import { HTMLContent } from '../../components/Content';
import pastWorkStyles from './pastWork.module.sass';
import widthStyles from '../../commons/width.module.sass';

const subject = 'Gimme CV';
const message = 'Hi! I would like to ask you for your CV. Thanks';

export default ({ data: { allMarkdownRemark: { edges: works } } }) => (
    <section className={widthStyles.container}>
        <div className={pastWorkStyles.introduction}>
            <h1>Past work</h1>
            <p>I won't use a bar for my skills, but some buzzwords may be thrown here and there.</p>
            <p>You've been warned.</p>
        </div>

        <br />

        {works.map(({ node: work }) => {
            const startDate = new Date(work.frontmatter.startDate).toLocaleDateString()
            const endDate = work.frontmatter.endDate
                ? new Date(work.frontmatter.startDate).toLocaleDateString()
                : 'PRESENT';
            return (
                <section key={work.id} className={pastWorkStyles.container}>
                    <h2>{work.frontmatter.title}</h2>
                    <h3 className={pastWorkStyles.company}>
                        {work.frontmatter.companyLink
                            ? <ExtLink href={work.frontmatter.companyLink}><b>{work.frontmatter.company}</b></ExtLink>
                            : <span><b>{work.frontmatter.company}</b></span>
                        }
                    </h3>
                    <p className={pastWorkStyles.date}>{startDate} to {endDate}</p>
                    <p className={pastWorkStyles.technologies}>
                        {work.frontmatter.stack.map(tech => <span key={tech}>{tech}</span>)}
                    </p>
                    <HTMLContent content={work.html} />
                </section>
            );
        })}

        <br />

        <div className={pastWorkStyles.closing}>
            <h3>Closing words</h3>
            <p>My responsibility in those projects, team dynamic, other fun stuff...</p>
            <p>I cannot mention all.</p>
            <p>Also, you might be interested in the PDF version of this.</p>
            <p>So feel free to <ExtLink href={`https://nperrin.io/contact?subject=${subject}&message=${message}`}>contact me</ExtLink>.</p>
            <p>Thanks!</p>
        </div>
    </section>
);

export const pageQuery = graphql`{
    allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "past-work" } } }
        sort: { fields: frontmatter___endDate, order: DESC }
    ) {
        edges {
            node {
                id
                frontmatter {
                    company
                    companyLink
                    title
                    startDate
                    endDate
                    stack
                }
                html
            }
        }
    }
}`;

import React from 'react';
import { Link } from 'gatsby';
import PostMDXContent from './PostMDXContent';
import styled from '@emotion/styled';

const EntryTitle = styled.h1`
  text-align: center;
  text-transform: capitalize;
`;

const ChallengeEntry = ({ node }: { node: any }) => {
  console.log(node);
  return (
    <section>
      <Link to={node.fields.slug}>
        <EntryTitle>{node.frontmatter.title}</EntryTitle>
      </Link>
      <PostMDXContent body={node.code.body} />
    </section>
  );
};

export default ChallengeEntry;

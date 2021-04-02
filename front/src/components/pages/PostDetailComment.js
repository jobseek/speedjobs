import React from 'react';
import styled from 'styled-components';
import { ThumbUp } from '@styled-icons/material-rounded/ThumbUp';
import { ThumbDown } from '@styled-icons/material-rounded';
import img11 from '../../components/components/img/pfImg.png';
import { StyledButton } from '../components/Styled';

const BlogComment = styled.div`
  position: relative;
  overflow: auto;
  padding-top: 40px;
  //padding-left: 5rem;
  //padding-right: 5rem;
`;
const BlogCommentUl = styled.ul`
  list-style-type: none;
`;
const Comments = styled.ul`
  list-style-type: none;
  //padding: 0;
`;

const ClearFix = styled.li`
  padding-top: 1rem;
  padding-bottom: 0.5rem;
`;

const BlogCommentAvatar = styled.img`
  position: relative;
  float: left;
  margin-left: 0;
  margin-top: 0;
  width: 65px;
  height: 65px;
  opacity: 1;
  filter: Alpha(opacity=100);
  border-radius: 4px;
`;

const PostComment = styled.div`
  border: 1px solid #eee;
  margin-bottom: 20px;
  margin-left: 85px;
  margin-right: 0px;
  padding: 10px 20px;
  position: relative;
  border-radius: 4px;
  background: #fff;
  color: #6b6e80;
  text-align: left;

  overflow-wrap: normal;
`;

const A1 = styled.a`
  color: #f2d411;
  text-decoration: none;
`;

const P1 = styled.p`
  font-size: 14px;
  color: #4e5564;
  padding-bottom: 10px;
  margin-bottom: 10px;
  overflow-y: auto;
`;

const MetaP = styled.p`
  font-size: 13px;
  color: #aaaaaa;
  padding-bottom: 8px;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

// const SayBtn = styled.button`
//
//
//     appearance: none;
//     font-size: 14px;
//
//     color: #7c7c7c;
//     background-color: #f5df4d;
//   border: 1px solid #f5df4d;
//     border-radius: 4px;
//
//   &:hover {
//     background-color: #f2d411;
//   }
//   `

const CmtInput = styled.textarea`
  resize: none;
  width: 100%;
  border: 1px solid #eee;
  font-size: 14px;
  color: #4e5564;
`;

const ThumbUpSt = styled(ThumbUp)`
  width: 15px;
  height: 15px;
  margin-right: 8px;
  color: #aaaaaa;
  &:hover {
    color: #f2d411;
  }
`;
const ThumbDownSt = styled(ThumbDown)`
  width: 15px;
  height: 15px;
  margin-right: 8px;
  color: #aaaaaa;
  &:hover {
    color: #f2d411;
  }
`;

export default function PostDetailComment(props) {
  return (
    <>
      <BlogComment>
        <BlogCommentUl>
          <Comments>
            <ClearFix>
              <BlogCommentAvatar src={img11}></BlogCommentAvatar>

              <PostComment>
                <MetaP>
                  Dec 18, 2014 <StyledButton> comment </StyledButton>{' '}
                </MetaP>

                <CmtInput rows="7"></CmtInput>
              </PostComment>
            </ClearFix>

            <hr />
            <ClearFix>
              <BlogCommentAvatar src={img11}></BlogCommentAvatar>
              <PostComment>
                <MetaP>
                  Dec 18, 2014 <A1>JohnDoe</A1>{' '}
                </MetaP>
                <P1>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  a sapien odio, sit ametafdsafdsfdfsadfjfiwjoifjisjdfji
                  sajfoisdjifjsaofjiosjioasjfjisaojfijsoasijfjidsajofisifaosijfdoj
                </P1>
                <ThumbUpSt></ThumbUpSt> <ThumbDownSt></ThumbDownSt>
              </PostComment>
            </ClearFix>

            <ClearFix>
              <BlogCommentAvatar src={img11}></BlogCommentAvatar>
              <PostComment>
                <MetaP>
                  Dec 19, 2014 <A1>JohnDoe </A1>{' '}
                </MetaP>
                <P1>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  a sapien odio, sit amet
                </P1>
                <ThumbUpSt></ThumbUpSt> <ThumbDownSt></ThumbDownSt>
              </PostComment>
            </ClearFix>
            <ClearFix>
              <BlogCommentAvatar src={img11}></BlogCommentAvatar>
              <PostComment>
                <MetaP>
                  Dec 19, 2014 <A1>JohnDoe </A1>{' '}
                </MetaP>
                <P1>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  a sapien odio, sit amet
                </P1>
                <ThumbUpSt></ThumbUpSt> <ThumbDownSt></ThumbDownSt>
              </PostComment>
            </ClearFix>
          </Comments>
        </BlogCommentUl>
      </BlogComment>
    </>
  );
}

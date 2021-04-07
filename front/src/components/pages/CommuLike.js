import React, { useState } from 'react';
import {
  StyledButton,
  StyledHeaderDiv,
  StyledLeftLayout,
} from '../components/Styled';
import Post from '../components/Post';
import SideMenu from '../components/SideMenu';

export default function LikeList(props) {
  // const [tags] = useState([
  //   { name: 'backEnd', id: 0, selected: false },
  //   { name: 'frontEnd', id: 1, selected: false },
  //   { name: 'machineLearning', id: 2, selected: false },
  //   { name: 'infra', id: 3, selected: false },
  // ]);

  const dummy = () => {
    const dummyArr = [];

    for (let i = 0; i < 10; i++) {
      dummyArr.push({
        title: i + '번 제목',
        fav: i % 2 === 1,
        writer: i + '번 작성자',
        date: '2020-01-01',
        tags: ['backend', 'frontend'],
      });
    }
    return dummyArr;
  };

  const [dummyPost] = useState(dummy);

  const mapPost = dummyPost.map((post) => (
    <Post
      tags={post.tags}
      title={post.title}
      writer={post.writer}
      date={post.date}
      fav={post.fav}
      key={post.title}
    ></Post>
  ));

  return (
    <>
      <div className={'container text-left'}>
        <StyledHeaderDiv padding>
          <div className={'container row justify-content-end'}>
            <div
              className={'col-md-9 col-8'}
              style={{ marginTop: '14px', paddingTop: '5px' }}
            >
              <h5>게시글 찜목록</h5>
            </div>
            <div className={'col-md-3 col-4 text-right'}>
              <StyledButton wide>수정</StyledButton>
            </div>
          </div>
        </StyledHeaderDiv>
        <div style={{ marginTop: '100px' }}>
          <div className="row justify-content-center">
            <StyledLeftLayout
              borderNone
              className={'col-12 col-lg-2 text-left'}
            >
              <SideMenu />
            </StyledLeftLayout>
            {/* 태그 end*/}

            {/* 게시글*/}
            <div className={'col-12 col-lg-10'}>
              <div className={'container-fluid'}>{mapPost}</div>
            </div>
            {/* 게시글 end*/}
          </div>
        </div>
      </div>
    </>
  );
}

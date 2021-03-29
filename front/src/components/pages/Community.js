import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import Tags from '../components/Tags';
import { StyledLeftLayout } from '../components/Styled';
import Post from '../components/Post';

export default function Community(props) {
  const [tags] = useState([
    { name: 'backEnd', id: 0, selected: false },
    { name: 'frontEnd', id: 1, selected: false },
    { name: 'machineLearning', id: 2, selected: false },
    { name: 'infra', id: 3, selected: false },
  ]);
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

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

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
      <Banner />
      <div className={'container'}>
        {/* 레이아웃 구분선*/}
        <div className={'row justify-content-center'}>
          {/* 태그 레이아웃 */}
          <StyledLeftLayout className={'col-12 col-lg-3 text-left'}>
            <Tags tagList={tags}>filter</Tags>
          </StyledLeftLayout>
          {/* 태그 end*/}

          {/* 게시글*/}
          <div className={'col-12 col-lg-9'}>
            <div
              className={'text-right'}
              style={{
                position: 'relative',
                height: '60px',
              }}
            >
              {/* <TagBody tagType>조회순</TagBody>*/}
            </div>
            {mapPost}
          </div>
          {/* 게시글 end*/}
        </div>
      </div>
    </>
  );
}

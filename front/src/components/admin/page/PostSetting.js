import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import InfoCard from '../component/InfoCard';
import { Content, Header } from '../component/adminStyled';
import { AdminStyledCol, AdminStyledRow } from '../component/TagList';
import { POST_LIST_REQUEST } from '../../../reducers/post';
import { RECRUIT_LIST_REQUEST } from '../../../reducers/recruit';

export default function PostSetting(props) {
  const { post, recruit } = useSelector((state) => state);
  const [list, setList] = useState([]);
  const [selected] = useState(-1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: POST_LIST_REQUEST,
      data: { size: 9999, page: 0 },
    });
    dispatch({
      type: RECRUIT_LIST_REQUEST,
      data: { size: 9999, page: 0 },
    });
  }, [dispatch]);
  useEffect(() => {
    if (recruit.recruitListDone && post.postListDone) {
      setList([...recruit.recruitList.content, ...post.postList.content]);
    }
  }, [
    post.postListDone,
    recruit.recruitListDone,
    post.postList?.content,
    recruit.recruitList?.content,
  ]);
  return (
    <>
      <div className={'row'}>
        <div className={'col-6'}>
          <InfoCard index={1} height={'100%'}>
            <Header>게시글 목록</Header>
            <Content style={{ padding: 0 }}>
              <div className={'container-fluid p-0'}>
                <AdminStyledRow className={'row m-0'}>
                  <div className={'col-7'}>제목</div>
                  <div className={'col-2'}>작성자/회사</div>
                  <div className={'col-3'}>작성일</div>
                </AdminStyledRow>
                <div style={{ overflowY: 'scroll', height: '80vh' }}>
                  {list.length === 0 ? (
                    <div style={{ textAlign: 'center' }}>게시글이 없습니다</div>
                  ) : (
                    list?.map((pl) => (
                      <AdminStyledCol
                        selected={pl?.id === selected.id}
                        key={pl.id}
                        id={pl?.id}
                        className={'row m-0'}
                      >
                        <div className={'col-7'}>{pl.title}</div>
                        <div className={'col-2'}>{pl.author}</div>
                      </AdminStyledCol>
                    ))
                  )}
                </div>
              </div>
            </Content>
          </InfoCard>
        </div>
        <div className={'col-6'}>
          <InfoCard index={2}>
            <Header>게시글 상세</Header>
            <Content>
              {selected === -1 ? '게시물을 선택해 주세요' : <div>선택</div>}
            </Content>
          </InfoCard>
        </div>
      </div>
    </>
  );
}

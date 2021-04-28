import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cards from '../../components/Cards';
import {
  RECRUIT_LIST_DONE,
  RECRUIT_LIST_REQUEST,
} from '../../../reducers/recruit';

export default function AnnounceCard() {
  const dispatch = useDispatch();
  const recruit = useSelector((s) => s.recruit);

  // 화면 불러왔을 때 한번 공고정보 불러오기
  const [list, setList] = useState([]);
  useEffect(() => {
    dispatch({
      type: RECRUIT_LIST_REQUEST,
      data: { size: 6, page: 0 },
    });
  }, []);

  useEffect(() => {
    if (recruit.recruitList) {
      const arr = recruit.recruitList.content;
      const arr2 = arr.map((i) => {
        let thumb = i.thumbnail;
        if (i.thumbnail === null) {
          thumb =
            'http://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
        }
        return {
          thumbnail: thumb,
          title: i.title,
          content: i.content,
        };
      });
      setList([...arr2]);
      dispatch({
        type: RECRUIT_LIST_DONE,
      });
    }
  }, [dispatch, recruit.recruitList]);

  const cards = list.map((c, index) => {
    return (
      <div className="col-md-4 mb-2 col-sm-6" key={index}>
        <Cards title={c.title} content={c.content} thumbnail={c.thumbnail} />
      </div>
    );
  });
  return <div className="row">{cards}</div>;
}

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useCookies } from 'react-cookie';
import Banner from '../components/banner/Banner';
import {
  FilterSelector,
  SearchBox,
  SearchBoxContainer,
  SearchBoxContainerM,
  TagBody,
} from '../components/Styled';
import { RECRUIT_LIST_DONE, RECRUIT_LIST_REQUEST } from '../reducers/recruit';
import Post from '../components/Post';
import { COMPANY_GET_REQUEST } from '../reducers/company';
import TagSelector from '../components/tag/TagSelector';
import TagShower from '../components/tag/TagShower';
import { Space } from './Community';

export default function Recruitment() {
  const [form, setForm] = useState({
    size: 10,
    page: 0,
  });
  const experienceList = [
    { name: '경력 전체', sort: '' },
    { name: '경력 무관', sort: '-1' },
    { name: '신 입', sort: '0' },
    { name: '1년 이상', sort: '1' },
    { name: '2년 이상', sort: '2' },
    { name: '3년 이상', sort: '3' },
    { name: '4년 이상', sort: '4' },
    { name: '5년 이상', sort: '5' },
    { name: '6년 이상', sort: '6' },
    { name: '7년 이상', sort: '7' },
    { name: '8년 이상', sort: '8' },
    { name: '9년 이상', sort: '9' },
  ];
  const salaryList = [
    { name: '연봉 전체', sort: '' },
    { name: '3,000 이상', sort: '3000' },
    { name: '4,000 이상', sort: '4000' },
    { name: '5,000 이상', sort: '5000' },
    { name: '6,000 이상', sort: '6000' },
    { name: '7,000 이상', sort: '7000' },
    { name: '8,000 이상', sort: '8000' },
    { name: '9,000 이상', sort: '9000' },
  ];
  const statusList = [
    { name: '채용 전체', sort: '' },
    { name: '채용전', sort: 'STANDBY' },
    { name: '채용중', sort: 'PROCESS' },
    { name: '채용마감', sort: 'END' },
    { name: '상시채용', sort: 'REGULAR' },
  ];
  const recruitOrder = [
    { name: '최신순', sort: 'id' },
    { name: '조회순', sort: 'viewCount' },
    { name: '추천순', sort: 'favoriteCount' },
  ];
  const initialList = [
    { name: '제 목', state: false, target: 'title' },
    { name: '내 용', state: false, target: 'content' },
    { name: '작성자', state: false, target: 'companyName' },
  ];
  const history = useHistory();
  const dispatch = useDispatch();
  const prevY = useRef(99999);
  const isLast = useRef(false);
  const paging = useRef(false);
  const page = useRef(0);
  const targetRef = useRef();
  const [refresh] = useCookies(['REFRESH_TOKEN']);
  const observe = useRef(
    new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        const y = firstEntry.boundingClientRect.y;
        if (prevY.current > y && !isLast.current) {
          if (prevY.current !== 99999) {
            loadMore();
          }
        }
        prevY.current = y;
      },
      { threshold: 1 }
    )
  );
  const loadMore = () => {
    dispatch({
      type: RECRUIT_LIST_REQUEST,
      data: { ...form, page: page.current + 1 },
    });
    page.current++;
    paging.current = true;
  };

  const rootRef = useRef();
  const { user, recruit } = useSelector((state) => state);
  // const me = useState({ ...user.me });
  const [, setLoading] = useState(false);

  const [recruitList, setRecruitList] = useState([]);
  const [taglist, setTaglist] = useState([]);
  const tagss = useSelector((state) => state.tag);
  useEffect(() => {
    if (tagss.tagGetData) {
      const temp = Array.from(tagss.tagGetData.tags.POSITION);
      const tt = temp.map((t) => {
        return { ...t, selected: false };
      });
      setTaglist((p) => [...p, ...tt]);
    }
  }, [tagss.tagGetData]);

  useEffect(() => {
    const currentObserver = observe.current;
    const divElm = targetRef.current;
    if (refresh['REFRESH_TOKEN'] === undefined || user.me !== null) {
      if (divElm) {
        currentObserver.observe(divElm);
      }
    }
    return () => {
      if (divElm) {
        currentObserver.unobserve(divElm);
      }
    };
  }, [user.me, refresh]);

  useEffect(() => {
    if (recruit.recruitListLoading) {
      setLoading((prev) => true);
    }
    if (recruit.recruitListDone) {
      setLoading((prev) => false);
      if (paging.current) {
        setRecruitList((prev) => [...prev, ...recruit.recruitList.content]);
      } else {
        setRecruitList([...recruit.recruitList.content]);
      }
      if (recruit.recruitList.last) {
        isLast.current = true;
        paging.current = false;
      }
      dispatch({ type: RECRUIT_LIST_DONE });
      observe.current.observe(targetRef.current);
    }
  }, [recruit, setRecruitList, setLoading, dispatch]);

  useEffect(() => {
    setForm((p) => {
      const ids = taglist
        .filter((t) => t.selected)
        .map((t) => t.id)
        .join(',');
      if (ids === '') {
        // eslint-disable-next-line
        const { tagIds, ...res } = p;
        return { ...res, page: 0 };
      } else {
        return { ...p, page: 0, tagIds: ids };
      }
    });
  }, [taglist, dispatch]);

  useEffect(() => {
    dispatch({
      type: RECRUIT_LIST_REQUEST,
      data: form,
    });
    paging.current = false;
    isLast.current = false;
    page.current = 0;
    prevY.current = 99999;
    observe.current.unobserve(targetRef.current);
    // eslint-disable-next-line
  }, [
    form.tagIds,
    dispatch,
    form.order,
    form.status,
    form.avgSalary,
    form.experience,
  ]);

  const mapRecruit = recruitList.map((pl) => (
    <Post
      id={pl.id}
      tags={[...(pl.tags.POSITION ?? [])]}
      type={'recruit'}
      title={pl.title}
      status={pl.status}
      writer={pl.companyName}
      date={`${pl.openDate[0]}/${pl.openDate[1]}/${pl.openDate[2]}`}
      fav={pl.favorite}
      key={pl.id}
      viewCount={pl.viewCount}
      favoriteCount={pl.favoriteCount}
    />
  ));

  // 게시물 경력검색
  const ExperienceHandler = (sort) => {
    setForm({ ...form, experience: sort, page: 0 });
  };

  // 게시물 연봉검색
  const SalaryHandler = (sort) => {
    setForm({ ...form, avgSalary: sort, page: 0 });
  };

  // 게시물 상태조회
  const StatusHandler = (sort) => {
    setForm({ ...form, status: sort, page: 0 });
  };

  // 게시물 정렬하기
  const OrderHandler = (sort) => {
    setForm({ ...form, order: sort, page: 0 });
  };

  // 게시물 검색하기
  const InputHandler = (e, i) => {
    setForm((p) => {
      // eslint-disable-next-line
      const { title, content, companyName, ...res } = p;
      return {
        ...res,
        size: p.size,
        page: 0,
        [i.target]: e.target.value,
      };
    });
  };
  const EnterHandler = (e) => {
    if (e.key === 'Enter') {
      dispatch({
        type: RECRUIT_LIST_REQUEST,
        data: form,
      });
      paging.current = false;
      isLast.current = false;
      prevY.current = 99999;
      page.current = 0;
      observe.current.unobserve(targetRef.current);
    }
  };

  return (
    <>
      <Banner />
      <div className={'container'}>
        <div ref={rootRef}>
          <div
            className={'text-right'}
            style={{
              position: 'relative',
              height: '60px',
            }}
          >
            <div
              className={'row justify-content-between'}
              style={{ padding: '10px', paddingTop: '0' }}
            >
              <SearchBoxContainerM>
                <SearchBox
                  onInput={InputHandler}
                  onKeyPress={EnterHandler}
                  setForm={setForm}
                  initial={initialList}
                />
                {user.me?.role === 'ROLE_COMPANY' ? (
                  <TagBody
                    style={{ marginTop: '0', border: '1px solid #f5df4d' }}
                    onClick={() => {
                      history.push('./recruitment/add');
                      dispatch({
                        type: COMPANY_GET_REQUEST,
                        data: user.me,
                      });
                    }}
                  >
                    글쓰기
                  </TagBody>
                ) : (
                  ''
                )}
              </SearchBoxContainerM>
              <div style={{ marginLeft: '5px' }}>
                <div style={{ display: 'inline-block' }}>
                  <TagSelector tagList={taglist} setTagList={setTaglist}>
                    필터
                  </TagSelector>
                </div>
                <FilterSelector
                  filterList={statusList}
                  filterHandler={StatusHandler}
                >
                  상태 검색
                </FilterSelector>
                <FilterSelector
                  filterList={experienceList}
                  filterHandler={ExperienceHandler}
                >
                  경력 검색
                </FilterSelector>
                <FilterSelector
                  filterList={salaryList}
                  filterHandler={SalaryHandler}
                >
                  연봉 검색
                </FilterSelector>
                <FilterSelector
                  filterList={recruitOrder}
                  filterHandler={OrderHandler}
                >
                  최신순
                </FilterSelector>
              </div>
              <SearchBoxContainer>
                <SearchBox
                  onInput={InputHandler}
                  onKeyPress={EnterHandler}
                  setForm={setForm}
                  initial={initialList}
                />
                {user.me?.role === 'ROLE_COMPANY' ? (
                  <TagBody
                    style={{
                      marginTop: '0',
                      border: '1px solid #f5df4d',
                    }}
                    onClick={() => {
                      history.push('./recruitment/add');
                      dispatch({
                        type: COMPANY_GET_REQUEST,
                        data: user.me,
                      });
                    }}
                  >
                    글쓰기
                  </TagBody>
                ) : (
                  ''
                )}
              </SearchBoxContainer>
            </div>
          </div>
          <Space></Space>
          <div className={'text-left'} style={{ paddingTop: '8px' }}>
            <TagShower tagList={taglist} setTagList={setTaglist}></TagShower>
          </div>
          {mapRecruit}
        </div>
      </div>
      <div
        style={{ top: '50px', position: 'relative', marginBottom: '100px' }}
        ref={targetRef}
      />
    </>
  );
}

import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Plus } from '@styled-icons/octicons';
import { Minus } from '@styled-icons/entypo/Minus';
import { Search } from 'react-bootstrap-icons';

export const ProfileDiv = styled.div`
  padding: 0 60px 0 30px;
  @media (max-width: 992px) {
    padding: 0 20px;
  }
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const StyledHeaderMargin = styled.div`
  @media (max-width: 992px) {
    margin: 0;
  }
`;

// 버튼 컬러로 노란색 흰색 지정가능
const StyledButtonInside = styled.div`
  color: #7c7c7c;
  background-color: #f5df4d;
  border: 1px solid #f5df4d;
  border-radius: 5px;
  display: inline-block;
  padding: 5px 10px 5px 12px;
  font-weight: bold;
  width: 100px;
  letter-spacing: 2px;
  text-align: center;
  margin: 10px;
  cursor: pointer;
  user-select: none;
  @media (max-width: 1200px) {
    width: 100px;
    font-size: 13px;
  }
  @media (max-width: 992px) {
    width: 70px;
    font-size: 11px;
  }
  //@media (max-width: 576px) {
  //  width: 60px;
  //  font-size: 10px;
  //}

  ${(props) =>
    props.sm &&
    css`
      width: fit-content;
      font-size: 13px;
    `}
  ${(props) =>
    props.first &&
    css`
      position: absolute;
      left: 0;
    `}
  ${(props) =>
    props.top &&
    css`
      position: absolute;
      top: 0;
    `} ${(props) =>
    props.bottom &&
    css`
      position: absolute;
      bottom: 0;
    `} ${(props) =>
    props.vcenter &&
    css`
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    `} ${(props) =>
    props.hcenter &&
    css`
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    `} ${(props) =>
    props.last &&
    css`
      position: absolute;
      right: 0;
    `}
  &:hover {
    background-color: #f2d411;
  }

  //흰색일경우
  ${(props) =>
    props.white &&
    css`
      color: #7c7c7c;
      background-color: white;
      border: 1px solid #7c7c7c;

      &:hover {
        color: white;
        background-color: #7c7c7c;
      }
    `}

  ${(props) =>
    props.grey &&
    css`
      color: white;
      background-color: #7c7c7c;
      border: 1px solid #7c7c7c;

      &:hover {
        color: #7c7c7c;
        background-color: white;
      }
    `}

  ${(props) =>
    props.red &&
    css`
      color: white;
      background-color: #e14040;
      border: 1px solid #e14040;

      &:hover {
        color: white;
        background-color: #ff5454;
      }
    `}

  ${(props) =>
    props.mid &&
    css`
      width: 150px;
      @media (max-width: 1200px) {
        width: 120px;
      }
      @media (max-width: 992px) {
        width: 100px;
      }
    `}

  ${(props) =>
    props.wide &&
    css`
      width: 150px;
      @media (max-width: 1200px) {
        width: 150px;
      }
      //@media (max-width: 992px) {
      //  width: 100px;
      //  font-size: 11px;
      //}
      @media (max-width: 992px) {
        width: 100px;
        font-size: 11px;
      }
    `}
`;

// 헤더: 모바일 환경에선 보통 헤더이나 태블릿 pc 환경에서는 sticky 로 동작한다
// fixed 로변경
// Todo 텍스트 수직 중간
export const StyledHeaderDivInside = styled.div`
  //border-bottom: 1px solid #eee;
  padding: 20px 0 5px 0;
  background-color: white;
  z-index: 5;
  margin-bottom: 50px;
  position: sticky;
  top: 60px;
  //vertical-align: middle;
  //@media (min-width: 768px) {
  //  position: sticky;
  //  top: 60px;
  //}
  h1 {
    font-size: 20px;
  }

  @media (max-width: 992px) {
    padding: 5px 0 0 0;
  }

  ${(props) =>
    props.padding &&
    css`
      padding: 40px 0 0 190px;
      @media (max-width: 992px) {
        padding-left: 0;
      }
    `}
  ${(props) =>
    props.fix &&
    css`
      position: relative;
      top: 30px;
    `}
  & h5 {
    font-size: 25px;
    margin-left: 10px;
    @media (max-width: 992px) {
      font-size: 18px;
    }
    @media (max-width: 768px) {
      margin-left: 0;
    }
  }
`;

export const HeaderTitle = styled.div`
  margin: 10px;
  flex: 1;
  padding: 5px;
  font-size: 18px;
  text-align: left;
`;

export const StyledHeaderDiv = ({ children, padding, fix, title }) => (
  <>
    <StyledHeaderDivInside padding={padding} fix={fix}>
      <div
        style={{
          borderBottom: '1px solid #eee ',
          display: 'flex',
          flexWrap: 'nowrap',
          paddingBottom: '2px',
        }}
      >
        {title !== undefined && <HeaderTitle>{title}</HeaderTitle>}
        {children}
      </div>
    </StyledHeaderDivInside>
  </>
);

export const StyledButton = ({
  children,
  top,
  bottom,
  vcenter,
  hcenter,
  last,
  white,
  grey,
  red,
  mid,
  wide,
  sm,
  first,
  style,
  onClick,
}) => (
  <StyledButtonInside
    top={top}
    bottom={bottom}
    vcenter={vcenter}
    hcenter={hcenter}
    last={last}
    white={white}
    mid={mid}
    wide={wide}
    sm={sm}
    first={first}
    style={style}
    onClick={onClick}
    grey={grey}
    red={red}
  >
    {children}
  </StyledButtonInside>
);

// 태그바디

const TagBodyInside = styled.div`
  position: relative;
  //tagType 일경우 드롭다운 박스 색이나옴
  color: #7c7c7c;
  background-color: ${(props) => (!props.tagType ? '#f5df4d' : 'white')};

  ${(props) =>
    props.grey &&
    css`
      background-color: #7c7c7c;
      color: white;
    `}

  ${(props) =>
    props.tagType &&
    css`
      border: #d3d3d3 1px solid;
      color: black;
    `};
  border-radius: 5px;
  //min-width: 125px;
  height: 38px;
  font-size: 15px;
  user-select: none;
  cursor: pointer;
  display: inline-flex;
  flex-direction: row;
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: center;
  vertical-align: middle;
  width: fit-content;
  padding: 0 13px 0;
  @media (max-width: 768px) {
    font-size: 13px;
    height: 28px;
  }

  //태그 크기조절 sm
  ${(props) =>
    props.sm &&
    css`
      height: 25px;
      font-size: 13px;
    `}
  ${(props) =>
    props.tagType &&
    css`
      display: flex;
    `}
`;

export const TagText = styled.div`
  margin: auto;
`;

// 찜박스 메인컨텐츠가 컨테이너일경우 left 값 계산
// 공간이 충분하지 않을경우 사라지고 충분할경우 다시 생김
export const StyledLike = styled.div`
  position: fixed;
  top: 260px;
  width: 50px;
  border-radius: 15px;
  height: 100px;
  background-color: #eee;
  //border: grey 1px solid;
  display: none;
  padding: 10px 0 0 0;

  & > * {
    margin-bottom: 5px;
  }

  @media (min-width: 576px) {
    display: none;
  }
  @media (min-width: 675px) {
    left: calc((100% - 540px) / 2 - 50px);
    display: block;
  }
  @media (min-width: 768px) {
    display: none;
  }
  @media (min-width: 878px) {
    left: calc((100% - 720px) / 2 - 60px);
    display: block;
  }
  @media (min-width: 992px) {
    display: none;
  }
  @media (min-width: 1100px) {
    left: calc((100% - 960px) / 2 - 60px);
    display: block;
  }
  @media (min-width: 1200px) {
    display: none;
  }

  @media (min-width: 1300px) {
    left: calc((100% - 1140px) / 2 - 70px);
    display: block;
  }
`;
export const TagBody = ({ sm, children, tagType, onClick, grey, style }) => (
  <TagBodyInside
    sm={sm}
    tagType={tagType}
    onClick={onClick}
    grey={grey}
    style={style}
  >
    <TagText>{children}</TagText>
  </TagBodyInside>
);

// 왼쪽레이아웃 작아질경우 오른쪽 보더 선 삭제
const StyledLeftLayoutInside = styled.div`
  border-right: 1px solid #eee;
  //border-right: 1px solid #eee;
  @media (max-width: 992px) {
    border: none;
    display: none;
  }
  ${(props) =>
    props.borderNone &&
    css`
      border: none;
    `}
`;

export const StyledLeftLayout = ({ borderNone, children, className }) => (
  <StyledLeftLayoutInside borderNone={borderNone} className={className}>
    {children}
  </StyledLeftLayoutInside>
);

// Profile Styled
export default function Styled() {
  return <></>;
}

// Profile Styled
export const ProfileItems = styled.div`
  margin-bottom: 40px;
`;
export const ProfileTitles = styled.div`
  margin-bottom: 15px;
`;
export const RequiredItems = styled.span`
  color: red;
`;
export const InputText = styled.input`
  width: 100%;
  height: 35px;
  border-radius: 27px;
  margin-bottom: 10px;
  border: 1px solid silver;
  padding: 0 20px 3px;

  &:focus {
    outline: none;
  }
`;
export const TextArea = styled.textarea`
  width: 100%;
  border-radius: 27px;
  border: 1px solid silver;
  resize: none;
  padding: 10px 20px 3px;

  &:focus {
    outline: none;
  }
`;
export const TextAreaLength = styled.input`
  position: relative;
  top: -40px;
  right: 10px;
  width: 45px;
  border: none;
  text-align: right;
  background-color: rgba(0, 0, 0, 0);
  color: silver;

  &:focus {
    outline: none;
  }
`;

// SideMenu Styled
export const MyButton = styled.div`
  border: #707070;
  height: 50px;
  text-align: center;
  padding-top: 10px;
`;

export const MyLink = styled(Link)`
  color: #8c8c8c;
  text-decoration: none;

  &:hover {
    color: black;
  }
`;

export const MySideMenu = styled.div`
  position: sticky;
  top: 100px;
  width: 150px;
  border: 0.5px solid silver;
  border-radius: 10px;
  padding: 15px 15px;
  z-index: 5;
  @media (max-width: 992px) {
    display: none;
  }
`;

export const MyHr = styled.hr`
  margin: 8px 0;
`;

// Profile Image
export const ProfileImg = styled.div`
  text-align: center;
  line-height: 200px;
`;
export const MyImage = styled.img`
  width: 200px;
  height: 200px;
  border: 1px solid black;
  border-radius: 50%;
  margin: 0 auto;
`;
export const CenterContainer = styled.div`
  min-width: 280px;
  max-width: 544px;
  border: 1px solid #d3d3d3;
  border-radius: 15px;
  margin-top: 100px;
`;
export const StyledArticle = styled.div`
  @media (max-width: 992px) {
    padding: 0;
  }
`;

// Resume styled
export const ResumeTitle = styled.div`
  margin-bottom: 15px;
  font-size: 25px;
`;

export const Warning = styled.span`
  margin-left: 20px;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: -1px;
  @media (max-width: 992px) {
    display: block;
    margin-left: 0;
    margin-top: 10px;
    font-size: 10px;
  }
`;

export const Private = styled.span`
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
  margin-right: 10px;
`;

export const ResumeImg = styled.img`
  display: inline-block;
  border: 1px solid black;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 200px;
  margin-top: 12px;
  margin-left: 30px;
  @media (max-width: 992px) {
    margin-left: 0;
  }
`;

export const CareerItems = styled.div`
  padding-left: 30px;
`;

export const Site = styled.span`
  margin-right: 10px;
`;

export const MyEducation = styled.div`
  font-size: 15px;
  margin-bottom: 10px;
  font-weight: bold;
`;

export const EducationItems = styled.div`
  padding-left: 30px;
`;

export const ResumeItems = styled.div`
  margin: 0 5px 5px 0;
`;

export const ResumeTitles = styled.div`
  margin-bottom: 5px;
  color: gray;
`;

export const InputTextResume = styled.input`
  width: 100%;
  height: 35px;
  border-radius: 5px;
  background-color: #fdfdfd;
  border: 1px solid silver;
  padding: 0 20px 3px;
  margin-bottom: 5px;

  &:focus {
    outline: none;
  }
`;

export const Wrapper = styled.div`
  display: inline-block;
  color: gray;
  flex: ${(props) => props.flex};

  ${(props) =>
    props.margin &&
    css`
      margin-top: 15px;
      margin-right: 10px;
    `}
  ${(props) =>
    props.basic &&
    css`
      width: 100%;
    `}
  ${(props) =>
    props.sns &&
    css`
      margin: 0;
      width: 100%;
    `}
  ${(props) =>
    props.item &&
    css`
      width: 200px;
    `}
  &:focus {
    outline: none;
  }

  @media (max-width: 992px) {
    width: 100%;
    ${(props) =>
      props.wide &&
      css`
        padding: 0;
      `}
  }
`;

//  #f5df4d
export const PostTextArea = styled.textarea`
  resize: none;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #d3d3d3;
  padding: 8px;

  &:focus {
    outline: none;
  }
`;

export const PostTitleInput = styled.input`
  border: none;
  padding-left: 15px;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

export const PostWriterDate = styled.div`
  margin: 10px 0 20px 0;
  @media (max-width: 992px) {
    font-size: 13px;
    margin-left: 3px;
  }
`;

export const MyPlus = styled.div`
  float: right;
  background: none;
  outline: none;
  border: none;
  color: black;
  font-size: 25px;
  cursor: pointer;
  padding-right: 0.9rem;
  padding-left: 1rem;
  padding-bottom: 0.4rem;
  //margin-right: 50px;
  border-radius: 50%;
  transition: 0.1s background ease-in;

  &:hover {
    background: radial-gradient(gold, white, white);
  }
`;

export const Add = styled(Plus)`
  width: 18px;
  color: black;
`;

export const Subtract = styled(Minus)`
  width: 18px;
  color: black;
`;

export const DataInputs = styled.div`
  border: none;
  border-bottom: 1px solid #a1a1a1;
  padding: 2px 0 2px 2px;
  width: 84px;
  margin: 0 5px;
  display: inline-block;
`;

const SearchInputInside = styled.input`
  width: 100%;
  border: none;
  height: 50px;
  border-radius: 15px;
  border-bottom: 1px solid #eee;
  padding: 0 0 4px 40px;
  font-size: 25px;

  &:focus {
    outline: none;
  }
`;

export const SearchInput = ({ placeholder, onChange, value }) => {
  return (
    <>
      <Search style={{ position: 'absolute', top: '14px', left: '12px' }} />
      <SearchInputInside
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
};

// 게시판 검색
export const SearchBox = ({ onInput, onClick, setForm }) => {
  // 드롭다운 선택
  const initialList = useMemo(
    () => [
      { name: '제    목', state: false, target: 'title' },
      { name: '내    용', state: false, target: 'content' },
      { name: '제목+내용', state: false, target: '' },
      { name: '작 성 자', state: false, target: 'author' },
    ],
    []
  );
  const [list, setList] = useState([...initialList]);
  const [dropTop, setDropTop] = useState([
    { name: '제    목', state: true, target: 'title' },
  ]);
  useEffect(() => {
    const tmp = list.filter((i) => i.state);
    // state가 true인 항목이 1개보다 많을 경우
    if (tmp.length > 0) {
      setDropTop([...tmp]);
      setList([...initialList]);
    }
  }, [initialList, list]);

  const DropList = list
    .filter((i) => !i.state)
    .map((i, index) => (
      <span key={index}>
        <div
          onClick={() => {
            i.state = true;
            setForm((p) => ({
              size: p.size,
              page: p.page,
              searchBar: p.searchBar,
              [i.target]: keyword,
            }));
          }}
        >
          {i.name}
        </div>
      </span>
    ));

  // 드롭다운 보이기 / 숨기기
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState('');
  const showRef = useRef();
  const ClickHandler = (e) => {
    if (showRef.current) {
      if (show && !showRef.current.contains(e.target)) {
        setShow(false);
      }
    }
  };
  useEffect(() => {
    addEventListener('click', ClickHandler, true);
    return () => {
      removeEventListener('click', ClickHandler, true);
    };
  });
  return (
    <SearchOutline ref={showRef}>
      <Category onClick={() => setShow(true)}>{dropTop[0].name}</Category>
      <CategoryInput
        type="text"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
          onInput(e, dropTop[0]);
        }}
        maxLength="8"
      />
      <Search
        style={{
          verticalAlign: 'middle',
          cursor: 'pointer',
          transform: 'translateY(-2px)',
        }}
        onClick={() => onClick()}
      />
      {show && <CategoryDrop>{DropList}</CategoryDrop>}
    </SearchOutline>
  );
};

const CategoryInput = styled.input`
  width: 100px;
  outline: none;
  height: 100%;
  border: none;
  @media (max-width: 768px) {
    width: 75px;
    height: 20px;
  }
`;
const CategoryDrop = styled.div`
  width: 85px;
  text-align: center;
  vertical-align: baseline;
  position: relative;
  z-index: 2;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  @media (max-width: 768px) {
    font-size: 12px;
    width: 66px;
    padding: 5px;
  }
`;

const Category = styled.div`
  width: 55px;
  cursor: pointer;
  padding-left: 10px;
  text-align: left;
  padding-top: 4px;
  display: inline-block;
  border-radius: 5px;
  vertical-align: center;
  @media (max-width: 768px) {
    width: 35px;
    font-size: 12px;
    padding-top: 0;
  }
`;

const SearchOutline = styled.div`
  color: #7c7c7c;
  height: 38px;
  padding-right: 8px;
  margin-right: 5px;
  display: inline-block;
  border: 3px #7c7c7c solid;
  border-radius: 5px;
  vertical-align: top;
  text-align: left;
  @media (max-width: 768px) {
    font-size: 13px;
    height: 28px;
    width: 140px;
  }
`;

// 게시물 조회순서
export const Order = ({ inOrder }) => {
  const [items, setItems] = useState([
    { name: '조회순', sort: 'viewCount' },
    { name: '추천순', sort: 'favoriteCount' },
    { name: '댓글순', sort: 'commentCount' },
  ]);
  const itemList = items.map((i, index) => (
    <Type
      key={index}
      onClick={() => {
        inOrder(i.sort);
        setItems((p) => {
          const temp = items[0];
          p[0] = i;
          p[index] = temp;
          return p;
        });
      }}
    >
      {i.name}
    </Type>
  ));

  return <OrderList>{itemList}</OrderList>;
};

const OrderList = styled.div`
  display: inline-block;
  overflow: hidden;
  flex-direction: row;
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: center;
  vertical-align: top;
  width: fit-content;
  padding: 7px 13px 0;
  height: 38px;
  font-size: 15px;
  user-select: none;
  cursor: pointer;
  border: #d3d3d3 1px solid;
  color: black;
  background-color: white;
  border-radius: 5px;
  position: relative;
  z-index: 2;
  @media (max-width: 768px) {
    font-size: 13px;
    height: 28px;
    padding-top: 4px;
  }

  &:hover {
    overflow: visible;
    height: fit-content;
  }
`;

const Type = styled.div`
  border-bottom: #d3d3d3;
  margin-bottom: 7px;
`;

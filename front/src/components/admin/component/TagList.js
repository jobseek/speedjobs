import React, { useCallback, useEffect, useState } from 'react';
import { HiPlus, MdDelete, MdEdit } from 'react-icons/all';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Notification/Loading';
import { TAG_ADD_REQUEST, TAG_GET_REQUEST } from '../../../reducers/tag';

const AdminStyledInput = styled.input`
  flex: 1;
  border: none;
  padding: 0 10px;

  &:focus {
    outline: none;
  }
`;
const AdminStyledSelect = styled.select`
  flex: 0 0 100px;
  border: none;
  border-left: #d7d7d7 1px solid;

  &:focus {
    outline: none;
  }
`;

const AdminStyledButton = styled.button`
  flex: 0 0 50px;
  ${(props) =>
    !props.show &&
    css`
      flex: 0 0 0;
      padding: 0;
      & > * {
        display: none;
      }
    `}
  border: none;
  background-color: #d7d7d7;
  transition: all ease-in-out 300ms;
  ${(props) =>
    props.warning &&
    css`
      background-color: #ff7a7a;
    `}
`;

export const AdminStyledRow = styled.div`
  color: white;
  background-color: gray;
  width: 100%;
`;

export const AdminStyledCol = styled.div`
  width: 100%;
  border-bottom: #e7e7e7 solid 1px;
  ${(props) =>
    props.selected &&
    css`
      background-color: #e7e7e7;
    `}
`;

export default function TagList(props) {
  const [tagList, set] = useState([]);
  const [loading, setLoading] = useState(false);
  const tags = useSelector((state) => state.tag);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [input, setInput] = useState({
    id: -1,
    name: '',
    type: 'SKILL',
    selected: false,
  });

  const onChangeHandler = useCallback((e) => {
    setInput((p) => ({ ...p, [e.target.name]: e.target.value }));
  }, []);
  const onClickHandler = useCallback(
    (tag) => {
      if (!tag.selected) {
        tag.selected = true;
        setSelected((p) => {
          if (p.length !== 0) tagList[tagList.indexOf(p[0])].selected = false;
          return [tag];
        });
        setInput(tag);
      } else {
        tag.selected = false;
        setSelected((p) => {
          const ret = selected.filter((s) => s.selected);
          if (ret.length === 0)
            setInput({ id: -1, name: '', selected: false, type: 'SKILL' });
          return ret;
        });
      }
    },
    [selected, tagList]
  );
  const onSubmitHandler = (e) => {
    console.log(input);
    const temp = input;
    temp.selected = false;
    if (input.id < 0) {
      dispatch({
        type: TAG_ADD_REQUEST,
        data: { name: temp.name, type: temp.type },
      });
    } else {
      set((p) => {
        return [
          ...p
            .filter((f) => f.id !== input.id)
            .map((m) => {
              m.selected = false;
              return m;
            }),
          temp,
        ];
      });
      setInput({ id: -1, name: '', selected: false, type: '' });
    }
  };

  // const deleteHandler = useCallback((e) => {}, [selected]);

  useEffect(() => {
    console.log('hi');
    if (tags.tagAddDone || tags.tagDeleteDone || tags.tagEditDone) {
      console.log('patch');
      dispatch({
        type: TAG_GET_REQUEST,
      });
    }
    if (!tags.tagGetLoading) {
      const pList = [...tags.tagGetData.tags.POSITION];
      const sList = [...tags.tagGetData.tags.SKILL];
      set(
        pList
          .map((p) => ({ ...p, type: 'POSITION', selected: false }))
          .concat(sList.map((s) => ({ ...s, type: 'SKILL', selected: false })))
      );
      setLoading(false);
    } else if (
      tags.tagDeleteLoading ||
      tags.tagEditLoading ||
      tags.tagGetLoading ||
      tags.tagAddLoading
    ) {
      setLoading(true);
    }
  }, [dispatch, tags]);
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <div style={{ display: 'flex', height: '35px' }}>
            <AdminStyledInput
              onChange={onChangeHandler}
              value={input.name}
              name={'name'}
              placeholder={'태그이름'}
            ></AdminStyledInput>
            <AdminStyledSelect
              onChange={onChangeHandler}
              value={input.type}
              name={'type'}
            >
              <option>SKILL</option>
              <option>POSITION</option>
            </AdminStyledSelect>
            <AdminStyledButton show={true} onClick={onSubmitHandler}>
              {selected.length === 0 ? <HiPlus></HiPlus> : <MdEdit></MdEdit>}
            </AdminStyledButton>
            <AdminStyledButton show={selected.length !== 0} warning>
              <MdDelete></MdDelete>
            </AdminStyledButton>
          </div>

          <div className={'container-fluid p-0'}>
            <AdminStyledRow className={'row m-0'}>
              <div className={'col-4'}>이름</div>
              <div className={'col-4'}>아이디</div>
              <div className={'col-4'}>분류</div>
            </AdminStyledRow>
            <div style={{ overflowY: 'scroll', height: '80vh' }}>
              {tagList.map((tag) => (
                <AdminStyledCol
                  id={tag.id}
                  className={'row m-0'}
                  onClick={() => onClickHandler(tag)}
                  selected={tag.selected}
                >
                  <div className={'col-4'}>{tag.name}</div>
                  <div className={'col-4'}>{tag.id}</div>
                  <div className={'col-4'}>{tag.type}</div>
                </AdminStyledCol>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

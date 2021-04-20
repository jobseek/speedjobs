import React, { useCallback, useEffect, useState } from 'react';
import { HiPlus, MdDelete, MdEdit } from 'react-icons/all';
import styled, { css } from 'styled-components';

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
  border: none;
  background-color: #d7d7d7;
  transition: all ease-in-out 300ms;
  ${(props) =>
    props.warning &&
    css`
      background-color: #ff7a7a;
    `}
`;

const AdminStyledRow = styled.div`
  color: white;
  background-color: gray;
  width: 100%;
`;

const AdminStyledCol = styled.div`
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
  const [selected, setSelected] = useState([]);
  const [input, setInput] = useState({
    id: -1,
    name: '',
    type: '',
    selected: false,
  });

  const onChangeHandler = useCallback((e) => {
    setInput((p) => ({ ...p, [e.target.name]: e.target.value }));
  }, []);
  const onClickHandler = useCallback((tag) => {
    if (!tag.selected) {
      tag.selected = true;
      setSelected((p) => [...p, tag]);
      setInput(tag);
    } else {
      selected.find((s) => s.id === tag.id).selected = false;
      setSelected((p) => selected.filter((s) => s.selected));
    }
  }, []);
  const onSubmitHandler = (e) => {
    console.log(input);
    const temp = input;
    temp.selected = false;
    if (input.id < 0) {
      console.log('서버전송이 필요');
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
  const initTagList = () => {
    set((p) => {
      let arr = [...p];
      for (let i = 0; i < 10; i++) {
        arr = [
          ...arr,
          { id: i, name: `태그${i}`, type: '스킬', selected: false },
        ];
      }
      return arr;
    });
  };

  useEffect(() => {
    initTagList();
  }, []);

  return (
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
          <option>스킬</option>
          <option>직무</option>
        </AdminStyledSelect>
        <AdminStyledButton onClick={onSubmitHandler}>
          {selected.length === 0 ? <HiPlus></HiPlus> : <MdEdit></MdEdit>}
        </AdminStyledButton>
        {selected.length !== 0 && (
          <AdminStyledButton warning>
            <MdDelete></MdDelete>
          </AdminStyledButton>
        )}
      </div>
      <div className={'container-fluid p-0'}>
        <AdminStyledRow className={'row m-0'}>
          <div className={'col-4'}>이름</div>
          <div className={'col-4'}>아이디</div>
          <div className={'col-4'}>분류</div>
        </AdminStyledRow>
        {tagList.map((tag) => (
          <AdminStyledCol
            id={tag.id}
            className={'row m-0'}
            style={{ width: '100%', borderBottom: '#e7e7e7 solid 1px' }}
            onClick={() => onClickHandler(tag)}
            selected={tag.selected}
          >
            <div className={'col-4'}>{tag.name}</div>
            <div className={'col-4'}>{tag.id}</div>
            <div className={'col-4'}>{tag.type}</div>
          </AdminStyledCol>
        ))}
      </div>
    </>
  );
}

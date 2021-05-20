## 4월 25일 
어드민 페이지 표 스타일
```javascript
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
```
## 3월 25일

1.기업회원가입 페이지

2.찜목록 리스트 페이지 

3.공고목록 리스트 페이지

4.이력서(모바일)

5.이메일 모달

6.프로파일 쪽 왼쪽 헤더 레이아웃 조절

7.이력서 모바일페이지


`<StyledButton {wide} {mid} {white} {end} {vcenter} {hcenter} {bottom}/>`

![img.png](readmeResource/img.png)

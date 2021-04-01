import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCookies } from 'react-cookie';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import Header from './components/includes/Header';
import Footer from './components/includes/Footer';
import Home from './components/pages/Home';
import Recruitment from './components/pages/Recruitment';
import RecruitmentDetail from './components/pages/RecruitmentDetail';
import Community from './components/pages/Community';
import PostDetail from './components/pages/PostDetail';
import Profile from './components/pages/Profile';
import Resume from './components/pages/Resume';
import RecruitLike from './components/pages/RecruitLike';
import CommuLike from './components/pages/CommuLike';
import MemberRegistration from './components/pages/MemberRegistration';
import { loginInterceptor } from './auth/interceptor';
import { ME_REQUEST } from './reducers/user';

const Container = styled.div`
  padding-bottom: 40px;
  height: 100%;
`;

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [refresh, setRefresh, removeRefresh] = useCookies(['REFRESH_TOKEN']);
  // 리프레시 토큰발급 함수 인터셉터 사용
  useEffect(() => {
    console.log('리프레시');
    setRefresh('toRefresh', 'toRefresh');
    removeRefresh('toRefresh');
    loginInterceptor(refresh, removeRefresh);
  }, [refresh, removeRefresh, setRefresh, user.logInDone]);
  //  유저 상태 유지
  useEffect(() => {
    console.log('상태유지');
    if (!user.meDone) {
      dispatch({
        type: ME_REQUEST,
      });
    }
  }, [dispatch, user.meDone]);
  // 메타데이터설정 아이폰일경우 화면크기 조정
  useEffect(() => {
    const meta = document.createElement('meta');

    meta.name = 'viewport';
    meta.content =
      'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover';
    document.getElementsByTagName('head')[0].appendChild(meta);
  }, [dispatch, user]);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Container>
          <Route exact path={'/community'} component={Community} />
          <Route exact path={'/'} component={Home} />
          <Route exact path={'/recruit'} component={Recruitment} />
          <Route exact path={'/recruit/detail'} component={RecruitmentDetail} />
          <Route exact path={'/community/post'} component={PostDetail} />
          <Route exact path={'/profile'} component={Profile} />
          <Route exact path={'/resume'} component={Resume} />
          <Route exact path={'/likelist/community'} component={CommuLike} />
          <Route exact path={'/likelist/recruit'} component={RecruitLike} />
          <Route exact path={'/registration'} component={MemberRegistration} />
        </Container>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

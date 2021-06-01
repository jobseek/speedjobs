import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCookies } from 'react-cookie';
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import styled from 'styled-components';
import './App.css';
import Header from './includes/Header';
import Footer from './includes/Footer';
import Home from './pages/Home';
import Recruitment from './pages/Recruitment';
import RecruitmentDetail from './pages/RecruitmentDetail';
import Community from './pages/Community';
import PostDetail from './pages/PostDetail';
import Profile from './pages/profile/Profile';
import Withdrawal from './pages/profile/Withdrawal';
import Resume from './pages/Resume';
import ResumeList from './pages/ResumeList';
import RecruitLike from './pages/RecruitLike';
import CommuLike from './pages/CommuLike';
import MemberRegistration from './pages/MemberRegistration';
import { loginInterceptor } from './auth/interceptor';
import { ME_REQUEST } from './reducers/user';
import PostAdd from './pages/PostAdd';
import RecruitAdd from './pages/RecruitAdd';
import ScrollToTop from './includes/ScrollToTop';
import Login from './admin/page/Login';
import AdminHome from './admin/page/AdminHome';
import IndividualModify from './pages/profile/IndividualModify';
import CorporateModify from './pages/profile/CorporateModify';
import { TAG_GET_REQUEST } from './reducers/tag';
import PostModify from './pages/PostModify';
import ResumeDetails from './pages/ResumeDetails';
import SubmitList from './pages/SubmitList';
import MyRecruitments from './pages/MyRecruitments';
import MyPosts from './pages/MyPosts';
import ResumeModify from './pages/ResumeModify';
import RecruitModify from './pages/RecruitModify';
import NotFound from './pages/NotFound';
import SocialLogin from './pages/SocialLogin';

const Container = styled.div`
  padding-bottom: 40px;
  height: 100%;
`;

function App() {
  const dispatch = useDispatch();
  const { user, tag } = useSelector((state) => state);
  const [interceptorID, setInterceptorID] = useState({
    request: 0,
    response: 0,
  });
  const [refresh, setRefresh, removeRefresh] = useCookies(['REFRESH_TOKEN']);
  // 리프레시 토큰발급 함수 인터셉터 사용
  const afterUpdate = useCallback(() => {
    if (
      !user.needLogin &&
      !user.meDone &&
      !user.logInWelcomed &&
      refresh['REFRESH_TOKEN'] !== undefined
    ) {
      dispatch({
        type: ME_REQUEST,
        data: { accessToken: refresh['ACCESS_TOKEN'] },
      });
    }
  }, [dispatch, user.meDone, refresh, user.needLogin, user.logInWelcomed]);
  useEffect(() => {
    setRefresh('toRefresh', 'toRefresh');
    removeRefresh('toRefresh');
    const IDS = loginInterceptor(
      refresh,
      removeRefresh,
      interceptorID,
      user.needLogin
    );
    setInterceptorID((prev) => {
      prev.request = IDS.request;
      prev.response = IDS.response;
      return prev;
    });
    afterUpdate();
  }, [
    refresh,
    removeRefresh,
    afterUpdate,
    setRefresh,
    user.logInDone,
    interceptorID,
    user.needLogin,
  ]);
  //  유저 상태 유지
  // 메타데이터설정 아이폰일경우 화면크기 조정
  useEffect(() => {
    const meta = document.createElement('meta');

    meta.name = 'viewport';
    meta.content =
      'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover';
    document.getElementsByTagName('head')[0].appendChild(meta);
  }, [dispatch, user]);

  // 태그 불러오기
  useEffect(() => {
    if (!tag.tagGetData) {
      dispatch({
        type: TAG_GET_REQUEST,
      });
    }
  }, [tag.tagGetData, dispatch]);
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Container>
          <Switch>
            <Route exact path={'/community'} component={Community} />
            <Route exact path={'/community/myList'} component={MyPosts} />
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/recruit'} component={Recruitment} />
            <Route path={'/recruit/detail/:id'} component={RecruitmentDetail} />
            <Route path={'/community/post/:id'} component={PostDetail} />
            <Route exact path={'/profile'} component={Profile} />
            <Route exact path={'/profile/delete'} component={Withdrawal} />
            <Route
              exact
              path={'/profile/individual/modify'}
              component={IndividualModify}
            />
            <Route
              exact
              path={'/profile/corporate/modify'}
              component={CorporateModify}
            />
            <Route exact path={'/resume/new'} component={Resume} />
            <Route exact path={'/resume/list'} component={ResumeList} />
            <Route exact path={'/resume/submit'} component={SubmitList} />
            <Route exact path={'/resume/:id'} component={ResumeDetails} />
            <Route exact path={'/resume/modify/:id'} component={ResumeModify} />
            <Route exact path={'/likelist/community'} component={CommuLike} />
            <Route exact path={'/likelist/recruit'} component={RecruitLike} />
            <Route
              exact
              path={'/registration'}
              component={MemberRegistration}
            />
            <Route exact path={'/community/add'} component={PostAdd} />
            <Route
              exact
              path={'/community/modify/:id'}
              component={PostModify}
            />
            <Route exact path={'/recruitment/add'} component={RecruitAdd} />
            <Route
              exact
              path={'/recruitment/modify/:id'}
              component={RecruitModify}
            />
            <Route
              exact
              path={'/recruitment/myList'}
              component={MyRecruitments}
            />
            <Route exact path={'/admin/login'} component={Login} />
            <Route exact path={'/admin/home'} component={AdminHome} />
            <Route exact path={'/login'} component={SocialLogin} />
            <Route path={'*'} component={NotFound} />
          </Switch>
        </Container>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

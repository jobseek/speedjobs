import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
// import { Helmet } from 'react-helmet';
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
import { LOG_IN_FAILURE, LOG_IN_WELCOMED } from './reducers/user';

const Container = styled.div`
  padding-bottom: 40px;
  height: 100%;
`;

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const meta = document.createElement('meta');

    meta.name = 'viewport';
    meta.content =
      'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover';
    document.getElementsByTagName('head')[0].appendChild(meta);

    // 로그인연장
    if (user.logInDone) {
      axios
        .get('/auth/reissue')
        .then((response) =>
          dispatch({
            type: LOG_IN_WELCOMED,
            data: response.data,
          })
        )
        .catch((error) =>
          dispatch({
            type: LOG_IN_FAILURE,
            error: '토큰 리프레시 실패' ?? error,
          })
        );
    }
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

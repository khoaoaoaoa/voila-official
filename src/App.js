import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./LandingPageComponents/Homepage/Homepage";
import MainPage from "./MainPageComponents/MainPage/MainPage";
import { AuthContextProvider } from "./Context/AuthContext";
import NotFound from "./404NotFound/404NotFound.js";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import SpinnerLoading from "./Components/SpinnerLoading/SpinnerLoading";
import { ToastContainer } from "react-toastify";
import SocialMedia from "./MainPageComponents/SocialMedia/SocialMedia";
import Materials from "./MainPageComponents/Materials/Materials";
import GroupStudy from "./MainPageComponents/GroupStudy/GroupStudy";
import FlashcardsReview from "./MainPageComponents/FlashcardsReview/FlashcardsReview";

import NewPost from "./MainPageComponents/SocialMedia/NewPost/NewPost";
import ContentSide from "./MainPageComponents/SocialMedia/ContentSide/ContentSide";
import FeynmanTechnique from "./MainPageComponents/FeynmanTechnique/FeynmanTechnique";
import GroupRoom from "./MainPageComponents/GroupStudy/GroupRoom/GroupRoom";
import PersonalRoom from "./MainPageComponents/GroupStudy/PersonalRoom/PersonalRoom";
import MeetingView from "./MainPageComponents/GroupStudy/GroupRoom/MeetingView/MeetingView";
function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <div className="App">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Routes>
            <Route
              path="/main"
              element={
                <SpinnerLoading key={0}>
                  <ProtectedRoute>
                    <MainPage />
                  </ProtectedRoute>
                </SpinnerLoading>
              }>
              {" "}
              <Route index element={<FeynmanTechnique />} />
              <Route path="feynmanTechnique" element={<FeynmanTechnique />} />
              <Route path="social-media" element={<SocialMedia />}>
                <Route index element={<ContentSide />} />
                <Route path="newPost" element={<NewPost />} />
                <Route path="news" element={<ContentSide />} />
              </Route>
              <Route path="materials" element={<Materials />} />
              <Route path="groupStudy" element={<GroupStudy />}>
                <Route path="personalRoom" element={<PersonalRoom />} />
                <Route path="groupRoom" element={<GroupRoom />}>
                  <Route path=":meetingId" element={<MeetingView />} />
                </Route>
              </Route>
              <Route path="flashcardsReview" element={<FlashcardsReview />} />
            </Route>

            <Route
              path="/"
              element={
                <SpinnerLoading key={1}>
                  <Homepage />
                </SpinnerLoading>
              }
            />

            <Route
              path="*"
              element={
                <SpinnerLoading key={2}>
                  <NotFound />{" "}
                </SpinnerLoading>
              }
            />
          </Routes>
        </div>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

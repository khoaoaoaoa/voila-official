import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./LandingPageComponents/Homepage/Homepage";
import MainPage from "./MainPageComponents/MainPage/MainPage";
import { AuthContextProvider } from "./Context/AuthContext";
import NotFound from "./404NotFound/404NotFound.js";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import SpinnerLoading from "./LandingPageComponents/Components/SpinnerLoading/SpinnerLoading";
import { ToastContainer } from "react-toastify";
import SocialMedia from "./MainPageComponents/SocialMedia/SocialMedia";
import Materials from "./MainPageComponents/Materials/Materials";
import GroupStudy from "./MainPageComponents/GroupStudy/GroupStudy";
import FlashcardsReview from "./MainPageComponents/FlashcardsReview/FlashcardsReview";
import { VoicePortalContextProvider } from "./Context/VoicePortalContext";
import NewPost from "./MainPageComponents/SocialMedia/NewPost/NewPost";
import ContentSide from "./MainPageComponents/SocialMedia/ContentSide/ContentSide";
function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <VoicePortalContextProvider>
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
                <Route index element={<SocialMedia />} />
                <Route path="social-media" element={<SocialMedia />}>
                  <Route index element={<ContentSide />} />
                  <Route path="new-post" element={<NewPost />} />
                  <Route path="news" element={<ContentSide />} />
                </Route>
                <Route path="materials" element={<Materials />} />
                <Route path="group-study" element={<GroupStudy />} />
                <Route
                  path="flashcards-review"
                  element={<FlashcardsReview />}
                />
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
        </VoicePortalContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

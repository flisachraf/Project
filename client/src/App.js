import React from "react";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import Homepages from "./components/home/Homepages";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import AuthFormAdmin from "./components/AuthFormAdmin";
import SinglePage from "./components/singlePage/SinglePage";
import Culture from "./components/culture/Culture";
import Divers from "./components/Divers";
import Economie from "./components/Economie";
import International from "./components/International";
import National from "./components/National";
import Politic from "./components/Politic";
import Social from "./components/Social";
import Sport from "./components/Sport";
import Regional from "./components/Regional";
import Create from "./components/crud/CreatePost";
import UpdatePost from "./components/crud/UpdatePost";
import ShowonePost from "./components/crud/ShowonePost";
import CreateArticleComponent from "./components/CreateArticleComponent";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/adminDashboard/AdminDashboard";
import CreateArticleComponentt from "./components/create";
import ArticleForm from "./components/ArticleForm";
import Login from "./components/LoginSponsor";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Import your i18n configuration
import ViewNewsId from "./components/adminDashboard/ViewNewsId";
import CategoryCards from "./components/CategoryCards";
import AboutUs from "./components/common/AboutUs/AboutUs";

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/category/:category" element={<><Header /><CategoryCards /><Footer /></>} />

          <Route path="/home" element={<><Header /><Homepages /><Footer /></>} />
          {/* <Route path="/post/:id" element={<ShowonePost />} /> */}
          <Route path="/singlepage/:id" element={<><Header /><ViewNewsId /><Footer /></>} />
          <Route path="/culture" element={<><Header /><Culture /><Footer /></>} />
          <Route path="/divers" element={<><Header /><Divers /><Footer /></>} />
          <Route path="/economie" element={<><Header /><Economie /><Footer /></>} />
          <Route path="/international" element={<><Header /><International /><Footer /></>} />
          <Route path="/national" element={<><Header /><National /><Footer /></>} />
          <Route path="/Politics" element={<><Header /><Politic /><Footer /></>} />
          <Route path="/social" element={<><Header /><Social /><Footer /></>} />
          <Route path="/regional" element={<><Header /><Regional /><Footer /></>} />
          <Route path="/sport" element={<><Header /><Sport /><Footer /></>} />
          <Route path="/register" element={<><Header /><Register /><Footer /></>} />
          <Route path="/Dashboard" element={<AdminDashboard />} />
          <Route path="/sponsor register" element={<><Header /><Login /><Footer /></>} />
          <Route path="/about-us" element={<><Header /><AboutUs/><Footer /></>} />
        </Routes>



        


      </Router>
    </I18nextProvider>
  );
};

export default App;

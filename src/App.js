import { React, useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Translated from "./pages/Translate";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { Helmet } from "react-helmet";

function App() {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      store.checkAuth();
    }
  }, []);
  return (
    <>
      <Helmet>
        <script>
          {`
        (function() {
          var widget_id = 'g40Fl8jrqC';
          var d=document;
          var w=window;
          function l(){
            var s=document.createElement('script');
            s.type='text/javascript';
            s.async=true;
            s.src='https://code.jivosite.com/script/widget/'+widget_id;
            var ss=document.getElementsByTagName('script')[0];
            ss.parentNode.insertBefore(s,ss);}
          if(d.readyState=='complete'){l();}
          else{if(w.attachEvent){w.attachEvent('onload',l);}
          else{w.addEventListener('load',l,false);}}})();
      `}
        </script>
      </Helmet>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="home/*" element={<Translated />} />
      </Routes>
    </>
  );
}

export default observer(App);

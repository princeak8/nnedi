import React from "react";
import Header from "../components/Header";
import BlogTitle from "../components/BlogTitle";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";


function About(props) {
  const about = useSelector((state) => state.settings.about);


  return (
    <>
      <Header />
      <h2 style={{marginLeft: "5%"}}>About</h2>
      <div style={{marginTop:20, marginBottom: 40, paddingLeft: "10%", paddingRight: "10%"}}>
          {about}
      </div>
      <Footer />
    </>
  );
}

export default About;

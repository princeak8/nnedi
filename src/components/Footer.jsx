import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as GrIcons from "react-icons/gr";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 150px;
//   width: 100%;
//   background-color: #f2f2f2;
//   gap: 30px;
// `;

// const IconsContainer = styled.div`
//   display: flex;
//   gap: 30px;
// `;

function Footer(props) {
  return (
    // <Container>
    //   <IconsContainer>
    //     <GrIcons.GrFacebookOption size={25} />
    //     <GrIcons.GrTwitter size={25} />
    //     <GrIcons.GrYoutube size={25} />
    //     <GrIcons.GrInstagram size={25} />
    //   </IconsContainer>
    //    All rights reserved
    // </Container>
    <div>
        <div className="footer">
            <div className="container">
              <div className="footer-grids">
                <div className="footer-grid">
                  <h3>About Us</h3>
                  <p>Nullam ac urna velit. Pellentesque in arcu tortor. 
                  Pellentesque nec est et elit varius pulvinar eget vitae sapien. 
                  Aenean vehicula accumsan gravida. Cum sociis natoque penatibus
                  et magnis dis parturient montes, nascetur ridiculus mus. Phasellus 
                  et lectus in urna consequat consectetur ut eget risus. Nunc augue diam, 
                  mattis eu tristique luctus, aliquam vitae massa. Praesent lacinia nisi 
                  sit amet risus cursus porta.</p>
                </div>
                <div className="footer-grid">
                  <h3>Site Page</h3>
                  <ul>
                    <li className="cap1"><Link to="index.html">Home</Link></li>
                    <li><Link to="about.html">About Us</Link></li>
                  </ul>
                </div>
                <div className="footer-grid">
                  <h3>Praesent pharetra</h3>
                  <ul>
                    <li><Link to="single.html">Vestibulum iaculis scelerisque</Link></li>
                    <li><Link to="single.html">Cras aliquam erat</Link></li>
                    <li><Link to="single.html">Morbi imperdiet ipsum</Link></li>
                    <li><Link to="single.html">Donec faucibus mollis</Link></li>
                    <li><Link to="single.html">Praesent lacinia nisi</Link></li>
                  </ul>
                </div>
                <div className="clearfix"> </div>
              </div>
            </div>
	      </div>
        <div className="footer-bottom">
            <div className="container">
                <p>Template by<Link to="http://w3layouts.com/"> w3layouts</Link></p>
            </div>
        </div>

    </div>
      
     
  );
}

export default Footer;

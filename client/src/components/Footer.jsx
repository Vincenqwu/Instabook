import React from 'react';
import '../style/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
  	 <div className="container">
  	 	<div className="row">
  	 		<div className="footer-col">
  	 			<h4>organization</h4>
  	 			<ul>
  	 				<li><a href="https://vancouver.northeastern.edu/">about us</a></li>
  	 				<li><a href="https://github.com/NEU-CS5610-2022-01-VAN">our projects</a></li>
  	 				<li><a href="https://www.northeastern.edu/graduate/program/master-of-science-in-computer-science-vancouver-18286/">MSCS Program</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>Technologies</h4>
  	 			<ul>
  	 				<li><a href="https://nodejs.org/en/">Node.js</a></li>
  	 				<li><a href="https://reactjs.org/">React</a></li>
  	 				<li><a href="https://www.mongodb.com/">MongoDB</a></li>
  	 				<li><a href="https://auth0.com/">Auth0</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>Contact</h4>
  	 			<ul>
  	 				<li><a href="#"><i className="fas fa-address-card"></i>&nbsp; 410 W Georgia St #1400, Vancouver, BC V6B 1Z3</a></li>
  	 				<li><a href="#"><i className="fa fa-envelope" aria-hidden="true"/>&nbsp; info@northeastern.edu</a></li>
  	 				<li><a href="#"><i className="fa fa-phone" aria-hidden="true"/> &nbsp;+1 778 783 0609</a></li>
  	 				<li><a href="#"><i className="fa fa-fax" aria-hidden="true"/>&nbsp; +1 778 783 0609</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>follow us</h4>
  	 			<div className="social-links">
  	 				<a href="https://www.facebook.com/NortheasternVancouver/"><i className="fab fa-facebook-f"></i></a>
  	 				<a href="https://twitter.com/northeasternvan"><i className="fab fa-twitter"></i></a>
  	 				<a href="https://www.instagram.com/northeastern/?hl=en"><i className="fab fa-instagram"></i></a>
  	 				<a href="https://www.linkedin.com/showcase/northeasternvancouver"><i className="fab fa-linkedin-in"></i></a>
  	 			</div>
  	 		</div>
  	 	</div>
  	 </div>
  </footer>
  );
}
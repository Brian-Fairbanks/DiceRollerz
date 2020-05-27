import React from 'react'
import './Footer.css'

export default function Footer () {
  return (
    <footer className="page-footer footer">
    <div clasNames="container">
      <div class="row">
        {/* <div class="col l6 s12">
          <h5 class="white-text">Footer Content</h5>
          <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
        </div> */}
        <div className="col-12 center-align">
          <h5 className="white-text flex">Developers</h5>
          <div id="credit-links" className="container">
            <a class="grey-text text-lighten-3" href="https://github.com/Brian-Fairbanks">Brian</a>
            <a class="grey-text text-lighten-3" href="https://github.com/jdstroup10">Jason</a>
            <a class="grey-text text-lighten-3" href="https://github.com/ionathas78">Jonathan</a>
            <a class="grey-text text-lighten-3" href="https://github.com/leenorman">Lee Ann</a>
            <a class="grey-text text-lighten-3" href="https://github.com/warsurge">Surge</a>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-copyright">
      <div className="container">
      © 2020 Copyright
      <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
      </div>
    </div>
  </footer>
  )
};

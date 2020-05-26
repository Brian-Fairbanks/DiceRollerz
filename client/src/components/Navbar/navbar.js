import React from "react";
import "./Navbar.css";

export default function NavBar() {
    return (
        <div className="nav">
            <h1>Test</h1>
        </div>
    );
}

// import React, { Component } from 'react'
// import { Button, Card, Row, Col } from 'react-materialize';

// class NavBar extends Component {
//     render()
//     return {
//         <div className = "App">
//             <header className="App-header">
//             <img src={logo} className="App-logo" alt="logo" />

//     </header>
//     </ div >
//     }
// }

// import React, {
// Fragment,
// Children,
// cloneElement,
// useRef,
// useEffect
// } from 'react';
// import PropTypes from 'prop-types';
// import cx from 'classnames';
// import Icon from './Icon';
// import SearchForm from './SearchForm';

// const Navbar = ({
// id,
// children,
// brand,
// className,
// extendWith,
// fixed,
// alignLinks,
// centerLogo,
// search,
// menuIcon,
// sidenav,
// options,
// centerChildren,
// ...props
// }) => {
// const _sidenav = useRef(null);

// useEffect(() => {
//     const instance = M.Sidenav.init(_sidenav.current, options);

//     return () => {
//       instance && instance.destroy();
//     };
// }, [options, children]);

// const brandClasses = cx({
//     'brand-logo': true,
//     right: alignLinks === 'left',
//     center: centerLogo
// });

// const navCSS = cx({ 'nav-extended': extendWith }, className);

// const navMobileCSS = cx('hide-on-med-and-down', [alignLinks]);

// const links = Children.map(children, (link, index) => (
//     <li key={index}>{link}</li>
// ));

// const sidenavLinks = sidenav
//     ? sidenav
//     : Children.map(children, (link, index) => {
//         const clonedLink =
//           link && link.props && link.props.id
//             ? cloneElement(link, {
//                 ...link.props,
//                 id: `sidenav-${link.props.id}`
//               })
//             : link;
//         return <li key={index}>{clonedLink}</li>;
//       });

// let navbar = (
//     <nav className={navCSS} {...props}>
//       <div className={cx({ container: centerChildren }, 'nav-wrapper')}>
//         {search ? (
//           <SearchForm />
//         ) : (
//           <Fragment>
//             {brand &&
//               cloneElement(brand, {
//                 className: cx(brand.props.className, brandClasses)
//               })}
//             <a href="#!" data-target={id} className="sidenav-trigger">
//               {menuIcon}
//             </a>
//             <ul className={navMobileCSS}>{links}</ul>
//           </Fragment>
//         )}
//       </div>
//       {extendWith && <div className="nav-content">{extendWith}</div>}
//     </nav>
// );

// if (fixed) {
//     navbar = <div className="navbar-fixed">{navbar}</div>;
// }

// return (
//     <Fragment>
//       {navbar}

//       <ul id={id} className={cx('sidenav', [alignLinks])} ref={_sidenav}>
//         {sidenavLinks}
//       </ul>
//     </Fragment>
// );
// }
// export default Navbar;

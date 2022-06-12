import React, { Fragment } from 'react';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCardButton'
import imgHeader from '../../assets/images/meals-header.jpeg';

function Header(props) {
  return <Fragment>
    <header className={classes.header}>
      <h1 className={classes.title}>AfriKitchen</h1>
      <HeaderCartButton onClick={props.onShowCart} />
    </header>
    <div className={classes['main-image']}>
      <img src={imgHeader} alt="A full table of meals" />
    </div>
  </Fragment>
}

export default Header
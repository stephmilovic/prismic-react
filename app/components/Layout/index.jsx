import React, { PropTypes } from 'react';
import styles from './layout';

export const Container = (props) =>
  <div className={styles.container}>
    {props.children}
  </div>;

export const Content = (props) =>
  <main className={styles.content} id="main">
    {props.children}
  </main>;

export const Header = (props) =>
  <header className={styles.header}>
    {props.children}
  </header>;

export const Footer = (props) =>
  <footer className={styles.footer}>
    {props.children}
  </footer>;

Container.propTypes = {
  children: PropTypes.node
};

Content.propTypes = {
  children: PropTypes.node
};

Header.propTypes = {
  children: PropTypes.node
};

Footer.propTypes = {
  children: PropTypes.node
};

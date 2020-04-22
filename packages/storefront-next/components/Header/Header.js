import * as React from 'react';
import styles from './Header.module.css';
import SearchBar from './SearchBar';
import Link from 'next/link';

export default function Header({}) {
    return (
        <nav role="navigation">
            <div className="container-fluid">
                <div className={`row ${styles.header}`}>
                    <div
                        className={`col text-right d-none d-md-block ${styles.logo}`}
                    >
                        <Link href="/">
                            <a>
                                <img
                                    className=""
                                    src="/images/logo-small.svg"
                                    alt="Logo"
                                />
                            </a>
                        </Link>
                    </div>
                    <div className="col text-right d-none d-md-block"></div>

                    <div
                        className={`col text-left d-md-none ${styles.mobileMenu}`}
                    >
                        <button
                            className="navbar-toggler d-md-none text-left"
                            type="button"
                        >
                            <span className={styles.menuIcon}>☰</span>
                            <span className="hidden-xs-down">Menu</span>
                        </button>
                    </div>
                    <div className={`col text-center d-md-none ${styles.logo}`}>
                        <img
                            className=""
                            src="/images/logo-small.svg"
                            alt="Logo"
                        />
                    </div>
                    <div
                        className={`col text-right d-md-none ${styles.miniBasket}`}
                    ></div>

                    <div
                        className={`col-12 col-md-6 text-center ${styles.searchbar}`}
                    >
                        <SearchBar />
                    </div>

                    <div
                        className={`col text-right d-none d-md-block ${styles.signIn}`}
                    >
                        <a href="#" title="Sign In">
                            <i className=" fa fa-user"></i>
                            <span>Sign In</span>
                        </a>
                    </div>
                    <div className="col text-left d-none d-md-block"></div>
                </div>
            </div>
        </nav>
    );
}

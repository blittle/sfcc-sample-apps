import * as React from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({}) {
    return (
        <div className={styles.siteSearch}>
            <span className="fa fa-search"></span>
            <input
                className="form-control search-field"
                placeholder="Search (keywords, brands, etc)"
                type="search"
                autoFocus
            />
            <i className="fa fa-search"></i>
        </div>
    );
}

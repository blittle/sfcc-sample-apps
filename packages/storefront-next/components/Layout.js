import * as React from 'react';
import Header from './Header/Header';

export default function Layout({ children }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}

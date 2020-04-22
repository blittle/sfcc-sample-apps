import * as React from 'react';
import styles from './Collapsible.module.css';

export default function Collapsible({ title, children }) {
    const [isExpanded, setExpanded] = React.useState(false);

    return (
        <div className={`collapsible ${styles.collapsible}`}>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div
                            className="card-header"
                            onClick={() => setExpanded(!isExpanded)}
                        >
                            <h4
                                aria-expanded={isExpanded}
                                className={`title text-left ${
                                    isExpanded ? 'active' : ''
                                }`}
                            >
                                <span>{title}</span>
                            </h4>
                        </div>
                        <div className={`collapse ${isExpanded ? 'show' : ''}`}>
                            <div className="card-body">{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

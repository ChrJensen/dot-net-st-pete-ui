import React from 'react';
import classNames from 'classnames';
import './loading.css';

export default ({ active }) => {
  let loading_class = classNames('dissolve-animation', {
    'not-active': !active
  });

  return (
    <div className={loading_class}>
      <div className="page-loading">
        <div className="loading-overlay">
          <div className="mdl-spinner mdl-js-spinner is-active"></div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useRef } from 'react';

const Comments = () => {
  const commentBox = useRef(null);

  useEffect(() => {
    const scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', 'https://utteranc.es/client.js');
    scriptEl.setAttribute('crossorigin', 'anonymous');
    scriptEl.setAttribute('async', true);
    scriptEl.setAttribute('repo', 'davidadarme/davidadarme.vercel.app');
    scriptEl.setAttribute('issue-term', 'title');
    scriptEl.setAttribute('theme', 'dark-blue');
    commentBox.current.appendChild(scriptEl);
  }, []);

  return (
    <div style={{ width: '100%' }} id="comments">
      <div ref={commentBox}></div>
    </div>
  );
};

export default Comments;
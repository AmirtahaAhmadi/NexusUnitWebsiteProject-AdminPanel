import React, { lazy } from 'react';
const CommentsD = lazy(() => import('../views/apps/comments/list'))

const Comments = () => {
  return (
    <>
      <CommentsD />
    </>
  )
}

export default Comments;
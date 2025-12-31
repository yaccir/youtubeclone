import React from 'react'
import "/src/css/comments.css"

const Comments = () => {
  return (
    <div className='maincontainercomments'>

    <img className='commentsimage2' src="/src/images/icon.png" alt="" />
    <div>
        <div className='commentcontainer'>
        <div className='commentusername'>
            <p>name</p>
            <p>time</p>
        </div>
            <div className='commenteditdel'>
                <button>edit</button>
                <button>delete</button>
            </div>
        </div>
        <div>
            <p>comment</p>
            <div className='likeunlikecommen'>
                <button>like</button>
                <button>unlike</button>
            </div>
        </div>
    </div>

    </div>
  )
}

export default Comments
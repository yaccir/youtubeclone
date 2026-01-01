import React from 'react'
import "/src/css/comments.css"

const Comments = ({comments}) => {
    console.log(comments)
  return (
    <>
    {
        comments.map((item)=>{

         return   <div className='maincontainercomments'>

    <img className='commentsimage2' src={item.commenterProfile} alt="" />
    <div>
        <div className='commentcontainer'>
        <div className='commentusername'>
            <p>{item.commenterName}</p>
            <p>{item.updatedAt}</p>
        </div>
            <div className='commenteditdel'>
                <button>edit</button>
                <button>delete</button>
            </div>
        </div>
        <div>
            <p>{item.commentText}</p>
            <div className='likeunlikecomment'>
                <button>like</button>
                <button>unlike</button>
            </div>
        </div>
    </div>

    </div>
        })
    }
    </>
  )
}

export default Comments
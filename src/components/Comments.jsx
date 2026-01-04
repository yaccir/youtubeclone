import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Comments = ({videoid}) => {
const [commentdata,setCommentdata]=useState([])
console.log(commentdata)

useEffect(()=>{

  fetchcomments();

},[videoid])
async function fetchcomments()
{
  const fetchedcommentdata=await axios(`http://localhost:8085/getcomments${videoid}`);
  if(fetchedcommentdata.status==200)
  setCommentdata(fetchedcommentdata)

}

  return (
    <div>
      
    <div>
      <img src="" alt="" />
      <input type="text" />
      <button>comment</button>
      <div>
        <button>edit</button>
        <button>delete</button> 
         </div>
    </div>

 {
  commentdata.map((comment)=>{
    
 return   <div>
      <div>
        <div>
          <img src="" alt="" />
        <p> comment1 </p>
        </div>
        <div>
          <button>
            like
          </button>
          <button>
            unlike 
          </button>
        </div>
      </div>
    </div>


  })
 }

      </div>
  )
}

export default Comments
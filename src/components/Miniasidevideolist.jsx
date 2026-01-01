
import "/src/css/minivideolist.css"
import { useSelector } from 'react-redux'

const Miniasidevideolist = () => {


  const data=useSelector((store)=>store.youtube.items||[])


  return (
   <>


{
  data.map((item)=>{
    return  <div className='videolistcard'>

          <img className='thumbnailimage' src={item.thumbNail} alt="" />
         <div className='videodetailss'>
        <h2 className='minititle'>{item.title}</h2>
        <h3 className='minichannelname'>{item.channelName}</h3>
        <div>
            <p>{item.views}</p>
            <p>{item.updatedAt}</p>
        </div>

    </div>
</div>
  })
}

   </>
    
  )
}

export default Miniasidevideolist
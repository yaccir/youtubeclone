import youtubeModel from "../Models/Youtube.Model.js";

export async function fetchvideolist(req,res)
{

    try{
        const videolist=await youtubeModel.find({});
            console.log(videolist)
        if(videolist.length==0)
           return  res.status(404).json("No Videos found")

        else

         return    res.status(200).json(videolist)

    }
    catch(err)
    {
        return res.send(500).send("error occured 500")

    }


}


export async function addvideo(req,res)
{
    try{
        console.log("kkkkkk")
        const addedvideo=await youtubeModel.create(req.body)
        if(addedvideo)
            res.status(201).json(addedvideo)
        else
            res.status(401).json("not added video")
    }
    catch(err)
    {
        return res.status(500).json(err)
    }

}
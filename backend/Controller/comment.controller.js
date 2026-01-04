import youtubeModel from "../Models/Youtube.Model.js";

export async function  getcomments(req,res)
{
    const {id}=req.body;
    try{
        const foundvideo=await youtubeModel.findById({id})
        if(!foundvideo)
            res.status(404).json({message:"video not found"});
        else
        {
            res.status(200).json(foundvideo)
        }

    }
    catch(err)
    {
        return resw.status(500).json(err)
    }

}
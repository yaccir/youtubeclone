import { userprofile } from "../Controller/userprofile.controller.js";


export function profileroute(app)
{

    app.get("/getprofilepic",userprofile)
}
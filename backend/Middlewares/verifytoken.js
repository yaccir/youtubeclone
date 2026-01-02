export function verifytoken(req,res,next)
{
    const {token}=req.body;
    try{
        
jwt.verify(token, 'secretkey', function(err, decoded) {
  console.log(decoded) // bar
  next();
});
    }

    catch(err)
    {
        res.status(500).json(err)
    }

}
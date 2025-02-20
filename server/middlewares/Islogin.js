const isLogin=(req,res,next)=>{
    if (req.session.user) {
        next()
        
    } else {
        res.status(401).json("Not authenticated");
    }
}

module.exports = isLogin;
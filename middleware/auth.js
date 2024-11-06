const checkSession=(req,res,next)=>{
    if(req.session.user){
        console.log(req.session.user);
        
        next()
    }else{
        res.redirect('/user/login')

    }
}




const isLogin=(req,res,next)=>{

    if(req.session.user){
        
    res.redirect('/user/home')

}else{
    console.log("err");
   next()
}
}

module.exports={checkSession,isLogin} 
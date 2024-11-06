
const checkSession=(req,res,next)=>{
    if(req.session.admin){
        console.log(req.session.admin);
        
        next()
    }else{
        res.redirect('/admin/login')

    }
}



const isLogin=(req,res,next)=>{
    if(req.session.admin){
    res.redirect('/admin/home')
    // console.log("fuck you");
    

}else{
    // console.log("err");
   next()
}
}

module.exports={checkSession,isLogin} 
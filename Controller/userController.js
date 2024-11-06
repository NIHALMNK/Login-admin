const userSchema = require('../model/usermodal')
const bcrypt = require('bcrypt');
const saltround=10;

const registerUser= async (req , res)=>{

    try{
        const {name,email,gender,password}=req.body
        console.log(req.body);
        

        const user= await userSchema.findOne({email})

        if(user)return res.render('userejs/register',{message:'user already exists'})

        const hashedPassword=await bcrypt.hash(password,saltround);

        const newUser=new userSchema({
            name,
            email,
            gender,
            password: hashedPassword
        })

        await newUser.save()
        res.render("userejs/login",{message:"user created successfully"});

    }catch (error){

        res.render('userejs/regester',{message:'something went wrong'})
        

    }
}

//======================================================================================>
const login= async (req,res)=>{

    try{
        const {email,password}=req.body
        // console.log(email);
        
        const user = await userSchema.findOne({email})
        

        if(!user) return res.render('userejs/login',{message:'user does not exist'})

            const isMatch=await bcrypt.compare(password,user.password)
        
        if(!isMatch) return res.render('userejs/login',{message:'incorrect password'})

            req.session.user=true
            req.session.userData=user;
            console.log(req.session.userData);
            
            
            res.redirect('/user/home')
            


    }catch{
        
        res.render('userejs/login',{message:'something went wrong'})
        

    }
}



const logout=async (req,res)=>{
    req.session.user=null
    res.redirect('/user/login')
}
//===========================================================================================================>

const loadRegister=(req,res)=>{
    res.render('userejs/register',{message:null})
}


const loadlogin=(req,res)=>{
    console.log("loadlogin");
    
    res.render('userejs/login',{message:null})
    
}



const loadHome = async (req, res) => {
    try {
        const user=req.session.userData
        const username =user.name
        
        
        
        const message = [user.email,user.name,user.gender] 
        res.render('userejs/home', { message }); 
    } catch (error) {
        console.error(error);
        //tjgfjgfjkkghkhcgljhlk,bhvkchtvchyfty
        res.status(500).send("Server Error");
    }
};


module.exports={
    registerUser,
    loadRegister,
    loadlogin,
    login,
    loadHome,
    logout,
   

}













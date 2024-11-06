const adminModel = require("../model/adminModel");
const bcrypt = require("bcrypt");
const usermodal = require("../model/usermodal");
//====================================================================>

const loadLogin = async (req, res) => {
  const message = req.query.message || null;
  res.render("adminejs/loginAD", { message });
};

//====================================================================>
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email });
    if (!admin) {
      // return res.redirect("/admin/login?message=Invalid credentials");
      return  res.redirect("/admin/login");
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      // return res.redirect("/admin/login?message=Invalid credentials");
      return  res.redirect("/admin/login");
    }

    req.session.admin = true;
    res.redirect("/admin/home");
  } catch (error) {
    console.log("error", error);
    // res.redirect("/admin/login?message=Server error");
     res.redirect("/admin/login");
  }
};
//====================================================================>

const loadHome = async (req, res) => {
  try {
    const admin = req.session.admin;
    if (!admin) return res.redirect("/admin/login");

    const users = await usermodal.find({});
    res.render("adminejs/homeAD", { users });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};


//=====================================>

const editUser = async (req, res) => {
  try {
    const { newpassword, id } = req.body;
   

    if(newpassword){
     let hashedpassword = await bcrypt.hash(newpassword, 10);

     req.body.password=hashedpassword;
     console.log(req.body.password);
     
    }

   
    const user=await usermodal.updateOne({
       _id: id },
      req.body
      )

    console.log(user);

    res.redirect("/admin/home");
  } catch (error) {
    console.log(error);
  }
};

//================================>
  const searchUser = async (req, res) => {
    try {
      const query = req.query.q;
      
      // Perform a case-insensitive search on name or email
      const users = await usermodal.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } }
        ]
      });
      
      res.render("adminejs/homeAD", { users});
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  };
  
//================================>

const deleteUser = async (req,res)=>{
    try{

        const {id}=req.params
        const user =await usermodal.findOneAndDelete({_id:id})
        res.redirect('/admin/home')

    }catch(error){
        console.log(error);
        
    }
}
//==========================================>
const addUser = async (req, res) => {
  try {
      // console.log(req.body);
      const { name, email, gender, password } = req.body;

      // Check if user already exists
      let user = await usermodal.findOne({ email });
      if (user) {
          return res.status(400).json({ message: "User already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new usermodal({
          name,
          email,
          gender,
          password: hashedPassword
      });

      await newUser.save();
      await res.status(201).json({ message: "User added successfully!" });
   
      

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
  }
};
//====================================================================>
const logOut = async(req,res)=>{
    req.session.admin =null
    
    res.redirect('/admin/login')
}

//====================================================================>

module.exports = {
  loadLogin,
  login,
  loadHome,
  editUser,
  deleteUser,
  addUser,
  logOut,
  searchUser,
};

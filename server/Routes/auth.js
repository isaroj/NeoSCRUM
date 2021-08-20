const express = require("express"); 
const multer = require('multer')
 
const authenticate = require('../middleware/authenticate')
const adminauthenticate = require('../middleware/adminauthenticate')
const Developer = require("../Model/Developer"); 
const Admin = require("../Model/Admin")
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs')
const router = express.Router();

  
const storage  = multer.diskStorage({
  destination:function(req,file,cb){
    console.log(file);
    cb(null, './profiles/')
  },

  filename :function(req,file,cb){
    console.log(file);
    cb(null, file.originalname)
  }

})

const fileFilter = function(req,file,cb){
  console.log(file);
  console.log(file.mimetype)
  if(file.mimetype=='image/jpeg' || file.mimetype=='image/png'){
    cb(null, true)
   
  }else{
    cb(null, false)
  }
  
}
 
const upload = multer({ storage:storage, limits:{
  fileSize:1024*1024*5 // number in bytes which is 5 mb
},
fileFilter:fileFilter,
});

router.get("/", (req, res) => {
  res.send("home page of the application router js");
});
  
router.post("/AdminSignin",adminauthenticate, async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "plz filled the field" });
    }

    const AdminLogin = await Admin.findOne({ email: email });

    if (AdminLogin) {
      const isMatch = await bcrypt.compare(password, AdminLogin.password);
      if (isMatch) {

        token = await AdminLogin.generateAuthToken();

        res.cookie("AdminjwtToken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true
        });

        res.status(200).json({AdminLogin:AdminLogin });


      } else {
        
        res.status(400).json({ message: "invalid credentials" });
      }
    } else {
         
      res.status(400).json({ message: "invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
})

router.post("/DeveloperSignin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    console.log(req.body)
    if (!email || !password) {
      return res.status(400).json({ error: "plz filled the field" });
    }

    const UserLogin = await Developer.findOne({ email: email });

    if (UserLogin) {
      const isMatch = await bcrypt.compare(password, UserLogin.password);
      if (isMatch) {

        token = await UserLogin.generateAuthToken();

        res.cookie("jwtToken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true
        });

        res.status(200).json({UserLogin:UserLogin });


      } else {
        
        res.status(400).json({ message: "invalid credentials" });
      }
    } else {
         
      res.status(400).json({ message: "invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
}); 

router.post("/register",  upload.single('profileImage') ,async (req, res) => {
 
  const { name, email } = req.body;  

  if(req.file==undefined){
    return res.send("pls upload correct file")
  }else{

  try {
     
    if (!name || !email ) {
      return res.status(422).json({ error: "plz filled all the field" });
    }

    const DeveloperExist = await Developer.findOne({ email: email });

    if (DeveloperExist) {
      return res.status(422).json({ error: "email already exist" });
    } 

    var password = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'+'abcdefghijklmnopqrstuvwxyz0123456789@#$'; 
    for (i = 1; i <= 10; i++) {
        var char = Math.floor(Math.random()*str.length + 1); 
        password += str.charAt(char)
    } 


          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "priyabhg1993@gmail.com",
              pass: "priya9958815302",
            },
          });
      
          var mailOptions = {
            from: "1080pandey@gmail.com",
            to:email,
            subject: "Registerd as developer",
            html: `<h2>Congrats ${name} You are part of our Development Team </h2>
                  <h4>please find here is your credentials for sign in</h4>
                  <p>username : ${email} <br/> password : ${password}</p>
                `,
          };
      
          let info = await  transporter.sendMail(mailOptions);

          const path ="http://localhost:4000/"+ req.file.path;

          const newdeveloper = new Developer({ name:name, email:email, password:password, profile: path});
          const uploaded =  await newdeveloper.save(); 

          res.status(200).json({ message: "successfully registered ",uploaded:uploaded});
  
    
  
  } catch (err) {
    console.log(err);
  } 
}
});
router.get("/GetAllRecievers", authenticate , async (req, res) => { 
  const Developers = await Developer.find({_id:{$ne:req.id}});
  res.status(200).send(Developers); 
});

router.get("/GetAllDevelopers", adminauthenticate , async (req, res) => { 
  const Developers = await Developer.find({});
  res.status(200).send(Developers);

});


router.get("/registerAdmin",  async (req, res) => {

  try {
 
    var password = 'HotWater@123';
    var email = "rohit.pandey@neosoftmail.com";
    var name = "Rohit Pandey";
    

    const newadmin = new Admin({ name, email, password });
 
     const uploaded =  await newadmin.save(); 
 
     res.status(200).json({ message: "successfully registered",uploaded:uploaded });
    
  } catch (err) {
    console.log(err);
  }
});

router.post("/addFeadback",async(req, res) => {


  try { 
    
        const {email,feadback} = req.body;
        var findDeveloper = await Developer.findOne({email:email});
        findDeveloper.Feadbacks.push({feadback:feadback})
        findDeveloper = await findDeveloper.save()
        res.status(200).send({findDeveloper:findDeveloper });    

  } catch (err) {
    console.log(err);
  }
});

router.get("/logout", (req, res) => {
  
  res.clearCookie("jwtToken",{path:'/'});
  res.clearCookie("AdminjwtToken",{path:'/'});
  res.status(200).send("logout Sucessfull");

}); 

router.get("/deleteAll", async(req, res) => {
  
 var response = await Developer.deleteMany({});


 res.send({response:response})

});

router.post("/testing", upload.single('profileImage'),(req, res) => {
   
  res.send({file:req.file, body:req.body})
 
 });


module.exports = router;

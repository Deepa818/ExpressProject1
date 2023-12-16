const User = require("../Model/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")




let registerUser=async (req,res)=>{
    let {name,email,password}= req.body
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!name||!email||!password) {
        res.status(400).json({error:"please enter mandatory field"})
    }

    const userAvailable= await User.findOne({email})
    if (userAvailable) {
        res.status(400).json({error:"user already registered"})
    }

        let register=await User.create({
            name,
            email,
            password:hashedPassword
        })
    if (register) {
        res.status(201).json({_id:register.id,email:register.email})
     } else {
        res.status(400).json({error:"user data is not valid"})
     }
    // res.status(200).json({message:"successfully user registered"})

   }



   const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({ email });
    //compare password with hashedPassword
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            name: user.name,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn: "15m" }
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(401);
      throw new Error("email or password is not valid");
    }
  });



  const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
  });

module.exports={registerUser,loginUser,currentUser}

const User = require("../models/user");

function stringValidator(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (
      stringValidator(name) ||
      stringValidator(email) ||
      stringValidator(password)
    ) {
      return res
        .status(400)
        .json({ err: "Bad Parameters . Something is missing" });
    }
    await User.create({ name, email, password })
    res.status(201).json({ message:'successfull' });
  } catch (error) {
    res.status(500).json({ error:'something went wrong' });
  }
};

exports.login= (req,res)=>{
  const {email,password}=req.body;
  if (stringValidator(email) || stringValidator(password)){
    res.status(400).json({message:'Email-Id or password is missing',success:false})
  }
  console.log(password);
  User.findAll({where :{email:email}})
  .then(user=>{
    if (user.length>0) {
      if (user[0].password===password) {
        res.status(200).json({success:true,message:"Userlogin successfully"})
      }else{
        return res.status(400).json({success:false,message:'Password is incorrect'})
      }
    }else{
      return res.status(404).json({success:false,message:'User does not exist'})
    }
  })
  .catch(err=>{
    res.status(500).json({message:err,sucees:false})
  })

}
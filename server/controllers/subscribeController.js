const Subscriber=require("../models/subscribe");

const emailExistence = require('email-existence');

exports.createSubscriber = async(req,res)=>{
    const {email}=req.body 
    try{
        emailExistence.check(email,async (err, exists) => {
            console.log('Email exists:', exists);
            if (!exists) {
              return res.status(400).json({ message: "Error verifying email address", error: err });
            }
            const newSubscriber = new Subscriber({email})
            await newSubscriber.save()
            res.status(201).json({ message: 'your subscribe created successfully' });

          });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.findAll =async(req,res)=>{
  try{
      const subscribers = await Subscriber.find()
      res.status(200).json(subscribers)
  }
  catch (error){
    console.error("Error fetching urgent news:", error);
    res.status(500).json({ message: "Error fetching urgent news", error });
  }
}

exports.deleteSubscribe=async(req,res)=>{
  try{
    const id=req.params.id ;
    const existSubscribe = await Subscriber.findByIdAndDelete(id)

    res.status(200).json({ message: "Subscribe deleted successfully" });

  }
  catch (error){
    console.error("Error fetching urgent news:", error);
    res.status(500).json({ message: "Error fetching urgent news", error });
  }
}
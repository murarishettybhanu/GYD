const User = require('../database/models/User')
const path = require('path');

module.exports = async (req, res) => {

    const user = await User.findByIdAndUpdate(req.params.id,{
        username:req.body.username,
        weightinkg:req.body.weightinkg,
        heightincm:req.body.heightincm,
        age:req.body.age,
        gender:req.body.gender,
        activity:req.body.activity,
        bmi:req.body.bmi,
        category:req.body.category,
        bmr:req.body.bmr,
        dailyCaloriesv:req.body.dailyCaloriesv,
        password:req.body.password
    },(error,sucess)=>{
        if(sucess){
            res.redirect('/gyd')
        }
    })
}

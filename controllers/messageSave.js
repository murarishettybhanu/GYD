const Message = require('../database/models/Message')
module.exports = (req, res) => {
    Message.create(req.body,(error,suc)=>{
        if(suc){
            res.redirect('/')
        }
    })
}

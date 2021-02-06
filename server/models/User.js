const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    
    user_name:       { type: String },
    releaseArticles: { type: Number },
    replies:         { type: Number },
    praises:         { type: Number },

})

module.exports = mongoose.model('User', schema)
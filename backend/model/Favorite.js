const mongoose = require('mongoose');
const {Schema} = mongoose;


const favoriteSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true},
    user:{ type: Schema.Types.ObjectId, ref: 'User', required: true}
})

const virtual  = favoriteSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
favoriteSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})


exports.Favorite = mongoose.model('Favorite',favoriteSchema)
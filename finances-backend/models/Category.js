


const { Schema, model } = require('mongoose');


const CategorySchema = Schema({
    name: {
        type: String,
        require: true
    },

    user: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
});

CategorySchema.method('toJSON', function () {
    const { __v, _id , ...object} = this.toObject();

    object.id = _id;

    return object;
})


module.exports = model('Category', CategorySchema);
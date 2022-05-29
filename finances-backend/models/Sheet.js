const { Schema, model } = require('mongoose');

const SheetSchema = Schema({
    date: {
        type: Date,
        require: true
    },
    initialAmount: {
        type: Number,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


SheetSchema.method('toJSON', function() {
    
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;

    return object;

});


module.exports = model('Sheet', SheetSchema);
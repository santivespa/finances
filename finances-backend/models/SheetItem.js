const { Schema, model } = require('mongoose');

const SheetItemSchema = Schema({
    description: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    type: {
        type: String
    },
    sheet: {
        type: Schema.Types.ObjectId,
        ref: 'Sheet',
        required: true
    }
});

SheetItemSchema.method('toJSON', function() {
    
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;

    return object;

});

module.exports = model('SheetItem', SheetItemSchema);
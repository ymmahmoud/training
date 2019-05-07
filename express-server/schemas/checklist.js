const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChecklistSchema = new Schema({
    items: [{type: mongoose.Schema.Types.ObjectId, ref: 'ChecklistItem'}],
    canSignOff: [{type: String}],
    template: Boolean
});

const Checklist = mongoose.model('Checklist', ChecklistSchema);
module.exports = Checklist;
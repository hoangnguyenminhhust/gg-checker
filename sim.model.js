const mongoose = require('mongoose');

const simSchema = new mongoose.Schema({
    sim: {
        type: String,
        unique: true
    },
    count_search: Number,
    status: {
        type: String,
        enum: ["PENDING", "RUNNING"]
    },
    failed: Number,
    success: Number
});

module.exports = mongoose.model("sim", simSchema);
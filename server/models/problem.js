const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  name: String,
  difficulty: String,
  tags: [String],
  sampleInput: String,
  sampleOutput: String,
  hiddenTestCases: [String],
  hiddenOutputs: [String]
});

module.exports = mongoose.model('Problem', problemSchema);

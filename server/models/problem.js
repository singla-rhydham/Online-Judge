const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  problemName: String,
  difficulty: String,
  topicTags: [String],
  description: String,
  sampleInput: String,
  sampleOutput: String,
  hiddenTestCases: [String],
  hiddenOutputs: [String]
});

module.exports = mongoose.model('Problem', problemSchema);

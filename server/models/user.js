const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        minlength: [2, "Username must be at least 2 characters long"],
        maxlength: [50, "Username cannot exceed 50 characters"]
    },
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true, // Remove whitespace from beginning and end
        minlength: [2, "First name must be at least 2 characters long"],
        maxlength: [50, "First name cannot exceed 50 characters"]
    },

    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
        minlength: [2, "Last name must be at least 2 characters long"],
        maxlength: [50, "Last name cannot exceed 50 characters"]
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    solvedProblems: [
        {
            problemId: mongoose.Schema.Types.ObjectId,
            difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
            status: { type: String, enum: ['solved', 'attempted'] },
            solvedAt: Date
        }
    ],
    totalSolved: {
        easy: { type: Number, default: 0 },
        medium: { type: Number, default: 0 },
        hard: { type: Number, default: 0 },
        overall: { type: Number, default: 0 }
    },
    // Optionally track recent activity
    recentActivity: [
        {
            date: Date,
            problemId: mongoose.Schema.Types.ObjectId,
            status: String
        }
    ]

}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model("User", userSchema);
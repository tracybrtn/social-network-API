const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      //add validation
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [
      //Array of _id values referencing the Thought model
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      //Array of _id values referencing the User model (self-reference)
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
UserSchema.virtual('friendCount').get(function(){
  return this.friends.length;
});

//Create the User model
const User = model('User', UserSchema);

//Export the User model
module.exports = User;
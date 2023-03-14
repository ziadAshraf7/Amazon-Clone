


import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail';

const UsersScheme = new Schema({
   name : {
    type : String ,
    required : [true , "please enter your name"] ,
    maxLength : [15 , "you have entered more than 15 Chars"]
   },  
   email : {
    type : String,
    required : [true , "please enter your email"] ,
    unique : true , 
    validate : [isEmail , "please enter a valid email"]
   }, 
   password : {
    type : String ,
    required : [true , "please enter your password"] ,
    minLength : [6 , "you must enter at least 6 chars"]
   },
   cart : {
    type : Array
   } ,
   orders : {
    type : Array
   },
   browserHistory : {
    type : Array
   } ,
   reviews : [{
    type : Schema.Types.ObjectId , 
    ref : "comment"
   }],
   lists : {
    type : Array
   }
});





UsersScheme.pre("save", function (next: (arg0?: undefined) => void) {
  const user = this

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError: any, salt: any) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password , salt, function(hashError: any, hash: any) {
          if (hashError) {
            return next(hashError)
          }

          user.password = hash.toString()
          next()
        })
      }
    })
  } else {
    return next()
  }
})

const User = models.User || model('User', UsersScheme);

export default User





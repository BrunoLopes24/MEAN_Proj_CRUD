import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

userSchema.plugin(uniqueValidator);

export const UserModel = mongoose.model(
    'UserModel', userSchema
);
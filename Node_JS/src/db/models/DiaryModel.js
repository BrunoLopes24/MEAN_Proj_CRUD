import mongoose from 'mongoose';

const entrySchema = mongoose.Schema({
    date: String,
    entry: String
})

export const DiaryEntryModel = mongoose.model(
    'diaryEntry', entrySchema
)
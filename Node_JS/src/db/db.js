import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/Diary', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('BD: Connection failed:', err);
});
db.once('open', () => {
    console.log('BD: Connection succeeded');
});

export default mongoose;
const { connect, set } = require('mongoose');

const connectDB = async () => {
    set('strictQuery', false);
    await connect(
        `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
        .then(() => {
            console.log('Successfully connected to database');
        })
        .catch((err) => {
            console.error('Database connection error:', err);
            process.exit(1);
        });
};

module.exports = connectDB; 
import mongoose from 'mongoose';

export async function connectToDatabase() {

    try {
        
        await mongoose.connect(`${process.env.MONGO_URI}${process.env.DB_NAME}`)
        mongoose.connection.on('connected', () => {
            console.log('Connected to database');
        });
        mongoose.connection.on('error', (error:string) => {
            console.log('MongoDB connection error: ' + error);
            process.exit();
        });
    } catch (error) {
        console.log('Error connecting to database: ' + error);
    }
}
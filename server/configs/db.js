import mongoose from "mongoose";

const connnectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log('Database Conncected')
        );

        await mongoose.connect(`${process.env.MONGODB_URI}/greencart`)
    } catch (error) {
        console.error(error.message);
        
    }
}

export default connnectDB
const mongoose = require('mongoose');

const autoIncrement = require('mongoose-auto-increment');

const dbConection = async() => {

    try {
        
        const dbConnect = process.env.DB_CNN;

        const connection = await mongoose.connect(dbConnect, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        autoIncrement.initialize(connection);

        console.log('DB Online');

    } catch (error) {

        console.log(error);
        throw new Error('Error al iniciar la BD');

    }

};

module.exports = {
    dbConection
};
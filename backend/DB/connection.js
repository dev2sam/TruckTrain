module.exports = async function (mongoose) {

    try {
        await mongoose.connect("mongodb+srv://<username>:<password>@cluster0.6sa7eo6.mongodb.net/TruckTrain").then(() => {
            console.log('Connected to MongoDB');
        }).catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
    } catch (error) {
        console.log(error);
    }
}   
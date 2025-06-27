import mongoose from "mongoose";

const ConnectDB = () => {
    mongoose.connect(process.env.MongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Mongodb Is Connected");
    }).catch((error) => {
        console.log(error);
    })
}

export default ConnectDB;
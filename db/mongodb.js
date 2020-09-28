const mongoose = require('mongoose');


mongoose.set('useCreateIndex', true);
console.log(process.env.MongoDb_user_name,process.env
	.MongoDB_password, process.env
		.MongoDb_collection );
mongoose
	.connect(
		`mongodb+srv://${process.env.MongoDb_user_name}:${process.env
			.MongoDB_password}@cluster0-ptw2q.azure.mongodb.net/${process.env
			.MongoDb_collection}?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		}
	)
	.then(() => {
		console.log('connected to db');
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = mongoose;


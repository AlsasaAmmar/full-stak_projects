const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv').config();
const port = 5000;
const updateAssetHourly = require('./utils/external-api')

const mongoose = require('mongoose');
const userRoutes = require('./routes/user-routes');
const assetsRoutes = require('./routes/assets-routes');
const checkAuth = require('./middleware/checkAuth');

// const bitcoinURL = 'https://api.coingecko.com/api/v3/coins/bitcoin';
// const uid = '5f4a708b93806362a481df51';
// const assetId = "5f4a7208ecd98c42409bf739";

updateAssetHourly();

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use(checkAuth);
app.use('/api/assets', assetsRoutes);

mongoose.set('useCreateIndex', true);
mongoose
	.connect(
		`mongodb+srv://${process.env.MongoDb_user_name}:${process.env
			.MongoDB_password}@cluster0-ptw2q.azure.mongodb.net/${process.env
			.MonogDb_collection}?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		}
	)
	.then(() => {
		console.log('connected');
		app.listen(port);
	})
	.catch((err) => {
		console.log(err);
	});

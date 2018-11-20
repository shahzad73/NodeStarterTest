module.exports = {


		GetDabaseConnection: function()
		{
			var cassandra = require('cassandra-driver');
			 //Connect to the cluster
			//return new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'twitter_cql'});
			return new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'business724'});
		},



		GetDataTable: function(SQL, callback)
		{
				var client = module.exports.GetDabaseConnection();

				   client.execute(SQL, function (err, result)
				   {
					   if (!err)
					   		callback(null, result);       //module.exports.functionname will call a function defined witin
					   else
					   		callback(err);
				   });
		},



		GetSingleRecordFromTable: function(SQL, callback)
		{
				var client =  module.exports.GetDabaseConnection();

				client.execute(SQL, function (err, result)
				{
					if (!err)
							callback(null, result.rows[0]);
					else
						 callback(err);
				});
		},



		RunNonQuery: function(SQL, callback)
  	{
				var client = module.exports.GetDabaseConnection();

				client.execute(SQL, function (err, result)
				{
					if (!err)
						callback(null, "");
					else
						 callback(err);
				});
		},



}

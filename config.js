module.exports = {
    connectionString: "mongodb://admin:password@103.141.144.199:27018/increase-search?authSource=admin",
    mongooseOptions: {
        keepAlive: 1,
        connectTimeoutMS: 30000,
        autoIndex: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    mongoDBName: 'increase-search-2',
    elasticSearchConnection: "http://157.230.39.34:9200/",
    port: 4321,
    maxCountSearch: 300,
    limitOneSearch: 10
}
const config = {
    production: {
        name: "Proyecto api produccion",
        port: "7085",
        externalService: {
            urlGetAll : "https://echo-serv.tbxnet.com/v1/secret/files",
            urlGetFile : "https://echo-serv.tbxnet.com/v1/secret/file/{name}",
            key: "aSuperSecretKey" //la key podria estar seteada en el env

        }
    },
    dev: {
        name: "Proyecto integraciones desarrollo test",
        port: "7085",
        externalService: {
            urlGetAll : "https://echo-serv.tbxnet.com/v1/secret/files",
            urlGetFile : "https://echo-serv.tbxnet.com/v1/secret/file/{name}",
            key: "aSuperSecretKey" //la key podria estar seteada en el env

        }        
    }
    
        
}

exports.get = function get(env) {
    if(env){
        return config.production;
    }
    else{
        return config.dev;
    }
}
const request = require("request-promise");
const config = require('../config').get(process.env.NODE_ENV);


module.exports.getFiles = getFiles;
module.exports.getFile = getFile;

async function getFiles(){
        var options = {
            'method': 'GET',
            'url': config.externalService.urlGetAll,
            headers: 
            { 
                'authorization': 'Bearer '+ config.externalService.key,
                'content-type': 'application/json' 
            },
          };
        var response = await request(options);
        return JSON.parse(response)
    
}
async function getFiles(){
        var options = {
            'method': 'GET',
            'url': config.externalService.urlGetAll,
            headers: 
            { 
                'authorization': 'Bearer '+ config.externalService.key,
                'content-type': 'application/json' 
            },
          };
        var response = await request(options);
        return JSON.parse(response)
    
}
async function getFile(fileName){
        var options = {
            'method': 'GET',
            'url': config.externalService.urlGetFile.replace("{name}",fileName),
            headers: 
            { 
                'authorization': 'Bearer '+ config.externalService.key,
                'content-type': 'application/json' 
            },
          };
        try{
          var response = await request(options);
          return response
        }
        catch(exception){
          return null
        }
        
    
}
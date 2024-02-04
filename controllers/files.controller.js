const filesService = require('../services/files.service')


module.exports.get = get;
module.exports.getList = getList;
module.exports.getFileObject = getFileObject;


function getFileObject(fileName,responseGetFile){
    let fileObject = { file : fileName, lines : []};
    let headerArray = []
    responseGetFile.split(/\r?\n/).forEach((line,index) =>  {
        
        let lineSplit = line.split(",");
        if(index == 0){
            headerArray = lineSplit //guardo el header para no hardcodear los textos de las propiedades
        }
        else{
            
            if(lineSplit.length == 4){
                //si no tiene los 4 campos, no cargo la linea
                let lineObject = {}
                lineSplit.forEach((element,indexLine) =>  {
                    //recorro cada uno de los campos del split por coma
                    lineHasError = false;
                    if(indexLine != 0){
                        //el 0 es el file, no se agrega
                        if(element){
                            lineObject[headerArray[indexLine]] = element

                        }
                        else{
                            lineHasError = true
                        }
                    }

                })    
                if(!lineHasError){
                    fileObject.lines = fileObject.lines.concat(lineObject)
                }
            }
        }
            
    });
    return fileObject
}
async function get(req,res,next){
    try{
        const responseFiles = await filesService.getFiles();
        let responseArray = []

        let fileSearch = req.query.fileName

        if(fileSearch){
            responseFiles.files = responseFiles.files.filter(file => file == fileSearch)
        }

        for (let file of responseFiles.files) {
            const responseGetFile = await filesService.getFile(file);
            if(responseGetFile){
                let fileObject = getFileObject(file,responseGetFile)
                responseArray = responseArray.concat(fileObject)

            }
        }
        res.json(responseArray)
    }
    catch(exception){
        res.status(500).json({ mensaje: "Error inesperado",respuesta: exception.message || exception.stack });
    }
}
async function getList(req,res,next){
    try{
        const responseFiles = await filesService.getFiles();
        res.json(responseFiles)
    }
    catch(exception){
        res.status(500).json({ mensaje: "Error inesperado",respuesta: exception.message || exception.stack });
    }
}
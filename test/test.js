const { response } = require('express');
var filesController = require('../controllers/files.controller.js');
var filesService = require('../services/files.service.js');

const assert = require('assert').strict;


describe('Funcion que devuelve un archivo', function() {
    context('Status code error', function() {
        it('Deveria devolver null por status 500', function(done) {
            filesService.getFile("test4.csv").then(result => {
                assert.strictEqual(result, null);
                done(result);

            })

         
        })
        it('Deveria devolver null por status 404', function(done) {
            filesService.getFile("test5.csv").then(result => {
                assert.strictEqual(result, null);
                done(result);

            })

         
        })
        
      })

    context('Devolucion correcta', function() {
        it('Deveria devolver registro con una linea', function(done) {
            filesService.getFile("test1.csv").then(result => {
                assert.strictEqual(result, "file,text,number,hex");
                done();

            }).catch(exception => {
                done(exception)
                }
            )

         
        })
        it('Deveria devolver archivo ', function(done) {
            filesService.getFile("test3.csv").then(result => {
                assert.notStrictEqual(result, null);
                done();

            }).catch(exception => {
                done(exception)
                }
            )

         
        })
    })

   
  
   
});

describe('Funcion que devuelve un archivo', function() {
    context("Devolucion formateada de archivo", function() {
        it('Deberia devolver un file sin lineas', function(done) {
            filesService.getFile("test1.csv").then(result => {
                fileObject = filesController.getFileObject("test1.csv",result)
                assert.strictEqual(fileObject.lines.length, 0);
                done();

            }).catch(exception => {
                done(exception)
                })

         
        })
        it('Deberia devolver un file sin lineas porque tiene datos invalidos', function(done) {
            filesService.getFile("test15.csv").then(result => {
                fileObject = filesController.getFileObject("test15.csv",result)
                assert.strictEqual(fileObject.lines.length, 0);
                done();

            }).catch(exception => {
                done(exception)
                })

         
        })
        it('Deberia omitir lineas que no tengan 4 datos', function(done) {
            filesService.getFile("test3.csv").then(result => {
                fileObject = filesController.getFileObject("test3.csv",result)
                assert.strictEqual(fileObject.lines.length, 3);
                done();

            }).catch(exception => {
                done(exception)
                })

         
        })
       
        
      })

   

   
  
   
});
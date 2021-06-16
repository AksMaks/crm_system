const bcript = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")
const pool = require("../models/db.js");

const ErroeHandler = require("../utils/ErrorHandler")

module.exports.Get = async (req, res) => {
  try{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(200).json({
        errors: errors.array(),
        message: "Некорректные данные"
      })
    }
    
    let Response = {}
    
    pool.getConnection(function(err, sql) {
      sql.beginTransaction(function(err) {
        if (err) { throw err; }
        sql.query('SELECT Id, Name, Url FROM `image` WHERE 1', (err, res) => {
          if (err) {return sql.rollback(function() {throw err}) }
          
          Response.Images = res
        })
        sql.commit(function(err) {
          if (err) {return sql.rollback(function() {throw err}) }
          
          return res.status(200).json(Response)
        })
      })
    })
  }
  catch (e) {
    ErroeHandler(res, e)
  }
}

module.exports.Insert = async (req, res) => {
  try{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(200).json({
        errors: errors.array(),
        message: "Некорректные данные"
      })
    }
    
    if(!req.file){
      return res.status(400).json({
        message: "Ошибка при загрузке файла"
      })
    }
    
    const {Name} = req.body
   
    let newObject = {
      Name: Name,
      Url: req.protocol + '://' + req.get('host') + '/' + req.file.path
    }
    
    let Response = {}
    pool.getConnection(function(err, sql) {
      sql.beginTransaction(function(err) {
        if (err) { throw err; }
        sql.query('INSERT INTO `image` SET ?', newObject, (err, res) => {
          if (err) {return sql.rollback(function() {throw err}) }
        })
        sql.commit(function(err) {
          if (err) {return sql.rollback(function() {throw err}) }
          
          Response.message = "Изображение создано"
          return res.status(200).json(Response)
        })
      })
    })
  } 
  catch (e) {
    ErroeHandler(res, e)
  }
}

module.exports.Delete =  async (req, res) => {
  try{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(200).json({
        errors: errors.array(),
        message: "Некорректные данные"
      })
    }
    
    const {DelId} = req.body.Data
   
    let Response = {}
    
    pool.getConnection(function(err, sql) {
      sql.beginTransaction(function(err) {
        if (err) { throw err; }
        sql.query('DELETE FROM `image` WHERE Id = ?', DelId, (err, res) => {
          if (err) {return sql.rollback(function() {throw err}) }
        })
        sql.commit(function(err) {
          if (err) {return sql.rollback(function() {throw err}) }
          
          Response.message = "Изображение удалено"
          return res.status(200).json(Response)
        })
      })
    })
    
  } 
  catch (e) {
    ErroeHandler(res, e)
  }
}
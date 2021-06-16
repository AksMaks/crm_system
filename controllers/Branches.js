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
        sql.query('SELECT Id, Name, Address FROM `branch` WHERE 1', (err, res) => {
          if (err) {return sql.rollback(function() {throw err}) }
          
          Response.Branches = res
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
    const {Name, Address} = req.body.Data
   
    let newObject = {
      Name: Name,
      Address: Address
    }
    
    let Response = {}
    pool.getConnection(function(err, sql) {
      sql.beginTransaction(function(err) {
        if (err) { throw err; }
        sql.query('INSERT INTO `branch` SET ?', newObject, (err, res) => {
          if (err) {return sql.rollback(function() {throw err}) }
        })
        sql.commit(function(err) {
          if (err) {return sql.rollback(function() {throw err}) }
          
          Response.message = "Отдел создан"
          return res.status(200).json(Response)
        })
      })
    })
  } 
  catch (e) {
    ErroeHandler(res, e)
  }
}

module.exports.Update = async (req, res) => {
  try{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(200).json({
        errors: errors.array(),
        message: "Некорректные данные"
      })
    }
    
    const {Id, Name, Address} = req.body.Data
   
    let newObject = {
      Name: Name,
      Address: Address
    }
    
    let Response = {}
    
    pool.getConnection(function(err, sql) {
      sql.beginTransaction(function(err) {
        if (err) { throw err; }
        sql.query('UPDATE `branch` SET ? WHERE Id = ?', [newObject, Id], (err, res) => {
          if (err) {return sql.rollback(function() {throw err}) }
        })
        sql.commit(function(err) {
          if (err) {return sql.rollback(function() {throw err}) }
          
          Response.message = "Отдел изменен"
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
    
    
    if(req.body.IdBranch == DelId){
      Response.message = "Нельзя удалить отдел, через который сейчас работайте"
      return res.status(200).json(Response)
    }
    
    pool.getConnection(function(err, sql) {
      sql.beginTransaction(function(err) {
        if (err) { throw err; }
        sql.query('DELETE FROM `branch` WHERE Id = ?', DelId, (err, res) => {
          if (err) {return sql.rollback(function() {throw err}) }
        })
        sql.commit(function(err) {
          if (err) {return sql.rollback(function() {throw err}) }
          
          Response.message = "Отдел удален"
          return res.status(200).json(Response)
        })
      })
    })
    
  } 
  catch (e) {
    ErroeHandler(res, e)
  }
}
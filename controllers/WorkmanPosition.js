const bcript = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")
const pool = require("../models/db.js");

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
        sql.query('SELECT Id, Name, Access FROM `workman_position` WHERE 1', (err, res) => {
          if (err) {return sql.rollback(function() {throw err}) }
          res.forEach(el => {
            el.Access = JSON.parse(el.Access)
          })
          Response.WorkmanPosition = res
        })
        sql.commit(function(err) {
          if (err) {return sql.rollback(function() {throw err}) }
          
          return res.status(200).json(Response)
        })
      })
    })
  }
  catch (e) {
    console.log("Server Error", e.message)
    return res.status(500).json({error: "Что то пошло не так, попробуйте снова, " + e.message})
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
    
    const {Name, Access} = req.body.Data
   
    let newObject = {
      Name: Name,
      Access: Access
    }
    
    let Response = {}
    pool.getConnection(function(err, sql) {
      sql.beginTransaction(function(err) {
        if (err) { throw err; }
        sql.query('INSERT INTO `workman_position` SET ?', newObject, (err, res) => {
          if (err) {return sql.rollback(function() {throw err}) }
        })
        sql.commit(function(err) {
          if (err) {return sql.rollback(function() {throw err}) }
          
          Response.message = "Должность создана"
          return res.status(200).json(Response)
        })
      })
    })
  } 
  catch (e) {
    return res.status(500).json({error: "Что то пошло не так, попробуйте снова, " + e.message})
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
    
    const {Id, Name, Access} = req.body.Data
   
    let newObject = {
      Name: Name,
      Access: Access
    }
    
    let Response = {}
    
    pool.getConnection(function(err, sql) {
      sql.beginTransaction(function(err) {
        if (err) { throw err; }
        sql.query('UPDATE `workman_position` SET ? WHERE Id = ?', [newObject, Id], (err, res) => {
          if (err) {return sql.rollback(function() {throw err}) }
        })
        sql.commit(function(err) {
          if (err) {return sql.rollback(function() {throw err}) }
          
          Response.message = "Должность изменена"
          return res.status(200).json(Response)
        })
      })
    })
    
  } 
  catch (e) {
    return res.status(500).json({error: "Что то пошло не так, попробуйте снова, " + e.message})
  }
}

module.exports.Delete = async (req, res) => {
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
        sql.query('DELETE FROM `workman_position` WHERE Id = ?', DelId, (err, res) => {
          if (err) {return sql.rollback(function() {throw err}) }
        })
        sql.commit(function(err) {
          if (err) {return sql.rollback(function() {throw err}) }
          
          Response.message = "Должность удалена"
          return res.status(200).json(Response)
        })
      })
    })
    
  } 
  catch (e) {
    console.log("Server Error", e.message)
    return res.status(500).json({message: "Что то пошло не так, попробуйте снова, " + e.message})
  }
}
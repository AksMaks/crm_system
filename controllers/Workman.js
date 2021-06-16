const bcript = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")
const pool = require("../models/db.js");

module.exports.Login = async (req, res) => {
  try{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(200).json({
        errors: errors.array(),
        message: "Некорректные данные"
      })
    }
    
    const {Login, Password} = req.body
    
    const hashedPassword = await bcript.hash(Password, 12)
    
    let Response = {}
    pool.getConnection(function(err, sql) {
      sql.beginTransaction((err) => {
        if (err) { throw err }
        sql.query(
          "SELECT Id, Name, Access FROM `view_workman` WHERE Login = ? AND Password = ?", [Login, Password], (err, res) => {
          if (err) {return sql.rollback(function() {throw err}) }

          if(res){
            let User = res[0]
            User.Access = JSON.parse(User.Access)
            Response.User = User
          }else{
            return res.status(200).json({error: "В доступе отказано"})
          }
        })

        sql.query(
          "SELECT Id, Name, Address FROM `branch` WHERE 1", (err, res) => {
          if (err) {return sql.rollback(function() {throw err}) }

          Response.Branches = res
        })

        sql.commit(function(err) {
          if (err) {return sql.rollback(function() {throw err}) }

          Response.message = "Вход выполнен";
          return res.status(200).json(Response)
        })
        sql.release();
      })
  })
  }
  catch (e) {
    ErroeHandler(res, e)
  }
}
  
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
        sql.query('SELECT Id, Name, Login, "" AS Password, Phone, IdPosition FROM `workman` WHERE 1', (err, res) => {
          if (err) {return sql.rollback(function() {throw err}) }

          Response.Workers = res
        })
        sql.query('SELECT `Id`, `Name`, `Access` FROM `workman_position` WHERE 1', (err, res) => {
          if (err) {return sql.rollback(function() {throw err}) }

          Response.Positions = res
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
    
    const {Name, Login, Password, Phone, IdPos} = req.body.Data
   
    const hashedPassword = await bcript.hash(Password, 12)
    
    let newWorkman = {
      Name: Name,
      Login: Login,
      Password: hashedPassword,
      Phone: Phone,
      IdPosition: IdPos
    }
    
    let Response = {}
    pool.getConnection(function(err, sql) {
      sql.beginTransaction(function(err) {
        if (err) { throw err; }
        sql.query('INSERT INTO `workman` SET ?', newWorkman, (err, res) => {
          if (err) {return sql.rollback(function() {throw err}) }
        })
        sql.commit(function(err) {
          if (err) {return sql.rollback(function() {throw err}) }
          
          Response.message = "Работник создан"
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
    
    const {Id, Name, Login, Password, Phone, IdPos} = req.body.Data
   
    const hashedPassword = await bcript.hash(Password, 12)
    
    let newWorkman = {
      Name: Name,
      Login: Login,
      Password: hashedPassword,
      Phone: Phone,
      IdPosition: IdPos
    }
    
    let Response = {}
    
    pool.getConnection(function(err, sql) {
      sql.beginTransaction(function(err) {
        if (err) { throw err; }
        sql.query('UPDATE `workman` SET ? WHERE Id = ?', [newWorkman, Id], (err, res) => {
          if (err) {return sql.rollback(function() {throw err}) }
        })
        sql.commit(function(err) {
          if (err) {return sql.rollback(function() {throw err}) }
          
          Response.message = "Работник изменен"
          return res.status(200).json(Response)
        })
      })
    })
    
  } 
  catch (e) {
    ErroeHandler(res, e)
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
        sql.query('DELETE FROM `workman` WHERE Id = ?', DelId, (err, res) => {
          if (err) {return sql.rollback(function() {throw err}) }
        })
        sql.commit(function(err) {
          if (err) {return sql.rollback(function() {throw err}) }
          
          Response.message = "Работник удален"
          return res.status(200).json(Response)
        })
      })
    })
    
  } 
  catch (e) {
    ErroeHandler(res, e)
  }
}
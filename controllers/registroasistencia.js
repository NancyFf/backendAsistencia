const { request, response } = require("express");
const pool = require("../db/connection");
const modelsAsistencia = require("../models/registroasistencia");

const AgregarDocente = async (req = request, res = response) => {
    const {nombre, apellido, activo} = req.body//URI params
    if(!nombre || !apellido || !activo){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    let conn;

    try {

        conn = await pool.getConnection()

        const [perExist] = await conn.query(modelsAsistencia.queryExitsPer, [nombre], (error) =>{if(error) throw error})
        
        if (perExist) {
            res.json({msg:`El Personal: '${nombre}' ya se encuentra registrado.`})
            return
        }

        const result = await conn.query( modelsAsistencia.queryAddPer, [nombre, apellido, activo], (error) => {if(error) throw error})

        if (result.affectedRows === 0) {
            res.status(404).json({msg: `No se pudo agregar el personal con el Nombre ${nombre} ${apellido}`})
            return
        }
        res.json({msg:`Se agregó satisfactoriamente el personal con Nombre ${nombre}`})
        
    } catch (error){
        console.log(error)
        res.status(500).json({msg: error})
    }finally{
        if (conn) conn.end()
    }

}
const MostrarDocente = async (req = request, res = response) => {
    let conn;

    try {

        conn = await pool.getConnection()

        const perExist = await conn.query(modelsAsistencia.queryMostrarPer,(error) =>{if(error) throw error})
        console.log(perExist)
        if (!perExist) {
            res.json({msg:`No se encuentra personal registrado.`})
            return
        }

        res.json({perExist})
        
    } catch (error){
        console.log(error)
        res.status(500).json({msg: error})
    }finally{
        if (conn) conn.end()
    }

}
const EditarDocente = async (req = request, res = response) => {
    const {ID} = req.params
    const {nombre, apellido, activo} = req.body//URI params
    if(!ID || !nombre || !apellido || !activo){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    let conn;

    try {

        conn = await pool.getConnection()

        const [perExist] = await conn.query(modelsAsistencia.queryExitsPer, [nombre], (error) =>{if(error) throw error})
        
        if (!perExist) {
            res.json({msg:`El Personal no se encuentra registrado.`})
            return
        }

        const result = await conn.query( modelsAsistencia.queryEditPer, [nombre, apellido, activo, ID], (error) => {if(error) throw error})

        if (result.affectedRows === 0) {
            res.status(404).json({msg: `No se pudo actualizar el personal con el Nombre ${nombre} ${apellido}`})
            return
        }
        res.json({msg:`Se actualizo satisfactoriamente el personal con Nombre ${nombre}`})
        
    } catch (error){
        console.log(error)
        res.status(500).json({msg: error})
    }finally{
        if (conn) conn.end()
    }

}
const EliminarDocente = async (req = request, res = response) => {
    const {ID} = req.params//URI params
    if(!ID){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    let conn;

    try {

        conn = await pool.getConnection()

        const perExist = await conn.query(modelsAsistencia.queryEliminarPer, [ID], (error) =>{if(error) throw error})
        

        if (perExist.affectedRows === 0) {
            res.status(404).json({msg: `No se pudo actualizar el personal`})
            return
        }
        res.json({msg:`Se elimino satisfactoriamente con id ${ID}`})
        
    } catch (error){
        console.log(error)
        res.status(500).json({msg: error})
    }finally{
        if (conn) conn.end()
    }

}
const Asistencia = async (req = request, res = response) => {
    const {asistencia, aula, grupo, observacion, activo, nombre} = req.body//URI params
    if(!asistencia || !aula || !grupo || !observacion || !activo){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    let conn, IDA;

    try {

        conn = await pool.getConnection()

        const [perExist] = await conn.query(modelsAsistencia.queryExitsAsi, [asistencia], (error) =>{if(error) throw error})
        
        if (perExist) {
            res.json({msg:`La Asistencia ya se encuentra registrado.`})
            return
        }
        const [pers] = await conn.query(`SELECT ID FROM Docentes WHERE nombre = ?`, [nombre], (error) =>{if(error) throw error})
        for (const key in pers) {
            IDA = pers[key]
        }
        const result = await conn.query( modelsAsistencia.queryAddAsi, [asistencia, aula, grupo, observacion, activo, IDA], (error) => {if(error) throw error})

        if (result.affectedRows === 0) {
            res.status(404).json({msg: `No se pudo registrar la Asistencia el personal con el Nombre ${nombre}`})
            return
        }
        res.json({msg:`Se registro satisfactoriamente el personal con Nombre ${nombre}`})
        
    } catch (error){
        console.log(error)
        res.status(500).json({msg: error})
    }finally{
        if (conn) conn.end()
    }

}
const EditarAsistencia = async (req = request, res = response) => {
    
    const {asistencia, aula, grupo, observacion, activo, nombre} = req.body//URI params
    if(!ID || !asistencia || !aula || !grupo || !observacion || !activo || !nombre){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    let conn;

    try {

        conn = await pool.getConnection()

        const [perExist] = await conn.query("SELECT p.nombre FROM Asistencia a JOIN Personal p ON a.IDA = p.ID WHERE nombre = ?", [nombre], (error) =>{if(error) throw error})
        
        if (!perExist) {
            res.json({msg:`El Personal no se encuentra registrado.`})
            return
        }

        const result = await conn.query(`UPDATE Asistencia SET asistencia = ?, aula = ?, grupo = ?, observacion = ?, activo = ? WHERE ID = ?`, [asistencia, aula, grupo, observacion, activo, ID], (error) => {if(error) throw error})

        if (result.affectedRows === 0) {
            res.status(404).json({msg: `No se pudo actualizar el personal con el Nombre ${nombre}`})
            return
        }
        res.json({msg:`Se actualizo satisfactoriamente el personal con Nombre ${nombre}`})
        
    } catch (error){
        console.log(error)
        res.status(500).json({msg: error})
    }finally{
        if (conn) conn.end()
    }

}
module.exports = {AgregarDocente, MostrarDocente, EditarDocente, EliminarDocente, Asistencia, EditarAsistencia}
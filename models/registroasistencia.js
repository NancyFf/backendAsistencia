const modelsAsistencia = {
    queryExitsPer: `SELECT nombre FROM Docentes WHERE nombre = ?`,
    queryExitsAsi: `SELECT asistencia FROM RegistroAsistencia WHERE asistencia = ?`,
    queryAddAsi: `INSERT INTO RegistroAsistencia (asistencia, aula, grupo, observacion, activo, IDA) VALUES (?, ?, ?, ?, ?, ?)`,
    queryAddPer: `INSERT INTO Docentes (nombre, apellido, Activo) VALUES (?, ?, ?)`,
    queryMostrarPer: `SELECT * FROM Docentes`,
    queryEditPer: `UPDATE Docentes SET nombre = ?, apellido = ?, activo = ? WHERE ID = ?`,
    queryEliminarPer:`UPDATE Docentes SET activo = 'N' WHERE ID = ?`
}

module.exports = modelsAsistencia
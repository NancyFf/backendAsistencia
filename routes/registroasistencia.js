const {Router} = require("express")
const {Asistencia, EditarAsistencia, AgregarDocente, MostrarDocente, EditarDocente, EliminarDocente } = require("../controllers/registroasistencia")
const {} = require("../controllers/registroasistencia")
const router = Router()

router.post("/agregardocente", AgregarDocente)

router.get("/mostrardocente", MostrarDocente)

router.put("/editardocente/id/:ID", EditarDocente)
router.put("/editarasistencia", EditarAsistencia)

router.delete("/eliminardocente/id/:ID", EliminarDocente)

router.post("/asistencia", Asistencia)
module.exports = router
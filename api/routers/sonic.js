import router from "./index";
import base from "./base";
import * as sonicController from "./../controllers/sonic";

router.get('/sonic', sonicController.ingestData);
router.get('/sonic/:collection/:query', sonicController.queryData);
router.get('/sonic/suggest/:collection/:query', sonicController.suggest);

export default router;
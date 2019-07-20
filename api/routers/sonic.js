import router from "./index";
import base from "./base";
import * as sonicController from "./../controllers/sonic";

router.get('/sonic', sonicController.ingestData);
router.get('/sonic/:collection/:query', sonicController.queryData);

export default router;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const memberControllers_1 = require("../controllers/memberControllers");
const router = express_1.default.Router();
router.post("/", memberControllers_1.createMember);
router.get("/", memberControllers_1.getAllMembers);
router.get("/:id", memberControllers_1.getMemberById);
router.put("/:id", memberControllers_1.updateMember);
router.delete("/:id", memberControllers_1.deleteMember);
exports.default = router;
//# sourceMappingURL=memberRoutes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newsletter_controller_1 = require("../controllers/newsletter.controller");
const router = (0, express_1.Router)();
router.post('/subscribe', newsletter_controller_1.subscribeToNewsletter);
exports.default = router;
//# sourceMappingURL=newsletter.routes.js.map
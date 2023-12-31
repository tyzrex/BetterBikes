"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiclePostRoutes = void 0;
const vehiclepost_controller_1 = require("../controller/vehiclepost.controller");
const validateToken_1 = require("../middleware/validateToken");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/list-vehicle", validateToken_1.validateToken, vehiclepost_controller_1.PostVehicle);
router.get("/search-vehicle", vehiclepost_controller_1.SearchVehicle);
router.get("/featured-vehicles", vehiclepost_controller_1.GetFeaturedVehicles);
router.get("/vehicle-detail/:id", vehiclepost_controller_1.GetVehicleDetail);
router.get("/all-vehicles", vehiclepost_controller_1.GetAllVehicles);
exports.vehiclePostRoutes = router;

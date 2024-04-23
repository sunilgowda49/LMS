import express, { Router } from "express";
import {
  HodLogin,
  PrincipalLogin,
  StaffLogin,
  addHod,
  addStaff,
  applyLeave,
  deleteHod,
  deleteStaff,
  getAllHod,
  getAllStaff,
  getApprovedLeaveRequests,
  getAuthorizedLeaveRequests,
  getHodLeaveRequestHistory,
  getPendingLeaveRequests,
  getStaffLeaveRequest,
  updateHod,
  updateHodLeaveRequestStatus,
  updateHodProfile,
  updateLeaveRequestStatus,
  updatePrincipalProfile,
  updateStaff,
  updateStaffProfile
} from "../Controllers/userController.js";
const router = express.Router();
router.get("/principallogin/", PrincipalLogin);
router.get("/hodlogin/", HodLogin);
router.get("/stafflogin/", StaffLogin);
router.get("/hodlist/", getAllHod);
router.get("/stafflist/", getAllStaff);
router.get("/getstaffleaverequest", getStaffLeaveRequest);
router.get("/viewpendingleaverequests", getPendingLeaveRequests);
router.get("/viewapprovedleaverequests", getApprovedLeaveRequests);
router.get("/viewathorizedleaverequests", getAuthorizedLeaveRequests);
router.get("/viewhodleaverequesthistory", getHodLeaveRequestHistory);
router.post("/addhod", addHod);
router.post("/addstaff", addStaff);
router.post("/applyleave", applyLeave);
router.delete("/deletehod/", deleteHod);
router.delete("/deletestaff/", deleteStaff);
router.put("/edithod/", updateHod);
router.put("/editstaff/", updateStaff);
router.put("/editprincipalprofile/", updatePrincipalProfile);
router.put("/editstaffprofile/", updateStaffProfile);
router.put("/edithodprofile/", updateHodProfile);
router.put("/updateleaverequeststatus/", updateLeaveRequestStatus);
router.put("/updatehodleaverequeststatus/", updateHodLeaveRequestStatus);
export default router;

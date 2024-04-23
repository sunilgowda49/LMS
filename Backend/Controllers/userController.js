import asyncHandler from "express-async-handler";
import Principal from "../Models/principal.js";
import Hod from "../Models/hod.js";
import Staff from "../Models/staff.js";
import Leave from "../Models/leave.js";

const PrincipalLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.query;
  console.log(req.query);
  const user = await Principal.find({ email: email, password: password });
  if (user) {
    return res.json({ result: user });
  } else {
    return res.send({
      message: "Wrong username/password combination!"
    });
  }
});

const HodLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.query;
  const user = await Hod.find({ email: email, password: password });
  if (user) {
    return res.json({ result: user });
  } else {
    return res.send({
      message: "Wrong username/password combination!"
    });
  }
});

const StaffLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.query;
  const user = await Staff.find({ email: email, password: password });
  if (user) {
    return res.json({ result: user });
  } else {
    return res.send({
      message: "Wrong username/password combination!"
    });
  }
});

const addHod = asyncHandler(async (req, res) => {
  const { name, email, password, address, mobile, department } = req.body;

  const hoddata = new Hod({
    name: name,
    email: email,
    password: password,
    address: address,
    mobile: mobile,
    department: department
  });
  await hoddata.save();
  res.json({
    status: 200,
    message: "Hod Added Successfully"
  });
});

const addStaff = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    address,
    mobile,
    department,
    subject
  } = req.body;

  const staffdata = new Staff({
    name: name,
    email: email,
    password: password,
    address: address,
    mobile: mobile,
    department: department,
    subject: subject,
    total_leave: "20"
  });
  await staffdata.save();
  res.json({
    status: 200,
    message: "Staff Added Successfully"
  });
});

const applyLeave = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    mobile,
    department,
    subject,
    noofdays,
    startdate,
    enddate,
    leavereason,
    leavetype,
    requestcreationdate,
    requeststatus
  } = req.body;

  const leavedata = new Leave({
    name: name,
    email: email,
    mobile: mobile,
    department: department,
    subject: subject,
    noofdays: noofdays,
    startdate: startdate,
    enddate: enddate,
    leavereason: leavereason,
    leavetype: leavetype,
    requestcreationdate: requestcreationdate,
    requeststatus: requeststatus
  });
  await leavedata.save();
  res.json({
    status: 200,
    message: "Leave Request Submitted Successfully"
  });
});

const getAllHod = asyncHandler(async (req, res) => {
  const hodData = await Hod.find({});
  res.status(200).send(hodData);
});

const getAllStaff = asyncHandler(async (req, res) => {
  const staffData = await Staff.find({});
  res.status(200).send(staffData);
});

const getPendingLeaveRequests = asyncHandler(async (req, res) => {
  const Data = await Leave.find({ requeststatus: "submitted for approval" });
  res.status(200).send(Data);
});

const getApprovedLeaveRequests = asyncHandler(async (req, res) => {
  const Data = await Leave.find({
    requeststatus: "request got approved by HOD"
  });
  res.status(200).send(Data);
});

const getAuthorizedLeaveRequests = asyncHandler(async (req, res) => {
  const Data = await Leave.find({
    $or: [
      {
        requeststatus: "request got approved by Principal"
      },
      {
        requeststatus: "request got rejected by Principal"
      }
    ]
  });
  res.status(200).send(Data);
});

const getHodLeaveRequestHistory = asyncHandler(async (req, res) => {
  const Data = await Leave.find({
    $or: [
      {
        requeststatus: "request got approved by Principal"
      },
      {
        requeststatus: "request got rejected by Principal"
      },
      {
        requeststatus: "request got approved by HOD"
      },
      {
        requeststatus: "request got rejected by HOD"
      }
    ]
  });
  res.status(200).send(Data);
});

const getStaffLeaveRequest = asyncHandler(async (req, res) => {
  const { email } = req.query;
  const staffData = await Leave.find({ email: email });
  res.status(200).send(staffData);
});

const deleteHod = asyncHandler(async (req, res) => {
  const { id } = req.query;
  console.log(req.query);
  await Hod.deleteOne({ _id: id });
  res.json({ status: 200 });
});

const deleteStaff = asyncHandler(async (req, res) => {
  const { id } = req.query;
  console.log(req.query);
  await Staff.deleteOne({ _id: id });
  res.json({ status: 200 });
});

const updateHod = asyncHandler(async (req, res) => {
  const { id, name, password, address, mobile, department } = req.body;
  console.log(req.query);
  await Hod.updateOne(
    { _id: id },
    {
      $set: {
        name: name,
        password: password,
        address: address,
        mobile: mobile,
        department: department
      }
    }
  );
  res.json({ status: 200, message: "Hod Updated Successfully" });
});

const updateStaff = asyncHandler(async (req, res) => {
  const { id, name, password, address, mobile, department, subject } = req.body;
  console.log(req.query);
  await Staff.updateOne(
    { _id: id },
    {
      $set: {
        name: name,
        password: password,
        address: address,
        mobile: mobile,
        department: department,
        subject: subject
      }
    }
  );
  res.json({ status: 200, message: "Staff Updated Successfully" });
});

const updatePrincipalProfile = asyncHandler(async (req, res) => {
  const { name, email, password, address, mobile, id } = req.body;
  console.log(req.query);
  await Principal.updateOne(
    { _id: id },
    {
      $set: {
        name: name,
        email: email,
        password: password,
        address: address,
        mobile: mobile
      }
    }
  );
  res.json({ status: 200, message: "Principal Updated Successfully" });
});

const updateHodProfile = asyncHandler(async (req, res) => {
  const { name, email, password, address, mobile, id } = req.body;
  console.log(req.query);
  await Hod.updateOne(
    { _id: id },
    {
      $set: {
        name: name,
        email: email,
        password: password,
        address: address,
        mobile: mobile
      }
    }
  );
  res.json({ status: 200, message: "Hod Updated Successfully" });
});

const updateLeaveRequestStatus = asyncHandler(async (req, res) => {
  const { id, status, staffemail } = req.body;
  console.log(req.body);

  const user = await Staff.find({ email: staffemail });
  if (user) {
    var totalleave = parseInt(user[0].total_leave) - 1;
    console.log(totalleave);
    await Leave.updateOne(
      { _id: id },
      {
        $set: {
          requeststatus: status
        }
      }
    );
    await Staff.updateOne(
      { email: staffemail },
      {
        $set: {
          total_leave: totalleave
        }
      }
    );
    res.json({ status: 200 });
  } else {
    return res.send({
      message: "Wrong username/password combination!"
    });
  }
});

const updateHodLeaveRequestStatus = asyncHandler(async (req, res) => {
  const { id, status } = req.body;
  console.log(req.body);
  await Leave.updateOne(
    { _id: id },
    {
      $set: {
        requeststatus: status
      }
    }
  );
  res.json({ status: 200 });
});

const updateStaffProfile = asyncHandler(async (req, res) => {
  const { name, email, password, address, mobile, id } = req.body;
  console.log(req.query);
  await Staff.updateOne(
    { _id: id },
    {
      $set: {
        name: name,
        email: email,
        password: password,
        address: address,
        mobile: mobile
      }
    }
  );
  res.json({ status: 200, message: "Staff Updated Successfully" });
});

export {
  PrincipalLogin,
  StaffLogin,
  HodLogin,
  addStaff,
  addHod,
  getAllHod,
  getAllStaff,
  deleteHod,
  deleteStaff,
  updateHod,
  updateStaff,
  updatePrincipalProfile,
  updateStaffProfile,
  updateHodProfile,
  applyLeave,
  getStaffLeaveRequest,
  getPendingLeaveRequests,
  updateLeaveRequestStatus,
  getApprovedLeaveRequests,
  getAuthorizedLeaveRequests,
  getHodLeaveRequestHistory,
  updateHodLeaveRequestStatus
};

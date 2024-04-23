import mongoose from "mongoose";
const userData = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  noofdays: {
    type: String,
    required: true
  },
  startdate: {
    type: String,
    required: true
  },
  enddate: {
    type: String,
    required: true
  },
  leavereason: {
    type: String,
    required: true
  },
  leavetype: {
    type: String,
    required: true
  },
  requestcreationdate: {
    type: String,
    required: true
  },
  requeststatus: {
    type: String,
    required: true
  }
});
//userdetail is the modelname.using these userdetail we can able to create,read,update,delete datas in userdetails collection
const Leave = mongoose.model("leave", userData);

export default Leave;

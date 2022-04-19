const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (p)=>{
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(p, salt);
  return hash;
}

helpers.matchPassword = async(p, sp)=>{
  try {
    return await bcrypt.compare(p, sp);
  } catch (e) {
    console.log(e);
  }
}


module.exports = helpers;

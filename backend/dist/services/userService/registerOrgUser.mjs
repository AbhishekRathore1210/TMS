import express from 'express';
const regOrgRoute = express.Router();
import userDAO from '../../dao/userDAO.mjs';
async function createUser(firstName, lastName, org, email) {
    const newUser = userDAO.createUser(firstName, lastName, org, email);
    return newUser;
}
async function createAdmin(firstName, lastName, email) {
    const newUser = userDAO.createAdmin(firstName, lastName, email);
    return newUser;
}
async function checkAdmin(email, otp) {
    const user = userDAO.checkAdmin(email, otp);
    return user;
}
export { createUser, createAdmin, checkAdmin };
//# sourceMappingURL=registerOrgUser.mjs.map
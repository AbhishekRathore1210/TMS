import express from 'express';
const regOrgRoute = express.Router();
import { orgUser } from '../models/User.mjs';
regOrgRoute.post('/register', async (req, res) => {
    const { firstName, lastName, org, email } = req.body;
    const userExist = await orgUser.findOne({ email: email });
    if (userExist) {
        res.status(400).json({ message: "user is already present"
        });
    }
    else {
        try {
            const userAdded = await orgUser.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                org: org,
                organization_list: [org]
            });
            await userAdded.save();
            res.status(200).json({ userAdded });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
});
export { regOrgRoute };
//# sourceMappingURL=registerUser.mjs.map
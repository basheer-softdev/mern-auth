import userModal from '../models/userModels.js';

// Controller function to retrieve user data based on the user ID...
export const getUserData = async (req, res) => {
    try {
        const {userId} = req.body;

        const user = await userModal.findById(userId);

        if(!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        res.json({ success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.isAccountVerified
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
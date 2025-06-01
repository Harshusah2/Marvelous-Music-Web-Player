import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import signUp from '../models/signupModel.js';

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    //check the user is already exists
    const existingUser = await signUp.findOne({ email });
    if (existingUser) {
        return res.status(400).json({error:'User already exists'});
    }
    

    try {

        //const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, 10);
        
        //creating a new user
        const newUser = new signUp({
            username,
            email,
            password: hashedPassword,
        });
        
        await newUser.save();

        //create token
        const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET_KEY ,{expiresIn:'1h'});

        res.status(201).json({token});

    } catch (error) {

        console.error('Error creating account:', error);

        res.status(500).json({error:'Failed to create account'});
        
    }
};

export {signup};


// Get login details
const getLoginDetails = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        
        const user = await signUp.findById(userId);

        if(!user) {
            // console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            id: user._id,
            username: user.username, //checking
            email: user.email,
        });

    } catch (error) {

        console.error('Error fetching user details:', error);
        res.status(500).json({message: 'Internal server error'});
        
    }
  };
  
  export { getLoginDetails };



//Login controller
const login = async (req, res) => {
    try {

        const { username, password } = req.body;
        const user = await signUp.findOne({ username });

        //find user by username
        if(!user){
            return res.status(401).json({error:'Invalid username or password'});
        }

        //compare provided password with the stored hash password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            return res.status(401).json({error: 'Invalid username or passsword'});
        }

        //generate jwt token for user
        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h' }); //token is valid for 1 hour 
        res.status(200).json({
            message: 'Login successfull',
            token,
            user: {
                id: user._id,
                username: user.username, //checking
                email: user.email,
            },
        });

    } catch (error) {

        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

export {login};
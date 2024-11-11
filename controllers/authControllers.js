const signupUser = (req, res) => {
    res.send('signup')
    console.log('signup user');    
};

const loginUser = (req, res) => {
    res.send('login')
    console.log('login user');
};

const logoutUser = (req, res) => {
    res.send('logout')
    console.log('logout user');
};

export {
    signupUser,
    loginUser,
    logoutUser
};

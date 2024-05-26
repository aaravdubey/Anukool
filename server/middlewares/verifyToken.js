import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  try {
    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    } else return res.status(401).json({ msg: 'Token is not valid' });

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          console.log(err);
          return res.status(401).json({ msg: 'Invalid Token' });
        } else {
          req.body.userData = decoded.user;
          // console.log(decoded);
          next();
          // return res.status(200).json({ msg: 'Valid Token' });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
}

export default verifyToken;
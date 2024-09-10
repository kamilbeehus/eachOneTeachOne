// Code has been commented out for development purposes. Uncomment the code to enable user authentication with token.

// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
//
// export const authenticateUser = async (req, res, next) => {
//   // Extract the token from the request’s cookies:
//   const token = req.cookies.token;

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Unauthorized : No token provided." });
//   }

//   try {
//     // The token is then verified using a secret key. This verification process decodes the token and retrieves the payload,
//     // which typically includes the user’s ID and possibly other information.
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // With the decoded information, usually containing the user’s ID, the middleware fetches the user from the database.
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return res.status(401).json({ message: "Unauthorized: User not found." });
//     }

//     // After the user is fetched, it is attached to the req object, making it accessible in subsequent middleware or controllers
//     req.user = user;
//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({ message: "Unauthorized: Token expired." });
//     }
//     return res.status(401).json({ message: "Unauthorized: Invalid token." });
//   }
// };

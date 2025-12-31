import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface user {
  role: string;
  email: string;
  user_id: string;
  name: string;
}

export interface reqAuth extends Request {
  user: user;
}

const createToken = (payload: user) => {
  if (!process.env["SECRET_KEY"]) {
    throw new Error("No environment variable.");
  }
  const token = jwt.sign(payload, process.env["SECRET_KEY"], {
    expiresIn: "7d",
    algorithm: "HS256",
  });
  return token;
};

const authenticateUser = (req: reqAuth, res: Response, next: NextFunction) => {
  if (!req.cookies || !req.cookies["my_cookie"]) {
    return res.status(401).json({ Message: `No token` });
  }
  const token = req.cookies["my_cookie"];
  console.log(token);
  if (!token || token === "")
    return res.status(401).json({ Message: `No token` });

  try {
    if (!process.env["SECRET_KEY"]) {
      return res.status(500).json({ Message: `No environment variable.` });
    }
    const decode = jwt.verify(token, process.env["SECRET_KEY"]);
    if (!decode)
      return res.status(401).json({ Message: `Wrong token or token expires` });
    req.user = decode as user;
    next();
  } catch (error) {
    return res.status(401).json({ Message: `Wrong token or token expires` });
  }
};

const authenticateShipper = (req: reqAuth, res: Response, next: NextFunction) => {
  if (!req)
    return res.status(401).json({ Message: `Wrong token or token expires` });
  console.log("req.user: ", req.user);
  const isShipper = req.user.role == "shipper" || req.user.role == "admin";

  //check isShipper is true or false  
  if (!isShipper) {
    console.log(req.user.name, ":Khong la shipper");
    res.cookie("my_cookie", "", {
      expires: new Date(0),
    });
    return res.status(403).json({ Message: `Unauthenticate` });
  }
  next();
};

const authenticateAdmin = (req: reqAuth, res: Response, next: NextFunction) => {
  if (!req)
    return res.status(401).json({ Message: `Wrong token or token expires` });
  console.log("req.user: ", req.user);
  const isAdmin = req.user.role == "admin";

  //check isAdmin is true or false  
  if (!isAdmin) {
    console.log(req.user.name, ":Khong la admin");
    res.cookie("my_cookie", "", {
      expires: new Date(0),
    });
    return res.status(403).json({ Message: `Unauthenticate` });
  }
  next();
};

export { createToken, authenticateAdmin, authenticateUser, authenticateShipper };

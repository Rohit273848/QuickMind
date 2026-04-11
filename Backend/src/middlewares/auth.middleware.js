import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Authentication required",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
}
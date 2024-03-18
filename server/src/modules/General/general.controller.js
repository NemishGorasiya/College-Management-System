export const userLogout = async (req, res) => {
    req.logout({
        message: "User logged out successfully",
    }, (err) => {
        if (err) {
            throw new CustomError(httpStatus.INTERNAL_SERVER_ERROR, "Error in logging out the user");
        }

        return res.send({
            message: "User logged out successfully",
        })
    })
}
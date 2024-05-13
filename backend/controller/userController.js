export function getUserOfMe (req, res) {
    res.json({
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
    })
}
import { Router } from "express";

const router = Router();

router.get('/api/ping', (req, res, next) => {
    res.send("Ping!!");
})

export default router;
const express = require("express");

const router = new express.Router();

router.post("/users", async (req, res) => {});

router.post("/users/login", async (req, res) => {});

router.post("/users/logout", async (req, res) => {});

router.post("/users/logoutAll", async (req, res) => {});

router.get("/users/me", async (req, res) => {});

router.patch("/users/me", async (req, res) => {});

router.delete("/users/me", async (req, res) => {});

module.exports = router;

const express = require("express");

const router = express.Router();

// Sample account data
let balance = 10000;

let transactions = [
    {
        id: 1,
        type: "Deposit",
        amount: 5000,
        date: new Date().toLocaleString()
    },
    {
        id: 2,
        type: "Withdrawal",
        amount: 1000,
        date: new Date().toLocaleString()
    }
];

// Get account balance
router.get("/balance", (req, res) => {
    res.json({
        success: true,
        balance
    });
});

// Get transaction history
router.get("/transactions", (req, res) => {
    res.json({
        success: true,
        transactions
    });
});

// Deposit money
router.post("/deposit", (req, res) => {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid amount"
        });
    }

    balance += Number(amount);

    const transaction = {
        id: transactions.length + 1,
        type: "Deposit",
        amount: Number(amount),
        date: new Date().toLocaleString()
    };

    transactions.push(transaction);

    res.json({
        success: true,
        message: "Deposit successful",
        balance,
        transaction
    });
});

// Withdraw money
router.post("/withdraw", (req, res) => {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid amount"
        });
    }

    if (amount > balance) {
        return res.status(400).json({
            success: false,
            message: "Insufficient balance"
        });
    }

    balance -= Number(amount);

    const transaction = {
        id: transactions.length + 1,
        type: "Withdrawal",
        amount: Number(amount),
        date: new Date().toLocaleString()
    };

    transactions.push(transaction);

    res.json({
        success: true,
        message: "Withdrawal successful",
        balance,
        transaction
    });
});

module.exports = router;
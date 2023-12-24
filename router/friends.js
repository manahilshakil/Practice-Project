const express = require('express');
const router = express.Router();

// An initial list of friends stored as an object
let friends = {
  "johnsmith@gmail.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
  "annasmith@gmail.com":{"firstName": "Anna","lastName": "Smith","DOB":"02-07-1983"},
  "peterjones@gmail.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};

// GET request: Retrieve all friends
router.get("/", (req, res) => {
  res.status(200).json(friends);
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email", (req, res) => {
  const email = req.params.email;
  if (friends[email]) {
    res.status(200).json(friends[email]);
  } else {
    res.status(404).json({ message: "Friend not found" });
  }
});

// POST request: Add a new friend
router.post("/", (req, res) => {
  const email = req.body.email;
  if (email && !friends[email]) {
    friends[email] = req.body;
    res.status(201).json({ message: "Friend added successfully" });
  } else {
    res.status(400).json({ message: "Invalid request or friend already exists" });
  }
});

// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
  const email = req.params.email;
  if (friends[email]) {
    friends[email] = req.body;
    res.status(200).json({ message: "Friend updated successfully" });
  } else {
    res.status(404).json({ message: "Friend not found" });
  }
});

// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  if (friends[email]) {
    delete friends[email];
    res.status(200).json({ message: "Friend deleted successfully" });
  } else {
    res.status(404).json({ message: "Friend not found" });
  }
});

module.exports = router;

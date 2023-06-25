// Create web server 
// Run: node comments.js
// Test: http://localhost:3000/comments
// Test: http://localhost:3000/comments/123
// Test: http://localhost:3000/comments?postId=1
// Test: http://localhost:3000/comments?postId=1&userId=1
// Test: http://localhost:3000/comments?postId=1&userId=1&_sort=id&_order=desc
// Test: http://localhost:3000/comments?_page=2&_limit=2
// Test: http://localhost:3000/comments?_page=2&_limit=2&_sort=id&_order=desc

const express = require('express');
const app = express();
const fs = require('fs');

const COMMENTS_DB = './db/comments.json';

// Get all comments
app.get('/comments', (req, res) => {
  fs.readFile(COMMENTS_DB, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    const comments = JSON.parse(data);
    res.json(comments);
  });
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
  fs.readFile(COMMENTS_DB, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    const comments = JSON.parse(data);
    const comment = comments.find(c => c.id === parseInt(req.params.id));

    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
    } else {
      res.json(comment);
    }
  });
});

// Get a comment by query string
app.get('/comments', (req, res) => {
  fs.readFile(COMMENTS_DB, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    const comments = JSON.parse(data);

    if (req.query.postId) {
      const postId = parseInt(req.query.postId);
      const comment = comments.filter(c => c.postId === postId);
      res.json(comment);
    } else if (req.query.userId) {
      const userId = parseInt(req.query.userId);
      const comment = comments.filter(c => c.userId === userId);
      res.json(comment);
    } else {
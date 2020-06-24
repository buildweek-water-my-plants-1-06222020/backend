const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

const authMiddleware = require('../auth/auth-middleware.js')

server.use(helmet());
server.use(express.json());
server.use(cors());

const usersRouter = require('../users/users-router.js');
server.use('/api/users', authMiddleware, usersRouter)

const plantsRouter = require('../plants/plants-router.js');
server.use('/api/plants', authMiddleware, plantsRouter)

const authRouter = require('../auth/auth-router.js');
server.use('/api/auth', authRouter)


module.exports = server;
 /**
 * @swagger
 * components:
 *   schemas:
 *     users:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: The user fullName
 *         email:
 *           type: string
 *           description: The user email
 */


 /**
 * @swagger
 * components:
 *   schemas:
 *     login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     feadback:
 *       type: object
 *       required:
 *         - email
 *         - feadback
 *       properties:
 *         email:
 *           type: string
 *           description: enter email
 *         feadback:
 *           type: string
 *           description: The feedback content
 */












 // register user 

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Create a new user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *       500:
 *         description: Some server error
 */


// login user

/**
 * @swagger
 * /DeveloperSignin:
 *   post:
 *     summary: login user
 *     tags: [login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *       200:
 *         description: The user successfully login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/'
 *       500:
 *         description: Some server error
 */


/**
 * @swagger
 * /addFeadback:
 *   post:
 *     summary: feedback 
 *     tags: [feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/feadback'
 *     responses:
 *       200:
 *         description: feedback save sucessfully..!!
 *       401:
 *         description: Some server error
 */



// get user list

/**
 * @swagger
 * /GetAllRecievers:
 *   get:
 *     summary: Returns the list of all users
 *     tags: [users]
 *     responses:
 *       200:
 *         description: The list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/users'
 */
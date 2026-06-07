# Project Management System

## Overview

Project Management System is a full-stack web application used to manage projects, developers, and tasks efficiently. The system allows administrators to create and manage projects, assign tasks to developers, and track project progress through a centralized dashboard.

---

## Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* Context API
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

### Database

* MongoDB Atlas

### Version Control

* Git
* GitHub

---

## Features

### Authentication

* Admin Login
* Developer Login
* Protected Routes
* JWT Authentication

### Project Management

* Create Projects
* View Projects
* Manage Project Details

### Developer Management

* Add Developers
* View Developers
* Assign Developers to Projects

### Task Management

* Create Tasks
* Assign Tasks to Developers
* Update Task Status
* View Assigned Tasks

### Dashboard

* Project Overview
* Developer Overview
* Task Tracking

---

# Backend Setup

### 1. Navigate to Backend Project

```bash
cd project-management-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Initial Admin User

Before starting the backend server, create the admin account:

```bash
node createAdmin.js
```

### 4. Start Backend Server

```bash
npm run dev
```

Backend server will start successfully after admin creation.

---

# Frontend Setup

### 1. Navigate to Frontend Project

```bash
cd project-management-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Frontend

```bash
npm run dev
```

Frontend application will run on the local development server.

---

## Database

MongoDB Atlas is used as the cloud database for storing:

* Admin Information
* Developers
* Projects
* Tasks

---

## Project Modules

### Admin Module

* Manage Projects
* Manage Developers
* Assign Tasks
* Track Progress

### Developer Module

* Login
* View Assigned Tasks
* Update Task Status

### Task Module

* Task Creation
* Task Assignment
* Status Tracking

---

## Repositories

### Backend Repository

https://github.com/Harish7591/project_Management

### Frontend Repository

https://github.com/Harish7591/project_Management_Frontend

---

## Author

Harish Kumar

Full Stack Developer

Node.js | Express.js | MongoDB | React.js

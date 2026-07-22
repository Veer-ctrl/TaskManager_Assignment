# Task Manager

A full-stack Task Manager application built using **Angular 20** and **Django REST Framework**. The application allows authenticated users to securely manage their own tasks with JWT Authentication.

---
<img width="1918" height="867" alt="image" src="https://github.com/user-attachments/assets/6db66103-5f59-412e-acdc-5a518a5ff91d" />
<img width="1917" height="870" alt="image" src="https://github.com/user-attachments/assets/a8227696-2554-4c61-ac0f-a835525deba7" />



## Features

- JWT Authentication
- User-specific Task Management
- Create, Read, Update and Delete Tasks (CRUD)
- Search Tasks
- Filter Tasks by Status
- Sort Tasks
- Due Date Validation
- Responsive User Interface
- Protected Routes

---

## Tech Stack

### Frontend
- Angular 20
- TypeScript
- Tailwind CSS

### Backend
- Django
- Django REST Framework
- Django Filter
- Simple JWT Authentication
- SQLite

---

## Project Structure

```text
TaskManager_Assignment/
│
├── backend/
│   ├── config/
│   ├── tasks/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/Veer-ctrl/TaskManager_Assignment.git
cd TaskManager_Assignment
```

---

## Backend Setup

Create a virtual environment:

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment:

**Windows**

```bash
.venv\Scripts\activate
```

**Linux/macOS**

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Apply migrations:

```bash
python manage.py migrate
```

Create a Django superuser:

```bash
python manage.py createsuperuser
```

Start the backend server:

```bash
python manage.py runserver
```

Backend runs on:

```
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend
npm install
ng serve
```

Frontend runs on:

```
http://localhost:4200
```

---

## Login

This project uses **Django's built-in authentication system** for user login.

After creating a superuser using:

```bash
python manage.py createsuperuser
```

log in to the application using the created **username** and **password**.

> **Note:** User registration is not implemented. Authentication is handled using Django's built-in Superuser together with JWT Authentication.

---

## API Endpoints

### Authentication

```http
POST /api/token/
```

### Current User

```http
GET /api/me/
```

### Tasks

```http
GET    /api/tasks/
POST   /api/tasks/
PUT    /api/tasks/{id}/
DELETE /api/tasks/{id}/
```

---

## Authentication

The application uses **JWT (JSON Web Token)** authentication.

After a successful login, the Angular application stores the JWT access token and automatically attaches it to every protected API request using an HTTP Interceptor.

---

## Validation

- Title is required.
- Title must contain at least 3 characters.
- Due date cannot be in the past.
- Authentication is required to access all task-related APIs.

---

## Author

**Veer Pratap Singh**

GitHub: https://github.com/Veer-ctrl

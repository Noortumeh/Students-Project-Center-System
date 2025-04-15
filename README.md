# 🎓 Student Project Center System

The **Student Project Center System (SPCS)** is a full-stack web application designed to efficiently manage student graduation projects and connect students with academic supervisors, university administrators, and real-world clients. This system streamlines project tracking, task management, and communication—bridging the gap between academia and industry.

## 🔍 Project Summary

The goal of this platform is to provide a collaborative environment where students can work on real-life projects, supervisors can guide and evaluate their progress, admins can manage users and projects, and clients can track project development. With features like real-time progress tracking, file sharing, task management, and meeting scheduling, the system creates an ecosystem for educational project success and professional preparation.

---

## 💻 Technologies Used

### 1. **Integrated Development Environments (IDEs)**
- Visual Studio
- Visual Studio Code (VS Code)
- JetBrains Rider
- SQL Server Management Studio

### 2. **User Interface Design**
- Figma

### 3. **Front-End Technologies**
- HTML5
- CSS3
- JavaScript (ES6+)
- React.js
- React Material UI (MUI)

### 4. **Back-End Technologies**
- C# (C-Sharp)
- ASP.NET Core 8.0
- Onion Architecture Pattern

### 5. **Database & Storage**
- Microsoft SQL Server
- Entity Framework Core (EF Core)
- Unit of Work Pattern
- Azure Blob Storage

---

## ✅ Functional Requirements

### 🔐 All Users
- **Sign In / Logout**: Secure login and logout system.
- **Edit Profile**: Update personal and academic information.
- **Contact Center**: Contact form for inquiries and support.
- **View Workgroups**: Access assigned and joined workgroups.
- **View & Upload Projects**: Interact with your own projects and upload related files.
- **Download Files**: Access shared documents within workgroups.
- **Schedule & View Meetings**: Schedule and track meetings with workgroups or supervisors.
- **Track Tasks & Progress**: View assigned tasks and monitor project development.
- **View Terms of Service**: Access and read platform policies.

### 👨‍🎓 Student Privileges
- **Submit Tasks**: Upload completed work for supervisor review.

### 🧑‍🏫 Supervisor Privileges
- **Record Progress**: Track and document project progress.
- **Assign Tasks**: Create new tasks for students.
- **Provide Feedback**: Comment on submitted tasks and updates.
- **Manage Workgroup Members**: Add or remove students and co-supervisors.

### 🛠️ Admin Privileges
- **User & Role Management**: Add, remove, and assign roles to users.
- **Project Management**: Create, update, and mark projects as favourites or change their statuses.
- **Data Viewing**: Access lists of projects, users, and customers.
- **Advanced Search**: Search across projects, students, supervisors, and customers.
- **Update Terms**: Modify the "Terms of Service" section.

### 👨‍💼 Customer Privileges
- **Track Progress**: Monitor project updates and status in real-time.

### 👥 Guest Privileges
- **Browse Home Page**: Explore featured content and highlighted projects.
- **View Terms**: Read platform rules and agreements.
- **Sign Up**: Register to join the platform.

---

## 📂 Project Structure

The application is built using a modular and scalable architecture, including:
- **Frontend** powered by React.js and styled with MUI.
- **Backend** based on ASP.NET Core 8.0 using the Onion Architecture for clean separation of concerns.
- **Database Layer** managed with EF Core and SQL Server, following the Unit of Work pattern.
- **Cloud Integration** using Azure Blob Storage for secure file storage and retrieval.

---

## 🚀 Getting Started

1. **Clone the repository**  
   ```bash
   git clone https://github.com/yourusername/student-project-center-system.git

## 🛠 Contributions

> This system was developed collaboratively as part of a graduation project.  
> Below are the key contributions made by each team member:

### 👨‍💻 NoorAldeen Tumeh
- ✅ User Authentication (Login & Registration)
- ✅ Home Page UI and Navigation
- ✅ Workgroup Module: including entering, viewing, and managing workgroup interactions

### 👨‍💻 Mustafa Hasan
- ✅ Admin Dashboard: including full control panel for managing users, projects, and system data
- ✅ Data Management Features: implemented functionality to handle user roles, permissions, and project statuses


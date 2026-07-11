# 🩸 Online Blood Donation System

A modern web-based **Online Blood Donation System** developed using **Spring Boot**, **Java**, **MySQL**, **HTML**, **CSS**, and **JavaScript**. The system connects blood donors with patients and hospitals, making the blood donation process faster, easier, and more efficient.

---

## 📌 Project Overview

The Online Blood Donation System is designed to simplify blood donation management. It allows donors to register, patients to search for available blood donors, and administrators to manage donor information, blood requests, and user accounts.

---

## ✨ Features

### 👤 User Features
- User Registration
- User Login & Authentication
- Update User Profile
- Search Blood Donors
- Request Blood
- View Blood Request Status
- Contact Donors
- Responsive User Interface

### ❤️ Donor Features
- Donor Registration
- Blood Group Selection
- Availability Status
- Update Donation Details
- View Blood Requests
- Accept or Reject Requests

### 🛠️ Admin Features
- Secure Admin Login
- Dashboard
- Manage Users
- Manage Donors
- Manage Blood Requests
- View Blood Stock
- Manage Contact Messages
- Delete or Update Records
- Generate Reports

---

# 🏗️ Technology Stack

## Backend
- Java
- Spring Boot
- Spring MVC
- Spring Data JPA
- Hibernate

## Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap

## Database
- MySQL

## Tools
- IntelliJ IDEA / Eclipse
- VS Code
- Git
- GitHub
- Maven
- Postman

---

# 📂 Project Structure

```
OnlineBloodDonationSystem/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   ├── resources/
│   │   └── webapp/
│
├── pom.xml
├── README.md
└── database.sql
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/OnlineBloodDonationSystem.git
```

Move into the project

```bash
cd OnlineBloodDonationSystem
```

---

## Configure MySQL

Create a database

```sql
CREATE DATABASE blood_donation;
```

Update the database credentials in

```
application.properties
```

Example

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/blood_donation
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

## Run Project

Using Maven

```bash
mvn spring-boot:run
```

Or run

```
Application.java
```

from your IDE.

---

# 💻 Screenshots

Add screenshots here.

Example

- Home Page
- Login Page
- Registration Page
- Donor Dashboard
- Admin Dashboard
- Blood Search
- Blood Request

---

# 🩸 Blood Groups Supported

- A+
- A-
- B+
- B-
- AB+
- AB-
- O+
- O-

---

# 🔐 Security

- Password Encryption
- Authentication
- Role-Based Access
- Input Validation
- SQL Injection Protection

---

# 📊 Future Enhancements

- Email Notifications
- SMS Notifications
- Blood Camp Management
- Hospital Integration
- Google Maps Integration
- OTP Verification
- Online Chat
- Mobile Application
- AI-Based Donor Recommendation

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push branch

```bash
git push origin feature-name
```

5. Create a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Developer

**Sathwik B R**

- 🎓 BCA Student
- 💻 Full Stack Java Developer
- 🌱 Spring Boot Developer

GitHub:
https://github.com/SathwikBRGowda9

LinkedIn:
https://www.linkedin.com/

---

# ⭐ Support

If you like this project, please give it a ⭐ on GitHub.

---

## 🙏 Thank You

Thank you for visiting this project. Together, let's save lives through blood donation. ❤️🩸

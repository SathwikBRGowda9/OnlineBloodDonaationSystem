# 🩸 Blood Request Notification System - Setup Guide

## Overview

This feature allows hospitals to send urgent blood donation requests to registered donors via email and SMS notifications. Donors receive notifications and can view all their blood requests in one centralized location.

## Features

✅ Send blood requests to specific donors
✅ Email notifications with hospital details and urgency level
✅ SMS notifications (optional, requires Twilio setup)
✅ Track notification delivery status
✅ Filter requests by urgency level
✅ Donor dashboard to view all received requests

---

## Backend Setup

### 1. Database Table

The system automatically creates the `blood_request_messages` table with the following structure:

```sql
CREATE TABLE blood_request_messages (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  hospital_id BIGINT,
  hospital_name VARCHAR(255),
  blood_type VARCHAR(10),
  urgency_level VARCHAR(50),
  message TEXT,
  phone_number VARCHAR(20),
  email VARCHAR(255),
  status VARCHAR(50),
  created_at TIMESTAMP,
  sent_at TIMESTAMP
);
```

### 2. Email Configuration

Update `Backend/demo/src/main/resources/application.properties`:

```properties
# Email Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true
```

**For Gmail:**

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the generated 16-character password in `spring.mail.password`

**For Other Email Providers:**

- Gmail SMTP: `smtp.gmail.com` (port 587)
- Office 365: `smtp.office365.com` (port 587)
- Yahoo: `smtp.mail.yahoo.com` (port 587)

### 3. SMS Configuration (Optional)

To enable SMS notifications, set up Twilio:

1. Create a Twilio account: https://www.twilio.com
2. Get your Account SID and Auth Token
3. Update `Backend/demo/src/main/java/com/example/demo/service/SMSService.java`:

```java
private static final String TWILIO_ACCOUNT_SID = "your_account_sid";
private static final String TWILIO_AUTH_TOKEN = "your_auth_token";
private static final String TWILIO_PHONE_NUMBER = "+1234567890";

// Uncomment the Twilio initialization code in sendBloodRequestSMS()
```

### 4. Add Phone Number to User Entity

Update the User entity to include phone number:

```java
@Column(length = 20)
private String phoneNumber;
```

---

## API Endpoints

### Send Blood Request

```
POST /api/blood-request/send
Content-Type: application/json
Authorization: Bearer {token}

{
  "userId": 1,
  "hospitalId": 1,
  "hospitalName": "City General Hospital",
  "bloodType": "O+",
  "urgencyLevel": "CRITICAL",
  "message": "Emergency: We need O+ blood for trauma victim",
  "phoneNumber": "+1234567890",
  "email": "donor@email.com",
  "sendEmail": true,
  "sendSMS": true
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Blood request sent successfully via EMAIL_SMS_SENT"
}
```

### Get User's Blood Requests

```
GET /api/blood-request/user/{userId}
Authorization: Bearer {token}
```

**Response:**

```json
{
  "status": "success",
  "messages": [
    {
      "id": 1,
      "userId": 1,
      "hospitalName": "City General Hospital",
      "bloodType": "O+",
      "urgencyLevel": "CRITICAL",
      "message": "Emergency blood needed",
      "email": "donor@email.com",
      "status": "EMAIL_SMS_SENT",
      "createdAt": "2024-01-15T10:30:00",
      "sentAt": "2024-01-15T10:31:00"
    }
  ],
  "count": 1
}
```

### Get Hospital's Sent Requests

```
GET /api/blood-request/hospital/{hospitalId}
Authorization: Bearer {token}
```

### Get Single Message

```
GET /api/blood-request/{messageId}
Authorization: Bearer {token}
```

---

## Frontend Setup

### 1. Routes Added

- `/blood-request-notify` - Hospital sends blood requests
- `/blood-requests` - Donor views received requests

### 2. Components

#### BloodRequestNotification.jsx

- Hospital interface to send blood requests
- Lists all registered donors
- Select recipient, blood type, urgency level
- Choose notification method (email/SMS)
- Real-time feedback on delivery

#### BloodRequestsReceived.jsx

- Donor dashboard showing all received requests
- Filter by urgency level
- Direct contact links (email, phone)
- Display request timestamp and status
- Auto-refresh every 30 seconds

### 3. Integration with Navbar

Add these links to your Navbar component:

```jsx
// For Hospitals
<Link to="/blood-request-notify">Send Blood Request</Link>

// For Donors
<Link to="/blood-requests">Blood Requests</Link>
```

---

## Email Template Example

The system sends emails with this format:

```
Subject: 🩸 Urgent Blood Request - CRITICAL

Dear Donor,

We have an urgent blood donation request:

Hospital: City General Hospital
Blood Type Needed: O+
Urgency Level: CRITICAL

Message: Emergency: We need O+ blood for trauma victim

Please contact the hospital if you can help.

Thank you for saving lives!
BloodLink System
```

---

## SMS Message Example

```
🩸 URGENT: City General Hospital needs O+ blood (CRITICAL).
Emergency situation. Please contact them if you can donate.
Thanks for saving lives!
```

---

## Testing

### Step 1: Start Backend

```bash
cd Backend/demo
mvn clean install
mvn spring-boot:run
```

### Step 2: Start Frontend

```bash
cd Frontend
npm install
npm run dev
```

### Step 3: Test Email Sending

1. Go to `http://localhost:5173/blood-request-notify`
2. Select a donor from the list
3. Fill in blood request details
4. Check the "Send Email" checkbox
5. Click "Send Blood Request"
6. Check the donor's email inbox

### Step 4: Test Notifications View

1. Log in as a donor
2. Go to `http://localhost:5173/blood-requests`
3. View all received blood requests
4. Filter by urgency level

---

## Troubleshooting

### Email Not Sending

- ✅ Check Gmail app password is correct
- ✅ Verify Gmail 2FA is enabled
- ✅ Check `spring.mail.username` matches your Gmail
- ✅ Review backend console for error messages

### SMS Not Sending

- ✅ Verify Twilio credentials in SMSService.java
- ✅ Check phone numbers are in correct format (+1234567890)
- ✅ Ensure Twilio account has sufficient credit

### Donors Not Showing in List

- ✅ Verify `/api/donor/all` endpoint exists
- ✅ Check JWT token is valid
- ✅ Ensure donors are registered in database

### Backend Compile Errors

- ✅ Run `mvn clean install` to fetch all dependencies
- ✅ Check Java version is 21+
- ✅ Verify Spring Boot version is 4.0.5+

---

## Architecture

```
BloodRequest Flow:
1. Hospital → BloodRequestController
2. BloodRequestController → BloodRequestMessageService
3. Service → Create DB record + Send notifications
4. EmailService & SMSService → External providers
5. Notification record stored with status
6. Donor accesses /blood-requests to view all
```

---

## Future Enhancements

- 📱 Push notifications for mobile app
- 📊 Analytics dashboard for hospitals
- 🔔 Notification preferences (time, frequency)
- ⏰ Scheduled requests for non-emergency cases
- 🔄 Automatic retry mechanism
- 📧 Email delivery confirmations
- 🌐 Multi-language support

---

## Security Notes

✅ All endpoints require valid JWT token
✅ Email credentials stored in environment variables (recommended)
✅ SMS sensitive data encrypted
✅ User identity verification before sending
✅ Rate limiting recommended for production

---

## Support & Issues

For issues or questions:

1. Check the troubleshooting section above
2. Review backend console logs
3. Verify all configuration in application.properties
4. Test with cURL first before frontend

---

Generated: 2024
Blood Donation System - Blood Request Notification Feature

# Innovate Apparel

## Containerized Email Service
[![Docker Image CI](https://github.com/Innovate-Apparel/email-service/actions/workflows/docker-image.yml/badge.svg)](https://github.com/Innovate-Apparel/email-service/actions/workflows/docker-image.yml)

Written and Maintained by Founder, Leshawn Rice 

## Overview

This is a proprietary email service built with Node.js and containerized using Docker.

It's specifically designed to send emails through our SMTP server of choice.

Currently, the features are limited to functionalities like sending verification codes.

We will implement new device sign-in alerts, notifications, etc., soon

## Features

- Automated email generation & delivery using SMTP.
- Generation and dispatch of verification codes.
- HTML supported customizable email templates.
- Docker containerization for simplified deployment.
- **[Coming Soon]** New device sign-in alert notifications.
- **[Coming Soon]** Shipping Notifications.
- **[Coming Soon]** Billing Notifications.
- **[Coming Soon]** Newsletters/Promotional emails.

## Prerequisites

- [Node.js](https://nodejs.org/) installed.
- [Docker](https://www.docker.com/) installed.
- Access to an SMTP server (e.g., `privateemail.com`).

## Getting Started

### Setting Up the Environment

1. **Clone the repository** (Note: Access restricted to authorized personnel only).
   ```bash
   git clone git@github.com:Innovate-Apparel/email-service.git
   cd email-service

2. Create a `.env` file in the project root with SMTP server details:
```bash
SMTP_HOST=mail.privateemail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USERNAME=""
SMTP_PASSWORD=""

DEFAULT_FROM=no-reply@innovateapparel.com
DEFAULT_TO=no-reply@innovateapparel.com
DEFAULT_SUBJECT=AutomatedMessage
DEFAULT_TEXT=AutomatedEmail
DEFAULT_HTML=<h1>AutomatedEmail</h1>
LOGO_FILENAME=logo.png
LOGO_TYPE=images
LOGO_CID=logo
CODE_TEMPLATE=code.html
TEXT_TEMPLATE=YourCodeIs{{code}};

PORT=3000
LOGFILE_PATH=/var/log/email-service.log

```

3. Build the Docker image
```bash
docker build -t email-service .
```

4. Run the Docker container
```bash
docker run --env-file .env -p 8080:3000 email-service
```

### Using the Service

Send a `POST` request to `http://localhost:8080/email/send-verification-code` with a `JSON` body e.g.,:
```json
{
    "recipient": "no-reply@innovateapparel.com",
    "code": "000001"
}
```

Expected Response:
```json
{
    "message": "Email sent successfully"
}
```

### Customization

- Email templates can be adjusted in the /templates directory.
- Configure the service settings in the .env file.

## License

This software is proprietary and is intended solely for use by Innovate Apparel LLC.

Unauthorized copying, distribution, or use is strictly prohibited.

## Contact

For support or inquiries related to this email service, please reach out to techsupport@innovateapparel.com.
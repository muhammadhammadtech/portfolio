# Muhammad Hammad — DevSecOps Portfolio

> A production-grade portfolio built to showcase real DevSecOps infrastructure work — not a template.

[![Live Site](https://img.shields.io/badge/Live%20Site-muhammadhammadtech.vercel.app-0d5c2e?style=flat-square)](https://muhammadhammadtech.vercel.app) [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML) [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)

## Live Demo

[muhammadhammadtech.vercel.app](https://muhammadhammadtech.vercel.app)

## About

This is Muhammad Hammad's personal portfolio, showcasing his work as a DevSecOps Engineer. It was built from scratch rather than adapted from a template, with custom backend integrations for real email delivery and an AI assistant instead of relying on static pages alone.

## Features

- Fully responsive, custom-designed UI with no page builder or template.
- Functional contact form with real email delivery through the Resend API and a Vercel Serverless Function.
- **Ping**, a custom AI assistant powered by Google's Gemini API and grounded in the site owner's background. It answers visitor questions and directs them to relevant contact, project, and social links.
- Clean URL routing configured through `vercel.json`.
- Custom favicon and MH/Ping branding.
- Individual detailed case-study pages for each featured project, including architecture diagrams, technical decisions, challenges, and results.

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Vercel Serverless Functions (Node.js) |
| Email | Resend API |
| AI | Google Gemini API |
| Hosting / Deployment | Vercel |
| Version Control | Git & GitHub |

## Project Structure

```text
.
├── api/
│   └── contact.js
├── assets/
│   └── icons/
├── components/
│   ├── footer.html
│   └── header.html
├── css/
│   ├── responsive.css
│   └── style.css
├── js/
│   ├── animations.js
│   ├── contact.js
│   └── main.js
├── index.html
├── projects.html
├── contact.html
├── rock-paper-scissors.html
├── vaultly.html
├── k8s-cicd-security-scanning.html
├── matchlypro.html
├── startupforge-ai.html
├── linux-monitoring-tool.html
├── vercel.json
└── package.json
```

## Environment Variables

The backend features require these environment variables in Vercel:

```env
RESEND_API_KEY=your_resend_api_key
GEMINI_API_KEY=your_gemini_api_key
```

These are used server-side only in Vercel Serverless Functions and are never exposed to the client.

## Contact

- [Contact Muhammad](https://muhammadhammadtech.vercel.app/contact)
- [GitHub](https://github.com/muhammadhammadtech)
- [LinkedIn](https://www.linkedin.com/in/muhammadhammadtech/)

© 2026 Muhammad Hammad. All rights reserved.

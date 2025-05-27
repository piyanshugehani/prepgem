## 🤖 AIPrepGem

**AIPrepGem** is an intelligent, interactive platform designed to help job seekers **prepare, practice, and perform** better in interviews. Built with the power of **Google AI Studio**, it simulates real-world interview scenarios, analyzes responses using state-of-the-art LLMs, and provides personalized feedback — helping you gain confidence and land your dream job faster.

---

## 🎯 Key Features

### 🗣️ AI-Driven Mock Interviews
- Realistic simulations powered by **Gemini models via Google AI Studio**
- Technical, HR, and behavioral round support
- Voice, text, and MCQ-style interaction modes

### 📊 Personalized AI Feedback
- Communication style & confidence analysis
- NLP-based scoring with actionable feedback
- Sentiment detection and keyword coverage evaluation

### 🧠 Smart Adaptive Question Bank
- Dynamically adjusts by role and experience level
- Covers DSA, system design, resume-based, and behavioral questions
- Uses prompt engineering to simulate FAANG-style interviews

### 🔐 Candidate Dashboard
- Tracks your improvement over time
- Review previous sessions and refine answers
- Schedule mock interviews, set custom difficulty levels

---

## 🧰 Tech Stack

| Layer        | Technologies                                                                   |
|--------------|--------------------------------------------------------------------------------|
| **Application** | [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com) [Google AI Studio (Gemini)](https://makersuite.google.com/),  [Clerk Auth](https://clerk.dev)|
| **Database** | [Neon](https://neon.tech) (serverless PostgreSQL)                              |
| **Infra**    | [Vercel](https://vercel.com) (hosting), CI/CD via GitHub Actions               |

> 🧠 **Highlight**: Core interview intelligence is built and tested using **Google AI Studio**

## Live Demo

🚀 ([Click here to try HirePrep AI](https://ai-prep-gem.vercel.app/))

---

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 🛡️ Security & Privacy
HirePrep AI does not store or share personal data. All user sessions are encrypted, and any interview feedback is kept private to the user.

# for ashuuuuu 🖤

A little corner of the internet, made for one person.

Register or log in (Google or email), and send voice notes or messages straight to WhatsApp — no chat app required, just this.

## Stack

- React + Vite, Tailwind CSS v4, Framer Motion, canvas-confetti
- Firebase Auth (Google + email/password) and Firestore (message history)
- Cloudinary (audio hosting) — Firebase Storage now needs a billing plan, this avoids that
- Voice notes and messages are sent as a pre-filled WhatsApp link (`wa.me`) — one tap to actually send

## Local setup

```bash
npm install
cp .env.example .env   # fill in your own Firebase + Cloudinary values
npm run dev
```

## Required setup before it works

1. **Firebase project** — enable Authentication (Google + Email/Password providers) and create a Firestore database (production mode). Publish these Firestore rules:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /messages/{messageId} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

2. **Cloudinary account** — free tier, no card needed. Create an *unsigned* upload preset for audio uploads.
3. In Firebase console → Authentication → Settings → **Authorized domains**, add your deployed domain (e.g. `your-app.vercel.app`) once deployed, or Google sign-in will fail there.
4. Update the WhatsApp recipient number and relationship start date in `src/utils/relationship.js`.

## Deploy

Deploys as a static site (Vercel, Netlify, etc.). Set the same env vars from `.env` in the host's dashboard.

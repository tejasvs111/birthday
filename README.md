# Birthday and Proposal Website

A romantic two-page birthday surprise built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion and Lucide icons.

- `/` has the birthday greeting, then the proposal question. The **No** button runs away from the mouse and from touch. **Absolutely Yes** fires a heart burst and opens the second page.
- `/celebration` has the confetti, rose bouquet, love letter, "Send More Love" button, optional photo gallery and optional music.

Nothing here has been deployed yet. Follow the steps below to put it online.

## Run it on your computer

You need Node.js 18.18 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. To check the production build:

```bash
npm run build
npm run start
```

## Change names, messages, photos and music

Everything personal is in **`config/site.ts`**. You never need to touch the components.

| What | Where in `config/site.ts` |
| --- | --- |
| Names | `BOY_NAME` and `GIRL_NAME` |
| Birthday message | `BIRTHDAY_MESSAGE` |
| Proposal question and message | `PROPOSAL_QUESTION`, `PROPOSAL_MESSAGE` |
| Letter on the second page | `CELEBRATION_MESSAGE` (one string per paragraph) |
| Final line, signature, footer | `FINAL_LINE`, `SIGNATURE`, `FOOTER_TEXT` |
| Funny lines when No runs away | `NO_BUTTON_MESSAGES` |
| Browser tab title | `SITE_TITLE` |

### Add photos

1. Copy your images into `public/photos/` (for example `us-1.jpg`).
2. Add them to `PHOTOS` in `config/site.ts`:

```ts
export const PHOTOS = [
  { src: "/photos/us-1.jpg", alt: "The two of us at the beach" },
  { src: "/photos/us-2.jpg", alt: "Our first trip together" },
];
```

The gallery appears on `/celebration` only when this list has photos. Keep each file under about 1 MB; Next.js resizes them for phones automatically.

### Add music

1. Copy an audio file into `public/music/` (for example `our-song.mp3`).
2. Set `MUSIC_SRC = "/music/our-song.mp3"` in `config/site.ts`.

A speaker button then appears in the top-right corner of both pages. Music is off until she presses it, and it keeps playing when the page changes. Only use a song you have the right to use.

## Put it online with Vercel

### 1. Push the project to GitHub

1. Create a free account at https://github.com if you do not have one.
2. Click **New repository**, name it (for example `birthday-surprise`), choose **Private**, and create it without a README.
3. In this project folder run:

```bash
git init
git add .
git commit -m "Birthday surprise"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/birthday-surprise.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to https://vercel.com and sign up with your GitHub account (the free Hobby plan is enough).
2. Click **Add New** then **Project**, and import the `birthday-surprise` repository.
3. Leave every setting as it is. Vercel detects Next.js by itself.
4. Click **Deploy** and wait about a minute.

### 3. Get and share the link

1. When the deploy finishes, Vercel shows a link like `https://birthday-surprise-abc123.vercel.app`. Open it on your phone to test the whole flow.
2. For a nicer address, open the project, go to **Settings** then **Domains**, and edit the free `.vercel.app` name (for example `happybirthday-y.vercel.app`) if it is available.
3. Send the link to her at the moment you want. Anyone with the link can open it, so do not post it publicly.
4. To change anything later, edit `config/site.ts`, then run `git add . && git commit -m "Update" && git push`. Vercel redeploys automatically.

### Deploy without GitHub (optional)

```bash
npm install -g vercel
vercel        # follow the prompts for a preview link
vercel --prod # publish to the production link
```

## Accessibility notes

- Animations turn off or simplify when the device is set to reduce motion.
- Keyboard and screen-reader users are not trapped: pressing the No button makes it hop away and announces a friendly line, and the next Tab stop is the Absolutely Yes button.
- The page uses real headings, buttons and links.

## Project layout

```
app/                 pages (/ and /celebration), layout, global styles
components/          Hero, ProposalSection, DodgingNoButton, CelebrationView, Confetti, ...
config/site.ts       all names, messages, photos and music
public/photos        your photos
public/music         your song
```

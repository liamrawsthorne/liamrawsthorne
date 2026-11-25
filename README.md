# liamrawsthorne.com

Liam Rawsthorne's portfolio, rebuilt from the WordPress site as a fast static site with [Astro](https://astro.build). Content is edited in [Pages CMS](https://pagescms.org), the site is hosted on Cloudflare, and messages from the contact form arrive by email through [Web3Forms](https://web3forms.com). All three are free.

```
Edit in Pages CMS  →  saves to GitHub  →  Cloudflare rebuilds the site (about a minute)
```

The page addresses are the same as on the WordPress site (`/my-work/`, `/my-resume/`, `/contact/`, `/portfolio/kennedy-smith/` and so on), so existing links keep working after the switch.

## What's carried over, and what's fixed

The design is the same: Instrument Serif, the dark home page with white rules, the plum headers on inner pages, the ring cursor, the green "Open For Roles" dot, the category that slides in when you hover a client, the email domain that lights up as you scroll, and the scrolling name in the footer. It no longer needs WordPress, Bricks, GSAP or jQuery, and pages load with almost no JavaScript.

Fixed along the way:

- **Mobile navigation:** there's now a Menu button. On the old site the menu was hidden on phones.
- **My Resume** and **Contact** were blank. They now show your history and the contact form.
- **Project pages** now show their text. The form that appeared white-on-white is gone.
- **The contact form** now has a Send button and actually sends.
- **The stock photo** on every project is replaced by a neutral placeholder until you add real screenshots. NABA and Kennedy Smith no longer show empty gaps.
- **"July 2021 -"** now reads "July 2021 – Present", and the work history has a heading.
- **Client names** on the home page now link to their project pages.
- **The "Open For Roles" line** no longer hides behind the contact bar on phones.
- **Pages have search descriptions.** The old site had none.

## 1. Run it locally

You need Node.js 22.23 or newer (24 is recommended).

```sh
npm install
npm run dev
```

Open http://localhost:4321.

## 2. Put it online with Cloudflare (free)

1. Put this folder in a new GitHub repository and push it.
2. Sign up at [dash.cloudflare.com](https://dash.cloudflare.com) (free).
3. Go to **Workers & Pages**, select **Create application**, then **Import a repository**. Pick your repository.
4. Use these settings:
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
5. Select **Save and Deploy**. A minute later the site is live at `https://liamrawsthorne.<your-subdomain>.workers.dev`. Check it there before moving the domain.

### Moving liamrawsthorne.com

1. In Cloudflare, **add your domain** (`liamrawsthorne.com`). Cloudflare copies your existing DNS records and gives you two nameservers.
2. **Check your email records before you switch.** In Cloudflare's DNS list, make sure the MX records (and any TXT records for SPF or DKIM) match the ones at your current host. If they're missing, add them, or email to hello@liamrawsthorne.com will stop arriving.
3. At the company you bought the domain from, **replace the nameservers** with Cloudflare's. This can take a few hours to take effect.
4. Open your Worker, go to **Settings > Domains & Routes > Add > Custom domain**, and add both `www.liamrawsthorne.com` and `liamrawsthorne.com`. HTTPS is set up for you.
5. Once the new site is working on your domain, you can cancel the WordPress hosting.

## 3. Edit content in Pages CMS (free)

1. Go to [app.pagescms.org](https://app.pagescms.org) and sign in with GitHub.
2. Install the Pages CMS GitHub App and give it access to this repository.
3. Open the repository. You'll see:
   - **Portfolio**: one entry per project
   - **Site details**: headline, job title, "Open For Roles", contact details, work and education history, CV, form key
4. Edit and save. The site updates about a minute later.

### Adding a screenshot and case study

Open a project, upload an image to **Cover image**, describe it in **Cover image description**, and save. It replaces the placeholder on My Work, on the project page, and in the image that follows the cursor over the client list on the home page.

Then build the case study from sections, in any order:

| Section | Use it for |
| ------- | ---------- |
| Text    | The brief, your process, the outcome. Bold, links and lists work. |
| Image   | A full-width or text-width image, with an optional caption. |
| Gallery | Two or three images side by side, such as mobile screens. |
| Quote   | A testimonial from the client. |
| Results | Outcomes as big numbers, such as "40%" and "more enquiries". |
| Video   | A YouTube or Vimeo link, or a link to an .mp4 file. |

A project with no sections shows "The full case study for this project is coming soon." Kennedy Smith already has its text from the old site. The other ten had placeholder text on the old site, so they start empty.

**Type of work:** every project is set to Website Design for now. Change each one in Pages CMS. When more than one type is in use, filter buttons appear on the My Work page. To add a new type, edit the list under `categories` in `.pages.yml`.

**Other settings:** **Show in the homepage client list** controls the big list of names, **Order** sets the sequence, and **Draft** hides a project.

## 4. Turn on the contact form (free)

1. Go to [web3forms.com](https://web3forms.com), enter `hello@liamrawsthorne.com`, and they'll email you an access key. No account is needed.
2. In Pages CMS, open **Site details** and paste the key into **Contact form key**. Save.

Messages then arrive in your inbox. Until a key is set, pressing Send opens the visitor's own email app with their message filled in, so nothing is lost.

## Editing files by hand

Everything Pages CMS edits is a plain file:

- `src/data/site.json`: your details
- `src/content/portfolio/*.md`: one file per project (the file name is the URL)
- `src/assets/portfolio/`: project images
- `public/files/`: your CV

Run `npm run check` before pushing to catch mistakes.

## Changing the design

- **Colours, fonts and spacing:** the top of `src/styles/global.css`.
- **Home page:** `src/pages/index.astro`.
- **Header and menu:** `src/components/Header.astro`.
- **Footer marquee:** `src/components/Footer.astro`.
- **Ring cursor and mobile contact bar:** `src/layouts/Base.astro`.

## Commands

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the local dev server at localhost:4321  |
| `npm run build`   | Build the site into `dist/`                   |
| `npm run preview` | Serve the built site locally to check it      |
| `npm run check`   | Check content and code for mistakes           |

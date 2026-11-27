# Starlight Starter Kit: Basics

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

```
npm create astro@latest -- --template starlight
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro + Starlight project, you'll see the following folders and files:

```
.
├── public/
├── src/
│   ├── assets/
│   ├── content/
│   │   └── docs/
│   └── content.config.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Starlight looks for `.md` or `.mdx` files in the `src/content/docs/` directory. Each file is exposed as a route based on its file name.

Images can be added to `src/assets/` and embedded in Markdown with a relative link.

Static assets, like favicons, can be placed in the `public/` directory.

## 🧞 Commands

Run these commands from the monorepo root. Install dependencies with `npm install` there.

| Command                                       | Action                                       |
| :-------------------------------------------- | :------------------------------------------- |
| `npm exec -- nx dev bamboo-standards`         | Starts the local development server          |
| `npm exec -- nx run bamboo-standards:build`   | Builds the site into `dist/bamboo-standars/` |
| `npm exec -- nx run bamboo-standards:preview` | Previews the production build                |
| `npm exec -- nx run bamboo-standards:check`   | Checks Astro content and types               |
| `npm exec -- nx run bamboo-standards:sync`    | Generates Astro content types                |

## 👀 Want to learn more?

Check out [Starlight’s docs](https://starlight.astro.build/), read [the Astro documentation](https://docs.astro.build), or jump into the [Astro Discord server](https://astro.build/chat).

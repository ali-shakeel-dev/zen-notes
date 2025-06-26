# 📝 Zen Notes

A lightweight, distraction‑free note‑taking app built with React and Tailwind CSS. Clean UI, fast workflow, ideal for jotting down ideas, tasks, and thoughts on the go.

---

## Features

- **Add, edit, delete notes** with ease  
- **Customizable note colors** and pin-to-top option  
- **Persistent storage** with `localStorage`  
- **Instant alerts** using React Toastify  
- **Minimal, responsive UI** using Tailwind CSS  
- **Flowbite modals** for adding/updating notes  

---

## Getting Started

### Prerequisites

- Node.js v18+  
- npm or Yarn

### Installation

```bash
git clone https://github.com/ali-shakeel-dev/zen-notes.git
cd zen-notes
npm install
````

### Run Locally

```bash
npm run dev
```

* Open `http://localhost:5173` in your browser.

---

## Usage

1. Click the **➕ Add Note** button or open the modal by clicking the input.
2. Fill in **Title** and **Description**, pick a color, and click **Save**.
3. Notes appear in a list; use the **edit**, **delete**, **pin**, and **color** icons.
4. Notes persist across page reloads using `localStorage`.
5. Enjoy a clean, focused workspace with smooth UI feedback and animations.

---

## Tech Stack

* **React** – Function components & hooks (`useState`, `useEffect`)
* **Tailwind CSS** – Utility-first styling
* **Flowbite** – Modal component via CDN
* **React-Toastify** – Toast notifications
* **React-Icons** – UI icons (edit, delete, pin, palette)
* **localStorage** – For saving tasks

---

## Design Principles

* **Simplicity** — No distractions, just your notes
* **Speed** — Quick UI feedback, minimal resources
* **Reusability** — Components like `PrimaryButton`, `NoteCard`
* **Responsiveness** — Looks great on mobile and desktop

---

## What's Next

* Add **search/filter**
* Add **tagging** or note organization
* Add **export/import** functionality
* Integrate with a backend for **user login & sync**

---

## Contributing

Feel free to fork and submit PRs, especially for:

* Improving UI/UX (animations, themes)
* Adding toolbar or text formatting
* Enhancing accessibility

---

## Feedback

Let me know what you think! Feature requests and bug reports are welcome via GitHub Issues.

---

Thanks for checking out **Zen Notes** — simple, powerful, your ideas deserve a clean canvas. Happy notetaking! 🌿
# 👨‍💻 DevOps & Cloud Engineering Portfolio

Welcome to the repository for my professional portfolio website! This site is designed to showcase my projects, technical stack, certifications, work history, and live coding stats in an interactive and premium user experience.

🔗 **Live Website**: [vanujak.github.io/portfolio](https://vanujak.github.io/portfolio)

---

## 🛠️ Technology Stack

* **Framework**: [Next.js 15](https://nextjs.org/) (Static HTML Export)
* **Library**: [React 19](https://react.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Modern CSS theme directives)
* **Real-time Metrics**: Dynamic API client-side integrations with GitHub & LeetCode.
* **Deployment & Hosting**: Automated CI/CD via [GitHub Actions](https://github.com/features/actions) to [GitHub Pages](https://pages.github.com/).

---

## ✨ Features & Highlights

1. **🖥️ Interactive DevOps Terminal**: A fully functional command-line terminal widget located in the Hero section (visible on desktop). Visitors can execute commands like `help`, `about`, `skills`, `projects`, `contact`, and `secret` (for a fun easter egg!) directly in the browser shell.
2. **📈 Live Coding Stats Cards**: Custom CORS-free XHR widgets that fetch live statistics client-side:
   * **GitHub Dev Metrics**: Displays total commits, pull requests, contribution count, and primary programming languages.
   * **LeetCode Algorithmic Stats**: Dynamically mirrors active solved progress bars (Easy, Medium, Hard), global rank, and streaks.
3. **💼 Work Experience Timeline**: A clean, responsive professional timeline displaying my internship details (e.g. *DevOps Intern at SLT-MOBITEL PLC*) along with company logos and specific roles.
4. **🎓 Certifications Vault**: A structured grid showing course certifications (Udemy, Coursera, etc.) with supporting links to either verify credentials online or download local PDFs.
5. **🔒 Privacy Protections**: Encrypted contact interfaces (Telegram masked linking) to protect phone number details, alongside interactive Privacy Policy and Terms of Use modals built directly into the footer.
6. **🌗 System Theme Sync**: A 3-way dropdown theme selector supporting Light Mode, Dark Mode (pitch-black layout), and a System Default setting that dynamically listens to operating system preferences.
7. **🚀 Scroll to Top Widget**: A floating, glassmorphic scroll-to-top button that fades in automatically upon scrolling.

---

## 📂 Project Structure

```text
portfolio/
├── .github/workflows/   # CI/CD deployment configuration for GitHub Pages
├── public/              # Static media assets (PDF CV, screenshots, logos)
│   ├── certificates/    # Certified credentials PDFs
│   ├── experience/      # Company logos (e.g., slt.webp)
│   └── projects/        # Featured screenshots (e.g., easycase.png)
└── src/
    ├── app/             # Next.js App Router root layout & global styling
    └── components/      # UI Modular Components
        ├── Header.js    # Theme selector popover and responsive nav menu
        ├── Hero.js      # Terminal CLI wrapper and CV downloader
        ├── About.js     # Biography modals (DevOps, Education, Journey)
        ├── Experience.js# Timeline list with company logo fallbacks
        ├── Projects.js  # Grid cards and Unavailable Demo modals
        ├── CodingStats.js# GitHub and LeetCode XHR API widgets
        ├── Skills.js    # 2-column vector logo badges grid
        ├── Contact.js   # Masqueraded secure contact forms
        └── Footer.js    # Privacy Policy & Terms popups
```

---

## 🚀 Local Development Setup

To run this portfolio website locally on your system, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18.0.0 or higher is recommended).

### 1. Clone the repository
```bash
git clone https://github.com/vanujak/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to view the site. The development server supports hot-reloading (Turbopack) for instant code changes.

---

## 🏗️ Building and Deployment

This project is configured as a **Static HTML Export** to run on serverless environments like GitHub Pages.

### Manual Static Build
To compile the site manually and inspect the output static bundle:
```bash
npm run build
```
This generates the optimized static files inside the `/out` directory.

### Automated CI/CD Deployment
A GitHub Actions workflow (**`deploy.yml`**) automates deployment. 
Whenever code is pushed to the **`main`** branch:
1. The runner boots a Node environment and checks out the repository.
2. It compiles the Next.js code using `npm run build` and exports static files.
3. The static output is automatically published to the GitHub Pages environment.

---

## 📄 License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT). You are free to fork, clone, or adapt this layout to design your own professional developer website.

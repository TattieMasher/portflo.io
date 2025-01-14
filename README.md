# Portfolio Presentation App

Welcome to the Portfolio Presentation App! This Svelte-powered application allows developers and professionals to showcase their projects in a highly modular and customizable format. With features like dynamic project creation, interactive layouts, and rich styling controls, you can create an engaging online portfolio that truly reflects your work.

---

## **Features**

### **1. Modular Projects**
- Create and organize projects into containers, each with its own layout.
- Components within containers support text, images, carousels, and videos.

### **2. Layout and Styling**
- Grid, article, carousel, masonry, and timeline layouts for containers.
- Rich customization options for typography, borders, colors, and backgrounds.

### **3. User Customization**
- User profile section with editable name, bio, profile picture, and skill badges.

### **4. Notifications**
- Real-time feedback via an in-app notifications system.

---

## **Tech Stack**

- **Framework**: [Svelte](https://svelte.dev/)
- **CSS**: Tailwind CSS
- **State Management**: Svelte stores (`writable`, `derived`)
- **Build Tool**: Vite

---

## **Technical Details** 
- Data Flow and State Management
    - Stores: The app uses Svelte's writable and derived stores to manage state efficiently.
    - projects.js: Manages the list of projects and their nested containers and components, as well as their style details.
    - elementStyles.js: Stores and tracks the styles for each element, allowing real-time updates.
    - selectedElement.js & selectedElementStyles.js: Track the currently selected element and its styles.
    - user.js: Manages user profile details, including name, bio, profile picture, and skills.
    - Reactivity: The app's UI updates dynamically as changes are made to the stores, leveraging Svelte's reactive statements ($ syntax).


---

## **Getting Started** 

### **Prerequisites**

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/) (v7+)

### **Installation**

```bash
# Clone the repository
git clone https://github.com/your-username/portfolio-presentation-app.git

# Navigate to the project directory
cd portfolio-presentation-app

# Install dependencies
npm install
```

---


## **Running the Application** 
### Start the development server
```npm run dev```

Open your browser and visit: ```http://localhost:5173```

## How to Use
### Edit Profile:
- Click on the "User Profile" section to update your name, bio, profile picture, and skills.

### Add Projects:
- Use the sidebar to add new projects, containers, and components.

### Customize Layouts and Styles:
- Select an element to open its settings panel in the right sidebar.
- Customize its layout, typography, colors, and more.

### Save Your Work:

- Click "Save" in the toolbar to persist your changes.
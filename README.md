# MPANORINA NOFY — Site Web Cinématique & Backoffice

Site web premium, moderne, cinématique et immersif pour l'entreprise **MPANORINA NOFY**, spécialisée dans la construction de bâtiments et le gros œuvre à Madagascar.

---

## 🚀 Technologies utilisées

* **Next.js 14** (App Router)
* **React 18** & **TypeScript**
* **Tailwind CSS** (Design system sur-mesure aux couleurs de la marque : Deep Teal `#1A5167` & Gold `#C8962C`)
* **Framer Motion** & **GSAP** (Animations cinématiques 60fps)
* **Lenis** (Smooth scrolling)
* **Lucide React** (Icônes modernes)
* **MySQL** via `mysql2` (Base de données avec initialisation automatique & mode résilience)

---

## 🛠️ Installation & Démarrage

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Compiler pour la production
npm run build
npm start
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 🗄️ Espace Administration (Backoffice)

Le site intègre un backoffice complet pour gérer les réalisations :
* URL : [http://localhost:3000/admin](http://localhost:3000/admin)
* Gestion des projets (Ajout, Modification, Suppression)
* Téléversement de photos depuis le PC ou par lien URL
* Synchronisation avec base de données MySQL (`database.sql` fourni à la racine)

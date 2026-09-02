-- Base de données MySQL pour MPANORINA NOFY
-- Script d'initialisation et de création des tables

CREATE DATABASE IF NOT EXISTS `mpanorina_nofy` 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `mpanorina_nofy`;

-- Table des projets réalisés
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `year` VARCHAR(20) NOT NULL,
  `description` TEXT NOT NULL,
  `long_description` LONGTEXT NOT NULL,
  `main_image` TEXT NOT NULL,
  `images` JSON,
  `surface` VARCHAR(100) NULL,
  `duration` VARCHAR(100) NULL,
  `type` VARCHAR(100) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertion des projets par défaut
INSERT INTO `projects` 
(`slug`, `title`, `location`, `category`, `year`, `description`, `long_description`, `main_image`, `images`, `surface`, `duration`, `type`) 
VALUES
(
  'residence-ivandry',
  'Résidence Ivandry',
  'Antananarivo, Madagascar',
  'Résidentiel',
  '2024',
  'Construction d\'une résidence moderne de standing dans le quartier d\'Ivandry.',
  'Ce projet résidentiel de standing comprend la construction complète d\'une villa contemporaine de 350m² dans le quartier prisé d\'Ivandry à Antananarivo. Le projet intègre des matériaux de haute qualité, un design architectural moderne et des finitions premium.',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
  '["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"]',
  '350 m²',
  '8 mois',
  'Villa contemporaine'
),
(
  'immeuble-commercial-ankorondrano',
  'Immeuble Commercial Ankorondrano',
  'Antananarivo, Madagascar',
  'Commercial',
  '2023',
  'Construction d\'un immeuble de bureaux moderne à Ankorondrano.',
  'Réalisation d\'un immeuble commercial de 4 étages dans la zone d\'affaires d\'Ankorondrano. Ce projet comprend des espaces de bureaux modernes, un parking souterrain et des aménagements extérieurs paysagers.',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
  '["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", "https://images.unsplash.com/photo-1554435493-93422e8220c8?w=800&q=80", "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80"]',
  '1 200 m²',
  '14 mois',
  'Immeuble de bureaux'
),
(
  'villa-tamatave',
  'Villa Bord de Mer',
  'Tamatave, Madagascar',
  'Résidentiel',
  '2024',
  'Construction d\'une villa en bord de mer avec vue panoramique.',
  'Cette villa d\'exception en bord de mer à Tamatave offre une vue panoramique sur l\'océan Indien. La construction intègre des matériaux résistants au climat tropical et un design architectural ouvert sur l\'extérieur.',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
  '["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80", "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80"]',
  '280 m²',
  '10 mois',
  'Villa bord de mer'
),
(
  'centre-commercial-analakely',
  'Centre Commercial Analakely',
  'Antananarivo, Madagascar',
  'Commercial',
  '2023',
  'Rénovation complète d\'un centre commercial historique.',
  'Réhabilitation et modernisation d\'un centre commercial dans le quartier historique d\'Analakely. Le projet a combiné respect du patrimoine architectural et intégration d\'équipements modernes.',
  'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1200&q=80',
  '["https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80", "https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=800&q=80", "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"]',
  '2 500 m²',
  '18 mois',
  'Centre commercial'
),
(
  'residence-antsirabe',
  'Lotissement Résidentiel',
  'Antsirabe, Madagascar',
  'Construction',
  '2022',
  'Construction d\'un lotissement de 12 maisons individuelles.',
  'Réalisation d\'un lotissement résidentiel complet comprenant 12 maisons individuelles, voiries, réseaux et espaces verts. Un projet d\'envergure démontrant notre capacité à gérer des chantiers de grande échelle.',
  'https://images.unsplash.com/photo-1448630360428-65456885c650?w=1200&q=80',
  '["https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&q=80", "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80", "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80"]',
  '4 800 m²',
  '24 mois',
  'Lotissement'
),
(
  'renovation-hotel-majunga',
  'Hôtel Bord de Plage',
  'Majunga, Madagascar',
  'Rénovation',
  '2024',
  'Rénovation complète d\'un hôtel en bord de plage.',
  'Rénovation totale d\'un hôtel de 30 chambres en bord de plage à Majunga. Le projet comprend le renforcement structural, la modernisation des installations et la création de nouveaux espaces communs.',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
  '["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80", "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80"]',
  '1 800 m²',
  '12 mois',
  'Hôtel'
);

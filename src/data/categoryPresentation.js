import { BookOpen, GraduationCap, HandHeart, HeartHandshake, Layers, Sparkles } from 'lucide-react';

export const categoryImages = {
  education: '/images/edu.png',
  'competition-talent-development': '/images/hero_main.png',
  'dawah-publicity': '/images/dawah.png',
  service: '/images/relief.png',
  'self-purification-tazkiyah': '/images/tazkiyah.png',
  'islamic-marriage': '/images/islamic-marriage.png',
  'technical-skill-development': '/images/ict-skills.png',
  donation: '/images/health.png',
};

export const categoryIcons = {
  education: BookOpen,
  'competition-talent-development': GraduationCap,
  'dawah-publicity': Sparkles,
  service: HandHeart,
  'self-purification-tazkiyah': HeartHandshake,
  'islamic-marriage': HeartHandshake,
  'technical-skill-development': GraduationCap,
  donation: HandHeart,
};

export const getCategoryIcon = (slug) => categoryIcons[slug] || Layers;

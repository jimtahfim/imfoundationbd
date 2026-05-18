export const getCategoryName = (category) => (
  category?.name_bn || category?.name || category?.title || category?.id || 'Untitled'
);

export const toBanglaNumber = (value) => String(value).replace(/\d/g, (digit) => '০১২৩৪৫৬৭৮৯'[digit]);

export const countDescendants = (category) => (
  (category.children || []).reduce((total, child) => total + 1 + countDescendants(child), 0)
);

export const findCategoryBySlug = (categories, slug) => {
  for (const category of categories) {
    if (category.slug === slug) return category;

    const match = findCategoryBySlug(category.children || [], slug);
    if (match) return match;
  }

  return null;
};

export const buildCategoryPath = (categories, slug, trail = []) => {
  for (const category of categories) {
    const nextTrail = [...trail, category];
    if (category.slug === slug) return nextTrail;

    const match = buildCategoryPath(category.children || [], slug, nextTrail);
    if (match.length) return match;
  }

  return [];
};

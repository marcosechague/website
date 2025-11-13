# Certification Images Setup

## Required Images

Please add the following images to the `/public/certifications/` folder:

### Image Files Needed:

1. **deeplearning-ai.png** - DeepLearning.AI logo
2. **google.png** - Google logo
3. **api-academy.png** - API Academy logo
4. **aws.png** - AWS logo
5. **oracle.png** - Oracle logo

### Image Requirements:

- **Format**: PNG or SVG preferred
- **Size**: 60x60 pixels (will be automatically resized)
- **Background**: Transparent or white
- **Quality**: High resolution for crisp display

### Where to Get Logos:

1. **Official Brand Pages**: Visit each company's brand/press kit page
2. **Credly**: Download from your Credly badges
3. **Coursera**: Screenshot from certificate pages
4. **Brand Guidelines**: Follow official logo usage guidelines

### Current Placeholder Setup:

- All images are configured in the `Certifications.tsx` component
- Paths are already set up: `/certifications/[logo-name].png`
- Component will display placeholder if images are missing

Just add the real logo images to the `/public/certifications/` folder with the exact filenames listed above.

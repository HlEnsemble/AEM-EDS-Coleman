/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards5) block header
  const headerRow = ['Cards (cards5)'];

  // Find the slider container holding all card items
  const sliderContainer = element.querySelector('.slider-container');
  if (!sliderContainer) return;

  // Select all card items
  const cardItems = sliderContainer.querySelectorAll('.slider-item');

  // Build card rows
  const rows = [headerRow];

  cardItems.forEach((item) => {
    // Image: find the first <img> inside .slider-image
    const imgEl = item.querySelector('.slider-image img');
    let imageRef = imgEl || '';

    // Text content: build a container for badge, title, and price only
    const textContainer = document.createElement('div');
    textContainer.style.display = 'flex';
    textContainer.style.flexDirection = 'column';

    // Badge (optional)
    const badge = item.querySelector('.best-seller span');
    if (badge) {
      const badgeDiv = document.createElement('div');
      badgeDiv.textContent = badge.textContent;
      textContainer.appendChild(badgeDiv);
    }

    // Title (strong)
    const title = item.querySelector('.slider-text strong');
    if (title) {
      const heading = document.createElement('h3');
      heading.textContent = title.textContent;
      textContainer.appendChild(heading);
    }

    // Price
    const price = item.querySelector('.price');
    if (price) {
      const priceP = document.createElement('p');
      priceP.textContent = price.textContent;
      textContainer.appendChild(priceP);
    }

    rows.push([imageRef, textContainer]);
  });

  // Create and replace block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

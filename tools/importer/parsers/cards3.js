/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards block root
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;

  // Find all card elements
  const cardElements = cardsBlock.querySelectorAll('.cards-element');

  // Table header (must be exactly one column)
  const headerRow = ['Cards (cards3)'];
  const rows = [headerRow];

  cardElements.forEach((cardEl) => {
    // Image cell (first cell)
    const imageContainer = cardEl.querySelector('.cards-card-image');
    let imageCell = '';
    if (imageContainer) {
      imageCell = imageContainer;
    }

    // Text cell (second cell)
    const bodyContainer = cardEl.querySelector('.cards-card-body');
    let textCell = '';
    if (bodyContainer) {
      textCell = bodyContainer;
    }

    rows.push([imageCell, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}

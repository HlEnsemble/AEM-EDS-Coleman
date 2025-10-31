/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row for the Columns block
  const headerRow = ['Columns (columns6)'];

  // 2. Find the cards container (specific for cards pattern)
  const cardsContainer = element.querySelector('.cards-container');
  if (!cardsContainer) return;

  // 3. Find all card elements
  const cardElements = cardsContainer.querySelectorAll('.cards-element');
  if (!cardElements.length) return;

  // 4. For each card, extract its content as a column cell
  const columnCells = Array.from(cardElements).map(card => {
    // We'll create a wrapper div to hold all card content
    const wrapper = document.createElement('div');
    // Get image section
    const imgSection = card.querySelector('.cards-card-image');
    if (imgSection) wrapper.appendChild(imgSection);
    // Get body section
    const bodySection = card.querySelector('.cards-card-body');
    if (bodySection) wrapper.appendChild(bodySection);
    return wrapper;
  });

  // 5. Build the table rows
  const tableRows = [
    headerRow,
    columnCells // This will be the second row, one cell per column
  ];

  // 6. Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}

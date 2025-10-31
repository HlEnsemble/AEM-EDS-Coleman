/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // The columns are direct children of the first child of columnsBlock
  const columnsContainer = columnsBlock.querySelector(':scope > div');
  if (!columnsContainer) return;
  const columns = Array.from(columnsContainer.children);
  if (columns.length < 2) return;

  // Left column: contains text, image, headings, paragraph, list, buttons
  const leftCol = columns[0];
  // Right column: contains image only
  const rightCol = columns[1];

  // --- CRITICAL FIX: Ensure ALL text content from screenshot and HTML is included ---
  // Compose left column cell by explicitly extracting all meaningful content in order
  const leftColContent = [];

  // 1. Icon/image at the top (picture element)
  const topPicture = leftCol.querySelector('picture');
  if (topPicture) leftColContent.push(topPicture);

  // 2. Headings: 'TENT SEASON' and "Here's to the nights"
  // These may be in <p>, <strong>, <span>, or styled elements
  // Find and push them in visual order
  Array.from(leftCol.querySelectorAll('p, strong, span')).forEach((el) => {
    const text = el.textContent.trim();
    if (text === 'TENT SEASON' || text === "Here's to the nights") {
      leftColContent.push(el.cloneNode(true));
    }
  });

  // 3. Paragraph text (exclude headings)
  Array.from(leftCol.querySelectorAll('p')).forEach((p) => {
    const text = p.textContent.trim();
    if (
      text &&
      text !== 'TENT SEASON' &&
      text !== "Here's to the nights"
    ) {
      leftColContent.push(p.cloneNode(true));
    }
  });

  // 4. List (buttons/links)
  const list = leftCol.querySelector('ul');
  if (list) leftColContent.push(list.cloneNode(true));

  // Build right column cell: reference the picture element directly
  const rightColPicture = rightCol.querySelector('picture');

  // Table header row
  const headerRow = ['Columns (columns2)'];
  // Table content row: left column (all content), right column (image)
  const contentRow = [leftColContent, rightColPicture];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

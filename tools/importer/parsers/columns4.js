/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we target the correct wrapper
  const wrapper = element.querySelector('.promo-banner .wrapper');
  if (!wrapper) return;

  // Defensive: expect two children (image + text)
  const children = wrapper.children;
  if (children.length < 2) return;

  // Left column: image (picture element)
  const imageCol = children[0].querySelector('picture') || children[0];

  // Right column: text (all paragraphs)
  const textCol = document.createElement('div');
  Array.from(children[1].children).forEach(child => {
    // Only include <p> elements, preserving formatting
    if (child.tagName === 'P') {
      textCol.appendChild(child.cloneNode(true));
    }
  });

  // Build the table rows
  const headerRow = ['Columns (columns4)'];
  const rows = [
    headerRow,
    [imageCol, textCol]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

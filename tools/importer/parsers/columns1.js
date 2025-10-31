/* global WebImporter */
export default function parse(element, { document }) {
  // Find main wrapper
  const wrapper = element.querySelector('.default-content-wrapper');
  if (!wrapper) return;

  // Extract logo (first <p> with <img>)
  const logoP = wrapper.querySelector('p:has(img)');
  // Extract search bar (<p> with <input> and search icon)
  const searchP = wrapper.querySelector('p:has(input)');
  // Extract navigation (<ul> with <li>s)
  const navUl = wrapper.querySelector('ul');

  // Compose columns: Logo, Search, Navigation
  const columns = [logoP, searchP, navUl].filter(Boolean);

  // Table header must match block name exactly
  const headerRow = ['Columns (columns1)'];
  const tableRows = [headerRow, columns];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(table);
}

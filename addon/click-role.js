export default function(...roles) {
  const selector = roles.map((role) => `[data-role="${role}"]`).join(' ');

  return click(selector);
}

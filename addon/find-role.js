export default function findRole(...roles) {
  const selector = roles.map((role) => `[data-role="${role}"]`).join(' ');

  return findWithAssert(selector);
}

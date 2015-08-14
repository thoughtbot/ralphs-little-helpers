export default function clickOn(text) {
  return click(`:contains("${text}"), [value="${text}"]`);
}

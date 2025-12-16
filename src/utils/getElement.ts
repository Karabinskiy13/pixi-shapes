export function getElement<T extends HTMLElement = HTMLElement>(
  id: string,
): T | undefined {
  return (document.getElementById(id) as T | null) ?? undefined;
}

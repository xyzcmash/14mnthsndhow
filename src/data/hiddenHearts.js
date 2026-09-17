export const HIDDEN_HEART_IDS = ['landing', 'login', 'home', 'timeline', 'record', 'wall'];
export const HEARTS_STORAGE_KEY = 'ashu-hidden-hearts';
export const HEARTS_EVENT = 'ashu-hearts-updated';

export function getCollectedHearts() {
  try {
    const raw = localStorage.getItem(HEARTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function collectHeart(id) {
  const current = getCollectedHearts();
  if (current.includes(id)) return current;

  const updated = [...current, id];
  try {
    localStorage.setItem(HEARTS_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // if storage is unavailable, the hunt just won't persist, harmless
  }
  window.dispatchEvent(new CustomEvent(HEARTS_EVENT, { detail: updated }));
  return updated;
}

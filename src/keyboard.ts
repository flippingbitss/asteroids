export enum Key {
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  Space = "Space",
  ShiftLeft = "ShiftLeft",
}

type Listener = () => void;

export class Keyboard {
  private static reservedKeys = new Set(Object.values(Key));

  private downKeys: Set<Key>;
  private downKeyOnceListeners: Map<Key, Listener>;

  constructor(window: Window) {
    this.downKeys = new Set();
    this.downKeyOnceListeners = new Map();

    this.handleKeyPress = this.handleKeyPress.bind(this);
    window.addEventListener("keydown", this.handleKeyPress);
    window.addEventListener("keyup", this.handleKeyPress);
  }

  private handleKeyPress(e: KeyboardEvent): void {
    const key = e.code as Key;
    if (!Keyboard.reservedKeys.has(key)) {
      return;
    }

    e.preventDefault();

    if (e.type === "keydown") {
      this.downKeys.add(key);
      if (!e.repeat) {
        this.downKeyOnceListeners.get(key)?.();
      }
    } else if (e.type === "keyup") {
      this.downKeys.delete(key);
    }
  }

  public isKeyDown(key: Key): boolean {
    return this.downKeys.has(key);
  }

  public onKeyDownOnce(key: Key, listener: Listener) {
    this.downKeyOnceListeners.set(key, listener);
  }
}

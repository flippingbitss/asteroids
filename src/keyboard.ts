export enum Key {
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  Space = "Space",
  ShiftLeft = "ShiftLeft",
}

export class Keyboard {
  private static reservedKeys = new Set(Object.values(Key));

  private downKeys: Set<Key>;

  constructor(window: Window) {
    this.downKeys = new Set();

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
    } else if (e.type === "keyup") {
      this.downKeys.delete(key);
    }
  }

  public isKeyDown(key: Key): boolean {
    return this.downKeys.has(key);
  }
}

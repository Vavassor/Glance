interface PostponedAction<Value> {
  reject: (reason?: any) => void;
  resolve: (value: Value | PromiseLike<Value>) => void;
}

export class ActionQueue<Value> {
  private isPending = false;
  private postponedActions: PostponedAction<Value>[] = [];

  async runOrEnqueue(promise: Promise<Value>) {
    if (this.isPending) {
      return this.enqueue();
    }

    let value: Value;
    try {
      this.isPending = true;
      value = await promise;
      this.resolveAll(value);
    } catch (error) {
      this.rejectAll(error);
      throw error;
    } finally {
      this.isPending = false;
    }

    return value;
  }

  private enqueue() {
    return new Promise<Value>((resolve, reject) => {
      this.postponedActions.push({ resolve, reject });
    });
  }

  private rejectAll(error: unknown) {
    this.postponedActions.forEach((promise) => promise.reject(error));
    this.postponedActions = [];
  }

  private resolveAll(value: Value) {
    this.postponedActions.forEach((promise) => promise.resolve(value));
    this.postponedActions = [];
  }
}

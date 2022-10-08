
/**
 * Storing context here for each transaction.
 */
export const sessionVariable = new Meteor.EnvironmentVariable<object | undefined>();
 
export function isInTransaction(): boolean {
  return sessionVariable.get() != null;
}

export type TransactionCallback<R> = (session: object) => R;

export function runInTransaction<R>(fn: TransactionCallback<R>, options: object = {}): R {
  if (sessionVariable.get()) {
      throw new Error('Nested transactions are not supported');
  }
  return sessionVariable.withValue({}, () => fn({}));
}

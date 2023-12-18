/**
 * An object that integrations log intermittently to update the api consumer on the
 * status of the operation.
 */
export interface Beacon {
  /**
   * A status message.
   */
  message: string;

  /**
   * Optional additional data.
   */
  data?: any;

  /**
   * The timestamp of when the beacon was created.
   */
  updatedAt: string;
}

/**
 * An object that integrations log intermittently to update the api consumer on the
 * status of the operation.
 */
export interface Beacon {
  /**
   * A status message.
   *
   * Any message that the integration wants to send to the api consumer up
   * to 255 characters.
   */
  message: string;

  /**
   * The status of the job.
   *
   * The status of the job. One of:
   * - `pending` - The job is pending.
   * - `running` - The job is running.
   * - `success` - The job is completed.
   * - `skipped` - The job was skipped.
   * - `failure` - The job failed.
   * - `payment` - The job failed due to insufficient funds.
   */
  status: string;

  /**
   * Optional additional data.
   *
   * Any other value that the integration wants to send to the api consumer.
   */
  data?: any;

  /**
   * The timestamp of when the beacon was updated.
   */
  updatedAt: string;
}

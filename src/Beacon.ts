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
   * The total number of steps in the entire api request.
   *
   * The number of steps required to complete the api request is calculated when the
   * request is made. This can be used along with `currentStep` to show a progress bar.
   */
  totalSteps: number;

  /**
   * The current step in the api request.
   */
  currentStep: number;

  /**
   * Optional additional data.
   *
   * Any other value that the integration wants to send to the api consumer.
   */
  data?: any;

  /**
   * User supplied metadata that will be a part of the api status.
   *
   * Used by clients to pass along a unique value that they need to associate with the request. They
   * can then find this value in the status response.
   */
  meta?: string;

  /**
   * The timestamp of when the beacon was updated.
   */
  updatedAt: string;
}

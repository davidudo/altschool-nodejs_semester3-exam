/* import { CronJob } from 'cron';
import { Queue, Worker, Job } from 'bull';

// Set up a Redis client for Bull queue
const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const reviewQueue = new Queue('reviews', REDIS_URL);

// Define a Bull worker to process review jobs
const reviewWorker = new Worker('reviews', async (job: Job) => {
  const { customerId, orderId } = job.data;
  const reviewUrl = `https://example.com/review/${orderId}`;

  // Send a review request email to the customer
  await sendReviewEmail(customerId, reviewUrl);

  // Mark the job as completed
  return { success: true };
});

// Set up a Cron job to schedule review reminders every week
const reviewCronJob = new CronJob('0 0 * * 0', async () => {
  // Query the database for all orders with status "delivered" within the past week
  const deliveredOrders = await Order.findAll({
    where: {
      status: 'delivered',
      updatedAt: { [Op.gt]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    },
  });

  // Create a review job for each delivered order
  const reviewJobs = deliveredOrders.map((order) => {
    return reviewQueue.add({ customerId: order.customerId, orderId: order.id });
  });

  // Wait for all review jobs to complete before logging the result
  await Promise.allSettled(reviewJobs);
  console.log(`Scheduled ${reviewJobs.length} review reminders`);
});

// Start the Cron job
reviewCronJob.start();

// Start the Bull worker
reviewWorker.start();
*/

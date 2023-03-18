"use strict";
/* import cron from 'node-cron';
import { Op } from 'sequelize';
import { Order } from './models/Order';

// Cron job to schedule deletion of expired orders
cron.schedule('0 0 * * *', async () => {
  try {
    const result = await Order.destroy({
      where: {
        createdAt: {
          [Op.lt]: new Date(new Date() - 24 * 60 * 60 * 1000), // 24 hours ago
        },
        status: 'pending',
      },
    });

    console.log(`Deleted ${result} expired orders.`);
  } catch (error) {
    console.error(`Error deleting expired orders: ${error}`);
  }
});

// Background worker to handle the deletion operation
async function deleteExpiredOrders() {
  try {
    const result = await Order.destroy({
      where: {
        createdAt: {
          [Op.lt]: new Date(new Date() - 24 * 60 * 60 * 1000), // 24 hours ago
        },
        status: 'pending',
      },
    });

    console.log(`Deleted ${result} expired orders.`);
  } catch (error) {
    console.error(`Error deleting expired orders: ${error}`);
  }
}

// Call the function to start the background worker
deleteExpiredOrders();
*/

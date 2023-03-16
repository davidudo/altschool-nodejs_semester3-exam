import { type Socket } from 'socket.io'

function orderSocket (data: any): void {
    const receivedData: any = data
    console.log(`Message received from ${socketId}: ${receivedData}`)

    const {
      customer,
      order,
      customerFeedback
    } = receivedData

    // Check if customer exists and create customer if not found
    const customerId: number = Number(customer.id)

    const customerData: CustomerAttributes | null = await CustomerModel.findByPk(customerId)

    if (customerData == null) {
      const {
        name
      } = customer

      await CustomerModel.create({
        name
      })
    }

    let customerFBId: number | null = null

    // Check if customer feedback is available
    if (customerFeedback != null) {
      const comment = customerFeedback.comment

      const customerfb: CustomerFBAttributes = await CustomerFeedbackModel.create(comment)

      customerFBId = customerfb.id
    }

    // Assign staff to deliver order
    const staffs = await StaffModel.findAll({
      where: { deletedAt: null, role: 'delivery' }
    })

    const randomIndex: number = Math.floor(Math.random() * staffs.length)

    // Choose a random staff
    const staff = staffs[randomIndex]

    const status: 'pending' = 'pending'
    const staffId: number = staff.id
    const totalPrice = order.totalPrice

    // Create order
    const orderData = {
      customerId,
      customerFBId,
      staffId,
      status,
      totalPrice
    }

    const orderResponse: OrderAttributes = await OrderModel.create(orderData)

    // Create order item
    const orderItemsReceived = order.orderItems

    for (const orderItemReceived of orderItemsReceived) {
      const orderId: number = orderResponse.id
      const menuItemId: number = orderItemReceived.menuItem.id
      const quantity: number = orderItemReceived.quantity
      const notes: string | null = orderItemReceived.notes

      const orderItemData = {
        orderId,
        menuItemId,
        quantity,
        notes
      }

      await OrderItemModel.create(orderItemData)
    }

    // TODO: Broadcast message to admin
    socket.broadcast.emit('order-status', { orderData })
  })
}

export default orderSocket

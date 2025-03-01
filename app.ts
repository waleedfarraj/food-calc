// app.ts - Main application script
import { OrderManager, OrderItem } from './order';

document.addEventListener('DOMContentLoaded', () => {
  const orderManager = new OrderManager();
  
  // DOM Elements
  const form = document.getElementById('orderForm') as HTMLFormElement;
  const resultContainer = document.getElementById('result') as HTMLDivElement;
  const orderSummary = document.getElementById('orderSummary') as HTMLDivElement;
  const totalDisplay = document.getElementById('totalAmount') as HTMLSpanElement;
  
  // Initialize
  renderOrderTable();
  
  // Event Listeners
  form.addEventListener('submit', handleOrderSubmit);
  
  function handleOrderSubmit(event: Event): void {
    event.preventDefault();
    
    const formData = new FormData(form);
    const deliveryFee = parseFloat(formData.get('fee') as string) || 0;
    const name = formData.get('name') as string;
    const item = formData.get('order') as string;
    const quantity = parseInt(formData.get('quantity') as string) || 1;
    const price = parseFloat(formData.get('price') as string) || 0;
    
    if (!name || !item) {
      showNotification('Please fill all required fields', 'error');
      return;
    }
    
    orderManager.setDeliveryFee(deliveryFee);
    orderManager.addOrder(name, item, quantity, price);
    
    renderOrderTable();
    form.reset();
    
    // Focus back on name field
    const nameInput = form.querySelector('[name="name"]') as HTMLInputElement;
    nameInput.focus();
    
    showNotification('Order added successfully!', 'success');
  }
  
  function renderOrderTable(): void {
    const orders = orderManager.getOrders();
    
    if (orders.length === 0) {
      resultContainer.innerHTML = '<div class="empty-state">No orders yet. Add an order using the form.</div>';
      orderSummary.classList.add('hidden');
      return;
    }
    
    orderSummary.classList.remove('hidden');
    
    const deliveryFee = orderManager.getDeliveryFee();
    const deliveryPerPerson = orders.length > 0 ? deliveryFee / orders.length : 0;
    const totalBeforeDelivery = orderManager.getTotalBeforeDelivery();
    const total = totalBeforeDelivery + deliveryFee;
    
    totalDisplay.textContent = total.toFixed(2);
    
    const tableHTML = `
      <table class="order-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Order</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Total</th>
            <th>Share (+ Delivery)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${orders.map(order => `
            <tr data-id="${order.id}">
              <td>${order.name}</td>
              <td>${order.item}</td>
              <td>${order.quantity}</td>
              <td>$${order.price.toFixed(2)}</td>
              <td>$${order.total.toFixed(2)}</td>
              <td>$${order.share?.toFixed(2)}</td>
              <td>
                <button class="btn btn-danger delete-btn" data-id="${order.id}">
                  <i class="fas fa-trash"></i> Remove
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="text-right"><strong>Subtotal:</strong></td>
            <td>$${totalBeforeDelivery.toFixed(2)}</td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td colspan="4" class="text-right"><strong>Delivery Fee:</strong></td>
            <td>$${deliveryFee.toFixed(2)}</td>
            <td>$${deliveryPerPerson.toFixed(2)} per person</td>
            <td></td>
          </tr>
          <tr class="total-row">
            <td colspan="4" class="text-right"><strong>Total:</strong></td>
            <td>$${total.toFixed(2)}</td>
            <td colspan="2"></td>
          </tr>
        </tfoot>
      </table>
    `;
    
    resultContainer.innerHTML = tableHTML;
    
    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLButtonElement).getAttribute('data-id') as string;
        orderManager.removeOrder(id);
        renderOrderTable();
        showNotification('Order removed', 'info');
      });
    });
  }
  
  function showNotification(message: string, type: 'success' | 'error' | 'info'): void {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show with animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
});

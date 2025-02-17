export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async addToCart(itemName) {
    const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
    await item.locator('button').click();
  }

  async getCartCount() {
    return this.cartBadge.textContent();
  }

  async sortProducts(option) {
    await this.sortDropdown.selectOption(option);
  }

  async getProductPrices() {
    return this.page.$$eval('.inventory_item_price', 
      prices => prices.map(price => parseFloat(price.textContent.replace('$', '')))
    );
  }
}
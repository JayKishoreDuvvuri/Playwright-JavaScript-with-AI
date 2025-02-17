import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';
import users from './fixtures/users.json';

test.describe('Inventory Page Functionality', () => {
  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    
    await loginPage.goto();
    await loginPage.login(users.standardUser.username, users.standardUser.password);
  });

  test('should add item to cart', async () => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe('1');
  });

  test('should sort products by price high to low', async () => {
    await inventoryPage.sortProducts('hilo');
    const prices = await inventoryPage.getProductPrices();
    const isSorted = prices.every((price, index) => 
      index === 0 || price <= prices[index - 1]
    );
    expect(isSorted).toBeTruthy();
  });

  test('should display correct number of products', async () => {
    const itemCount = await inventoryPage.inventoryItems.count();
    expect(itemCount).toBe(6);
  });
});
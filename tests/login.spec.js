import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import users from './fixtures/users.json' assert { type: "json" };

test.describe('Login Functionality', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('should show error for locked out user', async () => {
    await loginPage.login(users.lockedOutUser.username, users.lockedOutUser.password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Sorry, this user has been locked out');
  });

  test('should show error for invalid credentials', async () => {
    await loginPage.login('invalid_user', 'invalid_password');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
  });
});
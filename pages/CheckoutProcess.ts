import {Page,expect} from "@playwright/test";

export class CheckoutProcess {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async addToCart() {
        await this.page.locator('[data-test="product-sort-container"]').selectOption('lohi');
        await expect(this.page.locator("#item_2_title_link")).toBeVisible();
        await this.page.locator("//*[@id='add-to-cart-sauce-labs-onesie']").click();
        await this.page.locator("//*[@id='shopping_cart_container']").click();
        await this.page.locator("//*[@id='remove-sauce-labs-onesie']").click();
        await this.page.waitForSelector("//*[@id='continue-shopping']");
        await this.page.locator("//*[@id='continue-shopping']").click();
    }

    async shoppingCart() {
        await this.page.locator('[data-test="product-sort-container"]').selectOption('lohi');
        await expect(this.page.locator("#item_2_title_link")).toBeVisible();
        await this.page.locator("#item_2_title_link").click();
        await this.page.locator("//*[@id='add-to-cart']").click();
        await expect(this.page.locator("//*[text()='Sauce Labs Onesie']")).toBeVisible();
        await this.page.locator("#remove").click();
        await this.page.locator("//*[@id='add-to-cart']").click();
        await this.page.locator('#back-to-products').click();
        await this.page.locator('[data-test="shopping-cart-link"]').click();
    }

    async checkoutInformations() {
        await this.page.locator('[data-test="checkout"]').click();
        await this.page.locator('[data-test="firstName"]').click();
        await expect(this.page.locator('[data-test="secondary-header"]')).toContainText('Checkout: Your Information');
        await this.page.locator('[data-test="firstName"]').click();
        await this.page.locator('[data-test="firstName"]').fill('Qwerty');
        await this.page.locator('[data-test="lastName"]').click();
        await this.page.locator('[data-test="lastName"]').fill('A');
        await this.page.locator('[data-test="postalCode"]').click();
        await this.page.locator('[data-test="postalCode"]').fill('641122');
        await this.page.locator('[data-test="continue"]').click();
    }

    async finishOrder() {
        await expect(this.page.locator('[data-test="title"]')).toContainText('Checkout: Overview');
        await expect(this.page.locator('[data-test="payment-info-label"]')).toBeVisible();
        await expect(this.page.locator('[data-test="shipping-info-label"]')).toBeVisible();
        await expect(this.page.locator('[data-test="total-info-label"]')).toBeVisible();
        await this.page.locator('[data-test="finish"]').click();
        await expect(this.page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
        await expect(this.page.locator('[data-test="secondary-header"]')).toBeVisible();
        await this.page.locator('[data-test="back-to-products"]').click();
    }

}
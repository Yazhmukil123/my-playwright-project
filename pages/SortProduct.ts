import { Page, expect } from "@playwright/test";

export class SortProduct{
    readonly page:Page;

    constructor(page:Page){
        this.page = page;
    }

    async sortProductNameAsDecendingOrder(){
        await this.page.locator("//*[@data-test='product-sort-container']").selectOption('za');
        await expect(this.page.locator("//span[text()='Name (Z to A)']")).toBeVisible();
    }

    async sortProductNameAsAscendingOrder(){
         await this.page.locator('[data-test="product-sort-container"]').selectOption('az');
         await expect(this.page.locator("//span[text()='Name (A to Z)']")).toBeVisible();
    }

    async sortProductPriceLowToHigh(){
        await this.page.locator('[data-test="product-sort-container"]').selectOption('lohi');
        await expect(this.page.locator("//span[text()='Price (low to high)']")).toBeVisible();
        await expect(this.page.locator("[data-test='inventory-list']")).toContainText('$7.99');
    }

    async sortProductPriceHighToLow(){
        await this.page.locator('[data-test="product-sort-container"]').selectOption('hilo');
        await expect(this.page.locator("//span[text()='Price (high to low)']")).toBeVisible();
        await expect(this.page.locator('[data-test="inventory-list"]')).toContainText('$49.99');
    }
}
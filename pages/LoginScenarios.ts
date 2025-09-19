import { Page, expect } from "@playwright/test";

export class LoginScenarios{

    readonly page:Page;

    constructor(page:Page){
        this.page = page;
    }

    async goto(){
        await this.page.goto(process.env.BASE_URL as string);
    }

    async login(username: string, password: string){
        await this.page.fill("#user-name", username);
        await this.page.fill("#password", password);
        await this.page.click("#login-button");
    }

    async assertValidSuccess(){
        await expect(this.page).toHaveURL(process.env.INVENTORY_URL as string);
    }

    async asserrInvalidError(){
        await expect(this.page.locator("//*[@class='error-message-container error']")).toBeVisible();
    }
}
import { test, Page, BrowserContext } from "@playwright/test";
import { LoginScenarios } from "../pages/LoginScenarios";
import { SortProduct } from "../pages/SortProduct";
import dotenv from "dotenv";
dotenv.config;

let page;
let context: any;
let sortProduct: any;

test.describe("saucedemo testing", async () => {
    test.beforeAll("login credentials", async ({ browser }) => {
        context = await browser.newContext({
            ignoreHTTPSErrors: true
        });
        page = await context.newPage();

        const right_username = process.env.USER_NAME as string;
        const right_password = process.env.PASSWORD as string;

        const login = new LoginScenarios(page);
        const credentials = [
            { username: "wrong_user_1", password: "wrong_password_1" },
            { username: "wrong_user_2", password: right_password },
            { username: right_username, password: "wrong_password_2" },
            { username: right_username, password: right_password }
        ];

        let success = false;
        let attempt = 0;

        await login.goto();

        while (!success && attempt < credentials.length) {
            const { username, password } = credentials[attempt];

            try {
                await login.login(username, password);
                await login.assertValidSuccess();
                success = true;
            } catch (error) {
                await login.asserrInvalidError();
                attempt++;
                await login.goto();
            }
        }

        if (!success) {
            throw new Error("All attepmts are failed.");
        }

        sortProduct = new SortProduct(page);

    });

    test.afterAll(async () => {
        await context.close();
    })

    test("Sort Product", async ({ page }) => {

        await sortProduct.sortProductNameAsDecendingOrder();
        await sortProduct.sortProductNameAsAscendingOrder();
        await sortProduct.sortProductPriceLowToHigh();
        await sortProduct.sortProductPriceHighToLow();
    });


});
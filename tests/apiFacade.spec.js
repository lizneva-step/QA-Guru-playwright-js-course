import { expect } from "@playwright/test";
import { test } from "../src/helpers/fixtures/index";

let token;
test.describe.only("Challenge", () => {
  test.beforeAll(async ({ api }, testinfo) => {
    let r = await api.challenger.post(testinfo);
    const headers = r.headers();
    console.log(`${testinfo.project.use.apiURL}${headers.location}`);
    token = headers["x-challenger"];
  });
  test("получить токен", async ({ api }, testinfo) => {
    console.log(testinfo.project);
    let body = await api.challenges.get(token, testinfo);
    expect(body.challenges.length).toBe(59);
  });
});
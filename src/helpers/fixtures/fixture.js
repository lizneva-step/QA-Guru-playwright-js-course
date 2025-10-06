//импортируй в фикстуру функцию тест из pw под другим именем
import { test as base } from "@playwright/test";
import { App } from "../../pagesFacade/app.page";
import { Api } from "../../services/api.service";
import { UserBuilder } from "../builders";


//задаем константу test для глобального использования
//extend - встроенный метод 
//объект м иметь конструктор св-ва, методы
//пишем метод

          		
export const test = base.extend({
  app: async ({ page }, use) => {             //метод app: внутри асинхронная функция с встроенной фикстурой page и ключевым словом use
    let application = new App(page);		//стрелочная функция и объект (фасад  - единая точка входа во приложение)
    await use(application);
  },
  api: async ({ request }, use) => {
    let api = new Api(request);
    await use(api);
  },
  registerUser: async ({ page }, use) => {
    let app = new App(page);
    const user = new UserBuilder()
      .addEmail()
      .addName()
      .addPassword()
      .generate();
    //	console.log(app);
    await app.main.open();
    await app.main.gotoRegister();
    await app.register.register(user);
    await use(app);
  },
});
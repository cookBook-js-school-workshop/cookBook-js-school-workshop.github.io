import { page } from './lib.js';
import decorateContext from './middlewares/render.js';
import addSession from './middlewares/session.js';
import notify from './middlewares/notify.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { catalogPage } from './views/catalog.js';



page(addSession());
page(decorateContext());
page(notify());
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage)
page('/catalog', catalogPage)


page.start();


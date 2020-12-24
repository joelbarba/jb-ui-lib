import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

xdescribe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toEqual('Welcome to jb-ui-lib-sandbox!');
  });

});

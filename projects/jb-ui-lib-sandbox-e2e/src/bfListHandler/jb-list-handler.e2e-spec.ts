import { JbListHandlerPo } from './jb-list-handler.po';
import {$, browser, logging, protractor} from 'protractor';

/* This is a test that includes:
    - JbListHandler
    - <jb-list-paginator>
    - <jb-list-header-col>
    - <jb-list-placeholder>
 */
const bKey = protractor.Key.BACK_SPACE;
const manyBKey = bKey + bKey + bKey + bKey + bKey + bKey + bKey + bKey + bKey + bKey + bKey + bKey + bKey;
const fullList = [
  { col1:  '0', col2: 'joel.barba',   col3: 'joel@barba.com',             col4: 'Joel Barba' },
  { col1:  '2', col2: 'syrax',        col3: 'syrax@blackfire.com',        col4: 'Syrax Targaryen' },
  { col1:  '3', col2: 'vermithor',    col3: 'vermithor@targaryen.com',    col4: 'Vermithor Targaryen' },
  { col1:  '4', col2: 'CAraxes',      col3: 'caraxes@targaryen.com',      col4: 'Caraxes Targaryen' },
  { col1:  '5', col2: 'silverwing',   col3: 'silverwing@blackfire.com',   col4: 'Silverwing Targaryen' },

  { col1:  '6', col2: 'sunfyre',      col3: 'sunfyre@targaryen.com',      col4: 'Sunfyre Targaryen' },
  { col1:  '7', col2: 'vhagar',       col3: 'vhagar@targaryen.com',       col4: 'Vhagar Targaryen' },
  { col1:  '8', col2: 'tessarion',    col3: 'tessarion@targaryen.com',    col4: 'Tessarion Targaryen' },
  { col1:  '9', col2: 'cannibal',     col3: 'cannibal@targaryen.com',     col4: 'Cannibal Targaryen' },
  { col1: '10', col2: 'meraxes',      col3: 'meraxes@targaryen.com',      col4: 'Meraxes Targaryen' },

  { col1: '11', col2: 'balerion',     col3: 'balerion@targaryen.com',     col4: 'Balerion Targaryen' },
  { col1: '12', col2: 'quicksilver',  col3: 'quicksilver@targaryen.com',  col4: 'Quicksilver Targaryen' },
  { col1: '13', col2: 'Dreamfyre',    col3: 'dreamfyre@blackfire.com',    col4: 'Dreamfyre Targaryen' },
  { col1: '14', col2: 'meleys',       col3: 'meleys@targaryen.com',       col4: 'Meleys Targaryen' },
  { col1: '15', col2: 'seasmoke',     col3: 'seasmoke@targaryen.com',     col4: 'Seasmoke Targaryen' },

  { col1: '16', col2: 'vermax',       col3: 'vermax@targaryen.com',       col4: 'Vermax Targaryen' },
  { col1: '17', col2: 'arrax',        col3: 'arrax@targaryen.com',        col4: 'Arrax Targaryen' },
  { col1: '18', col2: 'tyraxes',      col3: 'tyraxes@targaryen.com',      col4: 'Tyraxes Targaryen' },
  { col1: '19', col2: 'moondancer',   col3: 'moondancer@targaryen.com',   col4: 'Moondancer Targaryen' },
  { col1: '20', col2: 'stormcloud',   col3: 'stormcloud@targaryen.com',   col4: 'Stormcloud Targaryen' },

  { col1: '21', col2: 'morghul',      col3: 'morghul@targaryen.com',      col4: 'Morghul Targaryen' },
  { col1: '22', col2: 'shrykos',      col3: 'shrykos@targaryen.com',      col4: 'Shrykos Targaryen' },
  { col1: '23', col2: 'greyghost',    col3: 'greyghost@targaryen.com',    col4: 'Greyghost Targaryen' },
  { col1: '24', col2: 'sheepstealer', col3: 'sheepstealer@targaryen.com', col4: 'Sheepstealer Targaryen' },
];

describe('Test List integration', () => {
  let page: JbListHandlerPo;

  beforeEach(async () => {
    page = new JbListHandlerPo('.jb-list-handler-test1');
    await page.navigateTo();
  });

  it('Should load every page', async () => {
    const paginator = page.paginator;
    const nextBtn = page.paginator.getPageNextBtn();
    expect(await paginator.getPagesArr()).toEqual(['1', '2', '3', '4', '5']);  // There should be 5 pages
    expect(await page.getCurrPageNum()).toEqual('1'); // Should start by page 1
    expect(await page.getFirstLastCount()).toEqual(['joel.barba', 'silverwing', 5]);
    expect(await page.getListArr()).toEqual(fullList.slice(0, 5));

    await nextBtn.click();
    expect(await page.getCurrPageNum()).toEqual('2');
    expect(await page.getListArr()).toEqual(fullList.slice(5, 10));

    await nextBtn.click();
    expect(await page.getCurrPageNum()).toEqual('3');
    expect(await page.getListArr()).toEqual(fullList.slice(10, 15));

    await nextBtn.click();
    expect(await page.getCurrPageNum()).toEqual('4');
    expect(await page.getListArr()).toEqual(fullList.slice(15, 20));

    await nextBtn.click();
    expect(await page.getCurrPageNum()).toEqual('5');
    expect(await page.getListArr()).toEqual(fullList.slice(20, 24));
  });

  it('Should order by username', async () => {
    expect(await page.getListArr()).toEqual(fullList.slice(0, 5));
    const header2 = page.getListHeader(2);
    await header2.click();
    expect(await page.getListArr()).toEqual([
      { col1: '17', col2: 'arrax',        col3: 'arrax@targaryen.com',        col4: 'Arrax Targaryen' },
      { col1: '11', col2: 'balerion',     col3: 'balerion@targaryen.com',     col4: 'Balerion Targaryen' },
      { col1:  '9', col2: 'cannibal',     col3: 'cannibal@targaryen.com',     col4: 'Cannibal Targaryen' },
      { col1:  '4', col2: 'CAraxes',      col3: 'caraxes@targaryen.com',      col4: 'Caraxes Targaryen' },
      { col1: '13', col2: 'Dreamfyre',    col3: 'dreamfyre@blackfire.com',    col4: 'Dreamfyre Targaryen' },
    ]);
    await header2.click();
    expect(await page.getListArr()).toEqual([
      { col1:  '7', col2: 'vhagar',       col3: 'vhagar@targaryen.com',       col4: 'Vhagar Targaryen' },
      { col1:  '3', col2: 'vermithor',    col3: 'vermithor@targaryen.com',    col4: 'Vermithor Targaryen' },
      { col1: '16', col2: 'vermax',       col3: 'vermax@targaryen.com',       col4: 'Vermax Targaryen' },
      { col1: '18', col2: 'tyraxes',      col3: 'tyraxes@targaryen.com',      col4: 'Tyraxes Targaryen' },
      { col1:  '8', col2: 'tessarion',    col3: 'tessarion@targaryen.com',    col4: 'Tessarion Targaryen' },
    ]);
  });

  it('Should paginate different items per page', async () => {
    const nextBtn = page.getPageNextBtn();
    const prevBtn = page.getPagePrevBtn();
    expect(await page.getPagesCount()).toEqual(5);
    expect(await page.getListArr()).toEqual(fullList.slice(0, 5));

    await page.selectIPP(1);  // 10 items per page
    expect(await page.getPagesCount()).toEqual(3);
    expect(await page.getListArr()).toEqual(fullList.slice(0, 10));

    await nextBtn.click(); // Page 2 of 10 items per page
    expect(await page.getListArr()).toEqual(fullList.slice(10, 20));
    await nextBtn.click(); // Page 3 of 10 items per page
    expect(await page.getListArr()).toEqual(fullList.slice(20, 24));
    await (await page.paginator.goToPage(1)); // back to page 1

    await page.selectIPP(2);  // 15 items per page
    expect(await page.getPagesCount()).toEqual(2);
    expect(await page.getListArr()).toEqual(fullList.slice(0, 15));

    await page.selectIPP(3);  // 20 items per page
    expect(await page.getPagesCount()).toEqual(2);
    expect(await page.getListArr()).toEqual(fullList.slice(0, 20));

    await page.selectIPP(4);  // 30 items per page
    expect(await page.getPagesCount()).toEqual(1);
    expect(await page.getListArr()).toEqual(fullList.slice(0, 24));
  });

  it('Should handle data reloads', async () => {
    expect(await page.getPagesCount()).toEqual(5);  // There should be 5 pages
    expect(await page.getCurrPageNum()).toEqual('1'); // Should start by page 1
    expect(await page.getListArr()).toEqual(fullList.slice(0, 5));  // Should display first page with 5 items

    await page.loadMoreBtn(); // Load 2 new items into the list
    expect(await page.getPagesCount()).toEqual(6);
    await page.paginator.goToPage(6);

    expect(await page.getListArr()).toEqual([{ col1: '25', col2: 'dr.who', col3: 'who@dr.com', col4: 'Dr Who'}]);

    await page.loadLessBtn(); // Load 15 items list
    expect(await page.getCurrPageNum()).toEqual('3'); // Should go back to page 3 (last now)
    expect(await page.getPagesCount()).toEqual(3);
    expect((await page.getListArr()).length).toEqual(5);
  });

  it('Should filter by free text field (username + email)', async () => {
    expect(await page.getListArr()).toEqual(fullList.slice(0, 5));
    const textInput = page.getTextFilter();
    await textInput.sendKeys('ca');
    expect(await page.getListArr()).toEqual([ // Should filter 2 rows
      { col1:  '4', col2: 'CAraxes',      col3: 'caraxes@targaryen.com',      col4: 'Caraxes Targaryen' },
      { col1:  '9', col2: 'cannibal',     col3: 'cannibal@targaryen.com',     col4: 'Cannibal Targaryen' },
    ]);
    await textInput.clear();
    await textInput.sendKeys('blackfire');
    expect(await page.getListArr()).toEqual([
      { col1:  '2', col2: 'syrax',        col3: 'syrax@blackfire.com',        col4: 'Syrax Targaryen' },
      { col1:  '5', col2: 'silverwing',   col3: 'silverwing@blackfire.com',   col4: 'Silverwing Targaryen' },
      { col1: '13', col2: 'Dreamfyre',    col3: 'dreamfyre@blackfire.com',    col4: 'Dreamfyre Targaryen' },
    ]);
    await textInput.clear();
    await textInput.sendKeys('ba');
    expect(await page.getListArr()).toEqual([
      { col1:  '0', col2: 'joel.barba',   col3: 'joel@barba.com',             col4: 'Joel Barba' },
      { col1:  '9', col2: 'cannibal',     col3: 'cannibal@targaryen.com',     col4: 'Cannibal Targaryen' },
      { col1: '11', col2: 'balerion',     col3: 'balerion@targaryen.com',     col4: 'Balerion Targaryen' },
    ]);
    await textInput.clear();
    await textInput.sendKeys('targaryen');
    await page.selectIPP(6); // 100 items per page
    expect((await page.getListArr()).length).toEqual(20);
    await textInput.sendKeys('rrr'); // produce no result
    expect((await page.getListArr()).length).toEqual(0);
  });

  it('Should filter by free + specific fields (username + email)', async () => {
    expect(await page.getListArr()).toEqual(fullList.slice(0, 5));
    const textInput = page.getTextFilter();
    const filterUsr = page.getFilterUser();
    const filterEmail = page.getFilterEmail();
    await page.selectIPP(6); // 100 items per page

    await filterUsr.sendKeys('ba'); // Free='' + Usr='ba' + Email=''
    expect(await page.getListArr()).toEqual([
      { col1:  '0', col2: 'joel.barba',   col3: 'joel@barba.com',             col4: 'Joel Barba' },
      { col1:  '9', col2: 'cannibal',     col3: 'cannibal@targaryen.com',     col4: 'Cannibal Targaryen' },
      { col1: '11', col2: 'balerion',     col3: 'balerion@targaryen.com',     col4: 'Balerion Targaryen' },
    ]);
    await filterEmail.sendKeys('bal'); // Free='' + Usr='ba' + Email='bal'
    expect(await page.getListArr()).toEqual([
      { col1:  '9', col2: 'cannibal',     col3: 'cannibal@targaryen.com',     col4: 'Cannibal Targaryen' },
      { col1: '11', col2: 'balerion',     col3: 'balerion@targaryen.com',     col4: 'Balerion Targaryen' },
    ]);
    await filterUsr.sendKeys(manyBKey);
    await textInput.sendKeys('tar');  // Free='tar' + Usr='' + Email='bal'
    expect(await page.getListArr()).toEqual([
      { col1:  '9', col2: 'cannibal',     col3: 'cannibal@targaryen.com',     col4: 'Cannibal Targaryen' },
      { col1: '11', col2: 'balerion',     col3: 'balerion@targaryen.com',     col4: 'Balerion Targaryen' },
    ]);
    await textInput.sendKeys(manyBKey);
    await filterEmail.sendKeys(manyBKey);
    await filterEmail.sendKeys('black');  // Free='' + Usr='' + Email='black'
    expect((await page.getListArr()).length).toEqual(3);
    await filterUsr.sendKeys('syrax');    // Free='' + Usr='syrax' + Email='black'
    expect(await page.getListArr()).toEqual([
      { col1:  '2', col2: 'syrax',        col3: 'syrax@blackfire.com',        col4: 'Syrax Targaryen' },
    ]);
    await filterUsr.sendKeys('####');  // Free='' + Usr='syrax####' + Email='black'
    expect((await page.getListArr()).length).toEqual(0);
  });

  it('Should filter by strict match on username', async () => {
    expect(await page.getListArr()).toEqual(fullList.slice(0, 5));
    const filterUsrStrict = page.getFilterUserStrict();
    await page.selectIPP(6); // 100 items per page

    await filterUsrStrict.sendKeys('bal'); // Usr='balerion'
    expect(await page.getListArr()).toEqual([]);
    await filterUsrStrict.sendKeys('erion'); // Usr='balerion'
    expect(await page.getListArr()).toEqual([
      { col1: '11', col2: 'balerion',     col3: 'balerion@targaryen.com',     col4: 'Balerion Targaryen' },
    ]);
  });

  it('Should debounce filter first_name', async () => {
    const filterName = page.getFilterName();
    expect(await page.getListArr()).toEqual(fullList.slice(0, 5));

    filterName.sendKeys('sunfyre');
    await browser.sleep(1100); // Wait 1 second for the debounce
    expect(await page.getListArr()).toEqual([
      { col1:  '6', col2: 'sunfyre',      col3: 'sunfyre@targaryen.com',      col4: 'Sunfyre Targaryen' },
    ]);

    await filterName.sendKeys(manyBKey);
    filterName.sendKeys('ar');
    await browser.sleep(500); // Wait 0.5 seconds for the debounce
    filterName.sendKeys('rax');
    await browser.sleep(1100); // Wait 1 second for the debounce
    expect(await page.getListArr()).toEqual([
      { col1: '17', col2: 'arrax',        col3: 'arrax@targaryen.com',        col4: 'Arrax Targaryen' },
    ]);
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});




describe('Test List backend side paginated', () => {
  let page: JbListHandlerPo;
  const beTime = 1100; // Mocked time to load a backend page

  beforeEach(async () => {
    page = new JbListHandlerPo('.jb-list-handler-test2');
    await page.navigateTo();
    await $('.switch-test-2').click();
  });

  it('Should load every backend page', async () => {
    const nextBtn = page.getPageNextBtn();

    await browser.sleep(beTime); // Wait 1 second for the debounce
    expect(await page.getPagesCount()).toEqual(5);  // There should be 5 pages
    expect(await page.getCurrPageNum()).toEqual('1'); // Should start by page 1
    expect(await page.getListArr()).toEqual(fullList.slice(0, 5));  // Should display first page with 5 items
    expect(await page.getLimitBeF()).toEqual(['5', '0', 'id']); // Backend filter parameters


    await nextBtn.click();
    await browser.sleep(beTime);
    expect(await page.getCurrPageNum()).toEqual('2');
    expect(await page.getListArr()).toEqual(fullList.slice(5, 10));
    expect(await page.getLimitBeF()).toEqual(['5', '5', 'id']);

    await nextBtn.click();
    await browser.sleep(beTime);
    expect(await page.getCurrPageNum()).toEqual('3');
    expect(await page.getListArr()).toEqual(fullList.slice(10, 15));
    expect(await page.getLimitBeF()).toEqual(['5', '10', 'id']);

    await nextBtn.click();
    await browser.sleep(beTime);
    expect(await page.getCurrPageNum()).toEqual('4');
    expect(await page.getListArr()).toEqual(fullList.slice(15, 20));
    expect(await page.getLimitBeF()).toEqual(['5', '15', 'id']);

    await nextBtn.click();
    await browser.sleep(beTime);
    expect(await page.getCurrPageNum()).toEqual('5');
    expect(await page.getListArr()).toEqual(fullList.slice(20, 24));
    expect(await page.getLimitBeF()).toEqual(['5', '20', 'id']);
  });

  it('Should reload and keep the page on order by', async () => {
    const nextBtn = page.getPageNextBtn();

    await browser.sleep(beTime);
    expect(await page.getListArr()).toEqual(fullList.slice(0, 5));

    const header1 = page.getListHeader(1);
    const header2 = page.getListHeader(2);
    await header2.click();
    await browser.sleep(beTime);
    expect(await page.getListArr()).toEqual([
      { col1: '17', col2: 'arrax',        col3: 'arrax@targaryen.com',        col4: 'Arrax Targaryen' },
      { col1: '11', col2: 'balerion',     col3: 'balerion@targaryen.com',     col4: 'Balerion Targaryen' },
      { col1:  '9', col2: 'cannibal',     col3: 'cannibal@targaryen.com',     col4: 'Cannibal Targaryen' },
      { col1:  '4', col2: 'CAraxes',      col3: 'caraxes@targaryen.com',      col4: 'Caraxes Targaryen' },
      { col1: '13', col2: 'Dreamfyre',    col3: 'dreamfyre@blackfire.com',    col4: 'Dreamfyre Targaryen' },
    ]);
    expect(await page.getLimitBeF()).toEqual(['5', '0', 'username']);

    await header2.click();
    await browser.sleep(beTime);
    expect(await page.getListArr()).toEqual([
      { col1:  '7', col2: 'vhagar',       col3: 'vhagar@targaryen.com',       col4: 'Vhagar Targaryen' },
      { col1:  '3', col2: 'vermithor',    col3: 'vermithor@targaryen.com',    col4: 'Vermithor Targaryen' },
      { col1: '16', col2: 'vermax',       col3: 'vermax@targaryen.com',       col4: 'Vermax Targaryen' },
      { col1: '18', col2: 'tyraxes',      col3: 'tyraxes@targaryen.com',      col4: 'Tyraxes Targaryen' },
      { col1:  '8', col2: 'tessarion',    col3: 'tessarion@targaryen.com',    col4: 'Tessarion Targaryen' },
    ]);
    expect(await page.getLimitBeF()).toEqual(['5', '0', '-username']);

    await nextBtn.click();
    await nextBtn.click();
    await browser.sleep(beTime);
    expect(await page.getListArr()).toEqual([
      { col1: '24', col2: 'sheepstealer', col3: 'sheepstealer@targaryen.com', col4: 'Sheepstealer Targaryen' },
      { col1: '15', col2: 'seasmoke',     col3: 'seasmoke@targaryen.com',     col4: 'Seasmoke Targaryen' },
      { col1: '12', col2: 'quicksilver',  col3: 'quicksilver@targaryen.com',  col4: 'Quicksilver Targaryen' },
      { col1: '21', col2: 'morghul',      col3: 'morghul@targaryen.com',      col4: 'Morghul Targaryen' },
      { col1: '19', col2: 'moondancer',   col3: 'moondancer@targaryen.com',   col4: 'Moondancer Targaryen' },
    ]);
    expect(await page.getLimitBeF()).toEqual(['5', '10', '-username']);
    await header1.click();
    await browser.sleep(beTime);
    expect(await page.getListArr()).toEqual(fullList.slice(10, 15));
    expect(await page.getLimitBeF()).toEqual(['5', '10', 'id']);
  });

  it('Should paginate different items per page', async () => {
    const nextBtn = page.getPageNextBtn();
    await browser.sleep(beTime);
    expect(await page.getPagesCount()).toEqual(5);
    expect(await page.getListArr()).toEqual(fullList.slice(0, 5));

    await page.selectIPP(1);  // 10 items per page
    await browser.sleep(beTime);
    expect(await page.getPagesCount()).toEqual(3);
    expect(await page.getListArr()).toEqual(fullList.slice(0, 10));
    expect(await page.getLimitBeF()).toEqual(['10', '0', 'id']);

    await nextBtn.click(); // Page 2 of 10 items per page
    await browser.sleep(beTime);
    expect(await page.getListArr()).toEqual(fullList.slice(10, 20));
    expect(await page.getLimitBeF()).toEqual(['10', '10', 'id']);

    await page.selectIPP(2);  // 15 items per page (should return to page 1)
    await browser.sleep(beTime);
    expect(await page.getPagesCount()).toEqual(2);
    expect(await page.getCurrPageNum()).toEqual('1'); // Should start by page 1
    expect(await page.getListArr()).toEqual(fullList.slice(0, 15));
    expect(await page.getLimitBeF()).toEqual(['15', '0', 'id']);

    await page.selectIPP(4);  // 30 items per page
    await browser.sleep(beTime);
    expect(await page.getPagesCount()).toEqual(1);
    expect(await page.getListArr()).toEqual(fullList.slice(0, 24));
    expect(await page.getLimitBeF()).toEqual(['30', '0', 'id']);
  });

  it('Should filter specific fields triggering a backend page request', async () => {
    const nextBtn = page.getPageNextBtn();
    await browser.sleep(beTime);
    expect(await page.getListArr()).toEqual(fullList.slice(0, 5));

    await nextBtn.click();
    await browser.sleep(beTime);
    expect(await page.getListArr()).toEqual(fullList.slice(5, 10));

    const filterUsr = page.getFilterUser();
    const filterEmail = page.getFilterEmail();
    const filterName = page.getFilterName();

    await filterUsr.sendKeys('ca'); // Usr='ca' + Email=''
    await browser.sleep(beTime + 500);
    expect(await page.getListArr()).toEqual([
      { col1:  '4', col2: 'CAraxes',      col3: 'caraxes@targaryen.com',      col4: 'Caraxes Targaryen'  },
      { col1:  '9', col2: 'cannibal',     col3: 'cannibal@targaryen.com',     col4: 'Cannibal Targaryen' },
    ]);

    await filterEmail.sendKeys('bl'); // Usr='ca' + Email='bl'
    await browser.sleep(beTime + 500);
    expect(await page.getListArr()).toEqual([]);

    await filterUsr.sendKeys(manyBKey);
    await browser.sleep(beTime + 500);
    expect(await page.getListArr()).toEqual([
      { col1:  '2', col2: 'syrax',        col3: 'syrax@blackfire.com',        col4: 'Syrax Targaryen' },
      { col1:  '5', col2: 'silverwing',   col3: 'silverwing@blackfire.com',   col4: 'Silverwing Targaryen' },
      { col1: '13', col2: 'Dreamfyre',    col3: 'dreamfyre@blackfire.com',    col4: 'Dreamfyre Targaryen' },
    ]);

    await filterName.sendKeys('Silverwing');
    await browser.sleep(beTime + 2500);
    expect(await page.getListArr()).toEqual([
      { col1:  '5', col2: 'silverwing',   col3: 'silverwing@blackfire.com',   col4: 'Silverwing Targaryen' },
    ]);
  });

  it('Should paginate with a filter', async () => {
    const nextBtn = page.getPageNextBtn();
    await browser.sleep(beTime);
    expect(await page.getListArr()).toEqual(fullList.slice(0, 5));

    const filterEmail = page.getFilterEmail();

    await filterEmail.sendKeys('targaryen');
    await browser.sleep(beTime + 500);
    expect(await page.getListArr()).toEqual([
      { col1:  '3', col2: 'vermithor',    col3: 'vermithor@targaryen.com',    col4: 'Vermithor Targaryen' },
      { col1:  '4', col2: 'CAraxes',      col3: 'caraxes@targaryen.com',      col4: 'Caraxes Targaryen' },
      { col1:  '6', col2: 'sunfyre',      col3: 'sunfyre@targaryen.com',      col4: 'Sunfyre Targaryen' },
      { col1:  '7', col2: 'vhagar',       col3: 'vhagar@targaryen.com',       col4: 'Vhagar Targaryen' },
      { col1:  '8', col2: 'tessarion',    col3: 'tessarion@targaryen.com',    col4: 'Tessarion Targaryen' },
    ]);

    nextBtn.click();
    await browser.sleep(beTime);
    expect(await page.getListArr()).toEqual([
      { col1:  '9', col2: 'cannibal',     col3: 'cannibal@targaryen.com',     col4: 'Cannibal Targaryen' },
      { col1: '10', col2: 'meraxes',      col3: 'meraxes@targaryen.com',      col4: 'Meraxes Targaryen' },
      { col1: '11', col2: 'balerion',     col3: 'balerion@targaryen.com',     col4: 'Balerion Targaryen' },
      { col1: '12', col2: 'quicksilver',  col3: 'quicksilver@targaryen.com',  col4: 'Quicksilver Targaryen' },
      { col1: '14', col2: 'meleys',       col3: 'meleys@targaryen.com',       col4: 'Meleys Targaryen' },
    ]);

    nextBtn.click();
    await browser.sleep(beTime);
    expect(await page.getListArr()).toEqual([
      { col1: '15', col2: 'seasmoke',     col3: 'seasmoke@targaryen.com',     col4: 'Seasmoke Targaryen' },
      { col1: '16', col2: 'vermax',       col3: 'vermax@targaryen.com',       col4: 'Vermax Targaryen' },
      { col1: '17', col2: 'arrax',        col3: 'arrax@targaryen.com',        col4: 'Arrax Targaryen' },
      { col1: '18', col2: 'tyraxes',      col3: 'tyraxes@targaryen.com',      col4: 'Tyraxes Targaryen' },
      { col1: '19', col2: 'moondancer',   col3: 'moondancer@targaryen.com',   col4: 'Moondancer Targaryen' },
    ]);

  });


  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

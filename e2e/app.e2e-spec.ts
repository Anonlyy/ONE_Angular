import { ONEPage } from './app.po';

describe('one App', () => {
  let page: ONEPage;

  beforeEach(() => {
    page = new ONEPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

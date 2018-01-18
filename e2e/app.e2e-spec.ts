import { DivecenterPage } from './app.po';

describe('divecenter App', function() {
  let page: DivecenterPage;

  beforeEach(() => {
    page = new DivecenterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

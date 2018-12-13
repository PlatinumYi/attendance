import { HeaderRoutingModule } from './header-routing.module';

describe('HeaderRoutingModule', () => {
  let headerRoutingModule: HeaderRoutingModule;

  beforeEach(() => {
    headerRoutingModule = new HeaderRoutingModule();
  });

  it('should create an instance', () => {
    expect(headerRoutingModule).toBeTruthy();
  });
});

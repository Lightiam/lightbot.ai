import { PRICING_TIERS, getAnnualDiscount } from './pricing';

describe('Pricing Configuration', () => {
  test('Baby Plan matches BotPenguin exactly', () => {
    const babyPlan = PRICING_TIERS.find(tier => tier.id === 'baby');
    expect(babyPlan).toBeDefined();
    expect(babyPlan?.price.monthly).toBe(0);
    expect(babyPlan?.limits.messages).toBe(1000);
    expect(babyPlan?.limits.conversations).toBe(100);
    expect(babyPlan?.limits.chatbots).toBe(1);
  });

  test('Little Plan matches BotPenguin exactly', () => {
    const littlePlan = PRICING_TIERS.find(tier => tier.id === 'little');
    expect(littlePlan).toBeDefined();
    expect(littlePlan?.price.monthly).toBe(15);
    expect(littlePlan?.limits.messages).toBe(3000);
    expect(littlePlan?.limits.conversations).toBe(3000);
    expect(littlePlan?.limits.chatbots).toBe(5);
    expect(littlePlan?.limits.agents).toBe(5);
  });

  test('King Plan matches BotPenguin exactly', () => {
    const kingPlan = PRICING_TIERS.find(tier => tier.id === 'king');
    expect(kingPlan).toBeDefined();
    expect(kingPlan?.price.monthly).toBe(50);
    expect(kingPlan?.limits.messages).toBe(12000);
    expect(kingPlan?.limits.conversations).toBe(12000);
    expect(kingPlan?.limits.chatbots).toBe(-1); // Unlimited
    expect(kingPlan?.limits.agents).toBe(10);
  });

  test('Annual discount calculation is correct', () => {
    expect(getAnnualDiscount(15)).toBe(30); // 2 months free
    expect(getAnnualDiscount(50)).toBe(100); // 2 months free
  });
});

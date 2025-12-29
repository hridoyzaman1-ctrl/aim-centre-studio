
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
}

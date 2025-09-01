import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  Check, 
  Star, 
  Crown, 
  Zap, 
  Shield, 
  ArrowRight,
  MessageCircle,
  Brain,
  Filter,
  Clock,
  Headphones
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started",
      price: isYearly ? "0" : "0",
      period: "forever",
      icon: Star,
      features: [
        "View tender listings",
        "Basic search and filters",
        "Limited AI insights preview",
        "PDF document access",
        "5 tender views per day",
        "Community support"
      ],
      limitations: [
        "No notifications",
        "Limited AI analysis",
        "No category subscriptions"
      ],
      cta: "Get Started Free",
      popular: false,
      highlight: false
    },
    {
      name: "Pro",
      description: "For professionals who need alerts",
      price: isYearly ? "490,000" : "49,000",
      period: isYearly ? "year" : "month",
      savings: isYearly ? "Save 2 months" : null,
      icon: MessageCircle,
      features: [
        "Everything in Free",
        "Telegram notifications",
        "Category subscriptions",
        "Advanced filters",
        "Unlimited tender views",
        "Email alerts",
        "Priority support",
        "Export to Excel/PDF"
      ],
      limitations: [
        "Limited AI analysis"
      ],
      cta: "Start Pro Trial",
      popular: true,
      highlight: true
    },
    {
      name: "Premium",
      description: "Complete AI-powered solution",
      price: isYearly ? "990,000" : "99,000",
      period: isYearly ? "year" : "month",
      savings: isYearly ? "Save 2 months" : null,
      icon: Crown,
      features: [
        "Everything in Pro",
        "Full AI analysis & insights",
        "Custom alert criteria",
        "API access",
        "Proposal generation",
        "Team collaboration",
        "Dedicated support",
        "Custom integrations"
      ],
      limitations: [],
      cta: "Go Premium",
      popular: false,
      highlight: false
    }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Get intelligent insights and fit scores for every tender",
      plans: ["Premium"]
    },
    {
      icon: MessageCircle,
      title: "Telegram Notifications",
      description: "Instant alerts delivered directly to your Telegram",
      plans: ["Pro", "Premium"]
    },
    {
      icon: Filter,
      title: "Advanced Filtering",
      description: "Smart filters by budget, category, deadline, and more",
      plans: ["Pro", "Premium"]
    },
    {
      icon: Clock,
      title: "Real-time Monitoring",
      description: "Automated tracking across multiple tender sources",
      plans: ["Pro", "Premium"]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security for your business data",
      plans: ["Free", "Pro", "Premium"]
    },
    {
      icon: Headphones,
      title: "Priority Support",
      description: "Dedicated support team to help you succeed",
      plans: ["Pro", "Premium"]
    }
  ];

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      question: "Is there a free trial for paid plans?",
      answer: "Yes, we offer a 14-day free trial for both Pro and Premium plans with full access to features."
    },
    {
      question: "How do Telegram notifications work?",
      answer: "Connect your Telegram account and receive instant notifications when tenders matching your criteria are published."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept Click, Payme, and bank transfers. All payments are processed securely."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 gradient-primary text-white border-0">
            💰 Simple, Transparent Pricing
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Choose Your <span className="gradient-text">Plan</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Start free and upgrade when you need more features. All plans include unlimited tender access and basic filtering.
          </p>
          
          {/* Annual Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch 
              checked={isYearly} 
              onCheckedChange={setIsYearly}
            />
            <span className={`text-sm ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Yearly
            </span>
            {isYearly && (
              <Badge variant="secondary" className="ml-2">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-2 transition-all duration-300 ${
                plan.highlight 
                  ? "border-primary shadow-glow scale-105" 
                  : "border-border hover:border-primary/20 hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 gradient-primary text-white border-0">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-8">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center ${
                  plan.highlight ? 'gradient-primary' : 'bg-muted'
                }`}>
                  <plan.icon className={`w-6 h-6 ${plan.highlight ? 'text-white' : 'text-muted-foreground'}`} />
                </div>
                
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                  {plan.price !== "0" && (
                    <div className="text-sm text-muted-foreground">UZS</div>
                  )}
                  {plan.savings && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {plan.savings}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, limitIndex) => (
                    <div key={limitIndex} className="flex items-start gap-3 opacity-60">
                      <div className="w-5 h-5 flex-shrink-0 mt-0.5 flex items-center justify-center">
                        <div className="w-3 h-3 border border-muted-foreground rounded-full"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">{limitation}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full ${
                    plan.highlight 
                      ? "gradient-primary text-white border-0" 
                      : ""
                  }`}
                  variant={plan.highlight ? "default" : "outline"}
                  size="lg"
                  asChild
                >
                  <Link to="/auth/register">
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                
                {plan.name !== "Free" && (
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    14-day free trial included
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Feature <span className="gradient-text">Comparison</span>
          </h2>
          
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">Features</th>
                      <th className="text-center p-4 font-semibold">Free</th>
                      <th className="text-center p-4 font-semibold text-primary">Pro</th>
                      <th className="text-center p-4 font-semibold text-accent">Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "Tender Listings", free: true, pro: true, premium: true },
                      { feature: "Basic Search & Filters", free: true, pro: true, premium: true },
                      { feature: "PDF Documents", free: true, pro: true, premium: true },
                      { feature: "Telegram Notifications", free: false, pro: true, premium: true },
                      { feature: "Category Subscriptions", free: false, pro: true, premium: true },
                      { feature: "Advanced Filters", free: false, pro: true, premium: true },
                      { feature: "Unlimited Views", free: false, pro: true, premium: true },
                      { feature: "Email Alerts", free: false, pro: true, premium: true },
                      { feature: "Export to Excel/PDF", free: false, pro: true, premium: true },
                      { feature: "Full AI Analysis", free: false, pro: false, premium: true },
                      { feature: "Opportunity Scoring", free: false, pro: false, premium: true },
                      { feature: "Risk Assessment", free: false, pro: false, premium: true },
                      { feature: "API Access", free: false, pro: false, premium: true },
                      { feature: "Team Collaboration", free: false, pro: false, premium: true },
                      { feature: "Dedicated Support", free: false, pro: false, premium: true }
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="p-4 font-medium">{row.feature}</td>
                        <td className="p-4 text-center">
                          {row.free ? (
                            <Check className="w-5 h-5 text-accent mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">–</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {row.pro ? (
                            <Check className="w-5 h-5 text-primary mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">–</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {row.premium ? (
                            <Check className="w-5 h-5 text-accent mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">–</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of professionals who trust MosTender for their business opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="gradient-primary text-white border-0">
              <Link to="/auth/register">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">
                Contact Sales
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
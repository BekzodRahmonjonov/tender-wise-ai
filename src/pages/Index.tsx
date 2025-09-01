import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Brain, 
  MessageCircle, 
  Filter, 
  Zap, 
  Shield, 
  Clock, 
  Target,
  TrendingUp,
  Users,
  ArrowRight,
  Check
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { categories, mockTenders } from "@/data/mockData";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const benefits = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Extract key requirements, keywords, and fit scores from tender documents automatically."
    },
    {
      icon: MessageCircle,
      title: "Telegram Notifications",
      description: "Get instant alerts for relevant tenders in your categories. Never miss an opportunity."
    },
    {
      icon: Filter,
      title: "Smart Filtering",
      description: "Advanced filters by category, budget, deadline, and source. Find exactly what you need."
    },
    {
      icon: Zap,
      title: "Real-time Monitoring",
      description: "Automated tracking of multiple tender sources with instant updates and notifications."
    },
    {
      icon: Shield,
      title: "Professional Grade",
      description: "Enterprise-level reliability and security for business-critical tender monitoring."
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Reduce manual tender searching from hours to minutes with intelligent automation."
    }
  ];

  const stats = [
    { label: "Active Tenders", value: "1,247", icon: Target },
    { label: "Categories Monitored", value: "15+", icon: Filter },
    { label: "Success Rate", value: "94%", icon: TrendingUp },
    { label: "Active Users", value: "2,800+", icon: Users }
  ];

  const plans = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      features: [
        "View tender listings",
        "Basic search and filters",
        "Limited AI insights",
        "PDF document preview"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "49,000",
      period: "month",
      features: [
        "Everything in Free",
        "Telegram notifications", 
        "Category subscriptions",
        "Advanced filters",
        "Priority support"
      ],
      cta: "Start Pro Trial",
      popular: true
    },
    {
      name: "Premium",
      price: "99,000",
      period: "month",
      features: [
        "Everything in Pro",
        "Full AI analysis",
        "Custom alerts",
        "API access",
        "Dedicated support"
      ],
      cta: "Go Premium",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fade-in">
              <Badge className="mb-6 gradient-primary text-white border-0">
                🚀 New: AI-Powered Tender Analysis
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="gradient-text">Smart Tender</span><br />
                Monitoring Platform
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Get relevant opportunities — automated, accurate, and on time.
                <br />Monitor tenders across multiple sources with AI-powered insights.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="animate-slide-up max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search tenders... e.g., 'IT services', 'healthcare', 'construction'"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg rounded-2xl border-2 focus:border-primary shadow-lg"
                />
                <Button 
                  size="lg" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 gradient-primary text-white border-0 px-8"
                  asChild
                >
                  <Link to="/tenders">
                    Search Tenders
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
              <Button size="lg" asChild className="gradient-primary text-white border-0 px-8 py-6 text-lg">
                <Link to="/tenders">
                  View All Tenders
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="px-8 py-6 text-lg">
                <Link to="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-3">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why Choose <span className="gradient-text">MosTender</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional-grade tender monitoring with intelligent automation and real-time insights.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular Categories
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Monitor tenders across diverse industries and sectors
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.slice(0, 8).map((category) => (
              <Badge 
                key={category} 
                variant="secondary" 
                className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
              >
                {category}
              </Badge>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline" asChild>
              <Link to="/categories">
                View All Categories
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Choose Your <span className="gradient-text">Plan</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free, upgrade when you need more features
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative border-2 ${
                  plan.popular 
                    ? "border-primary shadow-glow" 
                    : "border-border hover:border-primary/20"
                } transition-all duration-300`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 gradient-primary text-white border-0">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                    {plan.price !== "0" && <span className="text-sm text-muted-foreground block">UZS</span>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  <Button 
                    className={`w-full mt-6 ${
                      plan.popular 
                        ? "gradient-primary text-white border-0" 
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link to="/pricing">
                      {plan.cta}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="gradient-text">Users Say</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of professionals who trust MosTender
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Bekzod Karimov",
                role: "IT Director",
                company: "TechSolutions LLC",
                content: "MosTender's AI insights helped us identify the perfect tender. We won a 2B UZS contract last month!",
                avatar: "BK"
              },
              {
                name: "Aziza Nazarova", 
                role: "Business Development",
                company: "BuildCorp",
                content: "Telegram notifications are game-changing. We never miss opportunities in construction anymore.",
                avatar: "AN"
              },
              {
                name: "Farrux Aminov",
                role: "Marketing Agency Owner", 
                company: "Digital Impact",
                content: "The filtering system saves us hours of research. Found 3 relevant tenders in our first week.",
                avatar: "FA"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-2 hover:border-primary/20 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about MosTender
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "How are tenders collected?",
                a: "We monitor official government portals, public procurement sites, and verified sources across Uzbekistan 24/7 using automated systems."
              },
              {
                q: "How does AI analysis work?",
                a: "Our AI analyzes tender documents, extracts key requirements, calculates fit scores based on your profile, and identifies opportunities and risks."
              },
              {
                q: "What payment methods are supported?", 
                a: "We accept Click, Payme, and bank transfers. All payments are processed securely with instant activation."
              },
              {
                q: "Can I try before buying?",
                a: "Yes! We offer a 14-day free trial for Pro and Premium plans with full access to all features."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    {faq.q}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

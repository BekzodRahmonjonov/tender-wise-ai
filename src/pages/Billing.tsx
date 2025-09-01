import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CreditCard, 
  Crown, 
  Calendar, 
  Download, 
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Zap,
  Star
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { mockUser } from "@/data/mockData";

export default function Billing() {
  const currentPlan = mockUser.plan;

  const planFeatures = {
    free: [
      "View tender listings",
      "Basic search and filters", 
      "Limited AI insights",
      "PDF document access"
    ],
    pro: [
      "Everything in Free",
      "Telegram notifications",
      "Category subscriptions", 
      "Advanced filters",
      "Priority support"
    ],
    premium: [
      "Everything in Pro",
      "Full AI analysis",
      "Custom alert criteria",
      "API access", 
      "Dedicated support"
    ]
  };

  const mockInvoices = [
    {
      id: "INV-001",
      date: "2025-08-01",
      amount: "49,000",
      status: "paid",
      plan: "Pro"
    },
    {
      id: "INV-002", 
      date: "2025-07-01",
      amount: "49,000",
      status: "paid",
      plan: "Pro"
    },
    {
      id: "INV-003",
      date: "2025-06-01", 
      amount: "49,000",
      status: "paid",
      plan: "Pro"
    }
  ];

  const paymentMethods = [
    {
      type: "Click",
      number: "**** 1234",
      default: true
    },
    {
      type: "Payme", 
      number: "**** 5678",
      default: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Billing & <span className="gradient-text">Subscription</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your subscription, payment methods, and billing history
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Plan */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-primary" />
                  Current Plan
                  <Badge className={
                    currentPlan === 'free' ? 'bg-muted text-muted-foreground' :
                    currentPlan === 'pro' ? 'bg-primary text-primary-foreground' :
                    'gradient-accent text-white'
                  }>
                    {currentPlan.toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {currentPlan === 'free' ? 'Free' : 
                       currentPlan === 'pro' ? '49,000 UZS' : '99,000 UZS'}
                    </div>
                    {currentPlan !== 'free' && (
                      <>
                        <div className="text-muted-foreground mb-4">per month</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>Next billing: September 1, 2025</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Current Features</h4>
                    <ul className="space-y-2 text-sm">
                      {planFeatures[currentPlan].map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {currentPlan !== 'premium' && (
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-semibold mb-3">Upgrade Options</h4>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {currentPlan === 'free' && (
                        <Button className="gradient-primary text-white border-0" asChild>
                          <Link to="/pricing">
                            <Star className="w-4 h-4 mr-2" />
                            Upgrade to Pro
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      )}
                      <Button variant="outline" asChild>
                        <Link to="/pricing">
                          <Zap className="w-4 h-4 mr-2" />
                          Upgrade to Premium
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Methods */}
            {currentPlan !== 'free' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentMethods.map((method, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                            <CreditCard className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-medium">{method.type}</div>
                            <div className="text-sm text-muted-foreground">{method.number}</div>
                          </div>
                          {method.default && (
                            <Badge variant="secondary">Default</Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">Remove</Button>
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Billing History */}
            {currentPlan !== 'free' && (
              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockInvoices.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <div className="font-medium">{invoice.id}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(invoice.date).toLocaleDateString('uz-UZ', {
                              year: 'numeric',
                              month: 'long', 
                              day: 'numeric'
                            })} • {invoice.plan} Plan
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-semibold">{invoice.amount} UZS</div>
                            <div className="flex items-center gap-1 text-sm">
                              <CheckCircle className="w-4 h-4 text-accent" />
                              <span className="text-accent">Paid</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Usage Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Usage This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Tender Views</span>
                    <span>143 / {currentPlan === 'free' ? '150' : '∞'}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{width: '95%'}}></div>
                  </div>
                </div>

                {currentPlan !== 'free' && (
                  <>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Notifications Sent</span>
                        <span>28</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full" style={{width: '60%'}}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Categories Monitored</span>
                        <span>{mockUser.categories.length}</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  Contact Support
                </Button>
                <Button className="w-full" variant="outline">
                  View Documentation
                </Button>
                <Button className="w-full" variant="outline">
                  Billing FAQ
                </Button>
              </CardContent>
            </Card>

            {/* Plan Comparison */}
            {currentPlan !== 'premium' && (
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-primary">
                    {currentPlan === 'free' ? 'Upgrade to Pro' : 'Upgrade to Premium'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {currentPlan === 'free' 
                      ? 'Get notifications and advanced features'
                      : 'Unlock full AI analysis and premium features'
                    }
                  </p>
                  <Button className="w-full gradient-primary text-white border-0" asChild>
                    <Link to="/pricing">
                      View Plans
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
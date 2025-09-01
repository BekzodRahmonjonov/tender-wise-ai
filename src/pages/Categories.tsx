import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Crown, 
  Check, 
  Bell,
  MessageCircle,
  Zap,
  ArrowRight,
  Plus
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { categories, mockUser } from "@/data/mockData";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(mockUser.categories);

  const filteredCategories = categories.filter(category => 
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const needsUpgrade = mockUser.plan === 'free' && selectedCategories.length > 0;

  const PaywallModal = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="gradient-primary text-white border-0">
          <Bell className="w-4 h-4 mr-2" />
          Subscribe to {selectedCategories.length} {selectedCategories.length === 1 ? 'Category' : 'Categories'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-primary" />
            Upgrade Required
          </DialogTitle>
          <DialogDescription>
            Category notifications are available with Pro and Premium plans.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <h4 className="font-semibold text-primary mb-2">Pro Plan - 49,000 UZS/month</h4>
            <ul className="text-sm space-y-1">
              <li className="flex items-center gap-2">
                <Check className="w-3 h-3 text-accent" />
                Telegram notifications
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3 h-3 text-accent" />
                Category subscriptions
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3 h-3 text-accent" />
                Advanced filters
              </li>
            </ul>
          </div>
          
          <div className="flex gap-2">
            <Button asChild className="flex-1 gradient-primary text-white border-0">
              <Link to="/pricing">
                Upgrade to Pro
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" className="flex-1">
              Learn More
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your <span className="gradient-text">Categories</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select the categories you're interested in and get instant notifications when new tenders are published.
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Selected Categories */}
        {selectedCategories.length > 0 && (
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Selected Categories ({selectedCategories.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategories.map((category) => (
                  <Badge
                    key={category}
                    className="bg-primary text-primary-foreground cursor-pointer hover:bg-primary/80"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                    <button className="ml-2 hover:text-primary-foreground/80">×</button>
                  </Badge>
                ))}
              </div>
              
              <div className="text-center">
                {needsUpgrade ? (
                  <PaywallModal />
                ) : (
                  <Button size="lg" className="gradient-primary text-white border-0">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Update Notifications
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Top Categories This Week */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            🔥 <span className="gradient-text">Trending This Week</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { name: "IT Services", count: 24 },
              { name: "Construction", count: 18 },
              { name: "Healthcare", count: 12 },
              { name: "Education", count: 9 }
            ].map((trending) => (
              <Card key={trending.name} className="border-2 hover:border-primary/20 transition-all">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">{trending.count}</div>
                  <div className="text-sm text-muted-foreground">{trending.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCategories.map((category, index) => {
            const activeTenders = Math.floor(Math.random() * 20) + 5;
            const subcategories = [
              ["Web Development", "System Administration", "Cybersecurity"],
              ["Infrastructure", "Architecture", "Engineering"],
              ["Training Programs", "Curriculum Development", "E-learning"],
              ["Medical Equipment", "Pharmaceutical", "Healthcare IT"],
              ["Digital Marketing", "Brand Strategy", "PR Services"],
              ["Power Systems", "Renewable Energy", "Grid Infrastructure"],
              ["Logistics", "Fleet Management", "Supply Chain"],
              ["Equipment Maintenance", "Technical Support", "Installation"]
            ][index] || ["General Services", "Consulting", "Support"];
            const isSelected = selectedCategories.includes(category);

            return (
              <Card 
                key={category}
                className={`cursor-pointer border-2 transition-all duration-300 hover:scale-105 ${
                  isSelected
                    ? "border-primary shadow-glow bg-primary/5"
                    : "border-border hover:border-primary/20 hover:shadow-lg"
                }`}
                onClick={() => toggleCategory(category)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    isSelected
                      ? "gradient-primary text-white"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    <span className="text-2xl">
                      {["💻", "🏗️", "📚", "🏥", "📢", "⚡", "🚛", "🔧"][index] || "📋"}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{category}</CardTitle>
                  <Badge variant="secondary" className="mx-auto">
                    {activeTenders} active tenders
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="mb-4">
                    <div className="text-xs text-muted-foreground mb-2">Popular subcategories:</div>
                    <div className="flex flex-wrap gap-1">
                      {subcategories.slice(0, 3).map((sub) => (
                        <Badge key={sub} variant="outline" className="text-xs">
                          {sub}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button 
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    className={isSelected ? "gradient-primary text-white border-0 w-full" : "w-full"}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Subscribed
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Subscribe
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No categories found</h3>
              <p className="text-muted-foreground mb-4">
                Try a different search term
              </p>
              <Button onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}

        {/* How It Works */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-center">How Category Notifications Work</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-2">Select Categories</h4>
                <p className="text-sm text-muted-foreground">
                  Choose the categories that match your business interests
                </p>
              </div>
              <div>
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-2">Connect Telegram</h4>
                <p className="text-sm text-muted-foreground">
                  Link your Telegram account to receive instant notifications
                </p>
              </div>
              <div>
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-2">Get Notified</h4>
                <p className="text-sm text-muted-foreground">
                  Receive instant alerts when relevant tenders are published
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
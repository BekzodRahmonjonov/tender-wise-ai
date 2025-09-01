import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  MessageCircle, 
  Bell, 
  Globe, 
  Settings, 
  Crown,
  ExternalLink,
  Check,
  X
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { mockUser } from "@/data/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Account() {
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);
  const [locale, setLocale] = useState(mockUser.locale);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [telegramNotifications, setTelegramNotifications] = useState(true);

  const languages = [
    { code: 'uz', name: 'O\'zbekcha', flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const getPlanBadge = () => {
    const colors = {
      free: "bg-muted text-muted-foreground",
      pro: "bg-primary text-primary-foreground", 
      premium: "gradient-accent text-white"
    };
    
    return (
      <Badge className={colors[mockUser.plan]}>
        {mockUser.plan.toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Account <span className="gradient-text">Settings</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your profile, preferences, and notification settings
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Full Name</label>
                    <Input 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email Address</label>
                    <Input 
                      type="email"
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Language Preference</label>
                  <Select value={locale} onValueChange={(value) => setLocale(value as 'uz' | 'ru' | 'en')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <span className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button className="gradient-primary text-white border-0">
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Telegram Integration */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Telegram Integration
                  {mockUser.telegram.connected && (
                    <Badge variant="secondary" className="ml-auto">
                      <Check className="w-3 h-3 mr-1" />
                      Connected
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {mockUser.telegram.connected ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
                      <MessageCircle className="w-5 h-5 text-accent" />
                      <div>
                        <div className="font-medium">Connected to Telegram</div>
                        <div className="text-sm text-muted-foreground">
                          {mockUser.telegram.username || 'Username not available'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline">
                        Test Notification
                      </Button>
                      <Button variant="destructive">
                        <X className="w-4 h-4 mr-2" />
                        Disconnect
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Connect your Telegram account to receive instant notifications about new tenders in your categories.
                    </p>
                    
                    <Button className="gradient-primary text-white border-0">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Connect Telegram
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                    
                    <div className="text-xs text-muted-foreground">
                      You'll be redirected to Telegram to authorize the connection
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive tender alerts via email
                    </div>
                  </div>
                  <Switch 
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Telegram Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Instant alerts via Telegram bot
                    </div>
                  </div>
                  <Switch 
                    checked={telegramNotifications}
                    onCheckedChange={setTelegramNotifications}
                    disabled={!mockUser.telegram.connected}
                  />
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Notification Frequency</h4>
                  <Select defaultValue="instant">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instant">Instant</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Subscribed Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {mockUser.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" asChild>
                  <Link to="/categories">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Categories
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Plan Information */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-primary" />
                  Current Plan
                  {getPlanBadge()}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {mockUser.plan === 'free' ? 'Free' : mockUser.plan === 'pro' ? '49,000 UZS' : '99,000 UZS'}
                  </div>
                  {mockUser.plan !== 'free' && (
                    <div className="text-sm text-muted-foreground">per month</div>
                  )}
                </div>

                {mockUser.plan === 'free' && (
                  <div className="space-y-2">
                    <Button className="w-full gradient-primary text-white border-0" asChild>
                      <Link to="/pricing">
                        Upgrade to Pro
                      </Link>
                    </Button>
                    <div className="text-xs text-center text-muted-foreground">
                      Get notifications and advanced features
                    </div>
                  </div>
                )}

                {mockUser.plan === 'pro' && (
                  <div className="space-y-2">
                    <Button className="w-full" variant="outline" asChild>
                      <Link to="/pricing">
                        Upgrade to Premium
                      </Link>
                    </Button>
                    <Button className="w-full" variant="outline" asChild>
                      <Link to="/billing">
                        Manage Billing
                      </Link>
                    </Button>
                  </div>
                )}

                {mockUser.plan === 'premium' && (
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/billing">
                      Manage Billing
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/tenders">
                    View Tenders
                  </Link>
                </Button>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/categories">
                    Manage Categories
                  </Link>
                </Button>
                <Button className="w-full" variant="outline">
                  Download Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
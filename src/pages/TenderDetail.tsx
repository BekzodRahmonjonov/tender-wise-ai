import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft,
  ExternalLink,
  Download,
  Bookmark,
  Share2,
  Building,
  Calendar,
  DollarSign,
  FileText,
  Brain,
  Star,
  Zap,
  Lock,
  Crown,
  Eye,
  Bell,
  Hash,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  AlertCircle
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CountdownPill } from "@/components/ui/CountdownPill";
import { mockTenders, mockUser } from "@/data/mockData";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function TenderDetail() {
  const { id } = useParams();
  const tender = mockTenders.find(t => t.id === id);

  if (!tender) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Tender Not Found</h1>
          <Button asChild>
            <Link to="/tenders">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tenders
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + ' ' + currency;
  };

  const getAIScoreColor = (score: number) => {
    if (score >= 80) return "text-accent";
    if (score >= 60) return "text-primary";
    return "text-muted-foreground";
  };

  const isProFeature = (feature: string) => {
    return mockUser.plan === 'free' && ['full_ai', 'notifications'].includes(feature);
  };

  const isPremiumFeature = (feature: string) => {
    return mockUser.plan !== 'premium' && ['full_ai'].includes(feature);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/tenders" className="hover:text-foreground transition-colors">
            Tenders
          </Link>
          <span>/</span>
          <span className="text-foreground">{tender.title}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
          <div className="flex-1">
            <div className="flex items-start gap-4 mb-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/tenders">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold mb-3 line-clamp-3">
                  {tender.title}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <Building className="w-4 h-4" />
                  <span>{tender.buyer}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tender.category.map((cat) => (
                    <Badge key={cat} variant="secondary">
                      {cat}
                    </Badge>
                  ))}
                  <Badge variant="outline">{tender.source}</Badge>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
            <CountdownPill deadline={tender.deadline} className="lg:self-end" />
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Key Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Budget</div>
                    <div className="text-2xl font-bold text-primary">
                      {formatCurrency(tender.budget, tender.currency)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Deadline</div>
                    <div className="text-lg font-semibold">
                      {new Date(tender.deadline).toLocaleDateString('uz-UZ', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Published</div>
                    <div className="text-lg font-semibold">
                      {new Date(tender.published_at).toLocaleDateString('uz-UZ', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tender.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Star className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                      <span className="text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tender.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm text-muted-foreground">{doc.size_mb} MB</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Apply Section */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Ready to Apply?</h3>
                  <p className="text-muted-foreground mb-4">
                    Make sure you meet all requirements before submitting your application.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button size="lg" className="gradient-primary text-white border-0">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Apply on Official Site
                    </Button>
                    <Button size="lg" variant="outline">
                      <Bookmark className="w-4 h-4 mr-2" />
                      Save for Later
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Insights */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  AI Analysis
                  <Badge variant="secondary" className="ml-auto">
                    {tender.ai_insights.confidence * 100}% confidence
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Fit Score */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-accent" />
                    Fit Score
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-muted rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500" 
                        style={{ width: `${tender.ai_insights.fit_score}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-xl gradient-text">{tender.ai_insights.fit_score}%</span>
                  </div>
                </div>

                {/* Keywords */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Hash className="w-4 h-4 text-primary" />
                    Key Terms
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tender.ai_insights.keywords.map((keyword) => (
                      <Badge key={keyword} className="gradient-primary text-white border-0">{keyword}</Badge>
                    ))}
                  </div>
                </div>

                {/* Opportunities - Premium Feature */}
                <div className="relative">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    Opportunities
                    <Badge className="bg-accent text-white ml-2">Premium</Badge>
                  </h4>
                  <div className="space-y-2 filter blur-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Strong alignment with your service portfolio</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Low competition based on requirements</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Budget range matches your typical projects</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button variant="outline" size="sm">
                      <Lock className="w-4 h-4 mr-2" />
                      Upgrade to View
                    </Button>
                  </div>
                </div>

                {/* Risks - Premium Feature */}
                <div className="relative">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    Risk Assessment
                    <Badge className="bg-accent text-white ml-2">Premium</Badge>
                  </h4>
                  <div className="space-y-2 filter blur-sm">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Tight deadline may require additional resources</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Complex certification requirements</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button variant="outline" size="sm">
                      <Lock className="w-4 h-4 mr-2" />
                      Upgrade to View
                    </Button>
                  </div>
                </div>
                
                {/* Summary */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Summary
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">{tender.ai_insights.summary}</p>
                </div>
                
                <Button className="w-full gradient-primary text-white border-0">
                  <Zap className="w-4 h-4 mr-2" />
                  Unlock Full AI Analysis - Go Premium
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Bell className="w-4 h-4 mr-2" />
                  Get Similar Alerts
                  {isProFeature('notifications') && (
                    <Badge variant="outline" className="ml-auto">Pro</Badge>
                  )}
                </Button>
                <Button className="w-full" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Proposal
                </Button>
                <Button className="w-full" variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share with Team
                </Button>
              </CardContent>
            </Card>

            {/* Related Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Related Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tender.category.map((cat) => (
                    <Link key={cat} to={`/tenders?category=${cat}`}>
                      <Badge variant="secondary" className="w-full justify-start hover:bg-primary hover:text-primary-foreground transition-colors">
                        {cat}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
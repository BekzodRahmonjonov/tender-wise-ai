import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  SlidersHorizontal,
  ExternalLink,
  Brain,
  Calendar,
  Building,
  DollarSign,
  Star,
  Bookmark,
  ChevronRight
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CountdownPill } from "@/components/ui/CountdownPill";
import { mockTenders, categories, sources } from "@/data/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Tenders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + ' ' + currency;
  };

  const getAIScoreColor = (score: number) => {
    if (score >= 80) return "text-accent";
    if (score >= 60) return "text-primary";
    return "text-muted-foreground";
  };

  const filteredTenders = mockTenders.filter(tender => {
    const matchesSearch = tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tender.buyer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || tender.category.includes(selectedCategory);
    const matchesSource = !selectedSource || tender.source === selectedSource;
    return matchesSearch && matchesCategory && matchesSource;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Active <span className="gradient-text">Tenders</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover and monitor relevant tender opportunities
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader className="pb-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search tenders by title, buyer, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </CardHeader>
          
          {/* Extended Filters */}
          {showFilters && (
            <CardContent className="pt-0 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Source</label>
                  <Select value={selectedSource} onValueChange={setSelectedSource}>
                    <SelectTrigger>
                      <SelectValue placeholder="All sources" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All sources</SelectItem>
                      {sources.map((source) => (
                        <SelectItem key={source} value={source}>
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Budget Range (UZS)</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any budget</SelectItem>
                      <SelectItem value="0-100000000">Under 100M</SelectItem>
                      <SelectItem value="100000000-500000000">100M - 500M</SelectItem>
                      <SelectItem value="500000000-1000000000">500M - 1B</SelectItem>
                      <SelectItem value="1000000000+">Over 1B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="closing-soon">Closing Soon</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("");
                    setSelectedSource("");
                    setSearchQuery("");
                  }}
                  className="flex-1"
                >
                  Clear All Filters
                </Button>
                <Button variant="outline" className="flex-1">
                  <Filter className="w-4 h-4 mr-2" />
                  Save Filter
                </Button>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-muted-foreground">
            Showing {filteredTenders.length} of {mockTenders.length} tenders
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select defaultValue="deadline">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deadline">Deadline</SelectItem>
                <SelectItem value="budget">Budget</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="fit_score">AI Fit Score</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tender Cards */}
        <div className="grid gap-6">
          {filteredTenders.map((tender) => (
            <Card key={tender.id} className="border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 hover:text-primary transition-colors">
                          <Link to={`/tenders/${tender.id}`} className="line-clamp-2">
                            {tender.title}
                          </Link>
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Building className="w-4 h-4" />
                          <span className="line-clamp-1">{tender.buyer}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tender.category.map((cat) => (
                        <Badge key={cat} variant="secondary" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                      <Badge variant="outline" className="text-xs">
                        {tender.source}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Right side info */}
                  <div className="lg:text-right space-y-2">
                    <CountdownPill deadline={tender.deadline} />
                    <div className="text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Published {new Date(tender.published_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Budget */}
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="font-semibold text-lg">
                        {formatCurrency(tender.budget, tender.currency)}
                      </div>
                      <div className="text-xs text-muted-foreground">Budget</div>
                    </div>
                  </div>
                  
                  {/* AI Insights */}
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-primary" />
                    <div>
                      <div className={`font-semibold text-lg ${getAIScoreColor(tender.ai_insights.fit_score)}`}>
                        {tender.ai_insights.fit_score}%
                      </div>
                      <div className="text-xs text-muted-foreground">AI Fit Score</div>
                    </div>
                  </div>
                  
                  {/* Keywords */}
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-accent" />
                    <div>
                      <div className="text-sm font-medium line-clamp-1">
                        {tender.ai_insights.keywords.slice(0, 2).join(", ")}
                      </div>
                      <div className="text-xs text-muted-foreground">Top Keywords</div>
                    </div>
                  </div>
                </div>
                
                {/* Summary */}
                <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">AI Summary:</div>
                  <p className="text-sm line-clamp-2">{tender.ai_insights.summary}</p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <Button asChild className="flex-1">
                    <Link to={`/tenders/${tender.id}`}>
                      View Details
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Apply External
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTenders.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No tenders found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or clearing filters
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("");
                  setSelectedSource("");
                }}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Load More */}
        {filteredTenders.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Tenders
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
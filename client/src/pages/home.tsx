import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MapPin, Phone, Mail, Star, Utensils, Leaf, Heart, Wheat, GlassWater, Cookie, Soup, Menu, X } from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="font-sans bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/95 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">Z</span>
              </div>
              <span className="font-bold text-xl text-foreground">Zawadi Restaurant</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-foreground hover:text-primary transition-colors"
                data-testid="nav-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('menu')} 
                className="text-foreground hover:text-primary transition-colors"
                data-testid="nav-menu"
              >
                Menu
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-foreground hover:text-primary transition-colors"
                data-testid="nav-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-foreground hover:text-primary transition-colors"
                data-testid="nav-contact"
              >
                Contact
              </button>
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-testid="button-order-now"
              >
                Order Now
              </Button>
            </div>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="md:hidden" data-testid="button-mobile-menu">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-6 mt-8">
                  <button 
                    onClick={() => scrollToSection('home')} 
                    className="text-lg text-foreground hover:text-primary transition-colors text-left"
                    data-testid="nav-mobile-home"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => scrollToSection('menu')} 
                    className="text-lg text-foreground hover:text-primary transition-colors text-left"
                    data-testid="nav-mobile-menu"
                  >
                    Menu
                  </button>
                  <button 
                    onClick={() => scrollToSection('about')} 
                    className="text-lg text-foreground hover:text-primary transition-colors text-left"
                    data-testid="nav-mobile-about"
                  >
                    About
                  </button>
                  <button 
                    onClick={() => scrollToSection('contact')} 
                    className="text-lg text-foreground hover:text-primary transition-colors text-left"
                    data-testid="nav-mobile-contact"
                  >
                    Contact
                  </button>
                  <Button 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                    data-testid="button-mobile-order-now"
                  >
                    Order Now
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center palm-pattern">
        <div className="absolute inset-0 gradient-overlay"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-primary font-bold text-4xl">Z</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" data-testid="text-hero-title">
              Zawadi Restaurant
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
              Authentic African Flavors in the Heart of Bloomington
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-primary text-primary-foreground px-8 py-4 text-lg hover:bg-primary/90 shadow-lg"
                onClick={() => scrollToSection('menu')}
                data-testid="button-view-menu"
              >
                <Utensils className="mr-2 h-5 w-5" />
                View Menu
              </Button>
              <Button 
                variant="outline"
                className="bg-white/20 text-white border-2 border-white/30 px-8 py-4 text-lg hover:bg-white/30 backdrop-blur"
                data-testid="button-call-now"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call (612) 284-0880
              </Button>
            </div>
          </div>
        </div>
        {/* Floating tropical leaves decoration */}
        <div className="absolute top-20 left-10 text-secondary/20 text-6xl transform rotate-12">
          <Leaf />
        </div>
        <div className="absolute bottom-32 right-16 text-primary/20 text-4xl transform -rotate-45">
          <Leaf />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6" data-testid="text-about-title">
                Part of Zawadi Center
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed" data-testid="text-about-description">
                At Zawadi Restaurant, we're proud to be part of the Zawadi Center family, where distinctive spaces redefine excellence. Our restaurant brings authentic African flavors to a modern, welcoming environment that harmoniously integrates dining, community, and cultural celebration.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                From our signature build-a-bowl concept to traditional favorites like sambusas and plantain dishes, every meal is crafted with care using authentic ingredients and time-honored recipes.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <Card className="text-center p-4 shadow-sm">
                  <CardContent className="pt-4">
                    <Heart className="text-primary text-2xl mb-2 mx-auto" />
                    <h3 className="font-semibold text-foreground">Authentic</h3>
                    <p className="text-sm text-muted-foreground">Traditional recipes</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-4 shadow-sm">
                  <CardContent className="pt-4">
                    <Leaf className="text-secondary text-2xl mb-2 mx-auto" />
                    <h3 className="font-semibold text-foreground">Fresh</h3>
                    <p className="text-sm text-muted-foreground">Quality ingredients</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Zawadi Restaurant interior" 
                  className="w-full h-96 object-cover" 
                  data-testid="img-restaurant-interior"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <div className="text-center text-primary-foreground">
                  <div className="text-2xl font-bold" data-testid="text-rating">4.8</div>
                  <div className="text-sm">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-menu-title">
              Our Menu
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover authentic African flavors with our carefully crafted dishes, from customizable bowls to traditional favorites
            </p>
          </div>

          {/* Build-A-Bowl Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center">
                <Soup className="text-primary mr-3" />
                Build-A-Bowl
              </h3>
              <p className="text-muted-foreground">Create your perfect meal with our fresh bases, proteins, and toppings</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <Card className="food-card shadow-lg overflow-hidden">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-card-foreground mb-4">Base</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Coconut Rice</li>
                    <li>• Saffron Rice</li>
                    <li>• Black Beans</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="food-card shadow-lg overflow-hidden">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-card-foreground mb-4">Protein</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Grilled Chicken</li>
                    <li>• Somac Chicken</li>
                    <li>• Sirloin Steak</li>
                    <li>• Moroccan Cauliflower <span className="text-secondary">(V)</span></li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="food-card shadow-lg overflow-hidden">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-card-foreground mb-4">Toppings + Sauce</h4>
                  <p className="text-muted-foreground">Choose Unlimited!</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-accent text-accent-foreground px-8 py-4 rounded-full text-center">
                <div className="font-semibold" data-testid="text-veggie-bowl">Veggie Bowl</div>
                <div className="text-2xl font-bold" data-testid="price-veggie-bowl">$12.00</div>
              </div>
              <div className="bg-accent text-accent-foreground px-8 py-4 rounded-full text-center">
                <div className="font-semibold" data-testid="text-chicken-bowl">Chicken Bowl</div>
                <div className="text-2xl font-bold" data-testid="price-chicken-bowl">$13.00</div>
              </div>
              <div className="bg-accent text-accent-foreground px-8 py-4 rounded-full text-center">
                <div className="font-semibold" data-testid="text-steak-bowl">Steak Bowl</div>
                <div className="text-2xl font-bold" data-testid="price-steak-bowl">$15.75</div>
              </div>
            </div>
          </div>

          {/* Favorites Section */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-foreground mb-12 text-center flex items-center justify-center">
              <Star className="text-primary mr-3" />
              Favorites
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="food-card shadow-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300" 
                  alt="Plantain chips with guacamole" 
                  className="w-full h-48 object-cover" 
                />
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-card-foreground mb-2" data-testid="text-plantain-chips">
                    Plantain Chips + Guac
                  </h4>
                  <p className="text-muted-foreground mb-4">Crispy plantain chips served with fresh, creamy guacamole as a light snack</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Regular</span>
                    <span className="text-2xl font-bold text-primary" data-testid="price-plantain-chips">$4.95</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="food-card shadow-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300" 
                  alt="Classic sambusas" 
                  className="w-full h-48 object-cover" 
                />
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-card-foreground mb-2" data-testid="text-sambusa">
                    Classic Sambusa
                  </h4>
                  <p className="text-muted-foreground mb-4">Our sambusas are filled with a simple mix and cooked to a crisp, golden finish</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Beef</span>
                    <span className="text-2xl font-bold text-primary" data-testid="price-sambusa">$2.55 ea.</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="food-card shadow-lg overflow-hidden">
                <img 
                  src="https://cdn.pixabay.com/photo/2020/05/11/15/06/quesadilla-5158087_1280.jpg" 
                  alt="Grilled quesadilla" 
                  className="w-full h-48 object-cover" 
                />
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-card-foreground mb-2" data-testid="text-quesadilla">
                    Grilled Quesadilla
                  </h4>
                  <p className="text-muted-foreground mb-4">Our 3 cheese Grilled Quesadillas combine fresh fillings with fresh vegetables</p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-sm text-muted-foreground">Cheese</div>
                      <div className="font-bold text-primary" data-testid="price-quesadilla-cheese">$11.00</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Chicken</div>
                      <div className="font-bold text-primary" data-testid="price-quesadilla-chicken">$12.25</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Steak</div>
                      <div className="font-bold text-primary" data-testid="price-quesadilla-steak">$15.00</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sides & Beverages Section */}
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            {/* Sides */}
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-8 flex items-center">
                <Wheat className="text-primary mr-3" />
                Sides
              </h3>
              
              <div className="space-y-6">
                <Card className="p-4 shadow-sm">
                  <CardContent className="p-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-card-foreground" data-testid="text-seasoned-fries">Seasoned Fries</h4>
                        <p className="text-sm text-muted-foreground">Crispy golden fries with a salty crunch</p>
                      </div>
                      <span className="text-xl font-bold text-primary" data-testid="price-seasoned-fries">$6.00</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="p-4 shadow-sm">
                  <CardContent className="p-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-card-foreground" data-testid="text-sweet-potato-fries">Sweet Potato Fries</h4>
                        <p className="text-sm text-muted-foreground">Crispy sweet fries with a caramelized touch</p>
                      </div>
                      <span className="text-xl font-bold text-primary" data-testid="price-sweet-potato-fries">$6.00</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="p-4 shadow-sm">
                  <CardContent className="p-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-card-foreground" data-testid="text-plantains">Plantains</h4>
                        <p className="text-sm text-muted-foreground">Tender fried plantains with a sweet finish</p>
                      </div>
                      <span className="text-xl font-bold text-primary" data-testid="price-plantains">$6.25</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="p-4 shadow-sm">
                  <CardContent className="p-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-card-foreground" data-testid="text-buffalo-cauliflower">Buffalo Cauliflower</h4>
                        <p className="text-sm text-muted-foreground">Spicy buffalo cauliflower with a tangy kick</p>
                      </div>
                      <span className="text-xl font-bold text-primary" data-testid="price-buffalo-cauliflower">$7.25</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="p-4 shadow-sm">
                  <CardContent className="p-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-card-foreground" data-testid="text-lentil-soup">Lentil Soup</h4>
                        <p className="text-sm text-muted-foreground">Hearty lentil soup with warm, spiced comfort</p>
                      </div>
                      <span className="text-xl font-bold text-primary" data-testid="price-lentil-soup">$8.00</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Beverages */}
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-8 flex items-center">
                <GlassWater className="text-primary mr-3" />
                Beverages
              </h3>
              
              <div className="space-y-6">
                <Card className="p-4 shadow-sm">
                  <CardContent className="p-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-card-foreground" data-testid="text-house-drinks">House-made Drinks</h4>
                        <p className="text-sm text-muted-foreground">Fresh, artisanal beverages</p>
                      </div>
                      <span className="text-xl font-bold text-primary" data-testid="price-house-drinks">$3.95</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="p-4 shadow-sm">
                  <CardContent className="p-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-card-foreground" data-testid="text-fountain-drinks">Fountain Drinks</h4>
                        <p className="text-sm text-muted-foreground">Classic soft drinks</p>
                      </div>
                      <span className="text-xl font-bold text-primary" data-testid="price-fountain-drinks">$1.75</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Desserts Section */}
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-8 text-center flex items-center justify-center">
              <Cookie className="text-primary mr-3" />
              Desserts
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="food-card shadow-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300" 
                  alt="Small donuts" 
                  className="w-full h-48 object-cover" 
                />
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-card-foreground mb-2" data-testid="text-small-donuts">
                    Small Donuts
                  </h4>
                  <p className="text-muted-foreground mb-4">Freshly fried Somali donuts served with vanilla ice cream dip on a bed of berries</p>
                  <div className="text-center">
                    <span className="text-sm text-muted-foreground">5-piece</span>
                    <div className="text-2xl font-bold text-primary" data-testid="price-small-donuts">$7.25</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="food-card shadow-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300" 
                  alt="Fresh fruit bowl" 
                  className="w-full h-48 object-cover" 
                />
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-card-foreground mb-2" data-testid="text-fruit-bowl">
                    Fruit Bowl
                  </h4>
                  <p className="text-muted-foreground mb-4">Chilled fruit bowl with cucumbers, pineapple, and watermelon for a refreshing bite</p>
                  <div className="flex justify-between">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Solo</div>
                      <div className="text-xl font-bold text-primary" data-testid="price-fruit-bowl-solo">$6.95</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Twin</div>
                      <div className="text-xl font-bold text-primary" data-testid="price-fruit-bowl-twin">$6.95</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="food-card shadow-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300" 
                  alt="Monster cookies" 
                  className="w-full h-48 object-cover" 
                />
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-card-foreground mb-2" data-testid="text-monster-cookies">
                    Monster Cookies
                  </h4>
                  <p className="text-muted-foreground mb-4">Monster cookies loaded with oats, chocolate chips, and colorful candy for a bold, sweet treat</p>
                  <div className="flex justify-between">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">One</div>
                      <div className="text-xl font-bold text-primary" data-testid="price-monster-cookies-one">$3.15</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Three</div>
                      <div className="text-xl font-bold text-primary" data-testid="price-monster-cookies-three">$7.50</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-contact-title">
              Visit Us Today
            </h2>
            <p className="text-xl text-muted-foreground">Experience authentic African flavors at Zawadi Restaurant</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="shadow-lg p-8 text-center">
              <CardContent className="pt-0">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-primary-foreground text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Location</h3>
                <p className="text-muted-foreground" data-testid="text-address">
                  1701 American Blvd E<br />Bloomington, MN 55425
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg p-8 text-center">
              <CardContent className="pt-0">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="text-primary-foreground text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Phone</h3>
                <p className="text-muted-foreground" data-testid="text-phone">(612) 284-0880</p>
                <Button 
                  variant="link" 
                  className="mt-4 text-primary hover:text-primary/80"
                  data-testid="button-call-phone"
                >
                  Call Now
                </Button>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg p-8 text-center">
              <CardContent className="pt-0">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="text-primary-foreground text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Email</h3>
                <p className="text-muted-foreground" data-testid="text-email">info@zawadimn.com</p>
                <Button 
                  variant="link" 
                  className="mt-4 text-primary hover:text-primary/80"
                  data-testid="button-send-email"
                >
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-16 shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <CardContent className="p-8 lg:p-12">
                <h3 className="text-2xl font-semibold text-foreground mb-6">Hours of Operation</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Thursday</span>
                    <span className="font-medium text-foreground" data-testid="text-hours-weekday">11:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Friday - Saturday</span>
                    <span className="font-medium text-foreground" data-testid="text-hours-weekend">11:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium text-foreground" data-testid="text-hours-sunday">12:00 PM - 8:00 PM</span>
                  </div>
                </div>
                <div className="mt-8">
                  <Button 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
                    data-testid="button-get-directions"
                  >
                    <MapPin className="mr-2 h-5 w-5" />
                    Get Directions
                  </Button>
                </div>
              </CardContent>
              <div className="h-64 lg:h-auto bg-muted">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="text-4xl text-primary mb-4 mx-auto" />
                    <p className="text-muted-foreground">Interactive Map</p>
                    <p className="text-sm text-muted-foreground">Zawadi Restaurant Location</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">Z</span>
                </div>
                <span className="font-bold text-xl">Zawadi Restaurant</span>
              </div>
              <p className="text-background/80 mb-4 max-w-md">
                Part of Zawadi Center, bringing authentic African flavors to Bloomington with modern dining experiences and traditional hospitality.
              </p>
              <div className="flex space-x-4">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="w-10 h-10 bg-background/10 hover:bg-background/20 text-background"
                  data-testid="link-facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="w-10 h-10 bg-background/10 hover:bg-background/20 text-background"
                  data-testid="link-instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297z"/>
                  </svg>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="w-10 h-10 bg-background/10 hover:bg-background/20 text-background"
                  data-testid="link-twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-background/80">
                <li>
                  <button 
                    onClick={() => scrollToSection('menu')} 
                    className="hover:text-primary transition-colors"
                    data-testid="link-footer-menu"
                  >
                    Menu
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('about')} 
                    className="hover:text-primary transition-colors"
                    data-testid="link-footer-about"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('contact')} 
                    className="hover:text-primary transition-colors"
                    data-testid="link-footer-contact"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <a 
                    href="https://www.zawadicenter.com/" 
                    className="hover:text-primary transition-colors"
                    data-testid="link-zawadi-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Zawadi Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-background/80">
                <li className="flex items-center">
                  <Phone className="mr-2 text-primary h-4 w-4" />
                  (612) 284-0880
                </li>
                <li className="flex items-center">
                  <Mail className="mr-2 text-primary h-4 w-4" />
                  info@zawadimn.com
                </li>
                <li className="flex items-start">
                  <MapPin className="mr-2 text-primary h-4 w-4 mt-1" />
                  1701 American Blvd E<br />Bloomington, MN 55425
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
            <p>&copy; 2024 Zawadi Restaurant. All rights reserved. Part of Zawadi Center.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

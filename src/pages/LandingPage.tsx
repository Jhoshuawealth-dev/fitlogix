import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Building, 
  Calendar, 
  Check, 
  CheckCircle, 
  ChevronRight,
  Clock, 
  Dumbbell, 
  Facebook, 
  Globe, 
  Instagram, 
  LineChart, 
  MessageCircle, 
  MessageSquare, 
  Phone, 
  Send, 
  Star, 
  Timer, 
  Trophy, 
  Twitter, 
  UserPlus, 
  Users
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import Registration from '@/components/Registration';
import HeroBackgroundSlider from '@/components/HeroBackgroundSlider';
import Header from '@/components/Header';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Hero Section with Background Slider */}
      <section id="hero" className="relative py-32 flex items-center min-h-[600px] overflow-hidden">
        <HeroBackgroundSlider />
        <div className="container mx-auto px-4 max-w-6xl relative z-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in">
                Transform Your Workouts with FitLogix
              </h1>
              <p className="text-lg text-white/90 max-w-lg">
                Track your progress, time your workouts, and stay consistent—all in one app!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to={isAuthenticated ? "/dashboard" : "/login"}>
                  <Button size="lg" className="font-medium text-base group bg-fitblue-500 hover:bg-fitblue-600">
                    Get Started
                    <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="font-medium text-base bg-white/10 text-white border-white/20 hover:bg-white/20"
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to take your fitness to the next level
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-fitblue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Dumbbell className="h-6 w-6 text-fitblue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Workout Tracker</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Log your sets, reps, and weights with ease. Keep a detailed record of all your workouts.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-fitblue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Timer className="h-6 w-6 text-fitblue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Workout Timer</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Keep track of your rest periods and workout duration with our built-in timer.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-fitblue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-fitblue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Exercise Recommendations</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get tailored workout suggestions based on your goals and fitness level.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-fitblue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-fitblue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Visualize your progress with detailed charts and analytics to stay motivated.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-fitblue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-fitblue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dark Mode & Mobile-Friendly</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enjoy a sleek UI optimized for all devices with dark mode support for comfortable viewing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">About FitLogix</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our mission is to help everyone achieve their fitness goals
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <img 
                src="/lovable-uploads/573a9ea8-03f9-4239-b0ae-1a6198d64efb.png" 
                alt="Team working out" 
                className="w-full h-auto rounded-xl shadow-lg" 
              />
            </div>
            <div className="lg:w-1/2 space-y-6">
              <h3 className="text-2xl font-bold">Our Story</h3>
              <p className="text-gray-600 dark:text-gray-400">
                FitLogix was founded in 2022 by a team of fitness enthusiasts and technology experts who were frustrated with the lack of comprehensive, user-friendly workout tracking tools on the market.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Our team combines years of experience in personal training, sports science, and software development to create a platform that truly helps people achieve their fitness goals through data-driven insights and intuitive design.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-fitblue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-fitblue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Expert Team</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Certified trainers and developers</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-fitblue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Building className="h-6 w-6 text-fitblue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Growing Company</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">With over 100,000 active users</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-fitblue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Globe className="h-6 w-6 text-fitblue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Global Presence</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Available in over 20 countries</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-fitblue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="h-6 w-6 text-fitblue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Highly Rated</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">4.8/5 average user rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      {!isAuthenticated && (
        <section className="py-20 bg-white dark:bg-gray-800 border-t border-b border-gray-100 dark:border-gray-700">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold mb-4">Start Your Fitness Journey Today</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-xl">
                  Join thousands of users who have transformed their fitness with FitLogix. 
                  Create your free account and start tracking your progress right away.
                </p>
                <ul className="space-y-3">
                  {[
                    "Track unlimited workouts",
                    "Monitor your progress with detailed charts",
                    "Get personalized workout recommendations",
                    "Set goals and stay motivated"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Link to="/register">
                    <Button size="lg" className="font-medium text-base group">
                      Create Free Account
                      <UserPlus className="ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2">
                <img 
                  src="/images/registration-workout.jpg" 
                  alt="FitLogix App Dashboard" 
                  className="w-full h-auto rounded-xl shadow-lg object-cover" 
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Getting started with FitLogix is simple and straightforward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-fitblue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold mb-2">Sign Up & Set Goals</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create your account and tell us about your fitness goals to get personalized recommendations.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-fitblue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold mb-2">Log Workouts & Track Time</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Record your exercises, sets, reps, and weights. Use the built-in timer to optimize rest periods.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-fitblue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold mb-2">Monitor Progress & Stay Motivated</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track your improvement over time with visual charts and earn achievements to stay motivated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of satisfied users who have transformed their fitness journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                "FitLogix has completely changed how I track my workouts. The timer feature saves me from constantly checking my phone clock!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <img src="/images/testimonial-1.jpg" alt="Alex Johnson" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold">Alex Johnson</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Fitness Enthusiast</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                "The progress charts keep me motivated! I can visually see my improvement which makes all the difference in staying consistent."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <img src="/images/testimonial-2.jpg" alt="Sarah Williams" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Williams</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Marathon Runner</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                "As a personal trainer, I recommend FitLogix to all my clients. It's intuitive, comprehensive, and helps them stay accountable."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <img src="/images/testimonial-3.jpg" alt="Mike Peterson" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold">Mike Peterson</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Certified Personal Trainer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about FitLogix
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ Item 1 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Is FitLogix free to use?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes! FitLogix offers a comprehensive free plan with all essential features. We also offer premium options for advanced analytics and personalized training plans.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">How do I track my workouts?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Simply log in, select an exercise or create a custom one, add your sets, reps, and weights, and save your workout. The app automatically tracks your progress over time.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Can I use FitLogix on my phone?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Absolutely! FitLogix works on all devices. Our responsive design ensures a great experience whether you're on a desktop, tablet, or smartphone.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">How do I get personalized recommendations?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                When you sign up, you'll be asked about your fitness goals, experience level, and preferences. Based on this information, FitLogix will suggest appropriate workouts and exercises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" 
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" 
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" 
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" 
                    placeholder="Your message"
                  ></textarea>
                </div>
                <Button className="w-full">
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-fitblue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-5 w-5 text-fitblue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Email Us</h4>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">support@fitlogix.com</p>
                      <p className="text-gray-600 dark:text-gray-400">info@fitlogix.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-fitblue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-fitblue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Call Us</h4>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">+1 (555) 123-4567</p>
                      <p className="text-gray-600 dark:text-gray-400">Monday-Friday, 9am-5pm EST</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-fitblue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-fitblue-600 dark:text-blue-400 hover:bg-fitblue-200 transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-fitblue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-fitblue-600 dark:text-blue-400 hover:bg-fitblue-200 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-fitblue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-fitblue-600 dark:text-blue-400 hover:bg-fitblue-200 transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-fitblue-500 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Fitness Journey?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have improved their fitness with FitLogix.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="lg" variant="secondary" className="font-medium text-base group w-full sm:w-auto">
                  Go to Dashboard
                  <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button size="lg" variant="secondary" className="font-medium text-base group w-full sm:w-auto">
                    Sign Up Free
                    <UserPlus className="ml-1" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="font-medium text-base bg-white/10 text-white border-white/20 hover:bg-white/20 w-full sm:w-auto">
                    Log In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h2 className="text-2xl font-bold text-white mb-2">FitLogix</h2>
              <p className="text-sm">Your personal fitness companion</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 md:mb-0">
              <a href="#" className="hover:text-white transition-colors">Home</a>
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="mt-12 text-center text-sm">
            &copy; {new Date().getFullYear()} FitLogix. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;


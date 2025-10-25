import { Card } from "@/components/ui/card";
import { LineChart, Shield, FileText, Smartphone } from "lucide-react";

const features = [
  {
    icon: LineChart,
    title: "Track Daily Moods",
    description: "Monitor your emotional patterns with easy-to-use mood tracking tools designed for clinical accuracy.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data is secure and private. Track offline and sync when ready, with full control over your information.",
  },
  {
    icon: FileText,
    title: "Detailed Reports",
    description: "Generate comprehensive reports for your healthcare provider with charts and insights from your tracking data.",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    description: "Access your mood tracker on any device - mobile, tablet, or desktop. Online or offline capability.",
  },
];

export const Features = () => {
  return (
    <section className="py-20 bg-card" id="features">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Track Your Mental Health
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed with healthcare professionals to help you understand your emotional patterns
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 space-y-4 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

import { Rocket } from "lucide-react";
function AboutCard({ item }) {
  const { title, description, icon } = item;
  return (
    <div className="border border-border/30 space-y-3 bg-gray-50 py-5 px-4 shadow-sm rounded-xl hover:scale-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
      <span className="text-2xl mb-2">{icon}</span>
      <h4 className="text-lg font-semibold flex items-center gap-1">
        <span>{title}</span>
      </h4>
      <p className="text-sm text-medium text-gray-muted hyphens-auto text-pretty max-w-5xl">
        {description}
      </p>
    </div>
  );
}

export default AboutCard;

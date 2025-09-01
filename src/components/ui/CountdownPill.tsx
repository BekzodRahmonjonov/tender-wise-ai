import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CountdownPillProps {
  deadline: string;
  className?: string;
}

export function CountdownPill({ deadline, className }: CountdownPillProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const deadlineTime = new Date(deadline).getTime();
      const difference = deadlineTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h`);
          setIsUrgent(days <= 3);
        } else if (hours > 0) {
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          setTimeLeft(`${hours}h ${minutes}m`);
          setIsUrgent(true);
        } else {
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          setTimeLeft(`${minutes}m`);
          setIsUrgent(true);
        }
      } else {
        setTimeLeft("Expired");
        setIsUrgent(false);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [deadline]);

  const getVariant = () => {
    if (timeLeft === "Expired") return "destructive";
    if (isUrgent) return "warning";
    return "secondary";
  };

  const getBadgeClassName = () => {
    if (timeLeft === "Expired") return "bg-destructive text-destructive-foreground";
    if (isUrgent) return "bg-warning text-warning-foreground";
    return "bg-secondary text-secondary-foreground";
  };

  return (
    <Badge 
      className={`${getBadgeClassName()} gap-1 ${className}`}
      variant="secondary"
    >
      <Clock className="w-3 h-3" />
      {timeLeft}
    </Badge>
  );
}
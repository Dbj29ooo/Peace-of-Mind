import { Star, ThumbsUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ReviewCardProps {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  review: string;
  tags: string[];
  helpfulCount: number;
}

export default function ReviewCard({
  id,
  userName,
  userAvatar,
  rating,
  date,
  review,
  tags,
  helpfulCount
}: ReviewCardProps) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [currentHelpfulCount, setCurrentHelpfulCount] = useState(helpfulCount);

  const handleHelpful = () => {
    setIsHelpful(!isHelpful);
    setCurrentHelpfulCount(prev => isHelpful ? prev - 1 : prev + 1);
  };

  const initials = userName.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <Card data-testid={`card-review-${id}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userAvatar} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <p className="font-semibold" data-testid={`text-reviewer-${id}`}>{userName}</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < rating ? "fill-primary text-primary" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
        </div>

        <p className="text-sm leading-relaxed mb-3" data-testid={`text-review-${id}`}>
          {review}
        </p>

        <div className="flex items-center gap-2 flex-wrap mb-3">
          {tags.map((tag, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="gap-2 -ml-2"
          onClick={handleHelpful}
          data-testid={`button-helpful-${id}`}
        >
          <ThumbsUp className={`h-3.5 w-3.5 ${isHelpful ? "fill-primary text-primary" : ""}`} />
          <span className="text-xs">
            Helpful ({currentHelpfulCount})
          </span>
        </Button>
      </CardContent>
    </Card>
  );
}

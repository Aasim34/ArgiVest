import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Project } from '@/lib/types';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const fundingPercentage = (project.raisedAmount / project.fundingGoal) * 100;
  const farmerInitial = project.farmer?.name.charAt(0) || 'F';

  return (
    <Card className="flex flex-col overflow-hidden h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader className="p-0 relative h-48 w-full">
        <Image
          src={project.imageUrl}
          alt={project.description}
          data-ai-hint={project.imageHint}
          fill
          className="object-cover"
        />
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-2xl mb-2">{project.cropName}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Avatar className="h-6 w-6">
            <AvatarImage src={project.farmer?.avatarUrl} />
            <AvatarFallback>{farmerInitial}</AvatarFallback>
          </Avatar>
          <span>{project.farmer?.name}</span>
        </div>
        <p className="text-sm text-muted-foreground font-body line-clamp-3 mb-4">{project.description}</p>
        
        <div>
          <Progress value={fundingPercentage} className="w-full h-2 mb-2" />
          <div className="flex justify-between text-sm">
            <span className="font-bold text-primary">
              ${project.raisedAmount.toLocaleString()}
            </span>
            <span className="text-muted-foreground">
              of ${project.fundingGoal.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={`/projects/${project.id}`}>
            View Project <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

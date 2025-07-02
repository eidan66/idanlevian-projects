import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
      <Skeleton className="aspect-[4/3] w-full bg-slate-200 dark:bg-slate-700" />
      
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700" />
        <Skeleton className="h-4 w-full bg-slate-200 dark:bg-slate-700" />
        <Skeleton className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700" />
        
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="h-6 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="h-6 w-14 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
        
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20 bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="h-8 w-20 bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  );
}
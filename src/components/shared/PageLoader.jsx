
import React from 'react';
import { ChefHat } from 'lucide-react';

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-full min-h-[50vh]">
      <div className="flex flex-col items-center">
        <ChefHat className="w-16 h-16 text-primary animate-spin" />
        <p className="mt-4 text-lg text-muted-foreground">جاري التحميل...</p>
      </div>
    </div>
  );
};

export default PageLoader;

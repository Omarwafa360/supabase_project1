import React, { useState } from 'react';
import { Wand2, Loader2 } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const AiControlPanel = ({ onGenerate, isGenerating }) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName.trim() || !description.trim()) {
      toast({
        title: "بيانات ناقصة",
        description: "الرجاء إدخال اسم المنتج ووصفه.",
        variant: "destructive",
      });
      return;
    }
    onGenerate({ productName, description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">صف شعارك</h2>
        <p className="text-muted-foreground">دع الذكاء الاصطناعي يصمم لك شعارًا فريدًا.</p>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="product-name">اسم المنتج أو الشركة</Label>
          <Input 
            id="product-name" 
            placeholder="مثال: كافيين كورنر"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            disabled={isGenerating}
          />
        </div>
        <div>
          <Label htmlFor="description">صف المنتج والجمهور المستهدف</Label>
          <Textarea 
            id="description" 
            placeholder="مثال: مقهى عصري للشباب، يقدم قهوة مختصة وأجواء مريحة للدراسة والعمل."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isGenerating}
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isGenerating}>
        {isGenerating ? (
          <>
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            جاري التوليد...
          </>
        ) : (
          <>
            <Wand2 className="ml-2 h-4 w-4" />
            ولّد الشعار
          </>
        )}
      </Button>
       <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground">
            هذه الميزة حاليًا في الوضع التجريبي. سيتم إنشاء شعار عشوائي بناءً على اسم المنتج.
          </p>
        </div>
    </form>
  );
};

export default AiControlPanel;
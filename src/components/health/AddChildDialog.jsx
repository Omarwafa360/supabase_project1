import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const AddChildDialog = ({ children, onAddChild }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!name.trim() || !birthDate) {
      toast({
        title: "بيانات ناقصة",
        description: "الرجاء إدخال اسم الطفل وتاريخ ميلاده.",
        variant: "destructive",
      });
      return;
    }

    const newChild = {
      name,
      birthDate,
      avatarUrl: `https://avatar.iran.liara.run/username?username=${name.replace(/\s/g, '+')}`,
    };

    onAddChild(newChild);

    toast({
      title: "تمت الإضافة بنجاح!",
      description: `تمت إضافة ${name} إلى قائمة أطفالك.`,
    });
    
    setName('');
    setBirthDate('');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>إضافة طفل جديد</DialogTitle>
          <DialogDescription>
            أدخل معلومات طفلك لمتابعة صحته وتطوره.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              الاسم
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="birthDate" className="text-right">
              تاريخ الميلاد
            </Label>
            <Input id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>حفظ</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddChildDialog;
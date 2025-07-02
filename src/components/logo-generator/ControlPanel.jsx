import React from 'react';
import { Type, Smile, Palette, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import IconPicker from '@/components/logo-generator/IconPicker';

const fonts = [
  { name: 'Lalezar', value: 'Lalezar, cursive' },
  { name: 'Cairo', value: 'Cairo, sans-serif' },
  { name: 'Tajawal', value: 'Tajawal, sans-serif' },
  { name: 'Kufam', value: 'Kufam, sans-serif' },
];

const ControlPanel = ({ config, setConfig }) => {
  const handleConfigChange = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Tabs defaultValue="text" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="text"><Type className="w-4 h-4" /></TabsTrigger>
        <TabsTrigger value="icon"><Smile className="w-4 h-4" /></TabsTrigger>
        <TabsTrigger value="style"><Palette className="w-4 h-4" /></TabsTrigger>
        <TabsTrigger value="layout"><Settings className="w-4 h-4" /></TabsTrigger>
      </TabsList>
      <div className="pt-4 space-y-6">
        <TabsContent value="text">
          <div className="space-y-4">
            <div>
              <Label htmlFor="text-input">النص</Label>
              <Input id="text-input" value={config.text} onChange={(e) => handleConfigChange('text', e.target.value)} />
            </div>
            <div>
              <Label>لون النص</Label>
              <div className="flex items-center gap-2">
                <Input type="color" value={config.textColor} onChange={(e) => handleConfigChange('textColor', e.target.value)} className="w-12 h-10 p-1" />
                <Input type="text" value={config.textColor} onChange={(e) => handleConfigChange('textColor', e.target.value)} />
              </div>
            </div>
            <div>
              <Label>الخط</Label>
              <Select value={config.fontFamily} onValueChange={(value) => handleConfigChange('fontFamily', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر خطًا" />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map(font => (
                    <SelectItem key={font.name} value={font.name} style={{ fontFamily: font.value }}>{font.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>حجم الخط: {config.fontSize}px</Label>
              <Slider value={[config.fontSize]} onValueChange={([value]) => handleConfigChange('fontSize', value)} min={10} max={100} step={1} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="icon">
          <div className="space-y-4">
            <div>
              <Label>الأيقونة</Label>
              <IconPicker value={config.icon} onChange={(value) => handleConfigChange('icon', value)} />
            </div>
            <div>
              <Label>لون الأيقونة</Label>
              <div className="flex items-center gap-2">
                <Input type="color" value={config.iconColor} onChange={(e) => handleConfigChange('iconColor', e.target.value)} className="w-12 h-10 p-1" />
                <Input type="text" value={config.iconColor} onChange={(e) => handleConfigChange('iconColor', e.target.value)} />
              </div>
            </div>
            <div>
              <Label>حجم الأيقونة: {config.iconSize}px</Label>
              <Slider value={[config.iconSize]} onValueChange={([value]) => handleConfigChange('iconSize', value)} min={10} max={100} step={1} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="style">
          <div className="space-y-4">
            <div>
              <Label>لون الخلفية</Label>
              <div className="flex items-center gap-2">
                <Input type="color" value={config.backgroundColor} onChange={(e) => handleConfigChange('backgroundColor', e.target.value)} className="w-12 h-10 p-1" />
                <Input type="text" value={config.backgroundColor} onChange={(e) => handleConfigChange('backgroundColor', e.target.value)} />
              </div>
            </div>
            <div>
              <Label>الحشو الداخلي: {config.padding}px</Label>
              <Slider value={[config.padding]} onValueChange={([value]) => handleConfigChange('padding', value)} min={0} max={100} step={1} />
            </div>
            <div>
              <Label>تدوير الحواف: {config.borderRadius}px</Label>
              <Slider value={[config.borderRadius]} onValueChange={([value]) => handleConfigChange('borderRadius', value)} min={0} max={100} step={1} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="layout">
          <div className="space-y-4">
            <div>
              <Label>التخطيط</Label>
              <Select value={config.layout} onValueChange={(value) => handleConfigChange('layout', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر تخطيطًا" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="icon-top">أيقونة في الأعلى</SelectItem>
                  <SelectItem value="icon-bottom">أيقونة في الأسفل</SelectItem>
                  <SelectItem value="icon-left">أيقونة على اليسار</SelectItem>
                  <SelectItem value="icon-right">أيقونة على اليمين</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ControlPanel;